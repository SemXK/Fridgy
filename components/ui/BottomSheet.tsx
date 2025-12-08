import React, { useEffect, useRef } from "react";
import {
  Animated,
  Appearance,
  Dimensions,
  PanResponder,
  PanResponderInstance,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export interface BottomSheetProps {
  onClose: () => void;
  height?: number; //max = 1.0
  ShownComponent: React.ComponentType<any>;
}

const BottomSheetComponent: React.FC<BottomSheetProps> = ({
  height = 0.6,
  onClose = () => {},
  ShownComponent,
}) => {
  
  const sheetHeight = SCREEN_HEIGHT * height;
  const translateY = useRef(new Animated.Value(sheetHeight)).current;

  // * Start animation
  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, []);

  const closeSheet = () => {
    Animated.timing(translateY, {
      toValue: sheetHeight,
      duration: 200,
      useNativeDriver: true,
    }).start(onClose);
  };

  // £ drag-to-close
  const panResponder = useRef<PanResponderInstance>(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        Math.abs(gesture.dy) > 5,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy > 0) translateY.setValue(gesture.dy);
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy > sheetHeight * 0.25) {
          closeSheet();
        } else {
          Animated.timing(translateY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.overlay}>
      <Pressable style={StyleSheet.absoluteFill} onPress={closeSheet} />

      <Animated.View
        style={[
          styles.sheet,
          { height: sheetHeight, transform: [{ translateY }] },
        ]}
        className="bg-black"
        {...panResponder.panHandlers}
      >
        <View style={styles.header}>
          <Text style={styles.grabber}>―</Text>
          <Pressable onPress={closeSheet}>
            <Text style={styles.closeBtn}>✕</Text>
          </Pressable>
        </View>

        <View style={styles.content}>
          {ShownComponent && <ShownComponent />}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  sheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    backgroundColor: Appearance.getColorScheme() === 'light' ? 'white' : 'dark',      
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: "center",
  },
  grabber: {
    color: "#aaa",
    fontSize: 22,
    flex: 1,
    textAlign: "center",
  },
  closeBtn: {
    fontSize: 20,
    padding: 5,
  },

});

export default BottomSheetComponent;
