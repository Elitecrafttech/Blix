import { View, Text, Dimensions, Pressable, ScrollView, Image, Platform, TextInput, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'; 
import * as ImagePicker from 'expo-image-picker';


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Sellerproof() {

  const [hash, setHash] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (libraryStatus.status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }

        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraStatus.status !== 'granted') {
          alert('Sorry, we need camera permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImages = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Restrict to images only
        allowsMultipleSelection: true, // Enable multiple image selection
        allowsEditing: false, // Disable editing to avoid issues
        quality: 1,
      });

      if (!result.canceled) {
        // Map through the assets array to extract all image URIs
        const selectedImages = result.assets.map(asset => asset.uri);
        setImages(selectedImages); // Set state with an array of image URIs
      }
    } catch (error) {
      console.log(error);
      alert('An error occurred while picking the images.');
    }
  };

   


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
    <ScrollView className='w-[100%] bg-white'>
      <View style={{padding: windowWidth * 0.05, gap: 50, height: dimensions.screen}}>
          <View className='gap-[10px]'>
            <Text className='text-[20px] text-red-500'>Important Notice :</Text>
            <View className='gap-[10px]'>
              <Text className='text-[18px]'>For crypto proof of sold require the crypto transaction Hash with image</Text>
              <Text className='text-[18px]'>for paypal / payonerr the proof of sold require transaction ID with image</Text>
            </View>
          </View>
        <View className='items-center gap-[40px]'>
            <Text className='font-bold text-[23px] capitalize text-center'>enter proof of sold</Text>
          <View>
          <TextInput className='border-[1px] border-[#d1d4df] rounded-xl p-[10px] placeholder:text-[17px] placeholder:text-[gray]' style={{width: windowWidth * 0.90}}
                placeholder='Crypto Trxn Hash OR Sold ID'
                value={hash}
                onChangeText={(text) => setHash(text.replace(/\s/g, ''))}
                />
          </View>
          <View>
            <TouchableOpacity className='bg-[#FFAB10] items-center py-[7px] px-[30px]' onPress={pickImages}>
              <Text className='text-white font-bold uppercase'>Upload Proof Of sold image</Text>
            </TouchableOpacity>

            <View className='flex-row flex-wrap py-[50px] items-center justify-center' >
              {/* Render selected images */}
              {images.length > 0 && images.map((imageUri, index) => (
                <Image key={index} source={{ uri: imageUri }}  className='w-[100px] h-[100px] m-[10px] rounded-[10px]' />
              ))}
            </View>
          </View>
        </View>

      <Pressable className='bg-[#FFAB10] rounded-xl p-[8px]'>
          <Text className='text-center capitalize text-[20px] text-white' >submit</Text>
      </Pressable>
    </View>
    </ScrollView>
  );
};
