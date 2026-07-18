import { darkColor } from '@/constants/theme'
import React from 'react'
import { View } from 'react-native'
import { IconButton } from 'react-native-paper'


const DefaultBadge = () => {
  return (
    <View className="rounded-full aspect-square w-1/6 bg-white dark:bg-darkColor-900  items-center justify-center">
      <IconButton
        icon="lock"
        size={20}
        iconColor={darkColor[500]}
      />
    </View>
  )
}

export default DefaultBadge