import { View, Text, Dimensions, Pressable, ScrollView} from 'react-native'
import { useEffect, useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from 'expo-router';


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Purchase() {
    const navigation = useNavigation();
    
    const trdstatus = ()=>{
        navigation.push('Orderstransaction');
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
         <ScrollView className='absolute rounded-[50px]' style={{width: windowWidth - 40, height: windowHeight - 60, backgroundColor: "#b6852a"}}>
          <View style={{padding: windowWidth * 0.05, gap: 100, height: dimensions.screen}}>
                <View className='gap-[15px]'>
                   <MaterialCommunityIcons name="checkbox-marked-circle" size={60} color="#FFAB10" className='text-center'/>
                        <View className='items-center gap-[10px]'>
                        <Text className='text-white'> Purchase Successfully</Text>     
                        </View>                    
                </View>
                <View className='gap-[70px]'>
                    <Pressable className='bg-[#FFAB10] rounded-xl p-[8px] '>
                        <Text className='text-center capitalize text-[20px] text-white' onPress={trdstatus}>check transaction status</Text>
                    </Pressable>
                </View>
          </View>
        </ScrollView>
  );
};