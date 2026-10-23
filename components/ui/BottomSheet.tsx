import { BottomSheetContext } from '@/app/_layout';
import { BottomSheetContextInterface } from '@/constants/interfaces/common';
import { styleShadows } from '@/constants/styles/style-shadows';
import { BlurView } from 'expo-blur';
import React, { useContext, useEffect, useState } from 'react';
import { Appearance, Dimensions, PanResponder, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface BottomSheetProps {
  onClose: () => void;
  height?: number; // fraction of screen, 0-1
  ShownComponent: React.ComponentType<any>;
  snapPoints?: number[]; // fractions for snapping (e.g., [0.3, 0.6, 1])
}

const BottomSheetComponent: React.FC<BottomSheetProps> = ({
  height = 0.6,
  onClose,
  ShownComponent,
  snapPoints = [0.3, 0.6, 1],
}) => {
  // £ Global Context
  const { setSheet } = useContext(BottomSheetContext)


  // * Variables
  const animationTime: number = 400;
  const sheetHeight = SCREEN_HEIGHT * height;
  const translateY = useSharedValue(sheetHeight);
  const [mounted, setMounted] = useState(false);
  const startY = useSharedValue(0);
  const isSwiping = useSharedValue(false);
  const opacity = useSharedValue(0);

  useEffect(() => {
    setMounted(true);
    setSheet((prev: BottomSheetContextInterface) => { return {...prev, open: true}});
    opacity.value = withTiming(1, { duration: animationTime });
    translateY.value = withTiming(0, { duration: animationTime });
  }, []);

  // * Event functions
  const closeSheet = () => {
    opacity.value = withTiming(0, { duration: animationTime });
    setSheet((prev: BottomSheetContextInterface) => { return {...prev, open: false}});
    translateY.value = withTiming(sheetHeight, { duration: animationTime }, () => {
      runOnJS(onClose)();
    });
  };
  const handleRelease = (vy: number) => {
    'worklet';
    const currentY = translateY.value;
    
    if (currentY > sheetHeight * 0.5) {
      // Close sheet
      opacity.value = withTiming(0, { duration: animationTime });
      translateY.value = withTiming(SCREEN_HEIGHT, { duration: animationTime }, () => {
        runOnJS(onClose)();
      });
    } else {
      // Reopen to original height
      translateY.value = withTiming(0, { duration: animationTime });
    }
  };

  // * Hand gestures
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        startY.value = translateY.value;
        isSwiping.value = true;
      },
      onPanResponderMove: (_, gestureState) => {
        const newY = Math.max(0, startY.value + gestureState.dy);
        translateY.value = newY;
      },
      onPanResponderRelease: (_, gestureState) => {
        isSwiping.value = false;
        handleRelease(gestureState.vy);
      },
      onPanResponderTerminate: (_, gestureState) => {
        isSwiping.value = false;
        handleRelease(gestureState.vy);
      },
    })
  ).current;

  // * Animated Stylesheets
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
  const backdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,

  }));

  if (!mounted) return null;

  return (
    <View style={StyleSheet.absoluteFill}>
      <Animated.View style={[StyleSheet.absoluteFill, backdropStyle, {zIndex: 998}]}>
        <BlurView intensity={50} tint="default" style={styles.blurBackground} />
        <Pressable style={StyleSheet.absoluteFill} onPress={closeSheet} />
      </Animated.View>

      <Animated.View style={[styles.sheet, { height: sheetHeight, zIndex: 999 }, animatedStyle]}>
        {/* Header with grabber */}
        <View style={styles.header} {...panResponder.panHandlers}>
          <View style={styles.grabber} />
        </View>

        {/* Content area */}
        <View style={styles.content}>
          <ShownComponent onClose={() => closeSheet()}/>
        </View>
      </Animated.View> 
    </View>
  );
};

const styles = StyleSheet.create({
  blurBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: Appearance.getColorScheme() === 'light' ? 'white' : 'black',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    ...styleShadows.shadow
  },
  header: {
    paddingTop: 10,
    paddingBottom: 8,
    alignItems: 'center',
    zIndex: 10,
  },
  grabber: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: Appearance.getColorScheme() === 'light' ? '#ddd' : '#444',
  },
  content: {
    flex: 1,
  },
});

export default BottomSheetComponent;