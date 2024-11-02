import { View, Text, Dimensions, TouchableOpacity, ScrollView,} from 'react-native'
import { useEffect, useState, useContext } from 'react'; 
import { router, useNavigation} from 'expo-router';


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
export default function Tradepaypal() {
    const navigation = useNavigation();

    const paypal = () =>{
        // router.push('Paypaldetails');
        navigation.navigate('Paypaldetails');
    }

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
                                 <Text className='border-[#FFAB10] border-[2px] p-[10px] text-center rounded-xl text-[#b6852a] w-[20vw] text-[17px]' onPress={paypal}>{data.button}</Text>
                                </TouchableOpacity>
                            </View>  
                        ))}
                    </View>   
                </View>
          </View>
        </ScrollView>
  )
}