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
  iconComponent?: React.Component,
  className?: string,
  isLoading?: boolean,
  mode?: "text" | "elevated" | "outlined" | "contained" | "contained-tonal"
}

const PrimaryIconButton = ({ onPress, iconSpecs, className, isLoading, mode }: ButtonInterface) => {
  return (
    <Button
      mode="text"
      disabled={isLoading}
      onPress={onPress}
      className="mx-0 px-0 w-[10%]"
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