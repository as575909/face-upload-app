import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, Image } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import ProgressBar from '../components/ProgressBar';
import { checkRing } from '../assets';
import { Ionicons } from '@expo/vector-icons';

export type CaptureSuccessProps = NativeStackScreenProps<RootStackParamList, 'CaptureSuccess'>;

export default function CaptureSuccessScreen({ route, navigation }: CaptureSuccessProps) {
  const imageUri = route.params?.imageUri;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Pressable onPress={() => navigation.navigate('Intro')}>
          <Ionicons name="close" size={24} color="#111" />
        </Pressable>
      </View>
      <View style={styles.content}>
        <Image source={checkRing} style={styles.checkRing} />
        <Text style={styles.title}>Selfie captured perfectly!</Text>
        <Text style={styles.subtitle}>Let's build your own fashion avatar.</Text>
        <View style={{ width: '100%', marginTop: 16 }}>
          <ProgressBar value={100} height={6} trackColor="#E5E7EB" fillColor="#111" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 100
  },
  topBar: {
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  close: { fontSize: 22, color: '#111' },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  checkRing: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: '#2E7D32',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  checkMark: { fontSize: 48, color: '#2E7D32', lineHeight: 48 },
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
