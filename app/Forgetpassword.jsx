import { View, Text, Dimensions, TextInput, Pressable, ScrollView, } from 'react-native'
import { useEffect, useState, useContext } from 'react'; 
// import ToastManager, { Toast } from 'toastify-react-native';


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Forgetpassword() {

    const [email, setEmail] = useState('');
   


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
      {/* <ToastManager width={300} textStyle={{fontSize:17}} /> */}
      <View style={{padding: windowWidth * 0.05, gap: 150, height: dimensions.screen}}>
       
                <View className='gap-[10px  ]'>
                    <Text className='text-[18px]'>Recover Your Password</Text>
                <TextInput className='border-[1px] border-[#d1d4df] rounded-xl p-[10px] placeholder:text-[17px] placeholder:text-[gray]' style={{width: windowWidth * 0.90}}
                placeholder='Email Address'
                value={email}
                onChangeText={(text) => setEmail(text)}
                />
                </View>

            <Pressable className='bg-[#FFAB10] rounded-xl p-[8px]'>
                <Text className='text-center capitalize text-[20px] text-white' >Proceed</Text>
            </Pressable>
    </View>
    </ScrollView>
  );
};
