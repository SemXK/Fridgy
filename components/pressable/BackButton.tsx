import { primaryColor } from '@/constants/theme'
import { router } from 'expo-router'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { IconButton } from 'react-native-paper'

const BackButton = () => {
  return (
    <TouchableOpacity
      onPress={() => {router.back()}}
      activeOpacity={.1}
      >
      <IconButton
        icon="arrow-left"
        size={20}
        iconColor={primaryColor[500]}
      />
    </TouchableOpacity>
  )
}

export default BackButton