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








// import {
//     View,
//     Text,
//     Dimensions,
//     TouchableOpacity,
//     FlatList,
//   } from 'react-native';
//   import { useEffect, useState, useContext } from 'react';
//   import { useNavigation } from 'expo-router';
//   import { AppContext } from '@/context/AppContext';
  
//   export default function Tradepaypal() {
//     const navigation = useNavigation();
//     const { user } = useContext(AppContext);
//     const token = JSON.parse(user);
  
//     const [trades, setTrades] = useState([]);
//     const [dimensions, setDimensions] = useState({
//       window: Dimensions.get('window'),
//       screen: Dimensions.get('screen'),
//     });
  
//     const fetchTrade = async () => {
//       try {
//         const response = await fetch(
//           'https://instant-chain.onrender.com/api/v1/trades/trades/paypal',
//           {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
  
//         if (response.ok) {
//           const data = await response.json();
//           console.log('Fetched trades:', data.trades);
//           setTrades(data.trades);
//         } else {
//           const error = await response.json();
//           console.error('Error fetching trades:', error);
//         }
//       } catch (error) {
//         console.error('Network error:', error);
//       }
//     };
  
//     useEffect(() => {
//       fetchTrade();
  
//       const subscription = Dimensions.addEventListener('change', ({ window, screen }) => {
//         setDimensions({ window, screen });
//       });
  
//       return () => subscription?.remove();
//     }, []);
  
//     const windowWidth = dimensions.window.width;
//     const windowHeight = dimensions.window.height;
  
//     return (
//       <View
//         className="w-full py-5 bg-white"
//         style={{ width: windowWidth, height: windowHeight - 60 }}
//       >
//         <View style={{ padding: windowWidth * 0.05, gap: 20 }}>
//           <FlatList
//             data={trades}
//             keyExtractor={(item) => item._id}
//             renderItem={({ item }) => (
//               <TouchableOpacity
//                 onPress={() => navigation.navigate('Singletrade/[id]', { id: item._id })}
//               >
//                 <View className="flex-row items-center justify-between my-5">
//                   <View className="gap-2">
//                     <Text className="text-lg">Seller: {item.user.username}</Text>
//                     <Text className="text-xl">Price: {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(item.price)}</Text>
//                     <Text>Quantity Available for sale: {item.quantity}</Text>
//                     <Text>Trade Type: {item.tradeType}</Text>
//                     <Text>Trade ID: {item._id}</Text>
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             )}
//             ListEmptyComponent={
//               <View className="flex justify-center items-center">
//                 <Text>No trades available.</Text>
//               </View>
//             }
//           />
//         </View>
//       </View>
//     );
//   }
  













// // import { View, Text, Dimensions, TouchableOpacity, ScrollView,} from 'react-native'
// // import { useEffect, useState, useContext } from 'react'; 
// // import { useNavigation} from 'expo-router';


// // const windowDimensions = Dimensions.get('window');
// // const screenDimensions = Dimensions.get('screen');

// // const Trade = [
// //     {
// //         id: 1,
// //         username: "user 1",
// //         amount: "#1000",
// //         quantity: "$100 - $500",
// //         button: "Buy"
// //     },
// //     {
// //         id: 2,
// //         username: "user 2",
// //         amount: "#1000",
// //         quantity: "$100 - $500",
// //         button: "Buy"
// //     },
// //     {
// //         id: 3,
// //         username: "user 3",
// //         amount: "#1000",
// //         quantity: "$100 - $500",
// //         button: "Buy"
// //     },
// // ]
// // export default function Tradepaypal() {
// //     const navigation = useNavigation();

// //     const paypal = () =>{
// //         navigation.navigate('Paypaldetails');
// //     }

// //     const [dimensions, setDimensions] = useState({
// //         window: windowDimensions,
// //         screen: screenDimensions,
// //         });
    
        
    
// //         useEffect(() => {
// //         const subscription = Dimensions.addEventListener(
// //             'change',
// //             ({ window, screen }) => {
// //                 setDimensions({ window, screen });
// //             },
// //             );
// //             return () => subscription?.remove();
// //         }, []);
        
// //         const windowWidth = dimensions.window.width;
// //         const windowHeight = dimensions.window.height;

// //   return (
// //     <ScrollView className='w-[100%] py-[50px] bg-white'  style={{width: windowWidth, height: windowHeight - 60}}>
// //           <View style={{padding: windowWidth * 0.05, gap: 100, height: dimensions.screen}}>
// //                 <View className='gap-[20px]'>
// //                     <View className='gap-[30px]'>
// //                         {Trade.map((data, index)=>(
// //                             <View className='flex-row items-center justify-between' key={index}>
// //                                 <View className='gap-[5px]'>
// //                                 <Text className='text-[18px]'>{data.username}</Text>
// //                                 <Text className='text-[25px]'>{data.amount}</Text>
// //                                 <Text>{data.quantity}</Text>
// //                                 </View>
// //                                 <TouchableOpacity>
// //                                  <Text className='border-[#FFAB10] border-[2px] p-[10px] text-center rounded-xl text-[#b6852a] w-[20vw] text-[17px]' onPress={paypal}>{data.button}</Text>
// //                                 </TouchableOpacity>
// //                             </View>  
// //                         ))}
// //                     </View>   
// //                 </View>
// //           </View>
// //         </ScrollView>
// //   )
// // }