import { primaryColor } from '@/constants/theme'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { IconButton } from 'react-native-paper'

interface HeartInterface {
  liked?: boolean
}

const HeartButton = (props: HeartInterface) => {
  // * Context

  // * Functions
  const handlePress = () => {
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={.1}
      className="relative"
      >
      <IconButton
        icon={props.liked ? "heart" : 'heart-outline'}
        size={20}
        iconColor={primaryColor[500]}
      />
    </TouchableOpacity>
  )
}

export default HeartButton