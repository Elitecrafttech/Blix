import { View, Text, Dimensions, Pressable, ScrollView} from 'react-native'
import { useContext, useEffect, useState } from 'react';
import {  useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '@/context/AppContext';
import Datastatus from './Datastatus';


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Datacheckout() {
    const navigation = useNavigation();

    const { userData, getUserDetails, user } = useContext(AppContext);
    const tk = JSON.parse(user);
    
    

    const [ provider, setProvider] = useState('');
    const [number, setNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [code, setCode] = useState('');
    const [selectedPlan, setSelectedPlan] = useState('');
    const [click, setClick] = useState(false);

    async function dataprvd(){
        const prv = await AsyncStorage.getItem('provider');
        const nm = await AsyncStorage.getItem('beneficiary');
        const amt = await AsyncStorage.getItem('amount');
        const cde = await AsyncStorage.getItem('code')
        const pln = await AsyncStorage.getItem('plan')

        setProvider(prv);
        setNumber(nm);
        setAmount(amt);
        setCode(cde);
        setSelectedPlan(pln);
    }
    const status = async()=>{
        setClick(true)
        

        const response = await fetch('https://instant-chain.onrender.com/api/v1/trades/data-recharge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tk}`
            },
            body: JSON.stringify({
                provider,
                beneficiary: number,
                amount,
                code,
            })
        })
        if(response.ok){
            setClick(false);
            const data = await response.json();
            console.log(data);
            navigation.navigate(Datastatus);
            
        }else{
            setClick(false);
            const error = await response.json()
            console.log(error);
        }
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

    

  return (
         <ScrollView className='w-[100%] py-[50px] bg-white' style={{width: windowWidth, height: windowHeight - 60}}>
          <View style={{padding: windowWidth * 0.05, gap: 100, height: dimensions.screen}}>
                <View className='gap-[50px]'>                
                    <View className=' gap-[100px] px-[10px] py-[20px]'>
                    
                        <View className='items-center gap-[10px]'>
                            <Text className='capitalize text-[18px]'>amount</Text>
                            <Text className='font-bold text-[25px] capitalize'>{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount)}</Text>
                            <Text className='capitalize text-[18px]'>available balance: {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(userData?.wallet?.balance)}</Text>    
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
                    <Pressable className='bg-[#FFAB10] rounded-xl p-[8px]' onPress={status}>
                     <Text className='text-center capitalize text-[20px] text-white' >{click ? "Please wait..."  : "pay now"}</Text>
                    </Pressable>
                </View>
                
          </View>
        </ScrollView>
  );
};