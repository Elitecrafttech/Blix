import {  View, Text, Dimensions, TouchableOpacity, FlatList, } from 'react-native';
import { useEffect, useState, useContext } from 'react';
import { useNavigation } from 'expo-router';
import { AppContext } from '@/context/AppContext';
import Paypalmodal from './Paypalmodal'

export default function Tradepaypal() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isClick, setClick] = useState(false)
  
  const navigation = useNavigation();
  const { user } = useContext(AppContext);
  const token = JSON.parse(user);

  const [trades, setTrades] = useState([]);
  const [trade, setTrade] = useState(null);
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen'),
  });

  const openModal = (trade)=>{
    setModalVisible(true)
    setTrade(trade)
    setClick(true)
  }

  const closeModal = ()=>{
    setModalVisible(false)
    setTrade(null)
    setClick(false)
  }

  const fetchTrade = async () => {
    try {
      const response = await fetch(
        'https://instant-chain.onrender.com/api/v1/trades/trades/paypal',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Fetched trades:', data.trades);
        setTrades(data.trades);
      } else {
        const error = await response.json();
        console.error('Error fetching trades:', error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  useEffect(() => {
    fetchTrade();

    const subscription = Dimensions.addEventListener('change', ({ window, screen }) => {
      setDimensions({ window, screen });
    });

    return () => subscription?.remove();
  }, []);

  const windowWidth = dimensions.window.width;
  const windowHeight = dimensions.window.height;

  return (
    <View
      className="w-full py-5 bg-white"
      style={{ width: windowWidth, height: windowHeight - 60 }}
    >
      <View style={{ padding: windowWidth * 0.05, gap: 20 }}>
       {
        !isClick ?  (<FlatList
        data={trades}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => openModal(item)}
          >
            <View className="flex-row items-center justify-between my-5">
              <View className="gap-2">
                <Text className="text-lg">Seller: {item.user.username}</Text>
                <Text className="text-xl">Price: {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(item.price)}</Text>
                <Text>Quantity Available for sale: {item.quantity}</Text>
                <Text>Trade Type: {item.tradeType}</Text>
                <Text>Trade ID: {item._id}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View className="flex justify-center items-center">
            <Text>No trades available.</Text>
          </View>
        }
      />)
      :(
      <Paypalmodal
      visible={modalVisible}
      onClose={closeModal}
      trades={trade}
      
      />
      )
       }
      </View>
    </View>
  );
}