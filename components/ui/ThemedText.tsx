import { AvailableFonts } from '@/constants/interfaces/availableFonts';
import React from 'react';
import { Text } from 'react-native';

interface TTInterface {
  label: string;
  textStyle?: string;
  darkModeDisabled?: boolean;
  font?: AvailableFonts;
  numberOfLines?: number;
}

const ThemedText = ({ label, textStyle, darkModeDisabled, font, numberOfLines }: TTInterface) => {

  return (
    <Text
      numberOfLines={numberOfLines}
      style={{ fontFamily: font || 'Nunito' }}
      className={
        `${!darkModeDisabled && 'text-black dark:text-white '} ${textStyle}`
      }>
      {label}
    </Text>
  )
}

export default ThemedText