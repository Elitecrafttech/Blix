import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { AppContext } from '@/context/AppContext';
// import PaystackPop from '@paystack/inline-js'

export default function Payment() {

    const { userData, getUserDetails} = useContext(AppContext);


    const [mail, setMail] = useState(userData?.wallet?.user.email);
    const [amount, setAmount] = useState('');

    useEffect(()=>{
        getUserDetails()
     
    }, [])



    const handlePayment = async() => {
      // const popup = new PaystackPop();
      try {
        const response = await fetch("https://api.paystack.co/transaction/initialize", {
           method: 'POST',
           headers: {
              'Authorization': 'Bearer sk_test_dd0cd874a38f509daaeaaa067079a842d6a3348d',
              'Content-Type': 'application/json',
           },
           body: JSON.stringify({
              amount: Number(amount) * 100,
              email: mail,
           }),
        });
        
        const result = await response.json();
        
        if (response.ok) {
           console.log("Success", result);
           const {reference} = result.data;
         //   popup.resumeTransaction(result.data.access_code);
         const SendToBE = await fetch("message", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reference }),
         })
         if (SendToBE.ok) {
            await SendToBE.json()
         }else {
             console.log("Error", SendToBE.json());
   
         }
           
        } else {
           console.log("Error", result);
        }
     }
      catch (error) {
        console.log("Fetch error: ", error);
     }
    };


    
  return (
    <ScrollView className='w-[100%] py-[50px] px-[60px]'>
      <View className='gap-5'>
         <Text>Payment</Text>
         <View className='gap-5'>
            <TextInput className='border border-[grey] p-[10px] placeholder:text-[gray]'
            placeholder='Enter Payment Mail'
            value={mail}
            onChangeText={setMail}
            />
            <TextInput className='border border-[grey] p-[10px] placeholder:text-[gray]'
            placeholder='Enter Amount'
            value={amount}
            onChangeText={setAmount}
            keyboardType='numeric'
            />
         </View>
         <Pressable className='bg-[#FFAB10] items-center p-[10px]' onPress={handlePayment}>
          <Text >Continue</Text>
         </Pressable>
      </View>
    </ScrollView>
  )
}