import React, { useState, useEffect, useContext } from 'react'
import { Text, View, Modal, Pressable, Button, Alert, TextInput, Dimensions, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native'
import { useNavigation } from 'expo-router';
import { AppContext } from '@/context/AppContext';


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Cryptomodal({onClose, visible, trades, msg}) {
    const {user} = useContext(AppContext);
    const tk = JSON.parse(user);

    const [amount, setAmount] = useState(0);
    const [wallet, setWallet] = useState('');
    // const [tradeid, setTradeid] = useState('');


    let price = Number(trades.price);
    let userAmount = Number(amount);
    let payPrice = price * userAmount;

  const formattedNumber = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0, 
  }).format(payPrice);

    const navigation = useNavigation();
    const handleBuy = async() => {
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            Alert.alert("Invalid Input", "Please enter a valid amount.");
            return;
        }
        if (!wallet.trim()) {
            Alert.alert("Invalid Input", "Please enter a valid wallet address.");
            return;
        }

        try {
            const response = await fetch(
                `https://instant-chain.onrender.com/api/v1/trades/p2p/${trades._id}`, 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${tk}`
                    },
                    body: JSON.stringify({
                       buyerQuantity: amount,
                        walletAddress: wallet,
                    })
                }
            );
    
            if (response.ok) {
                const data = await response.json();
                Alert.alert(
                    "Purchase Successful", 
                    `You have successfully bought a trade. Trade ID: ${data.tradeId}`
                );
                onClose(); // Close the modal
            } else {
                const error = await response.json();
                console.error("Error Response:", error);
                // Alert.alert("Failed to Purchase Trade", error.message || "An error occurred.");
            }
        } catch (err) {
            console.error("Fetch Error:", err);
            // Alert.alert("Error", "Unable to complete the transaction. Please try again.");
        }
    };


    if(!trades){
        return null;
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


        <Modal
        animationType="slide"
        transparent={true}
        visible={visible}

        onRequestClose={() => {
            onClose
            visible = false;
          }}
        >
        <View className='bg-blue-700' style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <ScrollView>
          
          
    <View className='w-[100%] py-[50px] bg-white'  style={{width: windowWidth, height: windowHeight - 60}}>
         <View className='absolute top-4 right-4'>
            <Button color={"red"} title="X" onPress={onClose} />
         </View>
        <View style={{padding: windowWidth * 0.05, gap: 100, height: dimensions.screen}}>
            
            <View className='gap-[20px]  bg-white'>
                
                
                <Text className='capitalize text-center font-bold text-[25px] text-[#695e5e]'>Trade Details</Text>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <View>
                        <Text className="text-[15px] font-bold text-gray-800"> Price: {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(trades.price)}</Text>
                        <Text className="text-[15px] font-bold text-gray-800">Quantity: {trades.quantity}</Text>
                    </View>

                    <View>
                        <Text className="text-[15px] font-bold text-gray-800">Trade Type: {trades.tradeType}</Text>
                        <Text className="text-[15px] font-bold text-gray-800">ID: {trades._id}</Text>
                    </View>
        
                </View>
                <View className='items-center gap-[40px]'>
                    <Text className='text-center capitalize'>you are about to trade {trades.tradeType} with {trades.user.username}</Text>
                    <View className='gap-[8px]'>
                        <Text className='font-bold text-[15px] text-[#b6852a]'>The Amount In USD ($)</Text>
                        <TextInput className='border-[#eaebeb] border-[1px] rounded-xl px-[10px] placeholder:text-[17px] placeholder:text-[gray]' style={{width: windowWidth * 0.81, height: windowHeight * 0.06}}
                        placeholder='Amount You Want To Purchase'
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType='numeric'
                        />
                    </View>

                    <View className='gap-[8px]'>
                        <Text className='font-bold text-[15px] text-[#b6852a] capitalize'>enter wallet address</Text>
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
                    <TouchableOpacity className='bg-[#FFAB10] p-[10px] text-center rounded-xl w-[100%] mt-[40px]' onPress={handleBuy}>
                        <Text className='capitalize text-[23px] text-white text-center' >pay now</Text>
                    </TouchableOpacity>
                    
        </View>
        </View>
        </View>
        </ScrollView>
        </View>
      </Modal>
    )
}
