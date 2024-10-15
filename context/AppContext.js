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
      const token = AsyncStorage.getItem("token");
      return token ? token : null;
    })

    function getUser(){
      const userToken = AsyncStorage.getItem("token");
      if(userToken){
        setIsAuthenticated(true);
        setUser(userToken);
      }else{
        setIsAuthenticated(false);
        setUser(null);
      }
    }


  //  useEffect(() => {
  //    getUser()
  //  }, [])
   


  return (
    <AppContext.Provider value={{isAuthenticated, setIsAuthenticated, changeColor, bgColor, textColor, user, setUser}} >
        {children}
    </AppContext.Provider>
  );
};