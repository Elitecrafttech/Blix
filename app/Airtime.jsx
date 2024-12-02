import { View, Text, Dimensions, Pressable, ScrollView} from 'react-native'
import { useContext, useEffect, useState } from 'react'; 
import {Picker} from '@react-native-picker/picker';
import ToastManager, { Toast } from 'toastify-react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from 'expo-router';
import CurrencyInput from 'react-native-currency-input';
import { AppContext } from '@/context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';



const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Airtime() {
    const navigation = useNavigation();

    // const { user } = useContext(AppContext);
    // const tk = JSON.parse(user);


    const [amount, setAmount] = useState('');
    const [ provider, setProvider] = useState('');
    const [ number, setNumber] = useState('');
    const [ purchase, setPurchase] = useState(false);


    const checkout = async()=>{
        if(!number){
            return Toast.error('Phone number field is required');
        }else if(number.length < 11){
            return Toast.error('recheck the phone number and try again');
        }else if(!provider){
            return Toast.error('Select Network');
        }else if(!amount){
            return Toast.error('input the amount you want to purchase');
        }else if(amount <= 49){
            Toast.error(`There is no Airtime of ${new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount)}`);
            return;
        }
        setPurchase(true);


        
        
        await AsyncStorage.setItem("number", number);
        await AsyncStorage.setItem("provider", provider);
        await AsyncStorage.setItem("amt", amount.toString());
        setPurchase(false)

        navigation.navigate('Airtimecheckout');

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
             <ToastManager width={380} textStyle={{fontSize:17}} />
          <View style={{padding: windowWidth * 0.05, gap: 100, height: dimensions.screen}}>
                <View className='gap-[20px]'>
                    <View className=' gap-[50px] px-[10px] py-[20px]'>
                        <View className=' gap-[50px]'>
                            <View className='gap-[15px]'>
                            <Text className='capitalize text-[18px] font-medium'>phone number</Text>
                            <TextInput className='border-[#eaebeb] border-[1px] rounded-xl p-[10px] placeholder:text-[17px] placeholder:text-[gray]]],' style={{width: windowWidth * 0.81, height: windowHeight * 0.06}}
                            placeholder='070 400 400 00'
                            value={number}
                            onChangeText={(text)=>{ const NumericText = text.replace(/[^0-9]/g, '').slice(0, 11); setNumber(NumericText)}}
                            maxLength={11}
                            keyboardType='Numeric'
                            />

                            </View>
                            <View className='gap-[15px]'>
                                <Text className='capitalize text-[18px] font-medium'>select provider</Text>
                                <View className='border-[#eaebeb] border-[1px] rounded-xl'>
                                    <Picker
                                    selectedValue={provider}
                                    onValueChange={(itemValue) => setProvider(itemValue)}
                                    className=' h-[50] w-full'>

                                    <Picker.Item label="Choose Option" value="" />
                                        <Picker.Item label="mtn" value="mtn" />
                                        <Picker.Item label="glo" value="glo" />
                                        <Picker.Item label="airtel" value="airtel" />
                                        <Picker.Item label="9mobile" value="9mobile" />
                                    </Picker>
                                </View>
                            </View>

                            <Text className='capitalize text-[18px] font-medium'>Amount</Text>
                            <CurrencyInput className='border-[#eaebeb] border-[1px] rounded-xl p-[10px] placeholder:text-[17px] placeholder:text-[gray]]],' style={{width: windowWidth * 0.81, height: windowHeight * 0.06}}
                                value={amount}
                                onChangeValue={setAmount}
                                prefix="$"  
                                delimiter=","
                                // separator="."
                                precision={0}
                                placeholder="Enter amount"
                            />
                            
                        </View>
                        
                        <View className='items-center gap-[10px]'>
                            <Text className='capitalize text-[18px]'>you will get airtime value of</Text>
                            <Text className='font-bold text-[30px]'>{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount)}</Text>
                        </View>                     
                    </View>
                    <Pressable className='bg-[#FFAB10] rounded-xl p-[8px]'>
                     <Text className='text-center capitalize text-[20px] text-white' onPress={checkout}>{purchase? "Processing...":"Continue"}</Text>
                    </Pressable>
                </View>
                
          </View>
        </ScrollView>
  );
};