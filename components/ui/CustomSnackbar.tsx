import { primaryColor } from '@/constants/theme';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface SnackbarProps {
  visible: boolean;
  message: string;
  duration?: number;
  onDismiss?: () => void;
}

export default function Snackbar({ visible, message, duration = 3000, onDismiss }: SnackbarProps) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 100 });
      if (duration > 0) {
        const timer = setTimeout(() => {
          opacity.value = withTiming(0, { duration: 100 });
          onDismiss?.();
        }, duration);
        return () => clearTimeout(timer);
      }
    } else {
      opacity.value = withTiming(0, { duration: 100 });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.snackbar, animatedStyle]}>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={() => { opacity.value = withTiming(0); onDismiss?.(); }}>
        <Text style={styles.action}>OK</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  snackbar: {
    position: 'absolute',
    bottom: 100,
    left: width * 0.05,
    width: width * 0.9,
    backgroundColor: '#323232',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 4,
    zIndex: 1000,
    elevation: 10,
  },
  message: {
    color: 'white',
    fontSize: 16,
  },
  action: {
    color: primaryColor[500],
    fontWeight: 'bold',
    fontSize: 16,
  },
});
