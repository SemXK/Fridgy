import { primaryColor } from '@/constants/theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import { Text, View } from 'react-native';
const Logo = () => {
  return (
    <View className="flex flex-row gap-2 justify-center ">
      <MaterialCommunityIcons 
        className=" text-primary-600" 
        name="fridge-outline" 
        size={64} 
        color={primaryColor[500]}
        />
        <Text
          style={{fontFamily: 'NunitoBold'}}
          className="text-primary-600 text-6xl h-full self-center items-center py-2 text-center">
          Fridgy
        </Text>
    </View>
  )
}

export default Logo