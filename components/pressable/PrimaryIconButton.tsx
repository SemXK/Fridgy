import { primaryColor } from '@/constants/theme'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Button } from 'react-native-paper'

interface ButtonInterface {
  onPress: () => void,
  iconSpecs: {
    name: any,
    color: string,
    size: number
  },
  className?: string,
  isLoading?: boolean,
  mode?: "text" | "elevated" | "outlined" | "contained" | "contained-tonal"
}

const PrimaryIconButton = ({ onPress, iconSpecs, className, isLoading, mode }: ButtonInterface) => {
  return (
    <Button
      mode="outlined"
      style={{
        borderWidth: 2,
        borderColor: primaryColor[500],
      }}

      disabled={isLoading}
      textColor='white'
      onPress={onPress}
      className={className}
    >
      {
        isLoading ?
          <ActivityIndicator size={16} color="#ffffff" />
          :
          <Ionicons
            {...iconSpecs}
          />
      }
    </Button>
  )
}

export default PrimaryIconButton