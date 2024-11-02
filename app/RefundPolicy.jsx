import { View, Text, Dimensions, ScrollView, } from 'react-native'
import { useEffect, useState } from 'react'; 


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Wallet() {
   


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
      <View style={{padding: windowWidth * 0.05, gap: 150, height: dimensions.screen}}>
        <View className='flex-col gap-[10px]'>

            <View className='gap-[10px]'>
                <Text className='font-bold text-2xl'>Blix App Refund Policy</Text>
                <Text className='text-lg text-gray-500'>Effective Date: 29/10/2024</Text>
            </View>

            <Text className='text-lg leading-[30px]'>Thank you for using the Blix App. We strive to provide reliable and secure transactions for data, airtime, cable subscriptions, electricity bill payments or funding of account. This Refund Policy explains our practices for issuing refunds and managing disputes. Please read this policy carefully before making any transactions.</Text>

            <View className='gap-[10px]'>
                <Text className='text-xl font-semibold'>1. Eligibility for Refunds</Text>
                <Text className='text-lg leading-[30px]'>
                    Refunds are generally granted under the following conditions:{'\n'}

                    Failed Transactions: If a payment fails or is not completed due to an error on our side, you may be eligible for a refund.{'\n'}

                    Failed Transactions: If a payment fails or is not completed due to an error on our side, you may be eligible for a refund.{'\n'}

                    Service Unavailability: If the service (e.g., data or airtime) purchased through Blix is not delivered due to system errors or technical issues, you may be eligible for a refund.{'\n'}
                </Text>
            </View>

            <View className='gap-[10px]'>
                <Text className='text-xl font-semibold'>2. Non-Refundable Transactions</Text>
                <Text className='text-lg leading-[30px]'>
                    Certain transactions are not eligible for refunds:{'\n'}

                    Successful Transactions: Transactions that have been successfully processed and delivered (e.g., data, airtime, cable, or electricity services) are non-refundable.{'\n'}

                    User Errors: Blix is not liable for errors made by the user, such as incorrect account numbers, wrong service provider selection, or mistaken purchases. Please double-check your details before confirming any transaction.{'\n'}

                    Promotional Services: Purchases made under promotional offers or discounts may be non-refundable unless otherwise stated in the promotion’s terms.{'\n'}
                </Text>
            </View>

            <View className='gap-[10px]'>
                <Text className='text-xl font-semibold'>3. Requesting a Refund</Text>
                <Text className='text-lg leading-[30px]'>
                    If you believe you are eligible for a refund, please follow these steps:{'\n'}

                    Contact Support: Contact Blix Customer Support within 48 hours of the transaction. Provide details such as the transaction ID, date, amount, and reason for the refund request.{'\n'}

                    Verification Process: Our team will review your request and verify the transaction status. Additional information may be requested to assist in the verification process.{'\n'}

                    Resolution Timeframe: We aim to process refund requests within 5-10 business days. Refunds will be issued to the original payment method if approved.{'\n'}
                </Text>
            </View>

            <View className='gap-[10px]'>
                <Text className='text-xl font-semibold'>4. Partial Refunds</Text>
                <Text className='text-lg leading-[30px]'>In certain cases, a partial refund may be provided based on the circumstances of the transaction and the service received. Blix reserves the right to determine eligibility for partial refunds on a case-by-case basis.</Text>
            </View>

            <View className='gap-[10px]'>
                <Text className='text-xl font-semibold'>5. Chargebacks and Disputes</Text>
                <Text className='text-lg leading-[30px]'>If you dispute a transaction by initiating a chargeback through your bank or payment provider, please note that it may take additional time for us to resolve the issue. We encourage you to contact Blix Customer Support before filing a chargeback to help expedite the resolution process.</Text>
            </View>

            <View className='gap-[10px]'>
                <Text className='text-xl font-semibold'>6. Changes to Refund Policy</Text>
                <Text className='text-lg leading-[30px]'>Blix reserves the right to update or modify this Refund Policy at any time. Any changes will be communicated within the app, and the "Effective Date" will be updated accordingly. Continued use of the app after any changes indicates your acceptance of the updated policy.</Text>
            </View>

            <View className='gap-[10px]'>
                <Text className='text-xl font-semibold'>7. Contact Us</Text>
                <Text className='text-lg leading-[30px]'>If you have any questions or concerns about this Refund Policy, please reach out to our Customer Support team at +2349051478880, +2348149029393.{'\n'}</Text>
                <Text className='text-base leading-[30px]'>By using the Blix App, you agree to this Refund Policy and understand that refunds will only be issued under the terms outlined above.</Text>
            </View>



        </View>
    </View>
    </ScrollView>
  );
};