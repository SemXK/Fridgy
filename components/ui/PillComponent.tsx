import React from 'react';
import { View } from 'react-native';
import ThemedText from './ThemedText';

interface PillInterface {
  label: string;
  textStyle?: string;
  containerClassName?: string;
}

const PillComponent = ({ label, textStyle, containerClassName, }: PillInterface) => {
  return (
    <View className={`items-center justify-center px-2 py-1 rounded-xl  ${containerClassName}`}>
      <ThemedText textStyle={`${textStyle} inline`} label={label} font="Nunito-Bold" darkModeDisabled />
    </View>
  );
}

export default PillComponent