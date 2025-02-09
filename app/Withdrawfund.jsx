import { View, Text, Dimensions, TextInput, Pressable, ScrollView, FlatList} from 'react-native'
import { useEffect, useState, useContext } from 'react'; 
import CurrencyInput from 'react-native-currency-input';
import {Picker} from '@react-native-picker/picker';
import { AppContext } from '@/context/AppContext';


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Wallet() {
  const { user } = useContext(AppContext);
  const tk = JSON.parse(user);

  const [ provider, setProvider] = useState('');
  const [acc, setAcc] = useState('');
  const [bankName, setBankName] = useState('');
  const [accName, setAccName] = useState('');
  const [sortCode, setSortCode] = useState('');
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [banks, setBanks] = useState([]);
  const[isLoading, setLoading] = useState(false)

const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
    });

    const fetchUserBankName = async ()=>{
      if(acc.length < 10){
        setAccName("")
      }
      else if(acc.length === 10){
        setLoading(true)
        const userBankName = await fetch(`https://api.paystack.co/bank/resolve?account_number=${acc}&bank_code=${sortCode}`, {
          headers: {
            'Authorization': 'Bearer sk_test_75748d4128b64346d05f6f558ebd623ff22b4d8e',
          },
        })
        const userBank = await userBankName.json();
        
        if(userBank.status === true){
          setLoading(false)
          setAccName(userBank?.data.account_name)
          console.log(userBank);
          
        }else if(userBank.status === false){
          setLoading(false)
          setAccName('Could not verify your account name')
          console.log(userBank);
        }else if(acc.length < 9){
          setAccName("")
        }
      }
    }

    const fetchAvailableBanks = async()=>{
      const response = await fetch("https://instant-chain.onrender.com/supportedbanks")
      try {
        const data = await response.json();
        if(response.ok){
          setBanks(data.banks);
          await fetchUserBankName()
        }else{
          console.log(data);
          
        }
      } catch (error) {
        console.log(error.message);
      }


    }

    const withdrawal = async()=>{

      console.log({
        accountNumber: acc,
        bankCode: sortCode,
        amount
      });
      
      // const response = await fetch("https://instant-chain.onrender.com/withdraw",{
      //   method: "POST",
      //   headers:{
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${tk}`
      //   },
      //   body: JSON.stringify({
      //     accountNumber: acc,
      //     bankCode: sortCode,
      //     amount
      //   })
      // });
      // if(response.ok){
      //   const data = await response.json();
      //   console.log(data);
      // }else{
      //   const error = await response.json();
      //   console.log(error, "Failed to withdraw");
      // }
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

    useEffect(() => {
      fetchUserBankName()
    }, [acc]);
    
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
                setSortCode(itemValue.code);
                setBankName(itemValue.name);
                console.log(itemValue);
                
                
              }}
              className=' h-[50] w-full'>

               {/* <Picker.Item label="Choose bank" value="" /> */}
               {banks && banks.map(bank =>(
                <Picker.Item label={bank.name} value={bank} key={bank.code} />
              ))}
              </Picker>
            </View>
          </View>

          <View className='gap-[30px]'>
            <View className='gap-[20px]'>
              <Text className='capitalize text-[16px]'>Account number</Text>
              <View>
                <View className='flex-row items-center gap-[5px] border-[1px] border-[#d1d4df] rounded-xl p-[10px]' style={{width: windowWidth * 0.90, height: windowHeight * 0.06}}>
                <TextInput className='px-[10px] ' style={{width: windowWidth * 0.81, height: windowHeight * 0.06}}
                value={acc}
                onChangeText={setAcc}
                keyboardType='numeric'
                />
              </View>
              {
                isLoading ? <Text className='font-bold text-[18px]'>Fetching Account Name ..</Text>: <Text className='text-xl font-bold'>{accName ? accName : null}</Text>
              }
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


              {/* <CurrencyInput className='px-[10px] ' style={{width: windowWidth * 0.81, height: windowHeight * 0.06}}
                  value={amount}
                  onChangeValue={setAmount}
                  prefix="₦"  
                  delimiter=","
                  // separator="."
                  precision={0}
                  placeholder="Amount"
              /> */}
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
        <Text className='text-center capitalize text-[20px] text-white' onPress={withdrawal}>Withdraw fund</Text>
    </Pressable>
    </View>
    </ScrollView>
  );
};
