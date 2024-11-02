import { View, Text, Dimensions, Pressable, ScrollView, Alert } from 'react-native';
import { useContext, useEffect, useState, useCallback } from 'react';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '@/context/AppContext';

const windowDimensions = Dimensions.get('window');

export default function Databundle() {
  const navigation = useNavigation();
  const { user } = useContext(AppContext);
  const tk = JSON.parse(user);

  const [provider, setProvider] = useState('mtn');
  const [planOptions, setPlanOptions] = useState([]); 
  const [selectedPlan, setSelectedPlan] = useState(''); 
  const [number, setNumber] = useState('');
  const [code, setCode] = useState('');
  const [amount, setAmount] = useState(0);
  // const [availability, setAvailability] = useState("");
  const [dimensions, setDimensions] = useState(windowDimensions);

  const fetchDataPackages = useCallback(async (selectedProvider) => {
    try {
      const response = await fetch("https://instant-chain.onrender.com/api/v1/trades/data-packages", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tk}`,
        },
        body: JSON.stringify({ provider: selectedProvider }),
      });
      if (response.ok) {
        const data = await response.json();
        setPlanOptions(data.packages || []); 
      } else {
        const error = await response.json();
        console.error(error);
        setPlanOptions([]); 
      }
    } catch (error) {
      console.error(error.message);
      setPlanOptions([]); 
    }
  }, [tk]);

  const checkout = async () => {
    if (!provider || !selectedPlan || !number || !code) {
      Alert.alert('Please fill all fields or select plan');
      return;
    }
    if(number.length < 11){
      Alert.alert('recheck the phone number and try again');
      return 
  }

    if (Number(amount) < 1) {
        Alert.alert('Please select plan option to continue');
        return;
      }

      // if (availability !== "available") {
      //   Alert.alert('This plan is not available');
      //   return;
      // }

      await AsyncStorage.setItem("amount", JSON.stringify(amount))
      await AsyncStorage.setItem("beneficiary", number)
      await AsyncStorage.setItem("provider", provider)
      await AsyncStorage.setItem("code", code)
      await AsyncStorage.setItem("plan", selectedPlan)

    navigation.navigate("Datacheckout")
  };

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  const handleProviderChange = (value) => {
    setProvider(value);
    setSelectedPlan(''); 
    setAmount(0); 
    fetchDataPackages(value);
  };

  const handlePlanChange = (planName) => {
    setSelectedPlan(planName);
    
    const selectedPlanData = planOptions.find((pl) => pl.name === planName);
    setAmount(selectedPlanData ? selectedPlanData.price : 0);
    setCode(selectedPlanData ? selectedPlanData.productCode : 0);
    // setAvailability(selectedPlanData ? selectedPlanData.status : null);
    
  };

  return (
    <ScrollView className="w-full py-12 bg-white" style={{ width: dimensions.width, height: dimensions.height - 60 }}>
      <View style={{ padding: dimensions.width * 0.05, gap: 100, minHeight: dimensions.height }}>
        <View className="gap-5 px-4 py-5">
          <View className="gap-12">
            <Text className="capitalize text-lg font-medium">Phone Number</Text>
            <TextInput
              className="border border-gray-300 rounded-xl p-2 placeholder-gray-500"
              style={{ width: dimensions.width * 0.81, height: dimensions.height * 0.06 }}
              placeholder="070 400 400 00"
              value={number}
              onChangeText={(text)=>{ const NumericText = text.replace(/[^0-9]/g, '').slice(0, 11); setNumber(NumericText)}}
              keyboardType="numeric"
            />

            <Text className="capitalize text-lg font-medium">Select Provider</Text>
            <View className='border border-gray-300 rounded-xl placeholder-gray-500'>
              <Picker
                selectedValue={provider}
                onValueChange={handleProviderChange}
                className=" h-12 w-full"
              >
                <Picker.Item label="Choose Option" value="" />
                <Picker.Item label="MTN" value="mtn" />
                <Picker.Item label="Glo" value="glo" />
                <Picker.Item label="Airtel" value="airtel" />
                <Picker.Item label="9mobile" value="9mobile" />
              </Picker>
            </View>

            <Text className="capitalize text-lg font-medium">Select Plan</Text>
            <View className='border border-gray-300 rounded-xl placeholder-gray-500'>
              <Picker
                selectedValue={selectedPlan}
                onValueChange={handlePlanChange}
                className=" h-12 w-full"
              >
                {Array.isArray(planOptions) && planOptions.map((pl) => (
                  <Picker.Item label={`${pl.name} (₦${pl.price})`} value={pl.name} key={pl.productCode} />
                ))}
              </Picker>
            </View>

            <View className="items-center gap-2">
              <Text className="capitalize text-lg">Amount</Text>
              <Text className="font-bold text-2xl">₦{amount.toFixed(2)}</Text> 
            </View>
          </View>
          <Pressable className="bg-yellow-500 rounded-xl p-2">
            <Text className="text-center capitalize text-lg text-white" onPress={checkout}>
              Continue
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
