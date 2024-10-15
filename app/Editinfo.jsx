import { View, Text, Dimensions, Pressable, ScrollView, } from 'react-native'
import { useEffect, useState } from 'react'; 
import { useNavigation } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Editinfo() {
  // const navigation = useNavigation();

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
      <View style={{padding: windowWidth * 0.05, gap: 100, height: dimensions.screen}}>
        <View className='gap-[140px]'>
            
            <View className='gap-[40px]'>

                <View className='gap-[18px] '>
                    <Text className='capitalize text-[17px]'>full name</Text>
                    <View className='flex-row items-center gap-[5px] border-[1px] border-[#d1d4df] rounded-xl p-[10px]' style={{width: windowWidth * 0.90, height: windowHeight * 0.06}}>
                    <Feather name="user" size={24} color="black" />
                    <Text>jays alimi</Text>
                    </View>
                </View>

                <View className='gap-[18px] '>
                    <Text className='capitalize text-[17px]'>email address</Text>
                    <View className='flex-row items-center gap-[5px] border-[1px] border-[#d1d4df] rounded-xl p-[10px]' style={{width: windowWidth * 0.90, height: windowHeight * 0.06}}>
                    <Fontisto name="email" size={24} color="black" />
                      <Text>talk2jays0x@gmail.com</Text>
                    </View>
                </View>
                
                <View className='gap-[18px] '>
                    <Text className='capitalize text-[17px]'>phone no.</Text>
                    <View className='flex-row items-center gap-[5px] border-[1px] border-[#d1d4df] rounded-xl p-[10px]' style={{width: windowWidth * 0.90, height: windowHeight * 0.06}}>
                    <Ionicons name="call-outline" size={24} color="black" />
                      <Text>+234 91 6824 3714</Text>
                    </View>
                </View>
                
            </View>
            <Pressable className='bg-[#FFAB10] rounded-xl p-[8px]'>
                <Text className='text-center capitalize text-[20px] text-white'>update changes</Text>
            </Pressable>
        </View>
    </View>
    </ScrollView>
  );
};