import { View, Text, Dimensions, TextInput, Pressable, ScrollView, } from 'react-native'
import { useEffect, useState, useContext } from 'react'; 
import { AppContext } from '@/context/AppContext';


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Profiledetails() {
    const { userData, getUserDetails} = useContext(AppContext)
   


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
    <ScrollView className='w-[100%]  bg-white'>
      <View style={{padding: windowWidth * 0.05, gap: 50, height: dimensions.screen}}>
        <View className='flex-row justify-between'>
            <Text className='capitalize text-[20px]'>available balance</Text>
            <Text className='capitalize text-[20px] font-bold'>{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(userData?.wallet?.balance)}</Text>
        </View>
        <View className='flex-row justify-between'>
            <Text className='capitalize text-[20px] font-bold'>username :</Text>
            <Text className='capitalize text-[20px]'>{userData?.wallet?.user.username}</Text>
        </View>
        <View className='flex-row justify-between'>
            <Text className='capitalize text-[20px] font-bold'>email :</Text>
            <Text className='capitalize text-[20px]'>{userData?.wallet?.user.email}</Text>
        </View>
        <View className='flex-row justify-between'>
            <Text className='capitalize text-[20px] font-bold'>phone no.</Text>
            <Text className='capitalize text-[20px]'>{userData?.wallet?.user.phonenumber}</Text>
        </View>
        <View className='flex-row justify-between'>
            <Text className='capitalize text-[20px] font-bold'>date joined :</Text>
            <Text className='capitalize text-[20px]'>{userData?.wallet?.user.createdAt}</Text>
        </View>
        <View className='flex-row justify-between'>
            <Text className='capitalize text-[20px] font-bold'>last update :</Text>
            <Text className='capitalize text-[20px]'>{userData?.wallet?.user.updatedAt}</Text>
        </View>

   
    </View>
    </ScrollView>
  );
};