import { View, Text, Dimensions, Pressable, ScrollView} from 'react-native'
import { useContext, useEffect, useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { AppContext } from '@/context/AppContext';


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Trxhistory() {

    const { transaction } = useContext(AppContext)

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
         <ScrollView className='w-[100%] bg-white'  style={{width: windowWidth, height: windowHeight - 60}}>
          <View style={{padding: windowWidth * 0.05, paddingBottom: windowWidth * 0.25, gap: 100, height: dimensions.screen}}>
            <View>
                {/* if theres is a transaction it returns te transaction, else it will not return any transaction */}
                {
              transaction.length > 0 ? transaction.map((t, index) => (
                <View className='gap-5 py-[15px]' key={index}>

                <View className='flex-row gap-[30px] w-full items-center'>
                  <View className='rounded-full border border-gray-300 p-[5px]'>
                    <Feather name={t.transType === "airtime" || t.transType === "data" ? "phone" : "activity"} size={10} color="black" />
                  </View>

                  <View className='flex-grow  items-center gap-[20px]'>
                    <View className='gap-2'>
                      <Text className='text-[20px] font-bold text-[#292828]'>{t.title}</Text>
                      <Text className='text-[#0000005C] text-[13px]'>{t.description}</Text>
                    </View>
                  </View>

                  <Text className={`text-[15px] font-bold ${t.type === "debit" ? "text-[#FFAB10]" : "text-green-400"}`}>{t.type === "credit" ? "+" : "-"} N{t.amount}</Text>
                </View>

                </View>
              )) : 

              <View className='w-[100%] justify-center items-center '>
                 <Text className='text-[17px] font-bold'>No Transaction Made</Text>
              </View>
            }
            </View>
               
          </View>
        </ScrollView>
  );
};