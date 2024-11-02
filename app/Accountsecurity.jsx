import { View, Text, Dimensions, Pressable, ScrollView, StyleSheet, } from 'react-native'
import { useEffect, useState } from 'react'; 
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { router, useNavigation } from 'expo-router';


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function AccountSecurity() {
    const navigation = useNavigation();


    const change = () => {
        // router.push('Changepassword')
        navigation.navigate('Changepassword');
    }
    const Resetpin = () => {
        // router.push('Resetpin');
        navigation.navigate('Resetpin');
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
         <ScrollView className='w-[100%] py-[50px] bg-white'  style={{width: windowWidth, height: windowHeight - 60}}>
          <View style={{padding: windowWidth * 0.05, gap: 100, height: dimensions.screen}}>
                <View className='gap-[20px]'>
                
                    <View className='border-[1px] border-[#eaebeb] rounded-xl gap-[10px] px-[10px] py-[20px]'>
                        <Pressable className='flex-row items-center justify-between' onPress={change}>
                            <View className='flex-row gap-[15px]'>
                                <View className='bg-slate-200 rounded-full p-[10px]'><FontAwesome6 name="key" size={24} color="black" /></View>
                                <View>
                                    <Text className='font-semibold capitalize text-[16px]'>Change password</Text>
                                    <Text className='capitalize'>update your password</Text>
                                </View>
                            </View>
                            <Entypo name="chevron-small-right" size={30} color="black" />
                        </Pressable>
                        <Text className='border-b-[0.3px] mb-[20px] border-b-gray-300'></Text>
                        <Pressable className='flex-row items-center justify-between ' onPress={Resetpin}>
                            <View className='flex-row gap-[15px]'>
                                <View className='bg-slate-200 rounded-full p-[10px]'><MaterialIcons name="exposure-zero" size={28} color="black" /></View>
                                <View>
                                    <Text className='font-semibold capitalize text-[16px]'>reset pin</Text>
                                    <Text className='capitalize'>update your security pin</Text>
                                </View>
                            </View>
                            <Entypo name="chevron-small-right" size={30} color="black" />
                        </Pressable>
                        {/* <Text className='border-b-[0.3px] mb-[20px] border-b-gray-300'></Text>
                        <Pressable className='flex-row items-center justify-between '>
                            <View className='flex-row gap-[15px]'>
                                <View className='bg-slate-200 rounded-full p-[10px]'><Entypo name="fingerprint" size={24} color="black" /></View>
                                <View>
                                    <Text className='font-semibold capitalize text-[16px]'>biometric verification</Text>
                                    <Text className='capitalize'>activate fingerprint verification</Text>
                                </View>
                            </View>
                            <Entypo name="switch" size={30} color="black" />
                        </Pressable> */}
                    </View>


                   
                </View>
          </View>
        </ScrollView>
  );
};