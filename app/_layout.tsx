import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import "../global.css"


import { useColorScheme } from '@/hooks/useColorScheme';
<<<<<<< HEAD
import { AppContextProvider } from '../context/AppContext';
=======
import { AppContextProvider } from '@/context/AppContext';
import React from 'react';
>>>>>>> 3721fc36d28be007415ac29e63d192cb00d83f7a

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
      {/* <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}> */}
      <Stack>
<<<<<<< HEAD
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="Signin" options={{ headerShown: false }} />
        <Stack.Screen name="Register" options={{ headerShown: false }} />
        <Stack.Screen name="Profile" options={{ headerShown: false }} />
        <Stack.Screen name="Editinfo" options={{ headerShown: true }} />
        <Stack.Screen name="Accountsecurity" options={{ headerShown: true }} />
        <Stack.Screen name="+not-found" />
=======
        <Stack.Screen name="dashboard"  />
        <Stack.Screen name="(tabs)" options={{ headerShown: false, title: 'onbording' }} />
        {/* <Stack.Screen name="+not-found" options={{ title: 'Page Not Found' }} /> */}
        {/* <Stack.Screen name="+not-" options={{ title: 'Page Not Found' }} /> */}
>>>>>>> 3721fc36d28be007415ac29e63d192cb00d83f7a
      </Stack>
    {/* </ThemeProvider> */}
    </AppContextProvider>
  );
}