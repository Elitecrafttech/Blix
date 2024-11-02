import { View, Text, Dimensions, TextInput, Pressable, Image, ScrollView, StyleSheet, SafeAreaView } from 'react-native'
import { useEffect, useState, useContext } from 'react'; 
import { router, useNavigation } from 'expo-router';
import Eye from '@expo/vector-icons/Feather'
import ToastManager, { Toast } from 'toastify-react-native';
import { AppContext } from '@/context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Status from '@/components/Status';


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Signin() {
    const navigation = useNavigation();

    const {setUser} = useContext(AppContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showpassword, setShowPassword] = useState(false);
    const [Loading, setLoading] = useState(false);
   

    const handleSubmit = async() => {
        if (!email ||!password) {
            return Toast.error('All fields are required');;
        };
        
        if(password.length < 6) {
            return Toast.error('password should be 6 chrs long');
        };

        setLoading(true);


      try {
        const response = await fetch("https://instant-chain.onrender.com/login", {
            method:"POST",
            headers:{
                "content-type":"application/json" 
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        if(response.ok){
            setLoading(false);
            const message = await response.json();
            setUser(JSON.stringify(message));
            AsyncStorage.setItem("tk", JSON.stringify(message))

            // console.log(message.token);
            
            Toast.success(message.message);
            // router.push('/dashboard');
            navigation.navigate('dashboard');
        }else{
            setLoading(false);
            const error = await response.json();
            Toast.error(error.error)
        }
      } catch (error) {
            setLoading(false);
            Toast.error(error.message)
      }
        
    };




    const signUp = () => {
        // router.push('/Register');
        navigation.navigate('Register');
    }
    const forgetpass = () => {
        // router.push('/Forgetpassword');
        navigation.navigate('Forgetpassword');
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
    <ScrollView className='w-[100%] py-[50px] pt-[100px] bg-white'>
    <SafeAreaView>
    <Status/>
      <ToastManager width={300} textStyle={{fontSize:17}} />
      <View style={{padding: windowWidth * 0.05, gap: 100, height: dimensions.screen}}>
        <View style={{gap: 30}}>
            <View className='gap-[30px]'>
                <Text className='font-bold text-[23px] capitalize'>login to your account</Text>
                <Text className='text-[16px]'>welcome back, kindly login to your account</Text>
            </View>
            <View className='gap-[40px]'>
                <TextInput className='border-[1px] border-[#d1d4df] rounded-xl p-[10px] placeholder:text-[17px] placeholder:text-[gray]' style={{width: windowWidth * 0.90}}
                placeholder='Email Address'
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={(text) => setEmail(text.replace(/\s/g, ''))}
                />

                <View className='flex-row items-center  border-[1px] border-[#d1d4df] rounded-xl '>
                <TextInput className='px-[10px] placeholder:text-[17px] placeholder:text-[gray] ' style={{width: windowWidth * 0.81, height: windowHeight * 0.06}}
                placeholder='Password'
                secureTextEntry={!showpassword}
                value={password}
                onChangeText={(text) => setPassword(text.replace(/\s/g, ''))}
                />
                <Eye name={showpassword? "eye" : "eye-off"} size={21} className=' px-[8px] py-[15px]' onPress={()=>setShowPassword(!showpassword)}/>
                </View>
                
                <Pressable className='items-end p-[5px]' onPress={forgetpass}>
                    <Text className='capitalize text-[#FFAB10] font-bold text-[16px]' >forgot password?</Text>
                </Pressable>
            </View>
            <Pressable className='bg-[#FFAB10] rounded-xl p-[8px]' onPress={handleSubmit}>
                <Text className='text-center capitalize text-[25px] text-white' >{Loading ? "loading...":"login"}</Text>
            </Pressable>
        </View>
        <View className='items-center'>
            <View className='flex-row items-center'>
             <Text className='text-[16px] capitalize'>don’t have an account? </Text>
             <Pressable className='p-[10px]' onPress={signUp} android_ripple={{color:"#000", foreground:true}}>
                <Text className='text-[#FFAB10] font-bold text-[16px] capitalize' >sign up</Text>
             </Pressable>
            </View>
        </View>
    </View>
    </SafeAreaView>
    </ScrollView>
  );
};
