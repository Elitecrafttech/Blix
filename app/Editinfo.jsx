import { View, Text, Dimensions, Pressable, ScrollView, } from 'react-native'
import { useEffect, useState, useContext } from 'react'; 
import { useNavigation } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler';
import { AppContext } from '@/context/AppContext';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Editinfo() {
  const navigation = useNavigation();

  const {user, userData, getUserDetails} = useContext(AppContext);
  const tk = JSON.parse(user);
  // console.log("token is ", tk);
  

  const [username, setUsername] = useState(userData?.wallet?.user.username || "");
  const [number, setNumber] = useState(userData?.wallet?.user.phonenumber || "")


  const info = async()=>{
    console.log(tk);
    
    try {
      const response = await fetch('https://instant-chain.onrender.com/update-profile',{
        method: "PATCH",
        headers: {
          "Content-Type":"application/json",
          "Authorization": `Bearer ${tk}`
        },
        body: JSON.stringify({
          username,
          phonenumber:number
        })
        
      });
      if(response.ok){
        const data = await response.json();
        console.log(data);
        navigation.navigate('Profile');
        
      }else{
        const error = await response.json()
        console.log(error);
        
      }
    } catch (error) {
      console.log("catched error: ", error.message);
      
    }
  }




  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
    });

    useEffect(() => {
      getUserDetails()
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
      <View style={{padding: windowWidth * 0.05, gap: 100, height: dimensions.screen}}>
        <View className='gap-[140px]'>
            
            <View className='gap-[40px]'>

                <View className='gap-[18px] '>
                     <Text className='capitalize text-[17px]'>UserName</Text>
                    <View className='flex-row items-center gap-[5px] border-[1px] border-[#d1d4df] rounded-xl p-[10px]' style={{width: windowWidth * 0.90, height: windowHeight * 0.06}}>
                      <Feather name="user" size={24} color="black" />
                      <TextInput className='px-[10px] ' style={{width: windowWidth * 0.81, height: windowHeight * 0.06}}
                      value={username}
                      onChangeText={setUsername}
                      />
                    </View>
                </View>

                <View className='gap-[18px] '>
                    <Text className='capitalize text-[17px]'>email address</Text>
                    <View className='flex-row items-center gap-[5px] border-[1px] border-[#d1d4df] rounded-xl p-[10px]' style={{width: windowWidth * 0.90, height: windowHeight * 0.06}}>
                    <Fontisto name="email" size={24} color="black" />
                      <Text>{userData?.wallet?.user.email}</Text>
                    </View>
                </View>
                
                <View className='gap-[18px] '>
                    <Text className='capitalize text-[17px]'>phone no.</Text>
                    <View className='flex-row items-center gap-[5px] border-[1px] border-[#d1d4df] rounded-xl p-[10px]' style={{width: windowWidth * 0.90, height: windowHeight * 0.06}}>
                    <Ionicons name="call-outline" size={24} color="black" />
                      <TextInput className='px-[10px] ' style={{width: windowWidth * 0.81, height: windowHeight * 0.06}}
                      value={number}
                      onChangeText={setNumber}
                      keyboardType='numeric'
                      />
                    </View>
                </View>
                
            </View>
            <Pressable className='bg-[#FFAB10] rounded-xl p-[8px]' onPress={info}>
                <Text className='text-center capitalize text-[20px] text-white'>update changes</Text>
            </Pressable>
        </View>
    </View>
    </ScrollView>
  );
};