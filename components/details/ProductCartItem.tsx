import { changeCurrentCart, currentCart } from '@/constants/interfaces/fakeData'
import { CartItemInterface, Product } from '@/constants/interfaces/productInterface'
import React, { useState } from 'react'
import { GestureResponderEvent, Image, Pressable, TouchableOpacity, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import ThemedText from '../ui/ThemedText'

interface CartItem {
  cartItem: CartItemInterface
}
const ProductCartItem = (props: CartItem) => {

  // * States
  const [product, setProduct] = useState<Product>(props.cartItem.product as Product);
  const [itemQuantity, setItemQuantity] = useState<number>(props.cartItem.quantity)

  // * Function
  const addItem = (e: GestureResponderEvent) => {
    e.stopPropagation();
    setItemQuantity(itemQuantity + 1)
  }
  const removeItem = (e: GestureResponderEvent) => {
    e.stopPropagation();
    if (itemQuantity >= 1) {
      setItemQuantity(itemQuantity - 1)
    }
    else {
      const newCart = {
        ...currentCart,
        activeItems: currentCart.activeItems.filter(item => item.productId !== props.cartItem.productId)
      }
      changeCurrentCart(newCart)
    }

  }

  // * Disaplay
  return (
    <View className="relative h-28 flex flex-row w-full  bg-stone-100 dark:bg-stone-900 rounded-xl">

      {/* Buttons */}
      <View className="absolute top-0 right-0 ">
        <Pressable
          android_ripple={{ color: '#cccccc', borderless: false }}
          onPress={(e) => {
            addItem(e);
          }}
          className="rounded-tr-xl rounded-bl-xl bg-primary-500 p-0"
        >
          <IconButton
            icon="plus"
            size={14}
            iconColor="white"
          />
        </Pressable>
      </View>
      <View className="absolute bottom-0 right-0 ">

        <TouchableOpacity
          onPress={(e) => {
            removeItem(e);
          }}
          activeOpacity={.1}
          className=" rounded-br-xl rounded-tl-xl bg-primary-500 p-0 bottom-0"
        >
          <IconButton
            icon={itemQuantity >= 1 ? "minus" : "delete-outline"}
            size={14}
            iconColor="white"
          />
        </TouchableOpacity>
      </View>


      {/* Image */}
      <Image
        className="w-28 h-28 rounded-xl "
        source={product.image}
        resizeMode="contain"
        height={14}
        width={14}

      />

      {/* Description */}
      <View className="p-4">
        <ThemedText
          darkModeDisabled
          font="Nunito-ExtraBold"
          textStyle="text-2xl text-primary-500"
          label={product.name}
        />
        <View className="flex flex-row " >
          <ThemedText darkModeDisabled label='Quantità: ' font='Nunito-Italic' textStyle='color-primary-500' />
          <ThemedText label={`${itemQuantity}`} />
        </View>

      </View>

    </View>
  )
}

export default ProductCartItem