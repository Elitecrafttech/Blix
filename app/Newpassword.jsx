import { View, Text, Dimensions, TextInput, Pressable, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'; 
import Eye from '@expo/vector-icons/Feather'
import ToastManager, { Toast } from 'toastify-react-native'
import { useNavigation } from 'expo-router';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Newpassword() {
    const navigation = useNavigation();


    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showpassword, setshowPassword] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const handleSubmit = async() =>{
        if(password.length < 6) {
            Toast.error('password should be 6 chrs long');
            return;
        };

        if(password != confirmPassword) {
            Toast.error('password did not match');
            return;
        }
        
        setIsClicked(true);


        const response = await fetch("https://instant-chain.onrender.com/resetPassword", {
            method:"POST",
            headers:{
                "content-type":"application/json" 
            },
            body: JSON.stringify({
                password,
                confirmPassword
            })
        });

        if(response.ok){
            setIsClicked(false);
            const data = await response.json();
            console.log(data);
            
            Toast.success('Success')
            navigation.navigate('Signin');
        }else{
            setIsClicked(false);
            const error = await response.json();
            Toast.error(error.error)
            console.log(error);
            
        }
        
    }


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
                    <Text className='capitalize text-[17px]'>new password</Text>
                    <View className='flex-row items-center gap-[5px] border-[1px] border-[#d1d4df] rounded-xl p-[10px]' style={{width: windowWidth * 0.90, height: windowHeight * 0.06}}>
                        <Eye name={showpassword ?  'eye' : 'eye-off'} size={21} onPress={()=>setshowPassword(!showpassword)}/>
                        <TextInput className='px-[10px] placeholder:text-[17px] placeholder:text-[gray]' style={{width: windowWidth * 0.81, height: windowHeight * 0.06}}
                        placeholder='Password'
                        secureTextEntry={!showpassword}
                        value={password}
                        onChangeText={(text) => setPassword(text.replace(/\s/g, ''))}/>
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
            <Pressable className='bg-[#FFAB10] rounded-xl p-[8px]'>
                <Text className='text-center capitalize text-[20px] text-white' onPress={handleSubmit}>{isClicked? "updating...":"update changes"}</Text>
            </Pressable>
        </View>
    </View>
    </ScrollView>
  );
};