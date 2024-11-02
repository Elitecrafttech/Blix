import { View, Text, Dimensions, Pressable, ScrollView} from 'react-native'
import { useContext, useEffect, useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from 'expo-router';
import { AppContext } from '@/context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Datastatus() {
    const navigation = useNavigation();
    const {userData, getUserDetails} = useContext(AppContext);

    const [ provider, setProvider] = useState('');
    const [number, setNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [code, setCode] = useState('');
    const [selectedPlan, setSelectedPlan] = useState('');

    async function dataprvd(){
        const prv = await AsyncStorage.getItem('provider');
        const nm = await AsyncStorage.getItem('number');
        const amt = await AsyncStorage.getItem('amount');
        const cde = await AsyncStorage.getItem('code')
        const pln = await AsyncStorage.getItem('plan')

        setProvider(prv);
        setNumber(nm);
        setAmount(amt);
        setCode(cde);
        setSelectedPlan(pln);
    }

const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
    });

    useEffect(() => {
        dataprvd()
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
                
                    <View className='gap-[70px] px-[10px] py-[20px]'>
                    
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
                                <Text className='capitalize text-[17px]'>data plan</Text>
                                <Text style={{textTransform: 'uppercase', fontSize: 16}}>{selectedPlan}</Text>
                            </View>
                            <View className='flex-row justify-between'>
                                <Text className=' text-[17px]'>Transaction ID</Text>
                                <Text style={{textTransform: 'uppercase', fontSize: 16}}>{code}</Text>
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
                    <Text className='text-center text-[red] font-medium text-[18px] capitalize' onPress={report}>report this transaction</Text>
                </View>
          </View>
        </ScrollView>
  );
};