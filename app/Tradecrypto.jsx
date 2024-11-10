import { View, Text, Dimensions, TouchableOpacity, ScrollView,} from 'react-native'
import { useEffect, useState, useContext } from 'react'; 
import { router, useNavigation} from 'expo-router';
import { AppContext } from '@/context/AppContext';


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const Trade = [
    {
        id: 1,
        username: "user 1",
        amount: "#1000",
        quantity: "$100 - $500",
        button: "Buy"
    },
    {
        id: 2,
        username: "user 2",
        amount: "#1000",
        quantity: "$100 - $500",
        button: "Buy"
    },
    {
        id: 3,
        username: "user 3",
        amount: "#1000",
        quantity: "$100 - $500",
        button: "Buy"
    },
]
export default function Tradecrypto() {
    const navigation = useNavigation();

    const { user } = useContext(AppContext);
    const tk = JSON.parse(user)


    const fetcTrade = async()=>{
        const response = await fetch("https://instant-chain.onrender.com/api/v1/trades/trades", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tk}`
            }
        })
        if(response.ok){
            const responseData =  await response.json();
            console.log(responseData);
            

        }else{
            const error = await response.json();
            console.log(error);
        }
    }

    const crypto = () =>{
        navigation.navigate('Cryptodetails');
    }

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
    <ScrollView className='w-[100%] py-[50px] bg-white'  style={{width: windowWidth, height: windowHeight - 60}}>
          <View style={{padding: windowWidth * 0.05, gap: 100, height: dimensions.screen}}>
                <View className='gap-[20px]'>
                    <View className='gap-[30px]'>
                        {Trade.map((data, index)=>(
                            <View className='flex-row items-center justify-between' key={index}>
                                <View className='gap-[5px]'>
                                <Text className='text-[18px]'>{data.username}</Text>
                                <Text className='text-[25px]'>{data.amount}</Text>
                                <Text>{data.quantity}</Text>
                                </View>
                                <TouchableOpacity>
                                 <Text className='border-[#FFAB10] border-[2px] p-[10px] text-center rounded-xl text-[#b6852a] w-[20vw] text-[17px]' onPress={crypto}>{data.button}</Text>
                                </TouchableOpacity>
                            </View>  
                        ))}
                    </View>   
                </View>
          </View>
        </ScrollView>
  )
}