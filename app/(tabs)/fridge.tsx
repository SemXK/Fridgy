import ProductMiniCard from '@/components/details/ProductMiniCard'
import ThemedFormField from '@/components/inputs/CustomFormField'
import ThemedText from '@/components/ui/ThemedText'
import { productList } from '@/constants/interfaces/fakeData'
import { Product } from '@/constants/interfaces/productInterface'
import React, { useState } from 'react'
import { FlatList, View } from 'react-native'

const Fridge = () => {
  // % States
  const [filter, setFilter] = useState<string>("");

  // * functions
  const handlePress = (product: Product) => {
    console.log(product)
  }

  // * Display
  return (
    <View className="h-screen  relative">

      {/* Header */}
      <View className="w-full h-1/6 p-8 bg-primary-500 rounded-b-[50px]">

        <ThemedText
          label="Il tuo Frigorifero"
          font="Nunito-ExtraBold"
          darkModeDisabled
          textStyle='text-4xl text-white'
        />
        <ThemedFormField
          value={filter}
          setValue={setFilter}
          label="Cerca..."
        />
      </View>

      {/* Elenco */}
      <FlatList
        className="p-4 h-full"
        data={productList.filter(p => p.name.includes(filter))}
        keyExtractor={item => String(item.id)}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        contentContainerStyle={{
          paddingBottom: 100, // 👈 Add space for the floating tab bar
        }}
        renderItem={({ item }) => (
          <View
            style={{
              width: '48%',
              aspectRatio: 1,
              marginBottom: 8,
            }}
            className="rounded-lg"
          >
            <ProductMiniCard
              onPress={() => handlePress(item)}
              product={item}
            />
          </View>
        )}
      />

    </View>
  )
}


export default Fridge