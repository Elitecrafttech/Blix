import { View, Text, Dimensions, Pressable, ScrollView} from 'react-native'
import { useEffect, useState } from 'react'; 
import {Picker} from '@react-native-picker/picker';
import { useNavigation } from 'expo-router';



const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Electricity() {
    const navigation = useNavigation();

    const [ provider, setProvider] = useState('');
    const [ plan, setPlan] = useState('');


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

    const checkout = ()=> {
        navigation.navigate('Electricitycheckout');
    }
    

  return (
         <ScrollView className='w-[100%] py-[50px] bg-white' style={{width: windowWidth, height: windowHeight - 60}}>
          <View style={{padding: windowWidth * 0.05, gap: 100, height: dimensions.screen}}>
                <View className='gap-[20px]'>                
                    <View className=' gap-[100px] px-[10px] py-[20px]'>                    
                        <View className=' gap-[50px]'>
                            <View className='gap-[15px]'>
                                <Text className='capitalize text-[18px] font-medium'>select provider</Text>
                                <View className='border-[#eaebeb] border-[1px] rounded-xl'>
                                    <Picker
                                    selectedValue={provider}
                                    onValueChange={(itemValue) => setProvider(itemValue)}
                                    className=' h-[50] w-full'>

                                    <Picker.Item label="Choose Option" value="" />
                                        <Picker.Item label="provider1" value="provider1" />
                                        <Picker.Item label="provider2" value="provider2" />
                                        <Picker.Item label="provider3" value="provider3" />
                                        <Picker.Item label="provider4" value="provider4" />
                                    </Picker>
                                </View>
                            </View>
                            <View className='gap-[15px]'>
                                <Text className='capitalize text-[18px] font-medium'>select plan</Text>
                                <View className='border-[#eaebeb] border-[1px] rounded-xl'>
                                    <Picker
                                    selectedValue={plan}
                                    onValueChange={(itemValue) => setPlan(itemValue)}
                                    className=' h-[50] w-full'>

                                    <Picker.Item label="Choose Option" value="" />
                                        <Picker.Item label="plan1" value="plan1" />
                                        <Picker.Item label="plan2" value="plan2" />
                                        <Picker.Item label="plan3" value="plan3" />
                                        <Picker.Item label="plan4" value="plan4" />
                                    </Picker>
                                </View>
                            </View>
                        </View>
                        
                        <View className='items-center gap-[10px]'>
                            <Text className='capitalize text-[18px]'>amount</Text>
                            <Text className='font-bold text-[30px]'>0.0</Text>
                        </View>                     
                    </View>
                </View>
                <Pressable className='bg-[#FFAB10] rounded-xl p-[8px]'>
                <Text className='text-center capitalize text-[20px] text-white' onPress={checkout}>Continue</Text>
            </Pressable>
          </View>
        </ScrollView>
  );
};