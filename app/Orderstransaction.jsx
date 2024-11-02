import { View, Text, Dimensions, Pressable, ScrollView, TouchableOpacity} from 'react-native'
import { useEffect, useState } from 'react';
import { router } from 'expo-router';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');


const History = [
    {
        id: 1,
        Type: "type",
        Crypto: "crypto",
        Status: "status",
        State: "completed",
        Price: "price",
        PriceNum: "#1,000,000",
        Amount: "purchase amount",
        AmountNum: "$600",
        Fee: "transaction fee",
        FeeNum: "#50",
        Order: "Order ID",
        OrderNum: "#1234567890",
    
    },
    {
        id: 2,
        Type: "type",
        Crypto: "paypal",
        Status: "status",
        State: "completed",
        Price: "price",
        PriceNum: "#1,000,000",
        Amount: "purchase amount",
        AmountNum: "$600",
        Fee: "transaction fee",
        FeeNum: "#50",
        Order: "Order ID",
        OrderNum: "#1234567890",
    
    },
    {
        id: 3,
        Type: "type",
        Crypto: "payonerr",
        Status: "status",
        State: "completed",
        Price: "price",
        PriceNum: "#1,000,000",
        Amount: "purchase amount",
        AmountNum: "$600",
        Fee: "transaction fee",
        FeeNum: "#50",
        Order: "Order ID",
        OrderNum: "#1234567890",
    
    },

    
]

export default function Orderstransaction() {

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
                {History.map((item) => (
                    <View key={item.id} className='gap-[8px] p-[10px] rounded-xl' style={{backgroundColor: "#F2F3F5"}}>
                    <View className='flex-row justify-between'>
                        <Text className='capitalize text-[16px] font-medium'>{item.Type}</Text>
                        <Text className='capitalize text-[16px] '>{item.Crypto}</Text>
                    </View>
                    <View>
                    <View className='flex-row justify-between'>
                        <Text className='capitalize text-[16px]'>{item.Status}</Text>
                        <Text className='text-[16px] capitalize' style={{color: "#007C00"}}>{item.State}</Text>
                    </View>
                    <View className='flex-row justify-between'>
                        <Text className='text-[16px] capitalize'>{item.Price}</Text>
                        <Text className='text-[16px] font-bold'>{item.PriceNum}</Text>
                    </View>
                    <View className='flex-row justify-between'>
                        <Text className='text-[16px] capitalize'>{item. Amount}</Text>
                        <Text className='text-[16px] capitalize'>{item.AmountNum}</Text>
                    </View>
                    <View className='flex-row justify-between'>
                        <Text className='text-[16px] capitalize'>{item. Fee}</Text>
                        <Text className='text-[16px] capitalize'>{item.FeeNum}</Text>
                    </View>
                    <View className='flex-row justify-between'>
                        <Text className='text-[16px] capitalize'>{item. Order}</Text>
                        <Text className='text-[16px] capitalize'>{item.OrderNum}</Text>
                    </View>
                    </View>
                    </View>
                ))}
                </View>
                                    
            </View>
                
          </View>
        </ScrollView>
  );
};