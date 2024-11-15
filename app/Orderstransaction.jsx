import { View, Text, Dimensions, Pressable, ScrollView, TouchableOpacity} from 'react-native'
import { useEffect, useState, useContext } from 'react';
import { router } from 'expo-router';
import { AppContext } from '@/context/AppContext';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');



const Trade = [
    {
        id: 1,
        username: "user 1",
        amount: "#1000",
        quantity: "$100 - $500",
        Type: "crypto",
        button: "Buy"
    },
    {
        id: 2,
        username: "user 2",
        amount: "#1000",
        quantity: "$100 - $500",
        Type: "payoneer",
        button: "Buy"
    },
    {
        id: 3,
        username: "user 3",
        amount: "#1000",
        quantity: "$100 - $500",
        Type: "paypal",
        button: "Buy"
    },
]

export default function Orderstransaction() {

    // const { user } = useContext(AppContext);
    // const tk = JSON.parse(user)

    // const [trades, setTrades] = useState([])


    // const fetcTrade = async()=>{
    //     const response = await fetch("https://instant-chain.onrender.com/api/v1/trades/trades", {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${tk}`
    //         }
    //     })
    //     if(response.ok){
    //         const Data =  await response.json();
    //         console.log(Data.trades);
    //         setTrades(Data.trades)
            

    //     }else{
    //         const error = await response.json();
    //         console.log(error);
    //     }
    // }

const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
    });

    useEffect(() => {
        // fetcTrade()
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
         <ScrollView className='w-[100%] bg-white'  style={{width: windowWidth, height: windowHeight - 60}}>
          <View style={{padding: windowWidth * 0.05, gap: 100, height: dimensions.screen}}>
            <View className='gap-[20px]'>
                <View>
                <View className='flex-row justify-between px-[10px]'>
                    <TouchableOpacity><Text className='capitalize text-[20px] font-medium'>all</Text></TouchableOpacity>
                    {/* <TouchableOpacity><Text className='capitalize text-[15px] font-medium'>Successful</Text></TouchableOpacity>
                    <TouchableOpacity><Text className='capitalize text-[15px] font-medium'>pending</Text></TouchableOpacity>
                    <TouchableOpacity><Text className='capitalize text-[15px] font-medium'>dispute/support</Text></TouchableOpacity> */}
                </View>
                {/* <Text className='border-b-[0.3px] mb-[20px] border-b-gray-300'></Text> */}
                </View>
                <View className='gap-[30px]'>
                {Trade.map((item) => (
                    <View key={item.id} className='gap-[10px] p-[10px] rounded-xl' style={{backgroundColor: "#F2F3F5"}}>
                        <View className='flex-row justify-between py-[10px]'>
                            <Text className='capitalize text-[16px] font-medium'>buy {item.Type}</Text>
                            <Text className='capitalize text-[16px] '>{item.status}</Text>
                        </View>
                        <View className='border-b-[1px] mb-[20px] border-[gray]'></View>

                        <View className='gap-[15px]'>
                            
                            <View className='flex-row justify-between'>
                                <Text className='text-[16px] capitalize'>Price</Text>
                                <Text className='text-[16px] font-bold'>{item.amount}</Text>
                            </View>
                            <View className='flex-row justify-between'>
                                <Text className='text-[16px] capitalize'>purchase amount</Text>
                                <Text className='text-[16px] capitalize'>{item.quantity}</Text>
                            </View>
                            <View className='flex-row justify-between'>
                                <Text className='text-[16px] capitalize'>Order id</Text>
                                <Text className='text-[16px] capitalize'>{item._id}</Text>
                            </View>
                            {/* <View className='flex-row justify-between'>
                                <Text className='text-[16px] capitalize'>trade time</Text>
                                <Text className='text-[16px] capitalize'>{item.createdAt}</Text>
                            </View> */}
                        </View>
                    </View>
                ))}
                </View>
                                    
            </View>
                
          </View>
        </ScrollView>
  );
};