import { View, Text, Dimensions, Pressable, ScrollView } from 'react-native'
import { useEffect, useState, useContext } from 'react'; 
import { useNavigation } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler';
import { AppContext } from '@/context/AppContext';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Fillform() {
  const { userData, getUserDetails} = useContext(AppContext);
  const navigation = useNavigation();
  const [name, setName] = useState(userData?.wallet?.user.username);

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
                      <TextInput className='px-[10px] placeholder:text-[17px] ' style={{width: windowWidth * 0.81, height: windowHeight * 0.06}}
                      value={name}
                      onChangeText={setName}
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
                
                <View className='gap-[18px]'>
                <Text className='capitalize text-[17px]'>your message</Text>
                  <TextInput className='border-[1px] border-[#d1d4df] rounded-xl p-[10px] h-[150px] text-[16px] w-full'
                    multiline={true}
                    numberOfLines={4}   
                    placeholder="Enter your text here"
                    textAlignVertical="top"
                  />
                </View>
            </View>
            <Pressable className='bg-[#FFAB10] rounded-xl p-[8px]'>
                <Text className='text-center capitalize text-[20px] text-white'>send now</Text>
            </Pressable>
        </View>
    </View>
    </ScrollView>
  );
};

