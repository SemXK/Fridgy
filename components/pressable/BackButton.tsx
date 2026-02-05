import { primaryColor } from '@/constants/theme'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import ThemedText from '../ui/ThemedText'

const BackButton = () => {
  return (
    <TouchableOpacity
      onPress={() => {router.back()}}
      activeOpacity={.1}
      className="flex flex-row items-center"
      >
      <Ionicons
        name="chevron-back"
        size={20}
        color={primaryColor[500]}
      />
      <ThemedText 
        label='Indietro'
        textStyle='text-primary-500 text-lg'
        darkModeDisabled
      />
    </TouchableOpacity>
  )
}

export default BackButton