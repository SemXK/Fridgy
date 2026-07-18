import { primaryColor } from '@/constants/theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import { View } from 'react-native';
import ThemedText from './ThemedText';
const Logo = () => {
  return (
    <View className="flex flex-row gap-2 justify-center items-center">
      <MaterialCommunityIcons 
        className=" text-primary-600" 
        name="fridge-outline" 
        size={60} 
        color={primaryColor[500]}
        />
        <ThemedText label='Fridgy'
          darkModeDisabled
          font='Nunito-Bold'
          textStyle="text-primary-600 text-6xl h-full self-center items-center py-2 text-center"
        />
    </View>
  )
}

export default Logo