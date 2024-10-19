import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { View, Text, Image, Pressable, Dimensions, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { AppContext } from '@/context/AppContext';

export default function Dashboard() {

  const {userData, getUserDetails} = useContext(AppContext)

  useEffect(() => {
    getUserDetails();
  }, [])

  const handlePay = () => {
    router.push('/Payment');
  }


  return (
    <ScrollView className='w-[100%] gap-3 flex-col pt-5 px-[30px] bg-white'>
            <View className='flex-row w-[100%] justify-between items-center pt-9'>
                <View className='flex-row gap-2 items-center'>
                  <Image source={require('@/assets/images/profile.png')} />
                  <Text className='text-[17px]'>{userData?.wallet?.user.username}</Text>
                </View>
                <View className=' rounded-full border border-gray-300 p-[8px]'>
                  <AntDesign name="bells" size={24} color="black" />
                </View>
            </View>
            <View className='flex w-full gap-[10px]'>
              <View className='flex-row  gap-4 items-center mt-10 gap-'>
                <Text className='text-[#00000080] text-[20px] font-bold'>Your Balance</Text>
                <Feather name="eye" size={20} color="black" />
              </View>
              <Text className='text-[32px] font-bold'>N {userData?.wallet?.balance}</Text>
            </View>
            <View className='W-[100%] mt-[35px] flex-row justify-between items-center '>
              <Pressable className='flex-row justify-center rounded-[20px] items-center py-[20px] gap-3 w-[48%] bg-[#F6F8FE]'>
                  <Ionicons name="arrow-redo-outline" size={26} color="black" />
                  <Text className='text-[20px] text-black font-bold'>Share</Text>
              </Pressable>
              <Pressable className='flex-row justify-center rounded-[20px] items-center py-[20px] gap-3 w-[48%] bg-[#0000FF]'>
                  <AntDesign name="plus" size={24} color="white" />
                  <Text className='text-[20px] text-white font-bold' onPress={handlePay}>Share</Text>
              </Pressable>
            </View>
            <View className='w-[100%] flex-row mt-[35px] justify-around items-center'>
              <Text className='text-[22px] border-b-4 border-black pb-[10px] font-bold'>Service</Text>
              <Text className='text-[22px] font-bold'>More</Text>
            </View>
            <View className='flex-row mt-[45px] justify-between items-center'>
              <View className='flex-col justify-center items-center gap-2'>
                <Feather name="phone" size={27} color="black" />
                <Text className='text-[#00000080] text-[18px]'>Airtime</Text>
              </View>
              <View className='flex-col justify-center items-center gap-2'>
                <Entypo name="signal" size={27} color="black" />
                <Text className='text-[#00000080] text-[18px]'>Data</Text>
              </View>
              <View className='flex-col justify-center items-center gap-2'>
                <FontAwesome5 name="tv" size={27} color="black" />
                <Text className='text-[#00000080] text-[18px]'>Cable TV</Text>
              </View>
              <View className='flex-col justify-center items-center gap-2'>
                <Fontisto name="world-o" size={27} color="black" />
                <Text className='text-[#00000080] text-[18px]'>Internet</Text>
              </View>
            </View>
            <View className='flex-row mt-[40px] justify-between items-center'>
              <Text className='font-bold text-[25px]'>Transaction</Text>
              <Text className='text-[#0000FF] font-bold text-[16px]'>SEE ALL</Text>
            </View>
            <View className='w-[100%] h-[3px] bg-[#F6F8FE] mt-[25px]'></View>


            <View className='mt-[30px] gap-5 pb-[100px]'>
              <View className='flex-row justify-between items-center'>
                <View className='rounded-full border border-gray-300 p-[15px]'>
                  <Feather name="phone" size={24} color="black" />
                </View>
                <View className='w-[75%] justify-between items-center flex-row h-[20px]'>
                  <View className='gap-2'>
                    <Text className='text-[20px] font-bold'>Airtime Purchase</Text>
                    <Text className='text-[#0000005C] text-[13px]'>Airtime Sent To +2349168243714</Text>
                  </View>
                  <Text className='text-[#0000FF] text-[15px] font-bold'>+250,000</Text>
                </View>
              </View>
              <View className='flex-row justify-between items-center'>
                <View className='rounded-full border border-gray-300 p-[15px]'>
                  <Fontisto name="world-o" size={27} color="black" />
                </View>
                <View className='w-[75%] justify-between items-center flex-row h-[20px]'>
                  <View className='gap-2'>
                    <Text className='text-[20px] font-bold'>Data bundle</Text>
                    <Text className='text-[#0000005C] text-[13px]'>Data bundle Sent To +2349168243714</Text>
                  </View>
                  <Text className='text-[#0000FF] text-[15px] font-bold'>+250,000</Text>
                </View>
              </View>
              <View className='flex-row justify-between items-center'>
                <View className='rounded-full border border-gray-300 p-[15px]'>
                  <Feather name="phone" size={24} color="black" />
                </View>
                <View className='w-[75%] justify-between items-center flex-row h-[20px]'>
                  <View className='gap-2'>
                    <Text className='text-[20px] font-bold'>Airtime Purchase</Text>
                    <Text className='text-[#0000005C] text-[13px]'>Airtime Sent To +2349168243714</Text>
                  </View>
                  <Text className='text-[#0000FF] text-[15px] font-bold'>+250,000</Text>
                </View>
              </View>
              <View className='flex-row justify-between items-center'>
                <View className='rounded-full border border-gray-300 p-[15px]'>
                  <Feather name="phone" size={24} color="black" />
                </View>
                <View className='w-[75%] justify-between items-center flex-row h-[20px]'>
                  <View className='gap-2'>
                    <Text className='text-[20px] font-bold'>Airtime Purchase</Text>
                    <Text className='text-[#0000005C] text-[13px]'>Airtime Sent To +2349168243714</Text>
                  </View>
                  <Text className='text-[#0000FF] text-[15px] font-bold'>+250,000</Text>
                </View>
              </View>
            </View>


    </ScrollView>
  );
}
