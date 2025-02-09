import { View, Text, Dimensions, Pressable, Image, ScrollView, } from 'react-native'
import { useEffect, useState } from 'react'; 
import { useNavigation } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Trade() {
    const navigation = useNavigation();    


    const list = () => {
        navigation.navigate('Listtrade');
    };

    const peer = () => {
        navigation.navigate('PeerToPeer');
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
         <ScrollView className='w-[100%] py-[30px] bg-white'>
          <View style={{padding: windowWidth * 0.05, height: dimensions.screen}}>               
                    <View className='border-[1px] border-[#eaebeb] rounded-xl gap-[10px] px-[10px] py-[20px]'>
                        <Pressable className='flex-row items-center justify-between' onPress={list}>
                            <View className='flex-row gap-[15px]'>
                                <View className='bg-slate-200 rounded-full p-[10px] items-center'>
                                    <Image source={require('@/assets/images/trade.png')} style={{ height: 27,width: 27, }}/>
                                </View>
                                <View>
                                    <Text className='font-semibold capitalize text-[18px]'>list trade</Text>
                                    <Text className='capitalize w-[63vw]'>allow you to list crypto/paypal/payonerr</Text>
                                </View>
                            </View>
                            <Entypo name="chevron-small-right" size={30} color="black" />
                        </Pressable>

                        <Text className='border-b-[0.3px] mb-[20px] border-b-gray-300'></Text>

                        <Pressable className='flex-row items-center justify-between ' onPress={peer}>
                            <View className='flex-row gap-[15px]'>
                                <View className='bg-slate-200 rounded-full p-[10px]'>
                                    <Image source={require('@/assets/images/purchase.png')} style={{ height: 40,width: 40, }}/>
                                </View>
                                <View>
                                    <Text className='font-semibold capitalize text-[18px]'>purchase trade</Text>
                                    <Text className='capitalize w-[60vw]'>allow you to buy crypto/paypal/payonerr</Text>
                                </View>
                            </View>
                            <Entypo name="chevron-small-right" size={30} color="black" />
                        </Pressable>
                    </View>                   
                </View>
        </ScrollView>
  );
};