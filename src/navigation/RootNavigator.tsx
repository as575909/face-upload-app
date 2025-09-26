import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import IntroScreen from '../screens/IntroScreen';
import FaceUploadScreen from '../screens/FaceUploadScreen';
import CapturePreviewScreen from '../screens/CapturePreviewScreen';
import UploadingScreen from '../screens/UploadingScreen';
import CaptureSuccessScreen from '../screens/CaptureSuccessScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="FaceUpload" component={FaceUploadScreen} />
        <Stack.Screen name="CapturePreview" component={CapturePreviewScreen} />
        <Stack.Screen name="Uploading" component={UploadingScreen} />
        <Stack.Screen name="CaptureSuccess" component={CaptureSuccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

