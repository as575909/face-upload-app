import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import ProgressBar from '../components/ProgressBar';
import { checkRing } from '../assets';

export type UploadingProps = NativeStackScreenProps<RootStackParamList, 'Uploading'>;

export default function UploadingScreen({ navigation, route }: UploadingProps) {
  const imageUri = route.params?.imageUri;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(id);
          // Defer navigation to the next tick to avoid updating navigation container during render
          setTimeout(() => {
            navigation.replace('CaptureSuccess', { imageUri });
          }, 0);
          return 100;
        }
        return p + 10;
      });
    }, 250);
    return () => clearInterval(id);
  }, [navigation, imageUri]);

  return (
    <SafeAreaView style={styles.container}>
      
      <Image source={checkRing} style={styles.checkRing} />
      
      <Text style={styles.title}>Selfie captured perfectly!</Text>
      <Text style={styles.subtitle}>Let's build your own fashion avatar.</Text>
      <View style={{ width: '100%', marginTop: 10 }}>
        <ProgressBar value={progress} height={6} trackColor="#E5E7EB" fillColor="#111" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 24,
  },
  checkRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#2E7D32',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  checkMark: { fontSize: 40, color: '#2E7D32', lineHeight: 40 },
  title: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
    marginBottom: 12,
  },
});
