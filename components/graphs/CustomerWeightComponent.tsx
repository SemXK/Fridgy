import React from 'react'
import { View } from 'react-native'
import ThemedText from '../ui/ThemedText'

const CustomerWeightComponent = () => {
  return (
    <View className="w-[48%] dark:bg-darkColor-800 rounded-xl h-36 items-center justify-center">
      <ThemedText
        label="Grafico Peso Corporeo"

      />
    </View>
  )
}

export default CustomerWeightComponent