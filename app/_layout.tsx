import { DarkTheme, DefaultTheme, ThemeProvider, NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useContext, useEffect } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import "../global.css"

import { useColorScheme } from '@/hooks/useColorScheme';
import { AppContextProvider, AppContext } from '../context/AppContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const {isAuthenticated} = useContext(AppContext)

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AppContextProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="dashboard" options={{ headerShown: false }} />
            <Stack.Screen name="Signin" options={{ headerShown: false }} />
            <Stack.Screen name="Register" options={{ headerShown: false }} />
            <Stack.Screen name="Airtimestatus" options={{ headerShown: false }} />
            <Stack.Screen name="Datastatus" options={{ headerShown: false }} />
            <Stack.Screen name="Editinfo" options={{ headerShown: false }} />
            <Stack.Screen name="Accountsecurity" options={{ headerShown: false }} />
            <Stack.Screen name="Helpsupport" options={{ headerShown: false }} />
            <Stack.Screen name="Kyc" options={{ headerShown: false }} />
            <Stack.Screen name="Legalpolicy" options={{ headerShown: false, title: "Legal Policy" }} />
          </Stack>
        </AppContextProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
