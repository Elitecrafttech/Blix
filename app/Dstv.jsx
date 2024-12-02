import { View, Text, Dimensions, Pressable, ScrollView, Alert, TouchableOpacity} from 'react-native'
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

    const handletv = async() =>{
        // if(!smartcardNumber){
        //     alert('Smartcard number is required and should be 10 digits long');
        // }
        if(smartcardNumber.length < 10){
            setAccName("");
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
        //   console.log();
        const fullName = `${data.data.details.lastName} ${data.data.details.firstName}`
        console.log(fullName);
        
          setAccName(fullName);
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

const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
    });


    useEffect(() => {
        setAccName()
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
                                <TextInput className='border-[#eaebeb] border-[1px] rounded-xl p-[10px] placeholder:text-[17px] placeholder:text-[gray]' style={{width: windowWidth * 0.81, height: windowHeight * 0.06}}
                                placeholder='E.G 22 33 000 585'
                                value={smartcardNumber}
                                onChangeText={setSmartCardNumber}
                                keyboardType='Numeric'
                                />
                                <Text>{accName ? accName : ""}</Text>
                                </View>
                            </View>                      
                        {/* </View> */}
                        
                    </View>
                    <View>
                    {accName ? 
                        pakg.map((data, index) => (
                            <TouchableOpacity key={index} className='gap-[20px]'>
                                <Text className='capitalize text-[18px] font-medium'>{data.name}</Text>
                                <Text>{data.price}</Text>
                            </TouchableOpacity>
                        )) : ""
                    }
                    </View>

                    <TouchableOpacity className='bg-[#FFAB10] rounded-xl p-[8px]' onPress={handletv}>
                     <Text className='text-center capitalize text-[20px] text-white' >Continue</Text>
                    </TouchableOpacity>
                    
                </View>
                
          </View>
        </ScrollView>
  );
};