import Logo from '@/components/ui/Logo';
import { getCurrentTheme } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { Slot } from 'expo-router';
import React from 'react';
import { Image, KeyboardAvoidingView, Platform, View } from 'react-native';


export default function TabLayout() {
  return (

    <KeyboardAvoidingView 
      className="flex h-screen w-screen justify-between "
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <Image 
        className="h-full w-full absolute top-0" 
        resizeMode='cover' 
        source={require("@/assets/images/fridge.jpg")} 
      />

      {/* Logo */}
      <View className="h-2/3 w-screen flex justify-center items-center">
        <View className="p-8 card">
          <Logo />
        </View>
      </View>

      {/* Form */}
      <View className="w-screen h-screen absolute top-0 bg-stone-400/25"/>
      <LinearGradient
        locations={[
          0, 
          0.2, 
          1,
        ]}
        colors={[
          'transparent', 
          getCurrentTheme().primaryClearColor, 
          getCurrentTheme().primaryClearColor,
        ]}
      > 
        <Slot/> 

      </LinearGradient>
    </KeyboardAvoidingView>

  );
}
