import { View, Text, Dimensions, TextInput, Pressable, ScrollView, } from 'react-native'
import { useEffect, useState, useContext } from 'react'; 
import {Picker} from '@react-native-picker/picker';


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Wallet() {
  const [ provider, setProvider] = useState('');
  const [acc, setAcc] = useState('');
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [banks, setBanks] = useState([]);

const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
    });

    const fetchAvailableBanks = async()=>{
      const response = await fetch("https://instant-chain.onrender.com/supportedbanks")
      try {
        const data = await response.json();
        if(response.ok){
          setBanks(data.banks);         
        }else{
          console.log(data);
          
        }
      } catch (error) {
        console.log(error.message);
      }


    }

    useEffect(() => {
      fetchAvailableBanks()
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
    <ScrollView className='w-[100%] bg-white'>
      <View style={{padding: windowWidth * 0.05, gap: 50, height: dimensions.screen}}>
        <View className='gap-[40px]'>
          <Text className='capitalize text-[18px]'>withdraw funds from your <Text className='uppercase'>wallet</Text> </Text>
          <View className='gap-[20px]'>
            <Text className='capitalize text-[18px]'>select from available banks</Text>
            <View className='border-[#eaebeb] bg-[#eaf1f1] border-[1px] rounded-xl'>
              <Picker
              selectedValue={provider}
              onValueChange={(itemValue) => {
                setProvider(itemValue)
                console.log(itemValue);
                
              }}
              className=' h-[50] w-full'>

               {/* <Picker.Item label="Choose bank" value="" /> */}
               {banks && banks.map(bank =>(
                <Picker.Item label={bank.name} value={bank.name} key={bank.code} />
              ))}
              </Picker>
            </View>
          </View>

          <View className='gap-[30px]'>
            <View className='gap-[20px]'>
              <Text className='capitalize text-[16px]'>Account number</Text>
              <View className='flex-row items-center gap-[5px] border-[1px] border-[#d1d4df] rounded-xl p-[10px]' style={{width: windowWidth * 0.90, height: windowHeight * 0.06}}>
                <TextInput className='px-[10px] ' style={{width: windowWidth * 0.81, height: windowHeight * 0.06}}
                value={acc}
                onChangeText={setAcc}
                keyboardType='numeric'
                />
              </View>
            </View>

            <View className='gap-[20px]'>
              <Text className='capitalize text-[16px]'>Amount</Text>
              <View className='flex-row items-center gap-[5px] border-[1px] border-[#d1d4df] rounded-xl p-[10px]' style={{width: windowWidth * 0.90, height: windowHeight * 0.06}}>
                <TextInput className='px-[10px] ' style={{width: windowWidth * 0.81, height: windowHeight * 0.06}}
                value={amount}
                onChangeText={setAmount}
                keyboardType='numeric'
                />
              </View>
            </View>

            <View className='gap-[20px]'>
              <Text className='capitalize text-[16px]'>transaction pin</Text>
              <View className='flex-row items-center gap-[5px] border-[1px] border-[#edf0f9] rounded-xl p-[10px]' style={{width: windowWidth * 0.90, height: windowHeight * 0.06}}>
                <TextInput className='px-[10px] placeholder:text-[17px] text-center placeholder:text-[gray]' style={{width: windowWidth * 0.81, height: windowHeight * 0.06}}
                placeholder='Input Pin'
                value={pin}
                onChangeText={setPin}
                keyboardType='numeric'
                />
              </View>
            </View>
          </View>
        </View>

    <Pressable className='bg-[#FFAB10] rounded-xl p-[8px]'>
        <Text className='text-center capitalize text-[20px] text-white' >Withdraw fund</Text>
    </Pressable>
    </View>
    </ScrollView>
  );
};