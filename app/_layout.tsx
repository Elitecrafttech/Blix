import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
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
    <AppContextProvider>
      <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="Signin" options={{ headerShown: false }} />
        <Stack.Screen name="Register" options={{ headerShown: false }} />
        <Stack.Screen name="Profile" options={{ headerShown: false }} />
        <Stack.Screen name="Editinfo" options={{ headerShown: true }} />
        <Stack.Screen name="Accountsecurity" options={{ headerShown: true }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="dashboard"  options={{ headerShown: false }}/>
      </Stack>
    </AppContextProvider>
  );
}