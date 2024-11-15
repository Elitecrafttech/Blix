import { useEffect, useState, useContext, useCallback} from 'react';
import { router, useNavigation } from 'expo-router';
import { View, Text, Image, Pressable, Dimensions, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { AppContext } from '../context/AppContext';
import Bottombar from './Bottombar';
import Preloader from './Preloader';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Dashboard() {
  const navigation = useNavigation();

  const {userData, getUserDetails, transaction, isLoading} = useContext(AppContext)
  const [display, setDisplay] = useState(false)
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request or data fetch
    setTimeout(() => {
      setRefreshing(false);
      // Add your data fetching logic here, e.g., API call
    }, 2000); // Simulated delay
  }, []);


    const airtime = () => {
      navigation.navigate('Airtime');
  };
    const data = () => {
      navigation.navigate('Databundle');
  };
    const cable = () => {
      navigation.navigate('Cabletype');
  };
    const Electricity = () => {
      navigation.navigate('Electricity');
  };
    const payment = () => {
      navigation.navigate('Payment');
  };
    const trxn = () => {
      navigation.navigate('Orderstransaction');
  };
    const trx = () => {
      navigation.navigate('Trxhistory');
  };
    const seller = () => {
      navigation.navigate('Sellerproof');
  };
    const profile = () => {
      navigation.navigate('Profile');
  };
    const trade = () => {
      navigation.navigate('Trade');
  };

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
    <View className='flex-[1] justify-center mt-10' style={{width: windowWidth, height: windowHeight - 60}}>
      {isLoading ? (
          <Preloader />
        ) : (
          // <Text>Your Dashboard Content</Text>
        
      <ScrollView className='w-[100%] gap-3 flex-col bg-white p-[30px]' contentContainerStyle={{ paddingBottom: 60 }} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
        
            <View className='flex-row w-[100%] justify-between items-center'>
                <Pressable className='flex-row gap-2 items-center justify-center h-[35px] '  onPress={profile}>
                  <Image source={require('@/assets/images/profile.png')} style={{height: 25, width: 25}}/>
                  <Text className='text-[15px] text-center'>{userData?.wallet?.user.username} </Text>
                  <Text className='text-[15px] text-center'>{userData?.wallet?.user.isVerified === true? <MaterialIcons name="verified" size={18} color="#FFAB10" />:""}</Text>
                </Pressable>
                <Pressable className=' rounded-full border border-gray-300 p-[8px]'>
                  <AntDesign name="bells" size={15} color="black" />
                </Pressable>
            </View>

            {userData?.wallet?.user.isVerified == false? <View className='mt-2'>
                  <Text className='text-[#FFAB10] text-[16px]'>Verify your account to continue enjoying our services.</Text>
            </View>: ""}
            <View className='flex-row justify-between items-center w-full gap-[10px]'>
              <View>
              <View className='flex-row  gap-4 items-center pt-[30px] gap-'>
                <Text className='text-[#00000080] text-[16px] font-bold'>Your Balance</Text>
                <Feather name={display? 'eye' : 'eye-off'} size={20} color="black" className=' p-[10px]' onPress={()=>setDisplay(!display)}/>
              </View>
              <Text className='text-[23px] font-bold'>{display? `${new Intl.NumberFormat('en-NG', {
                    style: 'currency',
                    currency: 'NGN',
                    minimumFractionDigits: 2
                  }).format(userData?.wallet?.balance || 0)}` 
                  : '******'}</Text>
              </View>

              <TouchableOpacity className='flex-row mt-[30px] justify-center rounded-[10px] items-center py-[10px] px-[8px] bg-[#FFAB10]' onPress={payment}>
                  <AntDesign name="plus" size={20} color="white" />
                  <Text className='text-[17px] text-white font-bold' >Fund Wallet </Text>
              </TouchableOpacity>
            </View>
            <View className='W-[100%] flex-row justify-between items-center '>
            </View>
            <View className='w-[100%] flex-row mt-[35px] justify-around items-center'>
              <Text className='text-[18px] border-b-[2px] border-[#FFAB10] text-[#FFAB10] pb-[10px] font-bold'>Service</Text>
              <TouchableOpacity>
              <Text className='text-[18px] text-black font-bold p-[10px]' onPress={trxn}>p2p Trxn</Text>
              </TouchableOpacity>
            </View>
            <View className='flex-row mt-[45px] justify-between items-center'>
              <TouchableOpacity className='flex-col justify-center items-center gap-2 p-[10px]' onPress={airtime}>
                <Feather name="phone" size={20} color="black" />
                <Text className='text-[#00000080] text-[15px]'>Airtime</Text>
              </TouchableOpacity>
              <TouchableOpacity className='flex-col justify-center items-center gap-2 p-[10px]' onPress={data}>
                <Entypo name="signal" size={20} color="black" />
                <Text className='text-[#00000080] text-[15px]'>Data</Text>
              </TouchableOpacity>
              <TouchableOpacity className='flex-col justify-center items-center gap-2 p-[10px]' onPress={cable}>
                <FontAwesome5 name="tv" size={20} color="black" />
                <Text className='text-[#00000080] text-[15px]'>Cable TV</Text>
              </TouchableOpacity>
              <TouchableOpacity className='flex-col justify-center items-center gap-2 p-[10px]' onPress={Electricity}>
              <MaterialCommunityIcons name="lightbulb-on-outline" size={24} color="black" />
                <Text className='text-[#00000080] text-[15px]'>Electricity</Text>
              </TouchableOpacity>
              <TouchableOpacity className='flex-col justify-center items-center gap-2 p-[10px]' onPress={trade}>
              <FontAwesome5 name="money-check-alt" size={20} color="black" />
                <Text className='text-[#00000080] text-[15px]'>p2p</Text>
              </TouchableOpacity>
            </View>
            <View className='flex-row mt-[40px] justify-between items-center'>
              <Text className='font-bold text-[18px]' onPress={seller}>Transaction</Text>
              <TouchableOpacity><Text className='text-[#FFAB10] font-bold text-[15px] p-[10px]' onPress={trx}>SEE ALL</Text></TouchableOpacity>
            </View>
            <View className='w-[100%] h-[3px] bg-[#F6F8FE] mt-[25px]'></View>

            {/* if theres is a transaction it returns te transaction, else it will not return any transaction */}
            {
              transaction.length > 0 ? transaction.slice(0, 4).map((t, index) => (
                <View className='gap-5 py-[15px]' key={index}>

                <View className='flex-row w-full items-center'>
                  <View className='rounded-full border border-gray-300 p-[5px]'>
                    <Feather name={t.transType === "airtime" || t.transType === "data" ? "phone" : "activity"} size={10} color="black" />
                  </View>

                  <View className='flex-grow  items-center gap-[20px]'>
                    <View className='gap-2'>
                      <Text className='text-[20px] font-bold text-[#292828]'>{t.title}</Text>
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
      </ScrollView>
      )}
      <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <Bottombar />
      </View>
    </View>
  );
}
