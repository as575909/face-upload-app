import React from 'react';
import { View, StyleSheet } from 'react-native';

export type ProgressBarProps = {
  value?: number; // 0..100
  height?: number;
  trackColor?: string;
  fillColor?: string;
  rounded?: boolean;
};

export default function ProgressBar({
  value = 0,
  height = 8,
  trackColor = '#E5E7EB',
  fillColor = '#111',
  rounded = true,
}: ProgressBarProps) {
  return (
    <View style={[styles.track, { height, backgroundColor: trackColor, borderRadius: rounded ? height / 2 : 0 }]}>
      <View
        style={{
          height,
          width: `${Math.max(0, Math.min(100, value))}%`,
          backgroundColor: fillColor,
          borderRadius: rounded ? height / 2 : 0,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
  },
});
