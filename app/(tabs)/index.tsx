<<<<<<< HEAD
import { AppContext } from '@/context/AppContext'
import React, { useContext } from 'react'
import Onboarding from '../onbording';

export default function index() {
  const {isAuthenticated} = useContext(AppContext);

  return isAuthenticated ? "" : <Onboarding />;
=======
import { Image, StyleSheet, Platform, View, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import App from '@/components/App';

export default function HomeScreen() {
  return (
   
    <View>
      <App/>
    </View>
  );
>>>>>>> 597b610bb5813f5ef566735d2d782581562c5b8a
}
