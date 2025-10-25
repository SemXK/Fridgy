import MainImage from '@/components/ui/HomaPageImage';
import { Slot } from 'expo-router';
import React from 'react';
import { View } from 'react-native';


export default function TabLayout() {
  return (
    <View className="w-full h-full p-4 bg-secondary-300 flex gap-6">
      <MainImage />
      <Slot />
    </View>
  );
}
