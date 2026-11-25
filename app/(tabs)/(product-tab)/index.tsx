import { CartContext, UserContext } from '@/app/_layout'
import EditProductComponent from '@/components/details/EditProductComponent'
import ProductDetailHeader from '@/components/headers/ProductDetailHeader'
import PrimaryButton from '@/components/pressable/PrimaryButton'
import LineGraph, { DataPoint } from '@/components/thirdParty/LineGraph'
import AllergenPill from '@/components/ui/badges/AllergenPill'
import BottomSheetComponent from '@/components/ui/BottomSheet'
import TopSnackbar from '@/components/ui/SnackbarComponent'
import ThemedText from '@/components/ui/ThemedText'
import UrlImage from '@/components/ui/UrlImage'
import { SnackbarStatus } from '@/constants/enums/common'
import { CartContextInterface, CartItemInterface, Product, Receipt } from '@/constants/interfaces/productInterface'
import { primaryColor } from '@/constants/theme'
import { ConsumerController } from '@/controllers/ConsumerController'
import { ProductController } from '@/controllers/ProductController'
import { FontAwesome6, Ionicons } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import { useFocusEffect, useLocalSearchParams } from 'expo-router'
import moment from 'moment'
import React, { useCallback, useContext, useState } from 'react'
import { ActivityIndicator, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProductDetail = () => {
  // * Context
  const { setCart } = useContext(CartContext) as CartContextInterface;
  const { user } =  useContext(UserContext)
  
  // * Params
  const { productId } = useLocalSearchParams<{
    productId: string;
  }>();  

  // * States
  const [loading, setLoading] = useState<boolean>(false)
  const [product, setProduct] = useState<Product | null> (null)
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [showSnackbar, setShowSnackbar] = useState<string>("")
  const [barStatus, setBarStatus] = useState<SnackbarStatus>(SnackbarStatus.Info)
  
  const [vData, setVData] = useState<DataPoint[]>([])
  const [hData, setHData] = useState<DataPoint[]>([])

  // * Effects
  useFocusEffect(
    useCallback(() => {

      setLoading(true)
      getProductDetail(productId)
      setLoading(false)
      return () => {
        setVData([])
        setHData([])
        setProduct(null)
      }
    }, [productId])
  )

  // * Functions
  const getProductDetail = async(productId: string) => {
    const productDetail = await ProductController.getProduct(productId)
    if (productDetail && 'id' in productDetail) {
      graphPrices(productDetail.prices)
      setProduct(productDetail)
    }
  } 
  /**
   * Creates DataPoint arrays to display prices of the product
   */
  const graphPrices = (receipts: Receipt[]) => {
    receipts.map((receipt, recIndex) => {
      setVData(prev => [...prev, {label: `€`, value:receipt.price}])
      setHData(prev => [...prev, {label: `${moment(receipt.created_at).format('DD/MM/YY')}`, value: recIndex}])
    })
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
    setIsEditing(true)
  }
  const handleEditForm = () => {
    setLoading(true)
    setIsEditing(false)
    getProductDetail(productId)
    setLoading(false)
  }
  const setProductPreference = async () => {
    if(product) {
      await ConsumerController.setProductPreference(product.id).then(() => {
        if (product.isLiked.length) {
          setProduct((prev: Product | null) => {
            if (!prev) return prev
            return {
              ...prev,
              isLiked: []
            }
          })
        }
        else {
          setProduct((prev: Product | null) => {
            if (!prev) return prev
            return {
              ...prev,
              isLiked: [{
                id: 0,
                userId: user!.id,
                productId: product.id
              }]
            }
          })
        }
      }) 
      .catch(() => {
        setBarStatus(SnackbarStatus.Error)
        setShowSnackbar("Esegui il Log-in per quest'azione")
      })

    }
  }
  if(!product) {
    return null
  }

  return (
    <>
      <SafeAreaView className="px-4 relative">

        {/* * Product Header */}
        <ProductDetailHeader onPress={setProductPreference} product={product} />

        <ScrollView className="h-[90%] mb-4 py-8" showsVerticalScrollIndicator={false}>
          {
            loading ?
            <View className="w-full flex flex-row justify-center">
              <ActivityIndicator animating size={24} color={primaryColor[500]} />
            </View>
            :
            <View>
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
                      font='Nunito-Bold'
                      darkModeDisabled
                    />
                    {/* Edit product (working functionality) */}
                    {/* <TouchableOpacity onPress={editProduct} >
                      <FontAwesome6 name="edit" size={24} color={primaryColor[500]} />
                    </TouchableOpacity> */}

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
                    label={(product.kcalories || ' - ') + " cal"}
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

                  {/* Prices Graph */}
                  <View>
                    <ThemedText 
                      label='Storico Prezzi'
                      darkModeDisabled
                      textStyle='text-2xl text-primary-500'
                      font='Nunito-Bold'
                    />
                    <View className="bg-stone-200 dark:bg-stone-900 rounded-xl  h-64">
                      {
                        vData.length >= 3 ?
                        <LineGraph 
                          verticalData={vData} 
                          horizontalData={hData} 
                          padding={24}
                        />
                        :
                        <View className="w-full h-full flex justify-center">
                          <ThemedText 
                            font="Nunito-Italic"
                            label="Non sono presenti dati sufficienti" 
                            textStyle='text-center ' 
                          />

                        </View>
                      }
                    </View>
                  </View>

                  {/* Allergens */}
                  <View className="flex flex-row gap-4 flex-wrap">
                    <ThemedText 
                      label='Contiene Allergeni'
                      darkModeDisabled
                      textStyle='text-2xl text-primary-500 w-full'
                      font='Nunito-Bold'
                    />
                    {
                      product.allergenList.map(allergen => {
                        return <AllergenPill key={allergen.id} allergen={allergen} />
                      })
                    }
                    {
                      !product.allergenList.length ? 
                        <View className="flex flex-row w-full ">
                          <ThemedText 
                            font="Nunito-Italic"
                            label="Il prodotto non contiene allergeni" 
                            textStyle='text-center' 
                          />
                        </View>
                        :
                        null
                    }
                  </View>
              </View>

            </View>
          }
        </ScrollView>

        {/* Add to cart Button */}
        <View className="self-center w-1/2">
          <PrimaryButton
            buttonText='Aggiungi al carrello'
            textStyle='text-white'
            onPress={addToCart}
            />
        </View>
      </SafeAreaView>

      {/* BottomSheet */}
      {
        isEditing && 
        <BottomSheetComponent
          height={0.8 }
          onClose={() => setIsEditing(false)}
          ShownComponent={() => { return<EditProductComponent onClose={handleEditForm} product={product}/>}}
        />
      }

      {/* Snackbar */}
      <TopSnackbar
        status={barStatus}
        message={showSnackbar} 
        onHide={() => setShowSnackbar('')} 
      />


    </>
  )
}

export default ProductDetail