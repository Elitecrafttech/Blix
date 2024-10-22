import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { View, Text, Image, Pressable, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { AppContext } from '../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Dashboard() {

  const {userData, getUserDetails} = useContext(AppContext)
  const [transaction, setTransaction] = useState([])
  const [display, setDisplay] = useState(false)

  useEffect(() => {
    getUserDetails();
  }, [])

    const baserl = 'https://instant-chain.onrender.com/dashboard'
     const token = AsyncStorage.getItem("tk")
    async function handleTransaction(){
      try {
        const responds = await fetch(baserl, {
          headers:{
            "Authorization": "Bearer " + token
          }
        })
        const data = await responds.json()
        if(responds.ok){
          setTransaction(data.transaction)
          console.log("transaction is " + data.transaction)
        }
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(() => {
        handleTransaction()
    }, [])
    

    const airtime = () => {
      router.push('Airtime');
  };
    const data = () => {
      router.push('Databundle');
  };
    const cable = () => {
      router.push('Cabletv');
  };
    const peer = () => {
      router.push('PeerToPeer');
  };

  return (
    <ScrollView className='w-[100%] gap-3 flex-col bg-white p-[30px]'>
            <View className='flex-row w-[100%] justify-between items-center pt-5'>
                <View className='flex-row gap-2 items-center'>
                  <Image source={require('@/assets/images/profile.png')} style={{height: 25, width: 25}}/>
                  <Text className='text-[15px]'>{userData?.wallet?.user.username}</Text>
                </View>
                <View className=' rounded-full border border-gray-300 p-[8px]'>
                  <AntDesign name="bells" size={15} color="black" />
                </View>
            </View>
            <View className='flex-row justify-between items-center w-full gap-[10px]'>
              <View>
              <View className='flex-row  gap-4 items-center pt-[30px] gap-'>
                <Text className='text-[#00000080] text-[16px] font-bold'>Your Balance</Text>
                <Feather name={display? 'eye' : 'eye-off'} size={20} color="black"  onPress={()=>setDisplay(!display)}/>
              </View>
              <Text className='text-[23px] font-bold'>{display? `N ${userData?.wallet?.balance}`: '******'}</Text>
              </View>

              <TouchableOpacity className='flex-row mt-[30px] justify-center rounded-[10px] items-center py-[10px] px-[8px] bg-[#FFAB10]'>
                  <AntDesign name="plus" size={20} color="white" />
                  <Text className='text-[17px] text-white font-bold'>Fund Wallet </Text>
              </TouchableOpacity>
            </View>
            <View className='W-[100%] flex-row justify-between items-center '>
            </View>
            <View className='w-[100%] flex-row mt-[35px] justify-around items-center'>
              <Text className='text-[18px] border-b-[2px] border-black pb-[10px] font-bold'>Service</Text>
            </View>
            <View className='flex-row mt-[45px] justify-between items-center'>
              <TouchableOpacity className='flex-col justify-center items-center gap-2' onPress={airtime}>
                <Feather name="phone" size={20} color="black" />
                <Text className='text-[#00000080] text-[15px]'>Airtime</Text>
              </TouchableOpacity>
              <TouchableOpacity className='flex-col justify-center items-center gap-2' onPress={data}>
                <Entypo name="signal" size={20} color="black" />
                <Text className='text-[#00000080] text-[15px]'>Data</Text>
              </TouchableOpacity>
              <TouchableOpacity className='flex-col justify-center items-center gap-2' onPress={cable}>
                <FontAwesome5 name="tv" size={20} color="black" />
                <Text className='text-[#00000080] text-[15px]'>Cable TV</Text>
              </TouchableOpacity>
              <TouchableOpacity className='flex-col justify-center items-center gap-2' onPress={peer}>
              <FontAwesome5 name="money-check-alt" size={20} color="black" />
                <Text className='text-[#00000080] text-[15px]'>p2p</Text>
              </TouchableOpacity>
            </View>
            <View className='flex-row mt-[40px] justify-between items-center'>
              <Text className='font-bold text-[18px]'>Transaction</Text>
              <TouchableOpacity><Text className='text-[#0000FF] font-bold text-[15px]'>SEE ALL</Text></TouchableOpacity>
            </View>
            <View className='w-[100%] h-[3px] bg-[#F6F8FE] mt-[25px]'></View>

            {/* if theres is a transaction it returns te transaction, else it will not return any transaction */}
            {
              transaction.length > 0 ? transaction.map((t, index) => (
                <View key={index}>
                  <Text>{t}</Text>
                </View>
              )) : 

              <View className='w-[100%] justify-center items-center '>
                 {/* <Text className='text-[17px] font-bold'>No Transaction Made</Text> */}
              </View>
            }



            <View className='gap-5 pb-[100px] py-[15px]'>
              <View className='flex-row justify-around gap-2 w-full items-center'>
                <View className='rounded-full border border-gray-300 p-[5px]'>
                  <Feather name="phone" size={10} color="black" />
                </View>
                <View className=' items-center gap-[20px] flex-row'>
                  <View className='gap-2'>
                    <Text className='text-[20px] font-bold text-[#292828]'>Airtime Purchase</Text>
                    <Text className='text-[#0000005C] text-[13px]'>Airtime Sent To +2349168243714</Text>
                  </View>
                  <Text className='text-[#0000FF] text-[15px] font-bold'>+250,000</Text>
                </View>
              </View>
            </View>


    </ScrollView>
  );
}
