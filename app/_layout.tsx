import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView} from 'react-native-gesture-handler'
import "../global.css"


import { useColorScheme } from '@/hooks/useColorScheme';
import { AppContextProvider } from '../context/AppContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
    <AppContextProvider>
      <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="Signin" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="Register" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="Profile" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="Editinfo" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="Accountsecurity" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="Resetpassword" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="Resetpin" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="Helpsupport" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="Legalpolicy" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="PeerToPeer" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="Tradecrypto" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="Tradedeatails" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="Forgetpassword" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="+not-found" /> */}
        {/* <Stack.Screen name="dashboard"  options={{ headerShown: false }}/> */}
      </Stack>
    </AppContextProvider>
    </GestureHandlerRootView>
  );
}