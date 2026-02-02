import { primaryColor } from '@/constants/theme'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const UploadFromGalleryButton = () => {
  return (
    <TouchableOpacity
      onPress={(e) => {}}
      activeOpacity={.1}
      >
      <Ionicons name="image" color={primaryColor[500]} size={20} />
    </TouchableOpacity>
  )
}

export default UploadFromGalleryButton