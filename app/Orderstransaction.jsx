import { View, Text, Dimensions, Pressable, ScrollView, TouchableOpacity} from 'react-native'
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '@/context/AppContext';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');



// const trade = [
//     {
//         id: 1,
//         username: "user 1",
//         amount: "#1000",
//         quantity: "$500",
//         Type: "crypto",
//         button: "Buy",
//         status:"in-progress"
//     },
//     {
//         id: 2,
//         username: "user 2",
//         amount: "#1000",
//         quantity: "$100",
//         Type: "payoneer",
//         button: "Buy",
//         status:"in-progress"

//     },
//     {
//         id: 3,
//         username: "user 3",
//         amount: "#1000",
//         quantity: "$2000",
//         Type: "paypal",
//         button: "Buy",
//         status:"completed"

//     },

//     {
//         id: 4,
//         username: "user 5",
//         amount: "#1000",
//         quantity: "$50",
//         Type: "paypal",
//         button: "Buy",
//         status:"pending"

//     },
// ]

export default function Orderstransaction() {

    const { user } = useContext(AppContext);
    const tk = JSON.parse(user)

    const [transactions, setTransactions] = useState([])


    const fetcTrade = async()=>{
        try {
            const response = await fetch("https://instant-chain.onrender.com/api/v1/trades/user/transactions", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tk}`
                }
            })
            if(response.ok){
                const data =  await response.json();
                setTransactions(data.transactions)
                
    
            }else{
                const error = await response.json();
                console.log(error);
            }
        } catch (error) {
            console.log(error);
            
        }
    };

const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
    });

    useEffect(() => {
        fetcTrade()
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
                <View className='gap-[30px]'>
                {transactions.length === 0 ? (
                    <Text className='text-[16px] text-center'>No transactions found</Text>
                ) : (transactions.map((item, index) => (
                    <View key={item.id || `trade-${index}`} className='w-full gap-[10px] p-[10px] rounded-xl' style={{backgroundColor: "#F2F3F5"}}>
                        <View className='flex-row justify-between py-[10px]'>
                            <View className='flex-row'>
                                <Text className='capitalize text-[16px] font-medium text-green-600'>buy/</Text>
                                <Text className='capitalize text-[16px] font-medium'>{item.title}</Text>
                            </View>
                            <View className='capitalize text-[16px] '>{
                            item.status === "in-progress" ? 
                            <TouchableOpacity className='bg-slate-600 rounded-lg  px-4 py-3 '>
                                <Text className='text-white'>Approve Trade</Text>
                            </TouchableOpacity>
                            : 

                            <View className='flex-row items-center '>
                                <Text className='font-semibold text-[16px]'>status / </Text>
                                <Text className={`font-medium text-[16px] ${item.status === "pending" ? "text-red-300 " : "text-green-500"}`}>{item.status} </Text>
                            </View>
                            
                            }</View>
                        </View>
                        <View className='border-b-[1px] mb-[20px] border-[gray]'></View>

                        <View className='gap-[15px]'>
                            
                            <View className='flex-row justify-between'>
                                <Text className='text-[16px] capitalize'>amount</Text>
                                <Text className='text-[16px] font-bold'>{item.amount}</Text>
                            </View>
                            <View className='flex-row justify-between'>
                                <Text className='text-[16px] capitalize'>total purchase</Text>
                                <Text className='text-[16px] capitalize'>$100{item.quantity}</Text>
                            </View>
                            <View className='flex-row justify-between'>
                                <Text className='text-[16px] capitalize'>Order id</Text>
                                <Text className='text-[16px] capitalize'>{item._id}</Text>
                            </View>
                            <View className='flex-row justify-between'>
                                <Text className='text-[16px] capitalize'>trade time</Text>
                                <Text className='text-[16px] capitalize'>{item.createdAt}</Text>
                            </View>
                        </View>
                    </View>
                )))}
                </View>
                                    
            </View>
                
          </View>
        </ScrollView>
  );
};