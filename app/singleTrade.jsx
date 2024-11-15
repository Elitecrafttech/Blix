import { View, Text, Dimensions, TouchableOpacity, ScrollView,} from 'react-native'
import { useEffect, useState, useContext } from 'react'; 
import { router, useNavigation} from 'expo-router';
import { AppContext } from '@/context/AppContext';
import { useRoute } from '@react-navigation/native';


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');


export default function singletrade() {
    const { user } = useContext(AppContext);
    const tk = JSON.parse(user)
    const navigation = useNavigation();
    const route = useRoute();

    const reouteId = route.params.id

    console.log("route id ", reouteId);
    

    const [trade, setTrade] = useState({})
    const [isLoading, setIsLoading] = useState(true)


    const singleTrade = async()=>{
        const response = await fetch(`https://instant-chain.onrender.com/api/v1/trades/trade/${reouteId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tk}`
            }
        })
        if(response.ok){
            const data =  await response.json();
            console.log("data fetched >> ", data);
            setIsLoading(false)
            setTrade(data)
            
            

        }else{
            const error = await response.json();
            console.log(error);
            setIsLoading(false)

            
        }
    }

    

    const [dimensions, setDimensions] = useState({
        window: windowDimensions,
        screen: screenDimensions,
        });
    
       useEffect(() => {
        singleTrade()
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

    if(isLoading === true){
        return <View className='flex justify-center items-center w-[100%]'>
            <Text>Loading please wait ...</Text>
        </View>
    }

  return (
    <ScrollView className='w-[100%] py-[50px] bg-white'  style={{width: windowWidth, height: windowHeight - 60}}>
          <View style={{padding: windowWidth * 0.05, gap: 100, height: dimensions.screen}}>
                <View className='gap-[20px]'>
                    <View className='gap-[30px]'>
                        {
                            trade && <View className='flex-row items-center justify-between' 
                            >
                                <View className='gap-[5px]'>
                                <Text className='text-[25px]'>price {trade.price}</Text>
                                <Text>quantity {trade.quantity}</Text>
                                <Text>tradeType {trade.tradeType}</Text>
                                <Text>ID {trade._id}</Text>
                                </View>
                                <TouchableOpacity>
                                 <Text className='border-[#FFAB10] border-[2px] p-[10px] text-center rounded-xl text-[#b6852a] w-[20vw] text-[17px]' >Buy</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>   
                </View>
          </View>
        </ScrollView>
  )
}