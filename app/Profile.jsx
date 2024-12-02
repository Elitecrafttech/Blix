import { View, Text, Dimensions, Pressable, Image, ScrollView, } from 'react-native'
import { useEffect, useState, useContext } from 'react'; 
import { useNavigation } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import Lock from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Bottombar from './Bottombar';
import { AppContext } from '@/context/AppContext';


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Profile() {
    const navigation = useNavigation();

    const {userData, getUserDetails, logout} = useContext(AppContext)
    


    const editinfo = () => {
        navigation.navigate('Editinfo');
    };

    const Accsecurity = () => {
        navigation.navigate('Accountsecurity');
    };
    const Helpsupport = () => {
        navigation.navigate('Helpsupport');
    };
    const Legalpolicy = () => {
        navigation.navigate('Legalpolicy');
    };
    const Details = () => {
        navigation.navigate('Profiledetails');
    };
    const mytrade = () => {
        navigation.navigate('Mytradelist');
    };

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
    <View className='flex-[1] justify-center' style={{width: windowWidth, height: windowHeight - 60}}>
         <ScrollView>
          <View className='pb-[80px]' style={{padding: windowWidth * 0.05, gap: 100, height: dimensions.screen}}>
            <View style={{gap: 30}}>
                <Pressable className='gap-[20px]' onPress={Details}>
                    <View className='flex-row gap-[20px] items-center'>
                        <Image source={require('@/assets/images/profile.png')}/>
                        <View>
                            <Text className='font-bold text-[17px] capitalize'>{userData?.wallet?.user.username}</Text>
                            <Text className='text-[16px]'>{userData?.wallet?.user.email}</Text>
                        </View>
                    </View>
                </Pressable>
                <View className='gap-[20px]'>
                    <View className='border-[1px] border-[#eaebeb] rounded-xl gap-[10px] px-[10px] py-[20px]'>
                        <Pressable className='flex-row items-center justify-between' onPress={editinfo}>
                            <View className='flex-row gap-[15px]'>
                                <View className='bg-slate-200 rounded-full p-[10px]'><Feather name="user" size={24} color="black" /></View>
                                <View>
                                    <Text className='font-semibold capitalize text-[16px]'>edit information</Text>
                                    <Text className='capitalize'>edit your personal information</Text>
                                </View>
                            </View>
                            <Entypo name="chevron-small-right" size={30} color="black" />
                        </Pressable>
                        <Text className='border-b-[0.3px] mb-[20px] border-b-gray-300'></Text>
                        <Pressable className='flex-row items-center justify-between ' onPress={Accsecurity}>
                            <View className='flex-row gap-[15px]'>
                                <View className='bg-slate-200 rounded-full p-[10px]'><Lock name="lock-alert-outline" size={30} color="black" /></View>
                                <View>
                                    <Text className='font-semibold capitalize text-[16px]'>account security</Text>
                                    <Text className='capitalize'>password, biometric</Text>
                                </View>
                            </View>
                            <Entypo name="chevron-small-right" size={30} color="black" />
                        </Pressable>
                    </View>


                    <View className='border-[1px] border-[#eaebeb] rounded-xl gap-[10px] px-[10px] py-[20px]'>
                        
                        <Pressable className='flex-row items-center justify-between ' onPress={ Helpsupport}>
                            <View className='flex-row gap-[15px]'>
                                <View className='bg-slate-200 rounded-full p-[10px]'><Feather name="help-circle" size={28} color="black" /></View>
                                <View>
                                    <Text className='font-semibold capitalize text-[16px]'>help & support</Text>
                                    <Text className='capitalize'>contact our customers service</Text>
                                </View>
                            </View>
                            <Entypo name="chevron-small-right" size={30} color="black" />
                        </Pressable>
                        <Text className='border-b-[0.3px] mb-[20px] border-b-gray-300'></Text>
                        <Pressable className='flex-row items-center justify-between ' onPress={Legalpolicy}>
                            <View className='flex-row gap-[15px]'>
                                <View className='bg-slate-200 rounded-full p-[10px]'><MaterialIcons name="policy" size={24} color="black" /></View>
                                <View>
                                    <Text className='font-semibold capitalize text-[16px]'>legal policy</Text>
                                    <Text className='capitalize'>privacy & policy, terms & conditions</Text>
                                </View>
                            </View>
                            <Entypo name="chevron-small-right" size={30} color="black" />
                        </Pressable>
                        <Text className='border-b-[0.3px] mb-[20px] border-b-gray-300'></Text>
                        <Pressable className='flex-row items-center justify-between ' onPress={mytrade}>
                            <View className='flex-row gap-[15px]'>
                                <View className='bg-slate-200 rounded-full p-[10px]'><MaterialIcons name="preview" size={24} color="black" /></View>
                                <View>
                                    <Text className='font-semibold capitalize text-[16px]'>my trade list</Text>
                                    <Text className='capitalize'>preview all your listed trade</Text>
                                </View>
                            </View>
                            <Entypo name="chevron-small-right" size={30} color="black" />
                        </Pressable>
                    </View>


                    <Pressable className='flex-row items-center justify-between border-[1px] border-[#eaebeb] rounded-xl gap-[10px] px-[10px] py-[20px]' onPress={()=>{logout()}}>
                            <View className='flex-row gap-[15px] items-center'>
                                <View className='bg-slate-200 rounded-full p-[10px]'><Lock name="logout" size={24} color="black" /></View>
                                    <Text className='font-semibold capitalize text-[20px]'>log out</Text>
                                </View>
                            <Entypo name="chevron-small-right" size={30} color="black" />
                        </Pressable>
                </View>
            </View>
          </View>
        </ScrollView>
        <Bottombar />
    </View>
  );
};