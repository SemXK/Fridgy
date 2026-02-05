import ProductDetailHeader from '@/components/headers/ProductDetailHeader'
import PrimaryButton from '@/components/pressable/PrimaryButton'
import ThemedText from '@/components/ui/ThemedText'
import UrlImage from '@/components/ui/UrlImage'
import { CartContextInterface, CartItemInterface, Product } from '@/constants/interfaces/productInterface'
import { primaryColor } from '@/constants/theme'
import { ProductController } from '@/controllers/ProductController'
import { FontAwesome6, Ionicons } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import { useFocusEffect, useLocalSearchParams } from 'expo-router'
import React, { useCallback, useContext, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CartContext } from '../_layout'

const ProductDetail = () => {
  // * Context
  const { setCart } = useContext(CartContext) as CartContextInterface;
  
  // * Params
    const { productId } = useLocalSearchParams<{ productId: string }>()
  
  // * States
  const [loading, setLoading] = useState<boolean>(false)
  const [product, setProduct] = useState<Product | null> (null)

  // * Effects
  useFocusEffect(
    useCallback(() => {
      setLoading(true)
      getProductDetail(productId)
      setLoading(false)

      return () => {
        setProduct(null)
      }
    }, [productId])
  )

  // * Functions
  const getProductDetail = async(productId: string) => {
    const productDetail = await ProductController.getProduct(productId)
    if (productDetail && 'id' in productDetail) {
      setProduct(productDetail)
    }
  } 
  const addToCart = async() => {
    Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Success
    )

    ProductController.addItemToCart(product!.id)
    .then((res) => {
      if(setCart) {
        setCart(res as CartItemInterface[])
      }
    })
    .catch(e => console.log(e.message))
  }
  const editProduct = () => {
    
  }


  if(!product) {
    return null
  }

  return (
    <SafeAreaView className="h-full px-4 relative">

      {/* * Product Header */}
      <ProductDetailHeader />
      <View className="flex gap-8">
        {/* Image */}
        <UrlImage
          source={product.image}
          className="self-center"
          width={250}
          height={250}
          resizeMode="contain"
        />

        {/* Main Description */}
        <View>
          <View className="flex flex-row justify-between items-center">

            <ThemedText 
              label={product.name}
              textStyle='text-primary-500 text-3xl'
              font='Nunito-ExtraBold'
              darkModeDisabled
            />
            <TouchableOpacity onPress={editProduct} >
              <FontAwesome6 name="edit" size={14} color={primaryColor[500]} />
            </TouchableOpacity>

          </View>

          <View className="flex flex-row gap-2">
            <ThemedText 
              label='Marca:'
              darkModeDisabled
              textStyle='text-xl text-primary-500'
              font='Nunito-Bold'
            />
            <ThemedText 
              label={product.brand.name}
              textStyle='text-xl'
              font='Nunito-Light'
            />
          </View>

          <View className="flex flex-row gap-2">
            <ThemedText 
              label='Quantità:'
              darkModeDisabled
              textStyle='text-xl text-primary-500'
              font='Nunito-Bold'
            />
            <ThemedText 
              label={product.quantity + " " + product.uma}
              textStyle='text-xl'
              font='Nunito-Light'
            />
          </View>


        </View>

        {/* Row Product Info */}
        <View className="flex flex-row justify-around  items-center">

          {/* Rating */}
          <View className="flex flex-row gap-2 items-center">
            <FontAwesome6 name="star" size={14} color="orange" />
            <ThemedText 
            label="4.5"
            />
          </View>

          {/* Cal */}
          <View className="flex flex-row gap-2 items-center">
            <FontAwesome6 name="fire" size={14} color={primaryColor[500]} />
            <ThemedText 
            label="400 cal"
            />
          </View>

          {/* Price */}
          <View className="flex flex-row gap-2 items-center">
            <Ionicons name="pricetag" size={14} color={primaryColor[500]} />
            <ThemedText 
            label={product.price + '€'}
            />
          </View>

        </View>

        {/* Secondary Description */}
        <View>
          <ThemedText 
            label='Descrizione'
            darkModeDisabled
            textStyle='text-2xl text-primary-500'
            font='Nunito-Bold'
          />
          <ThemedText 
            label={product.description || 'Nessuna descrizione rilasciata per il prodotto'}
            textStyle='text-lg'
          />
        </View>

      </View>

      {/* Add to cart Button */}
      <View className="absolute bottom-4 self-center w-1/2">
        <PrimaryButton
          buttonText='Aggiungi al carrello'
          onPress={addToCart}
          />
      </View>

    </SafeAreaView>
  )
}

export default ProductDetail