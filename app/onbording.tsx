import { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, Dimensions } from 'react-native';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Onboarding() {
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
    <View className='flex-[1] items-center justify-center'>
      <View>
      <View style={{alignItems: "center", padding: windowWidth * 0.05}}>
        <Image source={require('@/assets/images/onboarding.png')} />
        <View style={{gap: 30, marginVertical: windowHeight * 0.02}}>
          <Text className='text-[24px] font-bold text-center'>
            Never miss a moment and strengthen your bonds
          </Text>
          <Text className='text-[17px] text-center'>
            Allowing you to connect with your loved ones effortlessly, whether through calls, messages, or social media.
          </Text>
        </View>
      </View>
        <Pressable className='items-center flex-row justify-center gap-[40px]' style={{marginTop: windowHeight * 0.05}}>
          <Text className='bg-[#F6F8FE] border-[1px] border-[#FFAB10] text-[#FFAB10] text-[16px] p-[12px] rounded-[18px] text-center' style={{width: windowWidth * 0.35}}>Sign In</Text>

          <Text className='bg-[#FFAB10] text-[white] text-[16px] p-[12px] rounded-[18px] text-center' style={{width: windowWidth * 0.35}}>Register</Text>
        </Pressable>
    </View>
    </View>
  );
}
