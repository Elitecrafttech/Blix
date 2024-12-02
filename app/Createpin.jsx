import { View, Text, Dimensions, TextInput, Pressable, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { useContext, useEffect, useRef, useState } from 'react'; 
import ToastManager, { Toast } from 'toastify-react-native'
import { useNavigation } from 'expo-router';
import { AppContext } from '@/context/AppContext';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Createpin() {
    const navigation = useNavigation();

    const {user} = useContext(AppContext);
    const tk = JSON.parse(user);

    const [otp, setOtp] = useState(['','','','',]);

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

    const confirmpin = async() => {
        const otpValue = otp.join('');
        if(!otpValue){
            console.log("enter pin");
            
            return Toast.error('Please enter create pin')

            
        }
        
        if(otpValue){
            const response = await fetch('https://instant-chain.onrender.com/create-pin', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tk}`
                },
                body: JSON.stringify({
                    pin: otpValue,
                })
            });
            if(response.ok){
                const data = await response.json();
                console.log(data);
                Toast.success("PIN created successfully");

                // navigation.navigate('dashboard');
                
            }else if (response.status === 409){
                console.log('PIN already exists');
                Toast.error('PIN already exists');
            }
            else{
                console.log('Error creating pin');
                Toast.error('Error creating pin')
            }
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
        },
        );
        return () => subscription?.remove();
    }, []);
    
    const windowWidth = dimensions.window.width;
    const windowHeight = dimensions.window.height;

  return (
    <ScrollView className='w-[100%] py-[50px] pt-[100px] bg-white'>
      <View style={{padding: windowWidth * 0.05, gap: 100, height: dimensions.screen}}>
      <ToastManager width={300} textStyle={{fontSize:17}} />
        <View className='gap-[100px]'>

            <View className='gap-[30px] items-center'>
                <Text className='font-bold text-[23px] capitalize text-center'>create new pin</Text>
                <Text className='text-[16px] text-center'>input pin to login to your account</Text>

                <View className='flex-row gap-[20px]'>
                    {otp.map((digit, index) =>(
                        <TextInput className='border-[1px] border-[#9F9F9F] rounded-[5px] p-[15px] text-center text-[20px]'
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
    
            <TouchableOpacity className='bg-[#FFAB10] rounded-xl p-[8px]' onPress={confirmpin}>
                <Text className='text-center capitalize text-[20px] text-white' >Continue</Text>
            </TouchableOpacity>
        </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });