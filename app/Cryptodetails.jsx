import { View, Text, Dimensions, Pressable, ScrollView, SafeAreaView} from 'react-native'
import { useEffect, useState, useContext } from 'react'; 
import { router} from 'expo-router';
import { TextInput } from 'react-native-gesture-handler';
import Purchase from './Purchase';
import Status from '@/components/Status';


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Tradedetails() {
    const [amount, setAmount] = useState('$ ');
    const [wallet, setWallet] = useState('');
    const [isPurchaseVisible, setPurchaseVisible] = useState(false);

  const handlePayNow = () => {
    setPurchaseVisible(true);
  };

  const number = 1000000000;
  const formattedNumber = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0, 
  }).format(number);

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
    <SafeAreaView>
    <Status/>
    <ScrollView className='w-[100%] py-[50px] bg-white'  style={{width: windowWidth, height: windowHeight - 60}}>
        <View style={{padding: windowWidth * 0.05, gap: 100, height: dimensions.screen}}>
            <View className='gap-[20px] items-center'>
                {/* <Text className='capitalize text-center font-bold text-[25px] text-[#695e5e]'>Trade Details</Text> */}
                <View className=' gap-[40px]'>
                    <Text className='text-center capitalize'>you are about to trade (Assets) with (seller name)</Text>
                    <View className='gap-[8px]'>
                        <Text className='text-[15px] text-[#b6852a]'>The Amount In USD</Text>
                        <TextInput className='border-[#eaebeb] border-[1px] rounded-xl px-[10px] placeholder:text-[17px] placeholder:text-[gray]' style={{width: windowWidth * 0.81, height: windowHeight * 0.06}}
                        placeholder='Amount You Want To Purchase'
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType='numeric'
                        />
                    </View>

                    <View className='gap-[8px]'>
                        <Text className='text-[15px] text-[#b6852a] capitalize'>enter wallet address</Text>
                        <TextInput className='border-[#eaebeb] border-[1px] rounded-xl px-[10px] placeholder:text-[17px] placeholder:text-[gray]' style={{width: windowWidth * 0.81, height: windowHeight * 0.06}}
                        placeholder='Wallet Address'
                        value={wallet}
                        onChangeText={setWallet}
                        />
                    </View>
                    <View className=' gap-[10px] items-center flex-row ' style={{width: windowWidth * 0.83}}>
                        <Text className='capitalize text-[18px]'>you are about to pay :</Text>
                        <Text className='text-[18px]' >{formattedNumber}</Text>
                    </View>
                </View> 
                    <Pressable className='bg-[#FFAB10] p-[10px] text-center rounded-xl w-[100%] mt-[40px]' onPress={handlePayNow}>
                        <Text className='capitalize text-[23px] text-white text-center' >pay now</Text>
                    </Pressable>
        </View>
        </View>
        {isPurchaseVisible && (
        <View style={{justifyContent: "center", alignItems: "center"}}>
          <Purchase />
        </View>
      )}
        </ScrollView>
        </SafeAreaView>
  )
}
