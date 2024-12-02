import { View, Text, Dimensions,TouchableOpacity, } from 'react-native'
import { useEffect, useState } from 'react'; 
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Bottombar() {
    const navigation = useNavigation();

    const home = () =>{
        navigation.navigate('dashboard');
    }
    const peer = () =>{
        navigation.navigate('PeerToPeer');
    }
    const profile = () =>{
        navigation.navigate('Profile');
    }
    const trx = () =>{
        navigation.navigate('Trxhistory');
    }
    const wallet = () =>{
        navigation.navigate('Wallet');
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
    <View style={{width: windowWidth, }}>
      <View className='absolute bottom-0 flex-row justify-around px-[20px] items-center bg-slate-50 h-[60px] shadow-lg shadow-black/30' style={{width: windowWidth, height: windowHeight * 0.08}}>
            <TouchableOpacity className='items-center p-[10px]'  onPress={home}>
                <Ionicons name='home' size={24} color="black"/>
                <Text>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity className='items-center p-[10px]' onPress={wallet}>
                <Ionicons name='wallet' size={24} color="black"/>
                <Text>Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity className='items-center p-[10px]' onPress={peer}>
            <FontAwesome5 name="money-check-alt" size={24} color="black" />
                <Text>trade p2p</Text>
            </TouchableOpacity>
            <TouchableOpacity className='items-center p-[10px]' onPress={trx}>
            <MaterialIcons name="payment" size={24} color="black" />
                <Text>Transaction</Text>
            </TouchableOpacity>
            <TouchableOpacity className='items-center p-[10px]' onPress={profile}>
            <Feather name="user" size={24} color="black" />
                <Text>Profile</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}


