import { View, Text, Dimensions, TextInput, Pressable, Image, ScrollView, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'; 
// import { useNavigation } from 'expo-router';
import Eye from '@expo/vector-icons/Feather'

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Resetpassword() {
    // const navigation = useNavigation();

    const [oldpassword, setoldPassword] = useState('');
    const [newpassword, setnewPassword] = useState('');
    const [showpassword, setshowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if(oldpassword.length < 6) {
            setError('password should be at least 6 characters long');
            return;
        };
        if(newpassword.length < 6) {
            setError('password should be at least 6 characters long');
            return;
        };
        setError('');
        alert('Successfully Reset Password')
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
    <ScrollView >
      <View  style={{padding: windowWidth * 0.05, gap: 100, height: dimensions.screen,}}>
        <View className='gap-[30px]'>
            
            <View className='gap-[40px] items-center'>
                <View className='gap-[18px] '>
                    <Text className='capitalize text-[17px]'>old password</Text>
                    <View className='flex-row items-center gap-[5px] border-[1px] border-[#d1d4df] rounded-xl p-[10px]' style={{width: windowWidth * 0.90, height: windowHeight * 0.06}}>
                        <Eye name={showpassword ?  'eye' : 'eye-off'} size={21} onPress={()=>setshowPassword(!showpassword)}/>
                        <TextInput className='px-[10px] placeholder:text-[17px]' style={{width: windowWidth * 0.81, height: windowHeight * 0.06}}
                        placeholder='Password'
                        secureTextEntry={!showpassword}
                        value={oldpassword}
                        onChangeText={(text) => setoldPassword(text)}/>
                    </View>
                </View>

                <View className='gap-[18px] '>
                    <Text className='capitalize text-[17px]'>new password</Text>
                    <View className='flex-row items-center gap-[5px] border-[1px] border-[#d1d4df] rounded-xl p-[10px]' style={{width: windowWidth * 0.90, height: windowHeight * 0.06}}>
                        <Eye name={showpassword ?  'eye' : 'eye-off'} size={21} onPress={()=>setshowPassword(!showpassword)}/>
                        <TextInput className='px-[10px] placeholder:text-[17px]' style={{width: windowWidth * 0.81, height: windowHeight * 0.06}}
                        placeholder='Password'
                        secureTextEntry={!showpassword}
                        value={newpassword}
                        onChangeText={(text) => setnewPassword(text)}/>
                    </View>
                </View>
                
                {error ? <Text className='text-[red]'>{error}</Text>: null}

            </View>
            <Pressable className='bg-[#FFAB10] rounded-xl p-[8px]'>
                <Text className='text-center capitalize text-[20px] text-white' onPress={handleSubmit}>update changes</Text>
            </Pressable>
        </View>
    </View>
    </ScrollView>
  );
};