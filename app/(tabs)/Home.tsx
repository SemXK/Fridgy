import MainImage from '@/components/ui/HomaPageImage';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

const HomePage = () => {

  // * lifecycle
  useEffect(() => {}, [])

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