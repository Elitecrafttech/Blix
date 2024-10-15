import { View, Text, Dimensions, TextInput, Pressable, Image, ScrollView, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'; 
import { router, useNavigation } from 'expo-router';
import ToastManager, { Toast } from 'toastify-react-native'


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Signin() {

    // const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Loading, setLoading] = useState(false);
    // const [error, setError] = useState('');

    // const validMail = (email) => {
    //     const regex = [/^[^\s@]+@[^\s@]+\.[^\s@]+$/] ;
    //     return regex.test(email);
    // }

    const handleSubmit = async() => {
        if (!email ||!password) {
            return Toast.error('All fields are required');;
        };
        // if(!validMail(email)){
        //     return;
        // };
        if(password.length < 6) {
            return Toast.error('password should be 6 chrs long');
        };

        setLoading(true);


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

            Toast.success(message.message);
            router.push('/Profile');
        }else{
            setLoading(false);
            const error = await response.json();
            Toast.error(error.error)
        }
        
    };




    const signUp = () => {
        router.push('/Register');
    }
    const forgetpass = () => {
        router.push('/Resetpassword');
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
    <ScrollView 
        contentContainerStyle={styles.contentContainer}>
      <ToastManager width={300} textStyle={{fontSize:17}} />
      <View style={{padding: windowWidth * 0.05, gap: 100, height: dimensions.screen}}>
        <View style={{gap: 30}}>
            <View className='gap-[30px]'>
                <Text className='font-bold text-[23px] capitalize'>login to your account</Text>
                <Text className='text-[16px]'>welcome back, kindly login to your account</Text>
            </View>
            <View className='gap-[40px]'>
                <TextInput className='border-[1px] border-[#d1d4df] rounded-xl p-[10px] placeholder:text-[17px]' style={{width: windowWidth * 0.90}}
                placeholder='Email Address'
                value={email}
                onChangeText={(text) => setEmail(text)}
                />

                <TextInput className='border-[1px] border-[#d1d4df] rounded-xl p-[10px] placeholder:text-[17px]' style={{width: windowWidth * 0.90}}
                placeholder='Password'
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
                />
                
                <Pressable className='items-end '>
                    <Text className='capitalize text-[#FFAB10] font-bold text-[16px]' onPress={forgetpass}>forgot password?</Text>
                </Pressable>
            </View>
            <Pressable className='bg-[#FFAB10] rounded-xl p-[8px]'>
                <Text className='text-center capitalize text-[25px] text-white' onPress={handleSubmit}>{Loading ? "loading...":"login"}</Text>
            </Pressable>
        </View>
        <View className='items-center'>
            <View className='flex-row'>
             <Text className='text-[16px] capitalize'>don’t have an account? </Text>
             <Pressable>
                <Text className='text-[#FFAB10] font-bold text-[16px] capitalize' onPress={signUp}>sign up</Text>
             </Pressable>
            </View>
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