import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import ProgressBar from '../components/ProgressBar';
import { splashIllustration } from '../assets';

export type SplashProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: SplashProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Intro');
    }, 1200);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={splashIllustration} resizeMode="contain" style={styles.illustration} />
      <Text style={styles.label}>Loading brands...</Text>
      <View style={{ width: '100%', marginTop: 16 }}>
        <ProgressBar value={90} height={6} trackColor="#E5E7EB" fillColor="#111" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  illustration: {
    width: 300,
    height: 300,
    marginBottom: 32,
  },
  label: {
    fontSize: 18,
    color: '#111',
    fontWeight: '700',
    marginBottom: 12,
  },
});
