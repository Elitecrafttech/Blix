import { View, Text, Dimensions, ScrollView, } from 'react-native'
import { useEffect, useState } from 'react'; 


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function PrivacyAndPolicy() {
   


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
                    <Text className='font-bold text-2xl'>Blix App Privacy Policy</Text>
                    <Text className='text-lg text-gray-500'>Effective Date: 29/10/2024</Text>
                </View>

                <Text className='text-lg leading-[30px]'>This Privacy Policy describes how Blix ("we," "our," or "us") collects, uses, and shares information about you when you use our services through the Blix App. Your privacy is important to us, and we are committed to protecting it by handling your personal information responsibly.</Text>

                <View className='gap-[10px]'>
                    <Text className='text-xl font-semibold'>1. Information We Collect</Text>
                    <Text className='text-lg leading-[30px]'>
                        
                        We collect information to provide better services and improve user experience. The information we collect includes:{'\n'}

                        Personal Information: When you register, we may collect personal details such as your name, email address, phone number, and payment information.{'\n'}

                        
                        Transaction Information: When you make transactions through the app (e.g., buying airtime, data, cable subscriptions, electricity bills or P2P Transaction), we collect details related to those transactions.{'\n'}

                        Device Information: We may collect information about the device you use to access the Blix App, including the type of device, operating system, and unique device identifiers.{'\n'}

                        Usage Data: We collect information on how you interact with our app, including pages visited, features used, and the frequency and duration of your activities.{'\n'}

                        Location Information: With your permission, we may collect your location data to personalize services, such as showing relevant promotions based on your area.{'\n'}
                    </Text>
                </View>

                <View className='gap-[10px]'>
                    <Text className='text-xl font-semibold'>2. How We Use Your Information</Text>
                    <Text className='text-lg leading-[30px]'>
                        We use the information collected for various purposes, including to:{'\n'}

                        Provide, operate, and improve the Blix App.{'\n'}

                        Process transactions and manage your account.{'\n'}

                        Communicate with you about promotions, offers, and app updates.{'\n'}

                        Ensure the security and integrity of our app and protect against unauthorized or fraudulent activities.{'\n'}

                        Personalize user experience based on usage patterns and preferences.{'\n'}

                        Comply with legal requirements and obligations.{'\n'}
                    </Text>
                </View>

                <View className='gap-[10px]'>
                    <Text className='text-xl font-semibold'>3. How We Share Your Information</Text>
                    <Text className='text-lg leading-[30px]'>
                        We may share your information with third parties in the following circumstances:{'\n'}

                        Service Providers: We may work with trusted third-party vendors who help us with payment processing, customer support, app analytics, and security.{'\n'}

                        Legal Compliance: We may disclose your information if required by law or in response to a valid request by public authorities (e.g., a court or government agency).{'\n'}

                        Business Transfers: If Blix is involved in a merger, acquisition, or asset sale, your personal information may be transferred to the acquiring entity.{'\n'}

                        We do not sell or rent your personal information to third parties for marketing purposes.{'\n'}
                    </Text>
                </View>

                <View className='gap-[10px]'>
                    <Text className='text-xl font-semibold'>4. Data Security</Text>
                    <Text className='text-lg leading-[30px]'>We implement technical and organizational security measures to protect your information against unauthorized access, loss, or misuse. However, no system can be completely secure, so we cannot guarantee absolute security.</Text>
                </View>

                <View className='gap-[10px]'>
                    <Text className='text-xl font-semibold'>5. Data Retention</Text>
                    <Text className='text-lg leading-[30px]'>We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy unless a longer retention period is required or permitted by law.</Text>
                </View>

                <View className='gap-[10px]'>
                    <Text className='text-xl font-semibold'>6. Your Rights</Text>
                    <Text className='text-lg leading-[30px]'>
                        Depending on your location, you may have rights related to your personal data, such as:{'\n'}

                        Access and Correction: You can access and update your personal information in your account settings.{'\n'}

                        Deletion: You can request deletion of your data, subject to legal obligations or contractual agreements.{'\n'}

                        Opt-out of Marketing Communications: You can unsubscribe from promotional emails by following the instructions in the emails.{'\n'}
                    </Text>
                </View>

                <View className='gap-[10px]'>
                    <Text className='text-xl font-semibold'>7. Children’s Privacy</Text>
                    <Text className='text-lg leading-[30px]'>The Blix App is not intended for use by individuals under 18 years of age. We do not knowingly collect information from children. If we learn that we have inadvertently collected information from a child, we will take steps to delete it as soon as possible.</Text>
                </View>

                <View className='gap-[10px]'>
                    <Text className='text-xl font-semibold'>8. Changes to this Privacy Policy</Text>
                    <Text className='text-lg leading-[30px]'>We may update this Privacy Policy periodically to reflect changes in our practices or for legal or regulatory reasons. We will notify you of any significant changes by updating the "Effective Date" and posting a notice within the app.</Text>
                </View>

                <View className='gap-[10px]'>
                    <Text className='text-xl font-semibold'>9. Contact Us</Text>
                    <Text className='text-lg leading-[30px]'>If you have questions or concerns about this Privacy Policy, please contact us at +2349051478880, +2348149029393{'\n'}</Text>
                    <Text className='text-base leading-[30px]'>By using the Blix App, you acknowledge that you have read, understood, and agree to this Privacy Policy.</Text>
                </View>


          
            </View>
        </View>
    </ScrollView>
  );
};