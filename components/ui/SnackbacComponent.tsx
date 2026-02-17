import { SnackbarStatus } from "@/constants/enums/common";
import { darkColor } from "@/constants/theme";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import ThemedText from "./ThemedText";

const { width } = Dimensions.get("window");

export interface TopSnackbarProps {
  visible: boolean;
  message: string;
  onHide: () => void;
  duration?: number;
  status?: SnackbarStatus;
}


const TopSnackbar: React.FC<TopSnackbarProps> = ({
  visible,
  message,
  onHide,
  duration = 4000,
  status,
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

  const handleSnackbarStatus = (): string => {
    console.log(status)
    switch(status) {
      case SnackbarStatus.Warning:
        return "bg-amber-500"
      case SnackbarStatus.Info:
        return "bg-indigo-500";
      case SnackbarStatus.Success:
        return "bg-emerald-500";
      case SnackbarStatus.Error:
        return "bg-rose-500";
      default: 
        return "bg-primary-500"
    }

  }
  if (!visible) return null;

  return (
    <Animated.View
      className="rounded-lg px-auto w-3/4 "
      style={[
        styles.container,
        { transform: [{ translateY }] } as ViewStyle,
      ]}
    >
      <View className="flex flex-row justify-start items-center px-2 ">
        <View className={"h-1/2 w-2 rounded-lg " + handleSnackbarStatus()}  />
        <ThemedText textStyle="text-2xl p-4" label={message} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "10%",
    left: '15%',
    right: 0,
    backgroundColor: darkColor[900],
    zIndex: 9999,
    elevation: 9999,
  },
});

export default TopSnackbar;
