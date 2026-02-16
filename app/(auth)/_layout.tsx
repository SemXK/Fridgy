import Logo from '@/components/ui/Logo';
import { Slot } from 'expo-router';
import React from 'react';
import { Appearance, Dimensions, Image, KeyboardAvoidingView, Platform, View } from 'react-native';
import Svg, { Path } from "react-native-svg";


export default function TabLayout() {
  // * Wave
  const { width } = Dimensions.get("window");
  const amplitude = 30;
  const frequency = 2;
  const height = 120;
  let path = `M0 ${height / 2}`;
  for (let x = 0; x <= width; x++) {
    const y =
      height / 2 +
      amplitude * Math.sin((x / width) * frequency * Math.PI * 2);
    path += ` L${x} ${y}`;
  }
  path += ` L${width} ${height} L0 ${height} Z`;

  return (

    <KeyboardAvoidingView
      className="flex h-screen w-screen justify-between bg-white dark:bg-black"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <Image
        className="h-screen w-screen absolute top-0"
        resizeMode='cover'
        source={require("@/assets/images/fridge.jpg")}
      />

      {/* Logo */}
      <View className="h-1/4 w-screen flex justify-center items-center">
        <View className="p-8 bg-white dark:bg-black rounded-lg">
          <Logo />
        </View>
      </View>


      <Svg
        width={width}
        height={160}
        viewBox={`0 0 ${width} 20`}
      >
        <Path
          fill={Appearance.getColorScheme() === 'light' ? 'white' : 'black'}
          d={`
            M0 60
            C ${width * 0.25} 120, ${width * 0.90} 0, ${width} 20
            L ${width} 100
            L 0 100
            Z
          `}
        />

      </Svg>

      <View className="z-10 bg-white dark:bg-black h-full">
        <Slot />
      </View>
    </KeyboardAvoidingView>

  );
}
