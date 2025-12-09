import { darkColor } from '@/constants/theme';
import { BlurView } from 'expo-blur';
import React, { useEffect, useState } from 'react';
import { Appearance, Dimensions, PanResponder, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface BottomSheetProps {
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
    opacity.value = withTiming(1, { duration: animationTime });
    translateY.value = withTiming(0, { duration: animationTime });
  }, []);

  // * Event functions
  const closeSheet = () => {
    opacity.value = withTiming(0, { duration: animationTime });
    translateY.value = withTiming(sheetHeight, { duration: animationTime }, () => {
      runOnJS(onClose)();
    });
  };
  const findClosestSnapPoint = (currentY: number, velocityY: number) => {
    'worklet';
    const snapPositions = snapPoints.map(point => SCREEN_HEIGHT * (1 - point));
    
    // Add closing point (below screen)
    snapPositions.push(SCREEN_HEIGHT * 1.1);
    
    let closestPoint = snapPositions[0];
    let minDistance = Math.abs(currentY - closestPoint);
    
    // Bias towards closing if swiping down fast
    const velocityThreshold = 1.0;
    const isFastDownSwipe = velocityY > velocityThreshold;
    
    if (isFastDownSwipe && currentY > SCREEN_HEIGHT * 0.2) {
      return SCREEN_HEIGHT * 1.1; // Close the sheet
    }
    
    for (const point of snapPositions) {
      const distance = Math.abs(currentY - point);
      if (distance < minDistance) {
        minDistance = distance;
        closestPoint = point;
      }
    }
    
    return closestPoint;
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
      <Animated.View style={[StyleSheet.absoluteFill, backdropStyle]}>
        <BlurView intensity={50} tint="default" style={styles.blurBackground} />
        <Pressable style={StyleSheet.absoluteFill} onPress={closeSheet} />
      </Animated.View>

      <Animated.View style={[styles.sheet, { height: sheetHeight }, animatedStyle]}>
        {/* Header with grabber */}
        <View style={styles.header} {...panResponder.panHandlers}>
          <View style={styles.grabber} />
        </View>

        {/* Content area */}
        <View style={styles.content}>
          <ShownComponent />
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
    backgroundColor: Appearance.getColorScheme() === 'light' ? 'white' : darkColor[800],
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
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