import { primaryColor } from '@/constants/theme'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { IconButton } from 'react-native-paper'

const NotificationButton = () => {
  return (
    <TouchableOpacity
      onPress={(e) => {}}
      activeOpacity={.1}
      >
      <IconButton
        icon="bell"
        size={20}
        iconColor={primaryColor[500]}
      />
    </TouchableOpacity>
  )
}

export default NotificationButton