import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WatermarEmbedingScreen from './src/screens/WatermarkEmbedingScreen';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/Homescreen';
import ProfileScreen from './src/screens/ProfileScreen';
import Gallery from './src/screens/Gallery';
import WatermarkDetectionScreen from './src/screens/WatermarkDetectionScreen';
import type { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"   // 초기 화면을 Splash로 설정
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        {/* <Stack.Screen name="WatermarkEmbeding" component={WatermarEmbedingScreen} /> */}
        <Stack.Screen name="Gallery" component={Gallery} />
        <Stack.Screen name="WatermarkDetection" component={WatermarkDetectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
