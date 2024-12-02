import { View, Text, Dimensions, TextInput, Pressable, ScrollView } from 'react-native';
import { useContext, useEffect, useRef, useState } from 'react';
import ToastManager, { Toast } from 'toastify-react-native'
import { useNavigation } from 'expo-router';
import { AppContext } from '@/context/AppContext';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Resetpin() {
    const navigation = useNavigation();

    const { user } = useContext(AppContext);
    const tk = JSON.parse(user);


    const [oldPin, setOldPin] = useState(['', '', '', '']);
    const [newPin, setNewPin] = useState(['', '', '', '']);

    const oldPinRefs = useRef([]);
    const newPinRefs = useRef([]);

    const handlePinChange = (type, index, value) => {
        if (value.length > 1) return;

        if (type === 'old') {
            const newOldPin = [...oldPin];
            newOldPin[index] = value;
            setOldPin(newOldPin);

            if (value && index < oldPin.length - 1) {
                oldPinRefs.current[index + 1].focus();
            }
        } else if (type === 'new') {
            const newNewPin = [...newPin];
            newNewPin[index] = value;
            setNewPin(newNewPin);

            if (value && index < newPin.length - 1) {
                newPinRefs.current[index + 1].focus();
            }
        }
    };

    const resetPin = async() => {
        const oldPinValue = oldPin.join('');
        const newPinValue = newPin.join('');

        console.log('Old PIN entered:', oldPinValue);
        console.log('New PIN entered:', newPinValue);
        // navigation.navigate('');

        const response = await fetch("https://instant-chain.onrender.com/change-pin",{
            method: 'POST',
            headers:{
                "content-type":"application/json",
                'Authorization': `Bearer ${tk}`
            },
            body: JSON.stringify({
                oldPin: oldPinValue,
                newPin: newPinValue
            })
        })
        if(response.ok){
            const data = await response.json();
            console.log(data.message);
            Toast.success('PIN reset successfully');
            navigation.navigate('Accountsecurity');
            
            
        }else{
            const error = await response.json();
            console.log(error.error);
            Toast.error(error.error);            
        }
    };

    const [dimensions, setDimensions] = useState({
        window: windowDimensions,
        screen: screenDimensions,
    });

    useEffect(() => {
        const subscription = Dimensions.addEventListener(
            'change',
            ({ window, screen }) => {
                setDimensions({ window, screen });
            }
        );
        return () => subscription?.remove();
    }, []);

    const windowWidth = dimensions.window.width;

    return (
        <ScrollView className='w-[100%] py-[50px] bg-white'>
            <View style={{ padding: windowWidth * 0.05, gap: 100 }}>
            <ToastManager width={300} textStyle={{fontSize:17}} />
                <View className='gap-[40px] items-center'>

                    {/* Old PIN */}
                    <View className='gap-[18px]'>
                        <Text className='capitalize text-[17px]'>old pin</Text>
                        <View className='flex-row gap-[20px]'>
                            {oldPin.map((digit, index) => (
                                <TextInput
                                    className='border-[1px] border-[#dcd9d9] rounded-[5px] px-[20px] text-center text-[20px]'
                                    key={index}
                                    ref={(el) => (oldPinRefs.current[index] = el)}
                                    value={digit}
                                    onChangeText={(value) => handlePinChange('old', index, value)}
                                    maxLength={1}
                                    keyboardType='numeric'
                                    onKeyPress={({ nativeEvent }) => {
                                        if (nativeEvent.key === 'Backspace' && !oldPin[index] && index > 0) {
                                            oldPinRefs.current[index - 1].focus();
                                        }
                                    }}
                                />
                            ))}
                        </View>
                    </View>

                    {/* New PIN */}
                    <View className='gap-[18px]'>
                        <Text className='capitalize text-[17px]'>new pin</Text>
                        <View className='flex-row gap-[20px]'>
                            {newPin.map((digit, index) => (
                                <TextInput
                                    className='border-[1px] border-[#dcd9d9] rounded-[5px] px-[20px] text-center text-[20px]'
                                    key={index}
                                    ref={(el) => (newPinRefs.current[index] = el)}
                                    value={digit}
                                    onChangeText={(value) => handlePinChange('new', index, value)}
                                    maxLength={1}
                                    keyboardType='numeric'
                                    onKeyPress={({ nativeEvent }) => {
                                        if (nativeEvent.key === 'Backspace' && !newPin[index] && index > 0) {
                                            newPinRefs.current[index - 1].focus();
                                        }
                                    }}
                                />
                            ))}
                        </View>
                    </View>
                </View>

                {/* Update Button */}
                <Pressable className='bg-[#FFAB10] rounded-xl p-[8px]' onPress={resetPin}>
                    <Text className='text-center capitalize text-[20px] text-white'>update changes</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}
