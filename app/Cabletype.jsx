import { View, Text, Dimensions, Pressable, Image, ScrollView,} from 'react-native'
import { useEffect, useState, useContext } from 'react'; 
import { useNavigation } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Cabletype() {
  const navigation = useNavigation();

  const gotv = () => {
    navigation.navigate('Gotv');
  }
  const dstv = () => {
    navigation.navigate('Dstv');
  }
//   const payonerr = () => {
//     // navigation.navigate('Tradepayonerr');
//   }



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
    <ScrollView className='w-[100%] py-[30px] bg-white'  style={{width: windowWidth, height: windowHeight - 60}}>
          <View style={{padding: windowWidth * 0.05, gap: 100, height: dimensions.screen}}>
                <View className='gap-[20px]'>
                {/* <Text className='capitalize text-center font-bold text-[25px] text-[#695e5e]'>available Trade</Text> */}
                    <View className='border-[1px] border-[#eaebeb] rounded-xl gap-[50px]'>
                        <Pressable className='flex-row items-center justify-between border-[#FFAB10] border-[2px] p-[10px] rounded-xl' onPress={gotv}>
                            <View className='flex-row gap-[15px]'>
                                <View className='bg-slate-200 rounded-full p-[10px]'>
                                <MaterialIcons name="live-tv" size={24} color="black" />
                                  </View>
                                <View>
                                    <Text className='font-semibold uppercase text-[16px] text-[#b6852a]'>gotv</Text>
                                    <Text className='capitalize'>subscribe gotv here</Text>
                                </View>
                            </View>
                            <Entypo name="chevron-small-right" size={30} color="#b6852a" />
                        </Pressable>
                        <Pressable className='flex-row items-center justify-between border-[#FFAB10] border-[2px] p-[10px] rounded-xl' onPress={dstv}>
                            <View className='flex-row gap-[15px]'>
                                <View className='bg-slate-200 rounded-full p-[10px]'>
                                <MaterialIcons name="live-tv" size={24} color="black" />
                                  </View>
                                <View>
                                    <Text className='font-semibold uppercase text-[16px] text-[#b6852a]'>dstv</Text>
                                    <Text className='capitalize '>subscribe dstv here</Text>
                                </View>
                            </View>
                            <Entypo name="chevron-small-right" size={30} color="#b6852a" />
                        </Pressable>
                        {/* <Pressable className='flex-row items-center justify-between border-[#FFAB10] border-[2px] p-[10px] rounded-xl' onPress={payonerr}>
                            <View className='flex-row gap-[15px]'>
                                <View className='bg-slate-200 rounded-full p-[10px]'>
                                  <Image source={require('@/assets/images/payoneer.png')} style={{ height: 28,width: 28, }}/>
                                  </View>
                                <View>
                                    <Text className='font-semibold capitalize text-[16px] text-[#b6852a]'>trade payonerr</Text>
                                    <Text className='capitalize'>check out available paypal</Text>
                                </View>
                            </View>
                            <Entypo name="chevron-small-right" size={30} color="#b6852a" />
                        </Pressable> */}
                        
                    </View>


                   
                </View>
          </View>
        </ScrollView>
  )
}