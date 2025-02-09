import { View, Text, TextInput, Pressable, Alert, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import ToastManager, { Toast } from 'toastify-react-native';
import { AppContext } from '@/context/AppContext';
import { Paystack } from 'react-native-paystack-webview';
import { useNavigation } from 'expo-router';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Payment() {
  const navigation = useNavigation();

    const { userData, getUserDetails, user} = useContext(AppContext);

    const tk = JSON.parse(user)
    const [pay, setPay] = useState(false)
    const [mail, setMail] = useState(userData?.wallet?.user.email);
    const [amount, setAmount] = useState();
    const [Loading, setLoading] = useState();

    useEffect(()=>{
        getUserDetails()
     
    }, [])



    const handlePayment = () => {
      
      if(mail && amount){
        setLoading(true);
        return setPay(true)
      }else{
        return Toast.error('Email & Amount Fields are required');
        
      }
      
    };




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
    <ScrollView className='w-[100%] py-[50px] bg-white'>
      <View style={{padding: windowWidth * 0.05, gap: 150, height: dimensions.screen}}>
       <ToastManager width={330} textStyle={{fontSize:17}} />
      <View className='gap-[60px]'>
         
         <View className='gap-5'>
         <Text className='text-[17px] capitalize'>enter payment email</Text>
            <TextInput className='border border-[grey] p-[10px] placeholder:text-[gray] placeholder:text-[18px]' style={{width: windowWidth * 0.90}}
            placeholder='Enter Payment Mail'
            value={mail}
            onChangeText={setMail}
            />
            <Text className='text-[17px] capitalize'>fund amount</Text>
            <TextInput className='border border-[grey] p-[10px] placeholder:text-[gray] placeholder:text-[18px]' style={{width: windowWidth * 0.90}}
            placeholder='Enter Amount'
            value={amount * 1.5}
            onChangeText={setAmount}
            keyboardType='numeric'
            />
            {pay && 
        <Paystack
          amount={amount}
          billingEmail={mail}
          currency='NGN'
          paystackKey='pk_test_981d8b1ab23a6a8f11d682a73af36bd200261268'
          onCancel={(res)=>(console.log(res))}
          onSuccess={async(res)=>{
            let am = amount / 100 * 1.5;
            const reference = res["transactionRef"]["reference"];
        
              setLoading(false);
                const SendToBE = await fetch('https://instant-chain.onrender.com/verify-payment', {
                  method:"POST",
                  headers:{
                      "content-type":"application/json",
                      "Authorization": `Bearer ${tk}`
                  },
                  body: JSON.stringify({reference, description : "successfully added money to wallet"})
                })
                
                const verify = await SendToBE.json()
                console.log(verify);
                Alert.alert('Payment Successful')
                navigation.navigate('dashboard');
         
          }}
          autoStart={pay}
          />
          }
         </View>
         <Pressable className='bg-[#FFAB10] items-center p-[10px] rounded-xl' onPress={handlePayment}>
          <Text className='text-white text-[20px]'>{Loading? "Processing...":"Continue"}</Text>
         </Pressable>
      </View>
      </View>
    </ScrollView>
  )
}