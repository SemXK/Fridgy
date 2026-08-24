import { hexToRgba } from '@/constants/functions/HexToRgba'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { ActivityIndicator, TouchableOpacity } from 'react-native'
import { IconButton } from 'react-native-paper'

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
  mode?: 'outlined' | 'contained' | 'contained-tonal'
}

const PrimaryIconButton = ({ onPress, iconSpecs, className, isLoading, mode }: ButtonInterface) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <IconButton
        icon={() =>
          isLoading ? (
            <ActivityIndicator size={16} color="#ffffff" />
          ) : (
            <MaterialCommunityIcons {...iconSpecs} />
          )
        }
        mode={mode || 'contained'}
        containerColor={hexToRgba(iconSpecs.color, 0.1)}
        disabled={isLoading}
        size={iconSpecs.size}
        className={`m-0 ${className ?? ''}`}
      />
    </TouchableOpacity>
  )
}

export default PrimaryIconButton