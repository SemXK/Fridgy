import ProductCartItem from '@/components/details/ProductCartItem'
import ThemedText from '@/components/ui/ThemedText'
import { CartContextInterface } from '@/constants/interfaces/productInterface'
import React, { useContext } from 'react'
import { FlatList, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CartContext } from '../_layout'

const CartComponent = () => {
  // * Context
  const { cart } = useContext(CartContext) as CartContextInterface;

  // * Display
  return (
    <SafeAreaView>
      <View className="w-full p-4" >

        <ThemedText
          darkModeDisabled
          label="Il mio carrello"
          font="Nunito-ExtraBold"
          textStyle='text-4xl text-primary-500'
        />
      </View>
      <FlatList
        className="w-full h-full"
        data={cart}
        keyExtractor={item => String(item.productId)}
        numColumns={1}
        contentContainerStyle={{
          paddingHorizontal: 12, // padding on left/right of whole list
          paddingBottom: 100,
          gap: 12
        }}
        renderItem={({ item }) => (
          <View
            style={{
              marginHorizontal: 6, // half of the gap, so two items sum to 12px
              borderRadius: 40,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.8,
              shadowRadius: 3,
              elevation: 4,
            }}
          >
            <ProductCartItem cartItem={item} />
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default CartComponent