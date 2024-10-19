import { View, Text, Dimensions, Pressable, ScrollView, Image} from 'react-native'
import { useEffect, useState } from 'react'; 
import Entypo from '@expo/vector-icons/Entypo';


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Helpsupport() {


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
         <ScrollView className='w-[100%] py-[50px] bg-white' style={{width: windowWidth, height: windowHeight - 60}}>
          <View style={{padding: windowWidth * 0.05, gap: 100, height: dimensions.screen}}>
                <View className='gap-[20px]'>
                
                    <View className='border-[1px] border-[#eaebeb] rounded-xl gap-[10px] px-[10px] py-[20px]'>
                        <Pressable className='flex-row items-center justify-between' >
                            <View className='flex-row gap-[15px]'>
                                <View className='bg-slate-200 rounded-full p-[10px] items-center'>
                                    <Image source={require('@/assets/images/livechat.png')} style={{ height: 28,width: 28, }}/>
                                    </View>
                                <View>
                                    <Text className='font-semibold capitalize text-[16px]'>live chat</Text>
                                    <Text className='capitalize'>chat with our customer service</Text>
                                </View>
                            </View>
                            <Entypo name="chevron-small-right" size={30} color="black" />
                        </Pressable>
                        <Text className='border-b-[0.3px] mb-[20px] border-b-gray-300'></Text>
                        <Pressable className='flex-row items-center justify-between ' >
                            <View className='flex-row gap-[15px]'>
                                <View className='bg-slate-200 rounded-full p-[15px]'>
                                    <Image source={require('@/assets/images/form.png')} /></View>
                                <View>
                                    <Text className='font-semibold capitalize text-[16px]'>fill a form</Text>
                                    <Text className='capitalize'>send us a form about your enquires</Text>
                                </View>
                            </View>
                            <Entypo name="chevron-small-right" size={30} color="black" />
                        </Pressable>                        
                    </View>
                </View>
          </View>
        </ScrollView>
  );
};