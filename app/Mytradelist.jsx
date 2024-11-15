import { View, Text, Dimensions,ScrollView,} from 'react-native'
import { useEffect, useState } from 'react'; 
import { useNavigation} from 'expo-router';


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const Trade = [
    {
        id: 1,
        amount: "#1000",
        quantity: "$100 - $500",
        type: "crypto"
    },
    {
        id: 2,
        amount: "#1000",
        quantity: "$100 - $500",
        type: "paypal"
    },
    {
        id: 3,
        amount: "#1000",
        quantity: "$100 - $500",
        type: "payoneer"
    },
]
export default function Mytradelist() {
    const navigation = useNavigation();

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
                    <View className='gap-[30px]'>
                        {Trade.map((data, index)=>(
                            <View className='flex-row items-center justify-between' key={index}>
                                <View className='gap-[5px]'>
                                <Text className='text-[18px]'>{data.username}</Text>
                                <Text className='text-[25px]'>{data.amount}</Text>
                                <Text>{data.quantity}</Text>
                                </View>
                                <View>
                                 <Text className='border-[#FFAB10] border-[2px] p-[10px] text-center rounded-xl text-[#b6852a] w-[30vw] text-[17px]' >{data.type}</Text>
                                </View>
                            </View>  
                        ))}
                    </View>   
                </View>
          </View>
        </ScrollView>
  )
}