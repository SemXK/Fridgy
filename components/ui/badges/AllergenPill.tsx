import { Allergen } from '@/constants/interfaces/productInterface'
import React from 'react'
import { View } from 'react-native'
import ThemedText from '../ThemedText'

interface API {
  allergen: Allergen
}

const AllergenPill = ({allergen}: API) => {
  return (
    <View className="rounded-xl p-2 w-fit" style={{backgroundColor: allergen.color + "55"}}>
      <ThemedText darkModeDisabled label={allergen.name} textStyle='text-white' style={{color: allergen.color}} />
    </View>
  )
}

export default AllergenPill