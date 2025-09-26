import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, ImageBackground } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { introHero, arrowRight } from '../assets';

export type IntroProps = NativeStackScreenProps<RootStackParamList, 'Intro'>;

export default function IntroScreen({ navigation }: IntroProps) {
  return (
    <View style={styles.container}>
      <ImageBackground source={introHero} resizeMode="contain" style={styles.hero} />
      <View style={styles.bottomCard}>
        <Text style={styles.paragraph}>
          Hi, I am your fashion advisor. Let’s get you started with creating your mix & match fashion avatar.
        </Text>
        <View style={{ alignItems: 'flex-end' }}>
          <Pressable style={styles.ctaCircle} onPress={() => navigation.navigate('FaceUpload')}>
            <Image source={arrowRight} style={styles.ctaIcon} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
  },
  hero: {
    position: 'absolute',
    top: 0,
    left: 70,
    right: 0,
    height: '100%',
    width: '90%',
  },
  bottomCard: {
    marginHorizontal: 24,
    marginBottom: 50,
    backgroundColor: '#fff',
    //borderRadius: 6,
    padding: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  paragraph: {
    fontSize: 16,
    color: '#111',
    lineHeight: 22,
    marginBottom: 12,
  },
  ctaCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    // borderWidth: 2,
    // borderColor: '#BDBDBD',
    // backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaIcon: { width: 44, height: 44, tintColor: '#6B7280' },
});
