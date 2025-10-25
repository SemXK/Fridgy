import ProductMiniCard from '@/components/details/ProductMiniCard'
import { productList } from '@/constants/interfaces/fakeData'
import React from 'react'
import { View } from 'react-native'

const HomePage = () => {


  return (
    <View className="w-full h-full  flex gap-4 flex-row flex-wrap justify-between">
      {productList.map(product => <ProductMiniCard key={product.id} product={product} />)}
    </View>
  )
}

export default HomePage 