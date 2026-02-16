import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

interface TopSnackbarProps {
  visible: boolean;
  message: string;
  onHide?: () => void;
  duration?: number;
}

const TopSnackbar: React.FC<TopSnackbarProps> = ({
  visible,
  message,
  onHide,
  duration = 40000,
}) => {
  const translateY = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (visible) {
      // Slide in
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        hideSnackbar();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideSnackbar = () => {
    Animated.timing(translateY, {
      toValue: -100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onHide?.();
    });
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY }] } as ViewStyle,
      ]}
    >
      <SafeAreaView>
        <Text style={styles.text}>{message}</Text>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#333",
    paddingVertical: 16,
    paddingHorizontal: 20,
    zIndex: 9999,
    elevation: 9999,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
});

export default TopSnackbar;
