import { View, Text, Dimensions, TouchableOpacity, Pressable, ScrollView, ActivityIndicator} from 'react-native'
import { useEffect, useState, useContext } from 'react'; 
import { router, useNavigation } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import Octicons from '@expo/vector-icons/Octicons';
import { AppContext } from '../context/AppContext';
import Bottombar from './Bottombar';
import Preloader from './Preloader';


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Wallet() {
  const navigation = useNavigation();

    const {userData, getUserDetails, transaction, isLoading} = useContext(AppContext)
    const [display, setDisplay] = useState(true)



    const payment = () => {
        navigation.navigate('Payment');
    };
    const trx = () => {
        navigation.navigate('Trxhistory');
    };
    const fund = () =>{
      navigation.navigate('Withdrawfund');
    }
   


const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
    });

    useEffect(() => {
        getUserDetails()
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
    <>
    {
      isLoading ? <Preloader /> : (
        <View className='flex-[1]' style={{width: windowWidth, height: windowHeight - 60}}>
        <ScrollView className=' bg-white'>
        <View style={{paddingLeft: windowWidth * 0.05, paddingRight: windowWidth * 0.05, paddingBottom: windowWidth * 0.35, height: dimensions.screen}}>
          <View>
          <View >
                <View className='gap-[20px]'>
                <View className='flex-row  gap-4 items-center pt-[30px] gap-'>
                  <Text className='text-[#00000080] text-[16px] font-bold'>Your Balance</Text>
                  <Feather name={display? 'eye' : 'eye-off'} size={20} color="black"  onPress={()=>setDisplay(!display)}/>
                </View>
                <Text className='text-[23px] font-bold'>{display? `${new Intl.NumberFormat('en-NG', {
                      style: 'currency',
                      currency: 'NGN',
                      minimumFractionDigits: 2
                    }).format(userData?.wallet?.balance || 0)}` 
                    : '******'}</Text>
                </View>

              </View>
                <View className='flex-row items-center justify-center gap-[20px]'>
                  <TouchableOpacity className='flex-row mt-[30px] justify-center gap-[15px] rounded-[10px] items-center py-[10px] px-[10px] bg-[#FFAB10]'>
                      <Octicons name="desktop-download" size={20} color="white" />
                      <Text className='text-[17px] text-white font-bold capitalize' onPress={fund}>withdraw fund </Text>
                  </TouchableOpacity>

                  <TouchableOpacity className='flex-row mt-[30px] justify-center gap-[15px] rounded-[10px] items-center py-[10px] px-[8px] bg-[black]'>
                      <AntDesign name="plus" size={20} color="white" />
                      <Text className='text-[17px] text-white font-bold capitalize' onPress={payment}>fund wallet </Text>
                  </TouchableOpacity>
                </View>
                <View className='flex-row mt-[40px] justify-between items-center'>
                <Text className='font-bold text-[18px]' >Transaction</Text>
                <TouchableOpacity><Text className='text-[#FFAB10] font-bold text-[15px]' onPress={trx}>SEE ALL</Text></TouchableOpacity>
              </View>
              <View className='w-[100%] h-[3px] bg-[#F6F8FE] mt-[25px]'></View>
              {
                transaction.length > 0 ? transaction.slice(0, 8).map((t, index) => (
                  <View className='gap-5 py-[15px]' key={index}>

                  <View className='flex-row w-full items-center'>
                    <View className='rounded-full border border-gray-300 p-[5px]'>
                      <Feather name={t.transType === "airtime" || t.transType === "data" ? "phone" : "activity"} size={10} color="black" />
                    </View>

                    <View className='flex-grow  items-center'>
                      <View className='gap-2'>
                        <Text className='text-[16px] font-bold text-[#292828]'>{t.title}</Text>
                        <Text className='text-[#0000005C] text-[13px]'>{t.description}</Text>
                      </View>
                    </View>

                    <Text className={`text-[15px] font-bold ${t.type === "debit" ? "text-[#FFAB10]" : "text-green-400"}`}>{t.type === "credit" ? "+" : "-"} N{t.amount}</Text>
                  </View>

                  </View>
                )) : 

                <View className='w-[100%] justify-center items-center '>
                  <Text className='text-[17px] font-bold'>No Transaction Made</Text>
                </View>
              }

          </View>
      </View>
      </ScrollView>
      <Bottombar />
    </View>
      )
    }
    </>
  );
};









// import { View, Text, Dimensions, TextInput, Pressable, ScrollView, } from 'react-native'
// import { useEffect, useState, useContext } from 'react'; 


// const windowDimensions = Dimensions.get('window');
// const screenDimensions = Dimensions.get('screen');

// export default function Wallet() {
   


// const [dimensions, setDimensions] = useState({
//     window: windowDimensions,
//     screen: screenDimensions,
//     });

//     useEffect(() => {
//     const subscription = Dimensions.addEventListener(
//         'change',
//         ({ window, screen }) => {
//             setDimensions({ window, screen });
//         },
//         );
//         return () => subscription?.remove();
//     }, []);
    
//     const windowWidth = dimensions.window.width;
//     const windowHeight = dimensions.window.height;

//   return (
//     <ScrollView className='w-[100%] py-[50px] bg-white'>
//       <View style={{padding: windowWidth * 0.05, gap: 150, height: dimensions.screen}}>
//         <View></View>

//     <Pressable className='bg-[#FFAB10] rounded-xl p-[8px]'>
//         <Text className='text-center capitalize text-[20px] text-white' >Proceed</Text>
//     </Pressable>
//     </View>
//     </ScrollView>
//   );
// };
