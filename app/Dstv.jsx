import { View, Text, Dimensions, Pressable, ScrollView, Alert} from 'react-native'
import { useContext, useEffect, useState } from 'react'; 
import {Picker} from '@react-native-picker/picker';
import { TextInput } from 'react-native-gesture-handler';
import { router, useNavigation } from 'expo-router';
import { AppContext } from '@/context/AppContext';



const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Dstv() {
    const navigation = useNavigation();

    const {user} = useContext(AppContext);
    const tk = JSON.parse(user);

    const [ customerNumber, setCustomerNumber] = useState('');
    const [ smartcardNumber, setSmartCardNumber] = useState('');
    const [ customerName, setCustomerName] = useState('');
    const [ amount, setAmount] = useState('');

    const handletv = async() =>{
        if(!customerNumber &&  customerNumber.length < 10){
            Alert.alert('Error', 'Customer number is required and should be 10 digits long');
        }
        if(!smartcardNumber && smartcardNumber.length < 10){
            Alert.alert('Error', 'Smartcard number is required and should be 10 digits long');
        }
        if(!customerName){
            Alert.alert('Error', 'Customer name is required');
        }

        const response = await fetch("https://instant-chain.onrender.com/api/v1/trades/dstv/packages", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tk}`,
            },
            body: JSON.stringify({
                customerNumber,
                smartcardNumber,
                customerName,
                amount
            })
        });
        if(response.ok){
          const  data = await response.json();
          console.log(data);
          
            Alert.alert('Success', 'TV Package Purchased Successfully');
            
        }else{
            const error = await response.json()
            console.log(error);
            
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

    const checkout = ()=>{
        // router.push('Cablecheckout');
        // navigation.navigate('Cablecheckout');
    }

  return (
         <ScrollView className='w-[100%] py-[20px] bg-white' style={{width: windowWidth, height: windowHeight - 60}}>
          <View style={{padding: windowWidth * 0.05, gap: 100, height: dimensions.screen}}>
                <View className='gap-[20px]'>                
                    <View className=' gap-[50px] px-[10px] py-[20px]'>
                    
                        <View className=' gap-[50px]'>
                            <View>
                            <Text className='capitalize text-[18px] font-medium'>customer number</Text>
                            <TextInput className='border-[#eaebeb] border-[1px] rounded-xl p-[10px] placeholder:text-[17px] placeholder:text-[gray]' style={{width: windowWidth * 0.81, height: windowHeight * 0.06}}
                            placeholder='E.G 22 33 000 585'
                            value={customerNumber}
                            onChangeText={setCustomerNumber}
                            keyboardType='Numeric'
                            />

                            </View>
                            <View className='gap-[15px]'>
                                <View>
                                <Text className='capitalize text-[18px] font-medium'>smart card number</Text>
                                <TextInput className='border-[#eaebeb] border-[1px] rounded-xl p-[10px] placeholder:text-[17px] placeholder:text-[gray]' style={{width: windowWidth * 0.81, height: windowHeight * 0.06}}
                                placeholder='E.G 22 33 000 585'
                                value={smartcardNumber}
                                onChangeText={setSmartCardNumber}
                                keyboardType='Numeric'
                                />

                                </View>
                            </View>

                            <View className='gap-[15px]'>
                                <View>
                                <Text className='capitalize text-[18px] font-medium'> customer name</Text>
                                <TextInput className='border-[#eaebeb] border-[1px] rounded-xl p-[10px] placeholder:text-[17px] placeholder:text-[gray]' style={{width: windowWidth * 0.81, height: windowHeight * 0.06}}
                                placeholder='MANSA MUSA'
                                value={customerName}
                                onChangeText={setCustomerName}
                                
                                />

                                </View>
                            </View>
                            <View className='gap-[15px]'>
                            <View>
                                <Text className='capitalize text-[18px] font-medium'>amount</Text>
                                <TextInput className='border-[#eaebeb] border-[1px] rounded-xl p-[10px] placeholder:text-[17px] placeholder:text-[gray]' style={{width: windowWidth * 0.81, height: windowHeight * 0.06}}
                                placeholder='amount'
                                value={amount}
                                onChangeText={setAmount}
                                keyboardType='Numeric'
                                />

                                </View>
                            </View>
                        </View>
                        
                        <View className='items-center gap-[10px]'>
                            <Text className='capitalize text-[18px]'>amount</Text>
                            <Text className='font-bold text-[30px]'>0.0</Text>
                        </View>                     
                    </View>
                    <Pressable className='bg-[#FFAB10] rounded-xl p-[8px]'>
                     <Text className='text-center capitalize text-[20px] text-white' onPress={handletv}>Continue</Text>
                    </Pressable>
                </View>
                
          </View>
        </ScrollView>
  );
};