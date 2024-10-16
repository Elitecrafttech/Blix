import { View, Text, Dimensions,TouchableOpacity, } from 'react-native'
import { useEffect, useState } from 'react'; 
import { Ionicons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Bottombar() {


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
    <View style={{width: windowWidth}}>
      <View className='absolute bottom-0 flex-row justify-around py-[20px] items-center bg-white h-[60px] shadow-lg shadow-black/30' style={{width: windowWidth}}>
            <TouchableOpacity className='items-center'>
                <Ionicons name='home' size={24} color="black"/>
                <Text>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity className='items-center'>
                <Ionicons name='wallet' size={24} color="black"/>
                <Text>Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity className='items-center'>
            <MaterialIcons name="payment" size={24} color="black" />
                <Text>Transaction</Text>
            </TouchableOpacity>
            <TouchableOpacity className='items-center'>
            <Feather name="user" size={24} color="black" />
                <Text>Profile</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}