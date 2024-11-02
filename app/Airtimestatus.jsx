import { View, Text, Dimensions, Pressable, ScrollView} from 'react-native'
import { useContext, useEffect, useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router, useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '@/context/AppContext';


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Airtimestatus() {
    const navigation = useNavigation();

    const {userData, getUserDetails} = useContext(AppContext)

    const [number, setNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [provider, setProvider] = useState('');



    async function fetchAitimeDetails(){
        const nm = await AsyncStorage.getItem("number");
        const prvd =  await AsyncStorage.getItem("provider");
         const amt = await AsyncStorage.getItem("amt");
    
         console.log("items are ", {nm, prvd, amt});
           
    
         setAmount(amt);
         setNumber(nm);
         setProvider(prvd)
    
        }

const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
    });

    useEffect(() => {
        fetchAitimeDetails()
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

    const home =()=>{
        navigation.navigate('dashboard');
    }
    const report =()=>{
        navigation.navigate('Fillform');
    }

  return (
         <ScrollView className='w-[100%] py-[50px] bg-white' style={{width: windowWidth, height: windowHeight - 60}}>
          <View style={{padding: windowWidth * 0.05, gap: 100, height: dimensions.screen}}>
                <View className='gap-[15px]'>
                   <MaterialCommunityIcons name="checkbox-marked-circle" size={60} color="#FFAB10" className='text-center'/>
                                                   
                    <View className=' gap-[80px] px-[10px] py-[20px]'>                    
                        <View className='items-center gap-[10px]'>
                            <Text className='capitalize text-[18px]'>amount</Text>
                            <Text className='font-bold text-[25px] capitalize'>{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount)}</Text>
                            <Text className='capitalize text-[18px]'>available balance:  {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(userData?.wallet?.balance)}</Text> 
                        </View>
                        
                        <View className=' gap-[15px]'>
                            <View className='flex-row justify-between'>
                                <Text className='capitalize text-[17px]'>phone n0.</Text>
                                <Text className='text-[16px]'>{number}</Text>
                            </View>
                            <View className='flex-row justify-between'>
                                <Text className='capitalize text-[17px]'>provider</Text>
                                <Text style={{textTransform: 'uppercase', fontSize: 17}}>{provider}</Text>
                            </View>
                           
                            <View className='flex-row justify-between'>
                                <Text className='capitalize text-[17px]'>amount to be paid</Text>
                                <Text className='capitalize text-[17px]'>{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount)}</Text>
                            </View>
                            
                        </View>                     
                    </View>
                    
                </View>
                <View className='gap-[20px]'>
                    <Pressable className='bg-[#FFAB10] rounded-xl p-[8px] '>
                        <Text className='text-center capitalize text-[20px] text-white' onPress={home}>close</Text>
                    </Pressable>
                    <Text className='text-center text-[red] text-[18px] font-medium capitalize' onPress={report}>report this transaction</Text>
                </View>
          </View>
        </ScrollView>
  );
};