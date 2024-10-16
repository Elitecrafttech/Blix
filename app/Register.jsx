import { View, Text, Dimensions, TextInput, Pressable, ScrollView, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'; 
import { router } from 'expo-router';
import ToastManager, { Toast } from 'toastify-react-native'

// import 'react-toastify/dist/ReactToastify.css';


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Register() {


    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isClicked, setIsClicked] = useState(false);

    // const validMail = (email) => {
    //     const regex = [/^[^\s@]+@[^\s@]+\.[^\s@]+$/];
    //     return regex.test(email);
    // }

    const handleSubmit = async() => {
        if(!username){
          return Toast.error('Username is required.');
        }
        if ( !email || !password) {
            return Toast.error('All fields are required');
        };
        // if(!validMail(email)){
        //     setError('Enter A Valid Email Address');
        //     return;
        // };
        if(password.length < 6) {
            Toast.error('password should be 6 chrs long');
            return;
        };

        if(password != confirmPassword) {
            Toast.error('password did not match');
            return;
        };

        setIsClicked(true)


        const response = await fetch("https://instant-chain.onrender.com/register", {
            method:"POST",
            headers:{
                "content-type":"application/json" 
            },
            body: JSON.stringify({
                username,
                email,
                password,
                confirmPassword
            })
        });

        if(response.ok){
            setIsClicked(false)
            const message = await response.json();
            console.log(message.message);
            
            Toast.success(message.message);
        router.push('/Createpin');
        }else{
            setIsClicked(false)
            const error = await response.json();
            Toast.error(error.error)
            console.log(error.error);

        }
        
    };
    const signin = () => {
        router.push('/Signin');
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
        className='w-[100%] py-[50px]'
      >
        
      <View style={{padding: windowWidth * 0.05, gap: 100, height: dimensions.screen}}>
            <ToastManager width={300} textStyle={{fontSize:17}} />
        <View style={{gap: 30}}>
            <View className='gap-[30px]'>
                <Text className='font-bold text-[23px] capitalize'>Create an account</Text>
                <Text className='text-[16px]'>tell us more about yourself</Text>
            </View>
            <View className='gap-[40px]'>
                <TextInput className='border-[1px] border-[#d1d4df] rounded-xl p-[10px] placeholder:text-[17px]' style={{width: windowWidth * 0.90}}
                placeholder='Username'
                value={username}
                onChangeText={(text) => setUsername(text)}
                />
                
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

                <TextInput className='border-[1px] border-[#d1d4df] rounded-xl p-[10px] placeholder:text-[17px]' style={{width: windowWidth * 0.90}}
                placeholder='Confirm Password'
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                />
                
            </View>
            <View>
            <Pressable className='bg-[#FFAB10] rounded-xl p-[8px]'>
                <Text className='text-center capitalize text-[25px] text-white' onPress={handleSubmit}>{isClicked ? "Loading ...": "sign up"}</Text>
            </Pressable>
           
            </View>
        </View>
        <View className='items-center'>
            <View className='flex-row'>
             <Text className='text-[16px] capitalize'>already have an account?  </Text>
             <Pressable>
                <Text className='text-[#FFAB10] font-bold text-[16px]' onPress={signin}>Login</Text>
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