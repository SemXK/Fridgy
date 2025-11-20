import { primaryColor } from '@/constants/theme'
import React from 'react'
import { Text } from 'react-native'
import { ActivityIndicator, Button } from 'react-native-paper'


interface ButtonInterface {
  onPress: () => void,
  buttonText: string,
  className?: string,
  isLoading?: boolean,
  mode?: "text" | "elevated" | "outlined" | "contained" | "contained-tonal"
}

const PrimaryButton = ({ onPress, buttonText, className, isLoading, mode }: ButtonInterface) => {
  return (
    <Button
      mode={mode || "outlined"}
      buttonColor={primaryColor[500]}
      style={{
        height: 40,
        borderWidth: 0,
      }}
      textColor='white'
      onPress={!isLoading ? onPress : undefined}
      className={className}
    >      
      {
        isLoading ? 
          <ActivityIndicator animating size={40} color="#fff" />
          :
          <Text>{buttonText}</Text>
      }
    </Button>
  )
}

export default PrimaryButton