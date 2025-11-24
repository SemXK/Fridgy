import 'react-native-reanimated';

import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
import ThemedText from '../ui/ThemedText';


interface ButtonInterface {
  onPress: () => void,
  buttonText: string,
  className?: string,
  isLoading?: boolean,
  mode?: "text" | "elevated" | "outlined" | "contained" | "contained-tonal"
}

const WhiteButton = ({ onPress, buttonText, className, isLoading, mode }: ButtonInterface) => {
  return (
    <Button
      mode={mode || "outlined"}
      buttonColor='white'
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
            darkModeDisabled
            font='Nunito-Bold'
            textStyle='text-primary-500'
            label={buttonText}
          />
      }
    </Button>

  )
}

export default WhiteButton