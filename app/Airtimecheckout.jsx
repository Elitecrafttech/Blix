import { View, Text, Dimensions, Pressable, ScrollView} from 'react-native'
import { useContext, useEffect, useState } from 'react';
import ToastManager, { Toast } from 'toastify-react-native';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '@/context/AppContext';


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Airtimecheckout() {
    const navigation = useNavigation();

    const [number, setNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [provider, setProvider] = useState('');
    const [pay, setPay] = useState(false);

    const { user, userData, getUserDetails } = useContext(AppContext);
    // console.log(user);
    const tk = JSON.parse(user);

   async function fetchAitimeDetails(){
    const nm = await AsyncStorage.getItem("number");
    const prvd =  await AsyncStorage.getItem("provider");
     const amt = await AsyncStorage.getItem("amt");

    //  console.log("items are ", {nm, prvd, amt});
       

     setAmount(amt);
     setNumber(nm);
     setProvider(prvd)

    //  setPay(true)
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

    const status = async()=>{
        

      setPay(true)
        const response = await fetch("https://instant-chain.onrender.com/api/v1/trades/airtime/purchase", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tk}`
            },
            body: JSON.stringify({
                amount:Number(amount),
                phoneNumber:number,
                provider:provider,
            }),
        });
        if(response.ok){
            const data = await response.json();
            setPay(false)
            console.log(data);
            
            // Clean the Async Storage
            
            await AsyncStorage.removeItem('amt');
           await  AsyncStorage.removeItem('number');
            await AsyncStorage.removeItem('provider');
            
            
            Toast.success('Airtime Purchase Successful');
            navigation.navigate('Airtimestatus');
        }else{
            setPay(false)
            const error = await response.json();
            Toast.error(error.error);
        }
        
    }

  return (
         <ScrollView className='w-[100%] py-[50px] bg-white' style={{width: windowWidth, height: windowHeight - 60}}>
            <ToastManager width={300} textStyle={{fontSize:17}} />
          <View style={{padding: windowWidth * 0.05, gap: 100, height: dimensions.screen}}>
                <View className='gap-[50px]'>
                    <View className=' gap-[100px] px-[10px] py-[20px]'>                    
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
                    <Pressable className='bg-[#FFAB10] rounded-xl p-[8px]'>
                     <Text className='text-center capitalize text-[20px] text-white' onPress={status}>{pay? "Purchasing...":"pay now"}</Text>
                    </Pressable>
                </View>
                
          </View>
        </ScrollView>
  );
};