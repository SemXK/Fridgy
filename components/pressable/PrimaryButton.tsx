import 'react-native-reanimated';

import { primaryColor } from '@/constants/theme';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
import ThemedText from '../ui/ThemedText';


interface ButtonInterface {
  onPress: () => void,
  buttonText: string,
  buttonColor?: string;
  className?: string,
  isLoading?: boolean,
  mode?: "text" | "elevated" | "outlined" | "contained" | "contained-tonal"
}

const PrimaryButton = ({ onPress, buttonText, className, isLoading, mode, buttonColor }: ButtonInterface) => {
  return (
    <Button
      mode={mode || "outlined"}
      buttonColor={buttonColor || primaryColor[500]}
      style={{
        height: 40,
        borderWidth: 0,
      }}
      contentStyle={{ justifyContent: 'center', alignItems: 'center' }}
      textColor='white'
      onPress={!isLoading ? onPress : undefined}
      className={className}
    >      
      {
        isLoading ? 
          <ActivityIndicator animating size={24} color="#fff" />
          :
          <ThemedText
            font='Nunito-Bold'
            label={buttonText}
          />
      }
    </Button>

  )
}

export default PrimaryButton