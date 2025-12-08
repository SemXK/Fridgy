import CartTotalView from '@/components/details/CartTotalView'
import PaymentDetailComponent from '@/components/details/PaymentDetailComponent'
import ProductCartItem from '@/components/details/ProductCartItem'
import CartPageHeader from '@/components/headers/CartPageHeader'
import BottomSheetComponent from '@/components/ui/BottomSheet'
import ThemedText from '@/components/ui/ThemedText'
import { CartContextInterface } from '@/constants/interfaces/productInterface'
import React, { useContext, useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CartContext } from '../_layout'

const CartComponent = () => {
  // * Context
  const { cart } = useContext(CartContext) as CartContextInterface;

  // * States
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [isPayingModalOpen, setIsPayingModalOpen] = useState<boolean>(false);


  useEffect(() => {
    calculateCartPrice()
  }, [cart])

  // * Functions
  const calculateCartPrice = () => {
    let total = 0;
    if(cart) {
      cart.forEach((ci) => {
        total += ci.quantity * ci.product?.price
      });
      setCartTotal(total);
    }
  }


  // * Display
  return (
    <SafeAreaView>

      {/* Header */}
      <View className="w-full " >
        <CartPageHeader />

      </View>

      {/* Lista */}
      <FlatList
        className="w-full h-4/5"
        data={cart}
        keyExtractor={item => String(item.productId)}
        numColumns={1}
        ListEmptyComponent={
        <View className="w-full h-full flex flex-row justify-center ">
          <ThemedText 
            darkModeDisabled 
            font='Nunito-Italic'
            textStyle='text-stone-400' 
            label="Il tuo carrello è vuoto" 
          />
        </View>
        }
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

      {/* Tasto acquista */}
      {
        cartTotal ?
          <View className="h-1/5 border-t-2 border-white">
            <CartTotalView 
              total={cartTotal} 
              onPress={() => {setIsPayingModalOpen(true)}}
            />
          </View>
        : 
        null
      }

      {/* BottomSheet */}
      {
        isPayingModalOpen && 
        <BottomSheetComponent
          height={0.8 }
          onClose={() => setIsPayingModalOpen(false)}
          ShownComponent={PaymentDetailComponent}
        />
      }
    </SafeAreaView>
  )
}

export default CartComponent