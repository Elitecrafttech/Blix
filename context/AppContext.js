import React, { useState, useEffect } from 'react'
import { createContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useNavigation } from 'expo-router';
import ToastManager, { Toast } from 'toastify-react-native';
export const AppContext = createContext();

export function AppContextProvider({ children }) {
  const navigation = useNavigation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    const [bgColor, setBgColor] = useState(()=>{
      const bg = AsyncStorage.getItem('bgColor');
      return bg ? bg.toString() : "white"; 
    })

    const [textColor, setTextColor] = useState(()=>{
      const textColor = AsyncStorage.getItem('textColor');
      return textColor ? textColor.toString() : "black"; 
    })

    const changeColor = (bg, text)=>{
      if(bg === "white"){
        setBgColor(bg);
      setTextColor(text);
      AsyncStorage.setItem('bgColor', bg);
      AsyncStorage.setItem('textColor', text);
      }else{
        setBgColor("black");
      setTextColor("white");
      AsyncStorage.setItem('bgColor', "black");
      AsyncStorage.setItem('textColor', "white");
      }
    } 

    const [user, setUser] = useState(()=>{
      const token = AsyncStorage.getItem("tk");      
      return token.token ? token : null;
    })

    const tk = JSON.parse(user)
    console.log("token ",tk);
    const [userData, setUserData] = useState({});
  const [transaction, setTransaction] = useState([])
  

    const getUserDetails = async()=>{
      // console.log("user's token is " + tk.token);
      // console.log("user's tokens is " + tk);
      
      const userd = await fetch('https://instant-chain.onrender.com/dashboard', {
          headers: {
              'Authorization': `Bearer ${tk}`,
              "content-type":"application/json" 
          }
      });
      if(userd.ok){
          const data = await userd.json();
          setUserData(data)
          setTransaction(data.transactions)
          setIsLoading(false)
          // console.log(transaction);
          
          // console.log(data);

      }else{
          const data = await userd.json();
          console.log(data);
          setIsLoading(false)
          
      }
  }

const logout = async()=>{
  await AsyncStorage.removeItem("tk")
  setIsAuthenticated(false);
  setUser(null);
  // router.push('Signin');
  navigation.navigate('Signin');
  navigation.reset({routes:[{name: 'Signin'}]})
}

   useEffect(() => {
    if(user){
      AsyncStorage.setItem("tk", JSON.stringify(user))
      setUser(JSON.stringify(user))
      console.log("user's token", user);
      setIsAuthenticated(true);
      getUserDetails()
    }else{  
      AsyncStorage.removeItem("tk")
      setIsAuthenticated(false);
      router.push('Signin');
    }
   }, [])
   


  return (
    <AppContext.Provider value={{isAuthenticated, logout, setIsAuthenticated, changeColor, bgColor, textColor, user, setUser, userData, setUserData, getUserDetails, transaction, isLoading }} >
        {children}
    </AppContext.Provider>
  );
};