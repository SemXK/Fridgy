import { primaryColor } from '@/constants/theme'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const CartButton = () => {
  // * Functions
  const handlePress = () => {
    router.navigate('/(tabs)/Cart');
  }

  return (
    <TouchableOpacity onPress={handlePress} >
      <Ionicons
        name='cart-outline'
        size={28}
        color={primaryColor[500]}
      />
    </TouchableOpacity>
  )
}

export default CartButton