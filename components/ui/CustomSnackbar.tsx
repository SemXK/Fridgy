import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface CustomSnackbarProps {
  visible: boolean;
  message: string;
  onDismiss: () => void;
}

export default function CustomSnackbar({ visible, message, onDismiss }: CustomSnackbarProps) {
  const translateY = useSharedValue(-100);

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(0, { duration: 300 });
    } else {
      translateY.value = withTiming(-100, { duration: 300 });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.snackbar, animatedStyle]}>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={onDismiss}>
        <Text style={styles.action}>Ok</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  snackbar: {
    position: 'absolute',
    bottom: 12,
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
    color: '#BB86FC',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
