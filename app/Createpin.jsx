import { View, Text, Dimensions, TextInput, Pressable, ScrollView, StyleSheet } from 'react-native'
import { useEffect, useRef, useState } from 'react'; 
import { router, useNavigation } from 'expo-router';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Createpin() {
    // const navigation = useNavigation();

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

    const confirmpin = () => {
        const otpValue = otp.join('');

        console.log('OTP entered:', otpValue);
        router.push('/Confirmpin');
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
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={{padding: windowWidth * 0.05, gap: 100, height: dimensions.screen}}>
        <View className='gap-[100px]'>

            <View className='gap-[30px]'>
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
    
            <Pressable className='bg-[#FFAB10] rounded-xl p-[8px]'>
                <Text className='text-center capitalize text-[20px] text-white' onPress={confirmpin}>Continue</Text>
            </Pressable>
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