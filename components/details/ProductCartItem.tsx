import { CartContext } from '@/app/_layout'
import { CartContextInterface, CartItemInterface, Product } from '@/constants/interfaces/productInterface'
import { ProductController } from '@/controllers/ProductController'
import React, { useContext, useState } from 'react'
import { GestureResponderEvent, Pressable, TouchableOpacity, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import ThemedText from '../ui/ThemedText'
import UrlImage from '../ui/UrlImage'

interface CartItem {
  cartItem: CartItemInterface
}
const ProductCartItem = (props: CartItem) => {
  // * Context
  const { setCart } = useContext(CartContext) as CartContextInterface;

  // * States
  const [product, setProduct] = useState<Product>(props.cartItem.product as Product);

  // * Function
  const addItem = (e: GestureResponderEvent) => {
    e.stopPropagation();
    if(setCart) {
      const productId = props.cartItem.productId;

      ProductController.addItemToCart(productId)
      .then((res) => {
        setCart(res as CartItemInterface[])
      })
      .catch(e => console.log(e.message))

    }
  }
  const removeItem = (e: GestureResponderEvent) => {
    e.stopPropagation();
    if(setCart) {
      const productId = props.cartItem.productId;

      ProductController.removeItemFromCart(productId)
      .then((res) => {
        setCart(res as CartItemInterface[])
      })
      .catch(e => console.log(e.message))

    }
  }

  if(!product) {
    return null;
  }
  // * Disaplay
  return (
    <View className="relative h-28 flex flex-row w-full  bg-stone-100 dark:bg-darkColor-900 rounded-xl">

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
            icon={props.cartItem.quantity >= 1 ? "minus" : "delete-outline"}
            size={14}
            iconColor="white"
          />
        </TouchableOpacity>
      </View>


      {/* Image */}
      <UrlImage
        className="rounded-xl "
        source={product?.image}
        resizeMode="contain"
        height={100}
        width={100}
      />

      {/* Description */}
      <View className="p-4 w-[60%]">
        <ThemedText
          numberOfLines={1}
          darkModeDisabled
          font="Nunito-ExtraBold"
          textStyle="text-2xl text-primary-500 "
          label={product.name}
        />
        <View className="flex flex-row " >
          <ThemedText darkModeDisabled label='Quantità: ' font='Nunito-Italic' textStyle='color-primary-500' />
          <ThemedText label={`${props.cartItem.quantity}`} />
        </View>
        <View className="flex flex-row " >
          <ThemedText darkModeDisabled label='Prezzo unità: ' font='Nunito-Italic' textStyle='color-primary-500' />
          <ThemedText label={`${props.cartItem.product?.price} €`} />
        </View>

      </View>

    </View>
  )
}

export default ProductCartItem

