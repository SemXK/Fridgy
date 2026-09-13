import React from 'react'
import { View } from 'react-native'
import ThemedText from '../ui/ThemedText'

const CustomerCaloryConsumptionComponent = () => {
  return (
    <View className="w-[48%] dark:bg-darkColor-800 rounded-xl h-36 items-center justify-center">
      <ThemedText
        label="Grafico Consumo Calorie /gg"

      />
    </View>
  )
}

export default CustomerCaloryConsumptionComponent