import { View, Text, Dimensions, TouchableOpacity, ScrollView, FlatList} from 'react-native'
import { useEffect, useState, useContext } from 'react'; 
import { router, useNavigation} from 'expo-router';
import { AppContext } from '@/context/AppContext';


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');


export default function Tradecrypto() {
    const navigation = useNavigation();

    const { user } = useContext(AppContext);
    const tk = JSON.parse(user)

    const [trades, setTrades] = useState([])


    const fetcTrade = async()=>{
        const response = await fetch("https://instant-chain.onrender.com/api/v1/trades/trades", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tk}`
            }
        })
        if(response.ok){
            const Data =  await response.json();
            console.log(Data.trades);
            setTrades(Data.trades)
            

        }else{
            const error = await response.json();
            console.log(error);
        }
    }

    const crypto = () =>{
        navigation.navigate('singleTrade');
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
    <View className='w-[100%] py-[50px] bg-white'  style={{width: windowWidth, height: windowHeight - 60}}>
          <View style={{padding: windowWidth * 0.05, gap: 100, height: dimensions.screen}}>
                <View className='gap-[20px]'>
                    <View className='gap-[30px]'>
                        {/* {trades.map((data, index)=>(
                            <View className='flex-row items-center justify-between' key={index}>
                                <View className='gap-[5px]'>
                                <Text className='text-[18px]'>user:
                                    {data.user}
                                    </Text>
                                <Text className='text-[25px]'>price {data.price}</Text>
                                <Text>quantity {data.quantity}</Text>
                                <Text>tradeType {data.tradeType}</Text>
                                <Text>ID {data._id}</Text>
                                </View>
                                <TouchableOpacity>
                                 <Text className='border-[#FFAB10] border-[2px] p-[10px] text-center rounded-xl text-[#b6852a] w-[20vw] text-[17px]' onPress={crypto}>Buy</Text>
                                </TouchableOpacity>
                            </View>  
                        ))} */}

                   
                            <FlatList
                            
                            data={trades}
                            keyExtractor={item => item._id}
                            renderItem={({item}) => (
                                <TouchableOpacity onPress={()=>navigation.navigate("singleTrade", {id: item._id})} cl >
                                    <View className='flex-row items-center justify-between' key={item._id}>
                                <View className='gap-[5px]'>
                                <Text className='text-[18px]'>user:
                                    {item.user}
                                    </Text>
                                <Text className='text-[25px]'>price {item.price}</Text>
                                <Text>quantity {item.quantity}</Text>
                                <Text>tradeType {item.tradeType}</Text>
                                <Text>ID {item._id}</Text>
                                </View>
                                
                            </View> 

                             </TouchableOpacity>
                        )}

                                        
                            />
                        
                    </View>   
                </View>
          </View>
        </View>
  )
}