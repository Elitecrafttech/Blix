import { View, Text, Dimensions, TouchableOpacity, FlatList, Modal, Button, TextInput } from 'react-native';
  import { useEffect, useState, useContext } from 'react';
  import { useNavigation } from 'expo-router';
  import { AppContext } from '@/context/AppContext';
  
  export default function Mytradelist() {
    const navigation = useNavigation();
    const { user } = useContext(AppContext);
    const token = JSON.parse(user);
  
    const [trades, setTrades] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(''); 
    const [selectedTrade, setSelectedTrade] = useState(null);
    const [editedTrade, setEditedTrade] = useState({});

    const [dimensions, setDimensions] = useState({
      window: Dimensions.get('window'),
      screen: Dimensions.get('screen'),
    });
  
    const fetchTrade = async () => {
      try {
        const response = await fetch(
          'https://instant-chain.onrender.com/api/v1/trades/user/trades',
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

    const handleEdit = (trade) => {
      setSelectedTrade(trade);
      setEditedTrade(trade); // Set the initial values for editing
      setModalType('edit');
      setModalVisible(true);
    };
  
    const handleDelete = (trade) => {
      setSelectedTrade(trade);
      setModalType('delete');
      setModalVisible(true);
    };
  
    const confirmEdit = async () => {
      if (!selectedTrade?._id) {
        console.log('_id is missing');
        return;
      }
      
      try {
        const response = await fetch(`https://instant-chain.onrender.com/api/v1/trades/trade/${selectedTrade._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editedTrade),
        });
    
        if (response.ok) {
          console.log('Edited trade:', editedTrade);
          setModalVisible(false);
          fetchTrade();
        } else {
          const error = await response.json();
          console.error('Error editing trade:', error);
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    };
    
  
    const confirmDelete = async () => {
      if (!selectedTrade?._id) {
        console.log('No Trade Selected');
        return;
      }
      try {
        const response = await fetch(`https://instant-chain.onrender.com/api/v1/trades/trade/${selectedTrade._id}`,{
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        if (response.ok) {
          console.log('Deleted trade ID:', selectedTrade._id);
          setModalVisible(false);
          fetchTrade();
        }else{
          const error = await response.json();
          console.error('Error deleting trade:', error);
        }
      } catch (error) {
        console.error( error);
        
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
          <FlatList
            data={trades}
            renderItem={({ item }) => (
              <View className='flex-row items-center justify-between'
              >
                <View className="flex-row items-center justify-between my-5">
                  <View className="gap-2">
                    <Text className="text-lg">Status: {item.status}</Text>
                    <Text className="text-xl">Price: {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(item.price)}</Text>
                    <Text>Quantity Listed: {item.quantity}</Text>
                    <Text>Trade Type: {item.tradeType}</Text>
                    <Text>Created At: {new Intl.DateTimeFormat('en-NG', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(item.createdAt))}</Text>
                    <Text>Updated At: {new Intl.DateTimeFormat('en-NG', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(item.updatedAt))}</Text>
                    <Text>Trade ID: {item._id}</Text>
                  </View>
                </View>

                <View className="items-center gap-[10px]">
                <TouchableOpacity
                  className="border-[1px] border-red-400 px-[25px] py-[5px] rounded-lg"
                  onPress={() => handleEdit(item)}
                >
                  <Text>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="border-[1px] border-red-400 px-[20px] py-[5px] rounded-lg"
                  onPress={() => handleDelete(item)}
                >
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
              </View>
            )}
            ListEmptyComponent={
              <View className="flex justify-center items-center">
                <Text>No trades available.</Text>
              </View>
            }
          />
        </View>
        {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center p-[30px] bg-black bg-opacity-50">
          <View className="w-full bg-white p-5 rounded-lg">
            {modalType === 'edit' ? (
              <View className='gap-[15px] items-center'>
                <Text className="text-lg font-bold mb-3">Edit Trade</Text>
                <View className='flex-row items-center gap-[20px]'>
                  <Text className='font-semibold text-[18px]'>Price</Text>
                <TextInput
                style={{width: windowWidth * 0.63}}
                  className="border border-[#d1d4df] rounded-xl px-[15px]"
                  placeholder="Price"
                  keyboardType='numeric'
                  value={editedTrade.price?.toString()}
                  onChangeText={(text) => setEditedTrade({ ...editedTrade, price: text })}
                />
                </View>
                <View className='flex-row items-center gap-[10px]'>
                  <Text className='font-semibold text-[16px]'>Quantity</Text>
                    <TextInput
                      style={{width: windowWidth * 0.60}}
                      className="border border-[#d1d4df] rounded-xl px-[15px]"
                      placeholder="Quantity"
                      keyboardType='numeric'
                      value={editedTrade.quantity?.toString()}
                      onChangeText={(text) => setEditedTrade({ ...editedTrade, quantity: text })}
                    />
                </View>
                <TouchableOpacity className='bg-[#FFAB10] w-full items-center p-[8px] rounded-xl' onPress={confirmEdit}>
                  <Text>Save Changes</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <Text className="text-lg font-bold mb-3">Confirm Delete</Text>
                <Text>Are you sure you want to delete this trade?</Text>
                <View className="flex-row justify-between mt-3">
                  <Button title="Cancel" onPress={() => setModalVisible(false)} />
                  <Button title="Confirm" onPress={confirmDelete} color="red" />
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>

      </View>
    );
  }