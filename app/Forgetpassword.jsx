import { View, Text, Dimensions, TextInput, Pressable, ScrollView, } from 'react-native'
import { useEffect, useState, useContext } from 'react'; 
import { useNavigation } from 'expo-router';
import ToastManager, { Toast } from 'toastify-react-native';
import { AppContext } from '@/context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Forgetpassword() {
    const navigation = useNavigation();

    const {setUser} = useContext(AppContext)

    const [email, setEmail] = useState('');
    const [Loading, setLoading] = useState(false);

    const otp = async()=>{
        if(!email){
            return Toast.error('Email field is required');
        }
        setLoading(true)

        const response = await fetch("https://instant-chain.onrender.com/forgotPassword", {
            method:"POST",
            headers:{
                "content-type":"application/json" 
            },
            body: JSON.stringify({
                email
            })
        });

        if(response.ok){
            setLoading(false);
            const message = await response.json();
            setUser(JSON.stringify(message));
            AsyncStorage.setItem("tk", JSON.stringify(message))

            console.log(message);
            
            Toast.success(message.message);
            navigation.navigate('Forgetpassotp');
        }else{
            setLoading(false);
            const error = await response.json();
            Toast.error(error.error)
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
      <View style={{padding: windowWidth * 0.05, gap: 150, height: dimensions.screen}}>
      <ToastManager width={300} textStyle={{fontSize:17}} />
       
                <View className='gap-[10px  ]'>
                    <Text className='text-[18px]'>Recover Your Password</Text>
                <TextInput className='border-[1px] border-[#d1d4df] rounded-xl p-[10px] placeholder:text-[17px] placeholder:text-[gray]' style={{width: windowWidth * 0.90}}
                placeholder='Email Address'
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={(text) => setEmail(text.replace(/\s/g, ''))}
                />
                </View>

            <Pressable className='bg-[#FFAB10] rounded-xl p-[8px]'>
                <Text className='text-center capitalize text-[20px] text-white' onPress={otp}>{Loading ? "loading...":"Proceed"}</Text>
            </Pressable>
    </View>
    </ScrollView>
  );
};
