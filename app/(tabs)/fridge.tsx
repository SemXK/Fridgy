import ProductMiniCard from '@/components/details/ProductMiniCard'
import ThemedText from '@/components/ui/ThemedText'
import { productList } from '@/constants/interfaces/fakeData'
import { Product } from '@/constants/interfaces/productInterface'
import React from 'react'
import { FlatList, View } from 'react-native'

const fridge = () => {


  // * functions
  const handlePress = (product: Product) => {
    console.log(product)
  }
  return (
    <View className="h-screen relative">

      {/* Header */}
      <View className="w-full h-1/6 p-8 bg-primary-500 rounded-b-[80px]">

        <View>
          <ThemedText
            label="Il tuo Frigorifero"
            font="Nunito-ExtraBold"
            darkModeDisabled
            textStyle='text-4xl text-white'
          />
        </View>

      </View>

      {/* Elenco */}
      <FlatList
        className="p-4"
        data={productList}
        keyExtractor={item => String(item.id)}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        renderItem={({ item }) => {
          return (
            <View className="w-[48%]  aspect-square self-center items-center rounded-lg">
              <ProductMiniCard
                onPress={() => handlePress(item)}
                product={item}
              />
            </View>
          )
        }}
      />
    </View>
  )
}


export default fridge