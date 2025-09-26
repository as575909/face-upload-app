import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, SafeAreaView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { introHero } from '../assets';

export type CapturePreviewProps = NativeStackScreenProps<RootStackParamList, 'CapturePreview'>;

export default function CapturePreviewScreen({ navigation, route }: CapturePreviewProps) {
  const imageUri = route.params?.imageUri;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.headerCaption}>FACIAL ATTRIBUTES</Text>
        <Text style={styles.headerTitle}>Let’s add a Photo</Text>
        
        <View style={styles.headerDivider} />
      </View>
      <View style={styles.body}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatarRing}>
            <Image
              source={imageUri ? { uri: imageUri } : introHero}
              resizeMode="cover"
              style={styles.avatar}
            />
          </View>
        </View>
      </View>
      <Pressable
        style={styles.uploadBtn}
        onPress={() => navigation.navigate('Uploading', { imageUri })}
      >
        <Text style={styles.uploadText}>UPLOAD</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 80
  },
  headerBar: { paddingTop: 8, paddingHorizontal: 16, paddingBottom: 12 },
  headerCaption: { fontSize: 12, color: '#9CA3AF', letterSpacing: 1, marginBottom: 4 },
  headerTitle: { fontSize: 24, fontWeight: '600', color: '#111' },
  headerDivider: { height: StyleSheet.hairlineWidth, backgroundColor: '#E5E7EB', marginTop: 12 },
  body: {
    flex: 1,
  },
  avatarWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 120,
  },
  avatarRing: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 3,
    borderColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#EEE',
  },
  avatar: {
    width: 216,
    height: 216,
    borderRadius: 108,
  },
  uploadBtn: {
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  uploadText: {
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 1,
  },
});
