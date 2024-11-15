import { View, Text, Dimensions, Pressable, ScrollView} from 'react-native'
import { useContext, useEffect, useState } from 'react'; 
import {Picker} from '@react-native-picker/picker';
import ToastManager, { Toast } from 'toastify-react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from 'expo-router';
import CurrencyInput from 'react-native-currency-input';
import { AppContext } from '@/context/AppContext';



const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Listtrade() {
    const navigation = useNavigation();

    const { user } = useContext(AppContext)
    const tk = JSON.parse(user);


    const [ quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [ tradetype, setTradetype] = useState('');
    const [loading, setLoading] = useState(false);


    const checkout = async()=>{
        if(!quantity ||!price ||!tradetype){
            Toast.error('All fields are required');
            return;
        }
        setLoading(true);
        const response = await fetch("https://instant-chain.onrender.com/api/v1/trades/list-trade", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tk}`
            },
            body: JSON.stringify({
                quantity,
                price,
                tradeType: tradetype
            })
        })
        if(response.ok){
            setLoading(false);
            const data = await response.json();
            console.log(data);
            Toast.success('Trade request sent successfully');
            navigation.navigate('Mytradelist');
        }else{
            setLoading(false);
            const error = await response.json();
            Toast.error(error.error)
        }
        
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
         <ScrollView className='w-[100%] py-[20px] bg-white' style={{width: windowWidth, height: windowHeight - 60}}>
             <ToastManager width={300} textStyle={{fontSize:17}} />
          <View style={{padding: windowWidth * 0.05, gap: 100, height: dimensions.screen}}>
                <View className='gap-[20px]'>
                    <View className=' gap-[50px] px-[10px] py-[20px]'>
                        <View className=' gap-[50px]'>
                            <View className='gap-[15px]'>
                            <Text className='capitalize text-[18px] font-medium'>quantity</Text>
                            <TextInput className='border-[#eaebeb] border-[1px] rounded-xl p-[10px] placeholder:text-[17px] placeholder:text-[gray]]],' style={{width: windowWidth * 0.81, height: windowHeight * 0.06}}
                            placeholder='large or low quantity'
                            value={quantity}
                            onChangeText={ setQuantity}
                            maxLength={11}
                            keyboardType='Numeric'
                            />

                            </View>

                            <View className='gap-[15px]'>
                                <Text className='capitalize text-[18px] font-medium'>price</Text>
                                <CurrencyInput className='border-[#eaebeb] border-[1px] rounded-xl p-[10px] placeholder:text-[17px] placeholder:text-[gray]]],' style={{width: windowWidth * 0.81, height: windowHeight * 0.06}}
                                    value={price}
                                    onChangeValue={setPrice}
                                    prefix="₦"  
                                    delimiter=","
                                    // separator="."
                                    precision={0}
                                    placeholder="fixed price"
                                />
                            </View>

                            <View className='gap-[15px]'>
                                <Text className='capitalize text-[18px] font-medium'>tradeType</Text>
                                <View className='border-[#9ab8b8] border-[1px] rounded-xl'>
                                    <Picker
                                    selectedValue={tradetype}
                                    onValueChange={(itemValue) => setTradetype(itemValue)}
                                    className=' h-[50] w-full'>

                                    <Picker.Item label="Choose Option" value="" />
                                        <Picker.Item label="crypto" value="crypto" />
                                        <Picker.Item label="payoneer" value="payoneer" />
                                        <Picker.Item label="paypal" value="paypal" />
                                    </Picker>
                                </View>
                            </View>
  
                        </View>
                        
                    </View>
                    <Pressable className='bg-[#FFAB10] rounded-xl p-[8px]'>
                     <Text className='text-center capitalize text-[20px] text-white' onPress={checkout}>{loading? "Listing...":"list"}</Text>
                    </Pressable>
                </View>
                
          </View>
        </ScrollView>
  );
};