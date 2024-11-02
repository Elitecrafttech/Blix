import { View, Text, Dimensions, ScrollView, } from 'react-native'
import { useEffect, useState } from 'react'; 


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function TermsAndCondition() {
   


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
    <ScrollView className='w-[100%] pb-[50px] bg-white'>
      <View style={{padding: windowWidth * 0.05, height: dimensions.screen}}>
        <View className='flex-col gap-[10px]'>

          <View className='gap-[10px]'>
            <Text className='font-bold text-2xl'>Blix App Terms and Conditions</Text>
            <Text className='text-lg text-gray-500'>Effective Date: 29/20/2024</Text>
          </View>

          <Text className='text-lg leading-[30px]'>Welcome to the Blix App! By using our services, you agree to be bound by the following terms and conditions. Please read these terms carefully before using the app. If you do not agree with any part of these terms, please refrain from using our services.</Text>

          <View className='gap-[10px]'>
            <Text className='text-xl font-semibold'>1. Acceptance of Terms</Text>
            <Text className='text-lg leading-[30px]'>By accessing or using the Blix App, you agree to comply with these terms and conditions, as well as any additional guidelines, policies, or rules we may publish. This is a legally binding agreement between you and Blix.</Text>
          </View>

          <View className='gap-[10px]'>
            <Text className='text-xl font-semibold'>2. Eligibility</Text>
            <Text className='text-lg leading-[30px]'>
                To use the Blix App, you must:{'\n'}

                Be at least 18 years old or have parental consent if younger.{'\n'}

                Provide accurate information when registering.{'\n'}

                Agree to comply with all applicable laws and regulations.{'\n'}
            </Text>
          </View>

          <View className='gap-[10px]'>
            <Text className='text-xl font-semibold'>3. Services</Text>
            <View>
                <Text className='text-lg leading-[30px]'>
                    Blix provides the following services:{'\n'}

                    Purchase of mobile data bundles{'\n'}

                    Airtime recharge for various networks{'\n'}

                    Payment for cable TV subscriptions{'\n'}

                    Payment of electricity bills{'\n'}

                    Crypto P2P Service {'\n'}

                </Text>
                <Text>We reserve the right to modify or discontinue any service at any time, with or without notice.</Text>
            </View>
          </View>

          <View className='gap-[10px]'>
            <Text className='text-xl font-semibold'>4. Account Registration</Text>
            <Text className='text-lg leading-[30px]'>To access our services, you may need to create an account. You are responsible for maintaining the confidentiality of your login information and for all activities under your account. Please notify us immediately of any unauthorized use.</Text>
          </View>

          <View className='gap-[10px]'>
            <Text className='text-xl font-semibold'>5. Payment and Transactions</Text>
            <Text className='text-lg leading-[30px]'>
                Payment Method: Payments can be made using supported payment methods on the app. Ensure that your payment information is accurate and up-to-date.{'\n'}

                Transaction Fees: Certain transactions may incur fees, which will be clearly displayed before you complete the transaction.{'\n'}

                Refunds: Refunds are subject to our refund policy. Please refer to the app’s Refund Policy section for detailed information.{'\n'}

                Transaction Limits: Blix reserves the right to set transaction limits based on security and risk management criteria.{'\n'}
            </Text>
          </View>

          <View className='gap-[10px]'>
            <Text className='text-xl font-semibold'>6. User Responsibilities</Text>
            <Text className='text-lg leading-[30px]'>
                You agree not to:{'\n'}

                Use Blix for any fraudulent or unlawful purposes.{'\n'}

                Interfere with the security or functionality of the app.{'\n'}

                Attempt to hack or breach the app’s security measures.{'\n'}
            </Text>
          </View>

          <View className='gap-[10px]'>
            <Text className='text-xl font-semibold'>7. Privacy</Text>
            <Text className='text-lg leading-[30px]'>We are committed to protecting your privacy. Please refer to our Privacy Policy for detailed information on how we collect, use, and protect your data.</Text>
          </View>

          <View className='gap-[10px]'>
            <Text className='text-xl font-semibold'>8. Intellectual Property</Text>
            <Text className='text-lg leading-[30px]'>All content, logos, trademarks, and graphics within the Blix App are the property of Blix and its licensors. You agree not to copy, modify, or distribute any materials without our permission.</Text>
          </View>

          <View className='gap-[10px]'>
            <Text className='text-xl font-semibold'>9. Limitation of Liability</Text>
            <Text className='text-lg leading-[30px]'>Blix is not liable for any indirect, incidental, or consequential damages resulting from your use of the app. We are also not responsible for delays, interruptions, or failures beyond our control, such as network issues or third-party service failures.</Text>
          </View>

          <View className='gap-[10px]'>
            <Text className='text-xl font-semibold'>10. Modification of Terms</Text>
            <Text className='text-lg leading-[30px]'>Blix reserves the right to update these terms and conditions at any time. Continued use of the app after modifications implies acceptance of the new terms.</Text>
          </View>

          <View className='gap-[10px]'>
            <Text className='text-xl font-semibold'>11. Termination</Text>
            <Text className='text-lg leading-[30px]'>We may terminate or suspend your access to Blix without prior notice if we suspect a violation of these terms or any illegal activity.</Text>
          </View>

          <View className='gap-[10px]'>
            <Text className='text-xl font-semibold'>12. Governing Law</Text>
            <Text className='text-lg leading-[30px]'>These terms and conditions are governed by the laws of Nigeria/Kwara State, without regard to its conflict of law provisions.</Text>
          </View>

          <View className='gap-[10px]'>
            <Text className='text-xl font-semibold'>13. Contact Us</Text>
            <Text className='text-lg leading-[30px]'>For any questions or concerns regarding these terms, please contact our support team through the app or at +2349051478880, +2348149029393.{'\n'}</Text>
            <Text className='text-base leading-[30px]'>By using the Blix App, you confirm that you have read, understood, and agreed to these Terms and Conditions.</Text>
          </View>

        </View>
    </View>
    </ScrollView>
  );
};
