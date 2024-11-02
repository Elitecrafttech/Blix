import { View, Text, Dimensions, TextInput, Pressable, ScrollView, StyleSheet } from 'react-native'
import { useContext, useEffect, useState } from 'react'; 
import Eye from '@expo/vector-icons/Feather'
import ToastManager, { Toast } from 'toastify-react-native'
import { AppContext } from '@/context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useNavigation } from 'expo-router';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Changepassword() {
    const navigation = useNavigation();

    const {user, setUser} = useContext(AppContext);
    const tk = JSON.parse(user);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showpassword, setshowPassword] = useState(false);

    const handleSubmit = async() => {
        if(currentPassword.length < 6) {
            Toast.error('password should be 6 chrs long');
            return;
        };
        if(newPassword.length < 6) {
            Toast.error('password should be 6 chrs long');
            return;
        };
        if(newPassword != confirmPassword){
            return Toast.error('Password did not match');
            
        }

        const response = await fetch("https://instant-chain.onrender.com/change-password", {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tk}`
            },
            body: JSON.stringify({
                currentPassword,
                newPassword,
                confirmPassword
            })
        });
        if(response.ok) {
            const data = await response.json();
            console.log(data);

            Toast.success('Password Changed Successfully');
            AsyncStorage.removeItem("tk");
            setUser(null);
            return navigation.navigate('Signin');
        }else{
            const error = await response.json();
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
        },
        );
        return () => subscription?.remove();
    }, []);
    
    const windowWidth = dimensions.window.width;
    const windowHeight = dimensions.window.height;

  return (
    <ScrollView className='w-[100%] py-[50px] bg-white'>
      <View  style={{padding: windowWidth * 0.05, gap: 100, height: dimensions.screen,}}>
      <ToastManager width={300} textStyle={{fontSize:17}} />
        <View className='gap-[30px]'>
            
            <View className='gap-[40px] items-center'>
                <View className='gap-[18px] '>
                    <Text className='capitalize text-[17px]'>old password</Text>
                    <View className='flex-row items-center gap-[5px] border-[1px] border-[#d1d4df] rounded-xl p-[10px]' style={{width: windowWidth * 0.90, height: windowHeight * 0.06}}>
                        <Eye name={showpassword ?  'eye' : 'eye-off'} size={21} onPress={()=>setshowPassword(!showpassword)}/>
                        <TextInput className='px-[10px] placeholder:text-[17px] placeholder:text-[gray]' style={{width: windowWidth * 0.81, height: windowHeight * 0.06}}
                        placeholder='Password'
                        secureTextEntry={!showpassword}
                        value={currentPassword}
                        onChangeText={(text) => setCurrentPassword(text.replace(/\s/g, ''))}/>
                    </View>
                </View>

                <View className='gap-[18px] '>
                    <Text className='capitalize text-[17px]'>new password</Text>
                    <View className='flex-row items-center gap-[5px] border-[1px] border-[#d1d4df] rounded-xl p-[10px]' style={{width: windowWidth * 0.90, height: windowHeight * 0.06}}>
                        <Eye name={showpassword ?  'eye' : 'eye-off'} size={21} onPress={()=>setshowPassword(!showpassword)}/>
                        <TextInput className='px-[10px] placeholder:text-[17px] placeholder:text-[gray]' style={{width: windowWidth * 0.81, height: windowHeight * 0.06}}
                        placeholder='Password'
                        secureTextEntry={!showpassword}
                        value={newPassword}
                        onChangeText={(text) => setNewPassword(text.replace(/\s/g, ''))}/>
                    </View>
                </View>

                <View className='gap-[18px] '>
                    <Text className='capitalize text-[17px]'>confirm password</Text>
                    <View className='flex-row items-center gap-[5px] border-[1px] border-[#d1d4df] rounded-xl p-[10px]' style={{width: windowWidth * 0.90, height: windowHeight * 0.06}}>
                        <Eye name={showpassword ?  'eye' : 'eye-off'} size={21} onPress={()=>setshowPassword(!showpassword)}/>
                        <TextInput className='px-[10px] placeholder:text-[17px] placeholder:text-[gray]' style={{width: windowWidth * 0.81, height: windowHeight * 0.06}}
                        placeholder='Password'
                        secureTextEntry={!showpassword}
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text.replace(/\s/g, ''))}/>
                    </View>
                </View>
                
            </View>
            <Pressable className='bg-[#FFAB10] rounded-xl p-[8px]' android_ripple={{color:"#000"}}>
                <Text className='text-center capitalize text-[20px] text-white' onPress={handleSubmit}>update changes</Text>
            </Pressable>
        </View>
    </View>
    </ScrollView>
  );
};