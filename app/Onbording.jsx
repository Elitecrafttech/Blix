import { useEffect, useState } from 'react'; 
import { useNavigation } from 'expo-router';
import { View, Text, Image, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Status from '@/components/Status';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Onboarding() {
  const navigation = useNavigation();

    const handleSignin = () => {
        navigation.navigate('Signin');
    }
    const handleRegister = () => {
        navigation.navigate('Register');
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
      <View className='flex-[1] items-center justify-center bg-white'>
        <SafeAreaView>
          <Status />
        <View style={{height: dimensions.screen}}>
        <View style={{alignItems: "center", padding: windowWidth * 0.05}}>
          <Image source={require('@/assets/images/onboarding.png')} />
          <View style={{gap: 30, marginVertical: windowHeight * 0.02}}>
            <Text className='text-[24px] font-bold text-center'>
              Never miss a moment and strengthen your bonds
            </Text>
            <Text className='text-[17px] text-center px-10'>
              Allowing you to connect with your loved ones effortlessly, whether through calls, messages, or social media.
            </Text>
          </View>
        </View>
          <View className='items-center flex-row justify-center gap-[40px]' style={{marginTop: windowHeight * 0.05}}>
          <Pressable className='border-[1px] border-[#FFAB10]  p-[12px] rounded-[18px]  bg-[white]' style={{width: windowWidth * 0.35}}  onPress={handleSignin}>
            <Text className='text-[#FFAB10] text-[16px] text-center'  >Sign In</Text>
          </Pressable>
          
          <Pressable className='bg-[#FFAB10]  p-[12px] rounded-[18px] ' style={{width: windowWidth * 0.35}} onPress={handleRegister}>
          <Text className='text-center text-[16px] text-[white] '  >Register</Text>
          </Pressable>
          </View>
      </View>
      </SafeAreaView>
      </View>
    );
  };