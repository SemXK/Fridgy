import { primaryColor } from '@/constants/theme';
import * as Haptics from 'expo-haptics';
import React, { useRef } from 'react';
import { Animated, Easing, Pressable } from 'react-native';
import { IconButton } from 'react-native-paper';

const AnimatedIconButton = Animated.createAnimatedComponent(IconButton);

const NotificationButton = () => {
  const scale = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
        Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success
        ) 
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 0.8, // shrink 20 → 16
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: 1, // rotate 0 → 45deg
        duration: 100,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: 0,
        duration: 100,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const rotateInterpolate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  return (
    <Pressable
      onPress={() => console.log('pressed')}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <AnimatedIconButton
        icon="bell"
        size={20}
        iconColor={primaryColor[500]}
        style={{ transform: [{ scale }, { rotate: rotateInterpolate }] }}
      />
    </Pressable>
  );
};

export default NotificationButton;
