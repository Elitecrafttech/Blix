import { View, Text, Dimensions, Pressable, ScrollView, Alert, TouchableOpacity, Modal} from 'react-native'
import { useContext, useEffect, useState } from 'react'; 
import {Picker} from '@react-native-picker/picker';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from 'expo-router';
import { AppContext } from '@/context/AppContext';



const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Dstv() {
    const navigation = useNavigation();

    const {user} = useContext(AppContext);    
    const tk = JSON.parse(user);
    

    const [ smartcardNumber, setSmartCardNumber] = useState('');
    const [accName, setAccName] = useState('');
    const [pakg, setPackage] = useState([]);
    const [customerNumber, setCustomerNum] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [amount, setAmount] = useState('');

    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);


    const handletv = async() =>{
        if(smartcardNumber.length < 10){
            setAccName("");
            return;
        }

        const response = await fetch("https://instant-chain.onrender.com/api/v1/trades/dstv/due-date", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tk}`,
            },
            body: JSON.stringify({
                smartcardNumber
            })
        });
        if(response.ok){
          const  data = await response.json();
          console.log("due date ", data);
        const fullName = `${data.data.details.lastName} ${data.data.details.firstName}`
        console.log("full name: ",fullName);
        
          setAccName(fullName);
          setCustomerName(fullName);
          setCustomerNum(data.data.details.customerNumber);
        //   setAccName(data.data.details.firstName);
          
          
            Alert.alert(fullName);
            
        }else{
            const error = await response.json()
            console.log(error);
            
        }
    }

    const packages = async() =>{
        // alert("yes")
        try {
            const response = await fetch('https://instant-chain.onrender.com/api/v1/trades/dstv/packages',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if(response.ok){
                const data = await response.json();
                console.log(data.data.details);
                setPackage(data.data.details);

            }
            else{
                const error = await response.json();
                console.log(error);
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    
    
    const selectPackage = (value, index) => {
        console.log("Selected package ID", value);
        const amtt = value;
        if (amtt) {
            setAmount(amtt);
        } else {
            setAmount('');
            console.warn("Package not found for selected ID");
        }
    };

    const renewsub = async() =>{
        
        const response = await fetch("https://instant-chain.onrender.com/api/v1/trades/dstv/renew-subscription", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tk}`,
            },
            body: JSON.stringify({
                smartcardNumber,
                customerNumber,
                customerName,
                amount
            })
        })
        if(response.ok){
            const  data = await response.json();
            console.log(data);
            Alert.alert('Subscription Renewed Successfully');
            setSuccessModalVisible(true);
        }else{
            const error = await response.json();
            console.log(error);
            Alert.alert('Failed to renew subscription');
            setErrorModalVisible(true);
        }
    }

const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
    });


    useEffect(() => {
        handletv()
        packages()
    }, []);

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

    const checkout = ()=>{
        // router.push('Cablecheckout');
        // navigation.navigate('Cablecheckout');
    }

  return (
         <ScrollView className='w-[100%] py-[20px] bg-white' style={{width: windowWidth, height: windowHeight - 60}}>
          <View style={{padding: windowWidth * 0.05, gap: 100, height: dimensions.screen}}>
                <View className='gap-[20px]'>                
                    <View className=' gap-[50px] px-[10px] py-[20px]'>
                    
                        {/* <View className=' gap-[50px]'> */}
                            
                            <View className='gap-[15px]'>
                                <Text className='capitalize text-[18px] font-medium'>smart card number</Text>
                                <View>
                                <View className='flex-row gap-3 w-[100%]'>
                                    <View className='w-[75%]'>
                                        <TextInput className='border-[#eaebeb] border-[1px] rounded-xl p-[10px] placeholder:text-[17px] placeholder:text-[gray] w-full' style={{height: windowHeight * 0.06}}
                                            placeholder='E.G 22 33 000 585'
                                            value={smartcardNumber}
                                            onChangeText={setSmartCardNumber}
                                            keyboardType='Numeric'
                                        />
                                    </View>

                                    <View className='w-[25%]'>
                                        <TouchableOpacity className='bg-[#FFAB10] rounded-xl p-[8px]' onPress={handletv}>
                                            <Text className='text-center capitalize text-[20px] text-white' >Validate</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <Text>{accName ? accName : ""}</Text>
                                </View>
                            </View>                      
                        {/* </View> */}
                        
                    </View>
                    <View>
                    <Picker
                        selectedValue={amount} 
                        onValueChange={selectPackage}
                    >
                        <Picker.Item label="Select Package" value="" />
                        {pakg.map((data, index) => (
                            <Picker.Item
                                key={index}
                                label={`${data.name} - ${new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(data.price)} `}  value={data.price} />
                        ))}
                    </Picker>

                    <View>
                    {amount ? (
                        <Text className="text-[16px] mt-[10px]">
                            Selected Package Price: {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount)}
                        </Text>
                    ) : null}


                    </View>
                    </View>

                    <TouchableOpacity className='bg-[#FFAB10] rounded-xl p-[8px]' onPress={renewsub}>
                        <Text className='text-center capitalize text-[20px] text-white' >Continue</Text>
                    </TouchableOpacity>
                    
                </View>
                
          </View>

           {/* Success Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={successModalVisible}
                onRequestClose={() => setSuccessModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-white gap-4 px-5 py-[100px] p-5 rounded-xl w-[80%]">
                        <Text className="text-[18px] font-bold">Success</Text>
                        <Text className="mt-3">Subscription purchase Successfully!</Text>
                        <TouchableOpacity
                            className="bg-[#FFAB10] rounded-xl p-[8px] mt-4"
                            onPress={() => setSuccessModalVisible(false)}
                        >
                            <Text className="text-center text-white">Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Error Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={errorModalVisible}
                onRequestClose={() => setErrorModalVisible(false)}
            >
                <View className="flex-1 justify-center  items-center bg-black/50">
                    <View className="bg-white gap-4 px-5 py-[100px] rounded-xl w-[80%]">
                        <Text className="text-[18px] font-bold">Error</Text>
                        <Text className="mt-3">Failed to purchase subscription. Please try again.</Text>
                        <TouchableOpacity
                            className="bg-red-500 rounded-xl p-[8px] mt-4"
                            onPress={() => setErrorModalVisible(false)}
                        >
                            <Text className="text-center text-white">Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
  );
};