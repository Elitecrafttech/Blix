import { View, Text, Dimensions, TextInput, Pressable, ScrollView, StyleSheet } from 'react-native'
import { useEffect, useRef, useState } from 'react'; 
import { useNavigation } from 'expo-router';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Createpin() {
    const navigation = useNavigation();

    const [otp, setOtp] = useState(['','','','','',]);

    const inputRefs = useRef([]);

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return;
        const newOtp =[...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otp.length - 1){
            inputRefs.current[index + 1].focus();
        }
    };

    const resetPin = () => {
        const otpValue = otp.join('');

        console.log('OTP entered:', otpValue);
        navigation.navigate('');
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
        },
        );
        return () => subscription?.remove();
    }, []);
    
    const windowWidth = dimensions.window.width;
    const windowHeight = dimensions.window.height;

  return (
    <ScrollView className='w-[100%] py-[50px] bg-white'>
      <View style={{padding: windowWidth * 0.05, gap: 100, height: dimensions.screen}}>
        <View className='gap-[150px]'>

            <View className='gap-[40px] items-center'>
                
                <View className='gap-[18px] '>
                <Text className='capitalize text-[17px]'>old pin</Text>
                <View className='flex-row gap-[20px]'>
                    {otp.map((digit, index) =>(
                        <TextInput className='border-[1px] border-[#dcd9d9] rounded-[5px] p-[15px] text-center text-[20px]'
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        value={digit}
                        onChangeText={(value) => handleOtpChange(index, value)}
                        maxLength={1}
                        keyboardType='numeric'


                        onKeyPress={({ nativeEvent }) => {
                            if (nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
                                inputRefs.current[index - 1].focus();
                            }
                        }}
                        />
                        
                    ))}
                </View>
                </View>
                <View className='gap-[18px] '>
                <Text className='capitalize text-[17px]'>new pin</Text>
                <View className='flex-row gap-[20px]'>
                    {otp.map((digit, index) =>(
                        <TextInput className='border-[1px] border-[#dcd9d9] rounded-[5px] p-[15px] text-center text-[20px]'
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        value={digit}
                        onChangeText={(value) => handleOtpChange(index, value)}
                        maxLength={1}
                        keyboardType='numeric'


                        onKeyPress={({ nativeEvent }) => {
                            if (nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
                                inputRefs.current[index - 1].focus();
                            }
                        }}
                        />
                        
                    ))}
                </View>
                </View>
            </View>
    
            <Pressable className='bg-[#FFAB10] rounded-xl p-[8px]'>
                <Text className='text-center capitalize text-[20px] text-white' >update changes</Text>
            </Pressable>
        </View>
    </View>
    </ScrollView>
  );
};