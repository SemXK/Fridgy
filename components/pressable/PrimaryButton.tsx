import 'react-native-reanimated';

import { primaryColor } from '@/constants/theme';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Button } from 'react-native-paper';
import ThemedText from '../ui/ThemedText';


interface ButtonInterface {
  onPress: () => void,
  buttonText: string,
  buttonColor?: string;
  className?: string,
  isLoading?: boolean,
  mode?: "text" | "elevated" | "outlined" | "contained" | "contained-tonal",
  leftIcon?: React.ReactNode,
  rightIcon?: React.ReactNode,
  textStyle?: string,
}

const PrimaryButton = ({ onPress, 
  buttonText, 
  className, 
  isLoading, 
  mode, 
  buttonColor, 
  leftIcon, 
  rightIcon,
  textStyle,
}: ButtonInterface) => {
  return (
    <Button
      mode={mode}
      buttonColor={ mode ? '' : buttonColor || primaryColor[500]}
      style={{
        height: 40,
        borderWidth: 0,
      }}
      contentStyle={{ justifyContent: 'center', 
        alignItems: 'center' }}
      textColor='white'
      onPress={!isLoading ? onPress : undefined}
      className={className}
    >      
      {
        isLoading ? 
          <ActivityIndicator animating size={24} color="#fff" />
          :
          <View className="flex flex-row gap-2 items-center">

            {leftIcon}

            <ThemedText
              font='Nunito-Bold'
              label={buttonText}
              textStyle={textStyle}
              />

            {rightIcon}
            </View>

      }
    </Button>

  )
}

export default PrimaryButton