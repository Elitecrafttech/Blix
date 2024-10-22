import { View, Text, Dimensions, Pressable, ScrollView} from 'react-native'
import { useEffect, useState } from 'react';


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Airtimecheckout() {

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
         <ScrollView className='w-[100%] py-[50px] bg-white' style={{width: windowWidth, height: windowHeight - 60}}>
          <View style={{padding: windowWidth * 0.05, gap: 100, height: dimensions.screen}}>
                <View className='gap-[50px]'>
                   <Text className='capitalize text-center font-semibold text-[25px] '>airtime</Text>
                
                    <View className=' gap-[100px] px-[10px] py-[20px]'>
                    
                        <View className='items-center gap-[10px]'>
                            <Text className='capitalize text-[18px]'>amount</Text>
                            <Text className='font-bold text-[25px] capitalize'>n10,000.00</Text>
                            <Text className='capitalize text-[18px]'>available balance: n20,000.00</Text>    
                        </View>
                        
                        <View className=' gap-[15px]'>
                            <View className='flex-row justify-between'>
                                <Text className='capitalize text-[17px]'>phone n0.</Text>
                                <Text className='text-[16px]'>+234 91 6824 3714</Text>
                            </View>
                            <View className='flex-row justify-between'>
                                <Text className='capitalize text-[17px]'>provider</Text>
                                <Text style={{textTransform: 'uppercase', fontSize: 17}}>mtn ng</Text>
                            </View>
                            <View className='flex-row justify-between'>
                                <Text className='capitalize text-[17px]'>amount to be paid</Text>
                                <Text className='capitalize text-[17px]'>n10,000.40</Text>
                            </View>
                            
                        </View>                     
                    </View>
                    <Pressable className='bg-[#FFAB10] rounded-xl p-[8px]'>
                     <Text className='text-center capitalize text-[20px] text-white'>pay now</Text>
                    </Pressable>
                </View>
                
          </View>
        </ScrollView>
  );
};