import { View, Text, Dimensions, TextInput, Pressable, ScrollView, StyleSheet } from 'react-native'
import { useContext, useEffect, useRef, useState } from 'react'; 
import { router, useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '@/context/AppContext';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Forgetpassotp() {
    const navigation = useNavigation();

    const [otp, setOtp] = useState(['','','','','','']);

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

    const Onetimepass = async() => {
        const otpValue = otp.join('');
        try {
            if(otpValue){
                const response = await fetch("https://instant-chain.onrender.com/verify-otp",{
                    method:"POST",
                    headers:{
                        "content-type":"application/json",
                    },
                    body: JSON.stringify({
                        otp:otpValue
                    })
                });
                const res = await response.json()
                if(response.ok){
                    console.log('OTP entered:', otpValue);
                    // router.push('Newpassword')
                    navigation.navigate('Newpassword');
                }else{
                    alert('Invalid OTP');
                    console.log(res);
                    
                }
            }else{
                alert('OTP is required')
            }
            
        } catch (error) {
            console.log(error);
            
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
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={{padding: windowWidth * 0.05, gap: 100, height: dimensions.screen}}>
        <View className='gap-[100px]'>

            <View className='gap-[30px]'>
                <Text className='font-bold text-[23px] capitalize text-center'>confirm your pin</Text>
                <Text className='text-[16px] text-center capitalize'>input otp sent to your mail</Text>

                <View className='flex-row gap-[20px]'>
                    {otp.map((digit, index) =>(
                        <TextInput className='border-[1px] border-[#9F9F9F] rounded-[5px] p-[10px] text-center text-[20px]'
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
                <Text className='text-center capitalize text-[20px] text-white' onPress={Onetimepass}>Continue</Text>
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










  
// import { View, Text, Dimensions, TextInput, Pressable, ScrollView, Button} from 'react-native'
// import { useEffect, useState, useRef, useContext } from 'react';
// import OTPTextInput from 'react-native-otp-textinput'


// const windowDimensions = Dimensions.get('window');
// const screenDimensions = Dimensions.get('screen');

// export default function Forgetpassotp() {

//     let otpInput = useRef(null);

//     const clearText = () => {
//         otpInput.current.clear();
//     }

//     const setText = () => {
//         otpInput.current.setValue("1234");
//     }
   


// const [dimensions, setDimensions] = useState({
//     window: windowDimensions,
//     screen: screenDimensions,
//     });

//     useEffect(() => {
//     const subscription = Dimensions.addEventListener(
//         'change',
//         ({ window, screen }) => {
//             setDimensions({ window, screen });
//         },
//         );
//         return () => subscription?.remove();
//     }, []);
    
//     const windowWidth = dimensions.window.width;
//     const windowHeight = dimensions.window.height;

//   return (
//     <ScrollView className='w-[100%] py-[50px] bg-white'>
//       <View style={{padding: windowWidth * 0.05, gap: 150, height: dimensions.screen}}>
//         <View>
//             <OTPTextInput textInputStyle={{borderWidth: 1, borderBottomWidth: 1}} ref={e => (otpInput = e)} />
//             <Button title="clear" onPress={clearText} />

//         </View>

//     <Pressable className='bg-[#FFAB10] rounded-xl p-[8px]'>
//         <Text className='text-center capitalize text-[20px] text-white' >Proceed</Text>
//     </Pressable>
//     </View>
//     </ScrollView>
//   );
// };
