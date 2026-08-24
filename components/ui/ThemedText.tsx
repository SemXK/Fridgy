import { AvailableFonts } from '@/constants/interfaces/availableFonts';
import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

interface TTInterface {
  label: string;
  textStyle?: string; // applied regardless of darkModeDisbled
  style?: StyleProp<TextStyle>;
  darkModeDisabled?: boolean;   // if false, ignores the color given by textStyle
  font?: AvailableFonts;
  numberOfLines?: number;
}

const ThemedText = ({ 
  label, 
  textStyle, 
  style,
  darkModeDisabled, 
  font, 
  numberOfLines 
}: TTInterface) => {

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        { fontFamily: font || 'Nunito' },
        style
      ]}
      className={
        `${!darkModeDisabled && 'text-black dark:text-white '} ${textStyle}`
      }>
      {label}
    </Text>
  )
}

export default ThemedText