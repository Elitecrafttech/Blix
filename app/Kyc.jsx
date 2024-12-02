import { useContext, useState } from 'react';
import { Button, Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'
import { AppContext } from '@/context/AppContext';

export default function Kyc() {
  const {user} = useContext(AppContext)
  const tk = JSON.parse(user);

  const [image, setImage] = useState(null);
  const [filename, setFilename] = useState('');
  


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setFilename(result.assets[0].fileName);

      console.log(image);
      console.log(filename);
      
      
    }
  };

  const kycupload = async()=>{
try {
  if(!image){
    alert('No image selected')
    return
  }
  const formData = new formData()
  formData.append('document', {
    uri: image,
    name: filename,
    type: 'image/jpeg',
  });
  
  
  const response = await axios.post('https://instant-chain.onrender.com/upload-kyc', formData, {
    headers: {
      'Authorization': `Bearer ${tk}`,
      'Content-Type':'multipart/form-data',
    },
  })

  if(!response.data.message){
    alert('Something went wrong, please try again')
    return;
  }
  
  alert(response.data.message)
  console.log(response.data);
} catch (error) {
  console.log("new error: ", error.message);
  
}
    
  }

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <View>
        <TouchableOpacity className='mt-[50px] bg-amber-200 p-[15px]' onPress={kycupload}>
          <Text>submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});
