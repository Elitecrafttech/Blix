import React, { useState, useEffect } from 'react'
import { createContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AppContext = createContext();

export function AppContextProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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
      return token.token ? JSON.parse(token.token) : null;
    })

    const tk = JSON.parse(user)
    console.log("token ",tk);
    const [userData, setUserData] = useState({});
    const getUserDetails = async()=>{
      const userd = await fetch('https://instant-chain.onrender.com/dashboard', {
          headers: {
              'Authorization': `Bearer ${tk.token}`,
              "content-type":"application/json" 
          }
      });
      if(userd.ok){
          const data = await userd.json();
          setUserData(data)
          console.log(data);
          // console.log(data);

          // setUser(data);
      }else{
          const data = await userd.json();
          console.log(data);
          
      }
  }


   useEffect(() => {
    if(user){
      AsyncStorage.setItem("tk", JSON.stringify(user))
      setUser(JSON.stringify(user))
      console.log("user's token", user);
      setIsAuthenticated(true);
    }else{
      console.log("No token");
      
      AsyncStorage.removeItem("tk")
      setIsAuthenticated(false);
    }
   }, [])
   


  return (
    <AppContext.Provider value={{isAuthenticated, setIsAuthenticated, changeColor, bgColor, textColor, user, setUser, userData, setUserData, getUserDetails}} >
        {children}
    </AppContext.Provider>
  );
};