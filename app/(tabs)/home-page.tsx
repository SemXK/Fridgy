import MainImage from '@/components/ui/HomaPageImage'
import { Product } from '@/constants/interfaces/productInterface'
import React from 'react'
import { Text, View } from 'react-native'

const HomePage = () => {
  // * functions
  const handlePress = (product: Product) => {
    console.log(product)
  }

  // * Display
  return (
    <View className="w-full h-screen p-4  flex gap-4 flex-row flex-wrap justify-between">
      <MainImage />
      <Text>Home Page</Text>
      {/* {productList.map(product =>
        <ProductMiniCard
          onPress={() => handlePress(product)}
          key={product.id}
          product={product}
        />
      )} */}
    </View>
  )
}

export default HomePage 