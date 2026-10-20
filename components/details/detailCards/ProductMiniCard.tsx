import { CartContext, UserContext } from '@/app/_layout';
import TopSnackbar from '@/components/ui/SnackbarComponent';
import ThemedText from '@/components/ui/ThemedText';
import UrlImage from '@/components/ui/UrlImage';
import { SnackbarStatus } from '@/constants/enums/common';
import { CartContextInterface, CartItemInterface, Product } from '@/constants/interfaces/productInterface';
import { primaryColor } from '@/constants/theme';
import { ConsumerController } from '@/controllers/ConsumerController';
import { ProductController } from '@/controllers/ProductController';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useContext, useEffect, useState } from 'react';
import { GestureResponderEvent, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, IconButton } from 'react-native-paper';
import colors from "tailwindcss/colors";


interface Props {
  product: Product,
  onPress: () => void,
  likable?: boolean,
  addableToCart?: boolean,
}

const ProductMiniCard = (props: Props) => {
  // * Context
  const { setCart } = useContext(CartContext) as CartContextInterface;
  const { user } =  useContext(UserContext)

  // * States
  const [likedLoading, setLikedLoading] = useState<boolean>(false)
  const [showSnackbar, setShowSnackbar] = useState<string>("")
  const [barStatus, setBarStatus] = useState<SnackbarStatus>(SnackbarStatus.Info)

  // % Functions
  const handleFavouriteClick = async (e: GestureResponderEvent, product: Product) => {
    e.stopPropagation();
    setLikedLoading(true)
    await ConsumerController.setProductPreference(product.id).then(() => {
      if (product.isLiked.length) {
        product.isLiked = []
      }
      else {
        product.isLiked = [{
          id: 0,
          userId: user!.id,
          productId: product.id
        } ]
      }
    })
    .catch(() => {
      setBarStatus(SnackbarStatus.Error)
      setShowSnackbar("Esegui il Log-in per quest'azione")
    })
    .finally(() => setLikedLoading(false))
  } 
  const addProductToCart = async (e: GestureResponderEvent) => {
    e.stopPropagation()

    Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Success
    )

    const productId = props.product.id;
    ProductController.addItemToCart(productId)
    .then((res) => {
      if(setCart) {
        setCart(res as CartItemInterface[])
      }
    })
    .catch(e => console.log(e.message))
  } 

  useEffect(() => {
    console.log({brand: props.product.brand, isLiked: props.product.isLiked})
  }, [])


  // * Display
  return (
    <TouchableOpacity
      activeOpacity={0.7} 
      className="relative w-full h-full aspect-square bg-stone-100 dark:bg-darkColor-900 rounded-xl p-4 justify-start "
      onPress={props.onPress}
    >
      {/* Tasto Favourite */}
      {
        props.likable ? 
        <View className="absolute top-0 right-0 ">
          <TouchableOpacity
            onPress={(e) => {
              handleFavouriteClick(e, props.product);
            }}
            activeOpacity={.1}
            className="rounded-full"
          >
            {/* props.product.favourite */}
            {!likedLoading ? 
              <IconButton
                icon={props.product.isLiked ? "heart" : "heart-outline"}
                size={26}
                iconColor={colors.rose[500]}
                className='text-rose-500'
              />
              :
              <View className=" p-4 flex flex-row justify-center">
                <ActivityIndicator animating size={24} color={primaryColor[500]} />
              </View>
            }
          </TouchableOpacity>
        </View>
        :
        null
      }
    
      {/* Descrizione Prodotto */}
      <View className="flex flex-col justify-between h-full">
        <UrlImage
          source={props.product.image}
          className=" self-center "
          style={{
            width: "50%",
            height: "50%",
          }}
          // width={100}
          // height={100}
          resizeMode="contain"
        />
        <View>
          <ThemedText
            numberOfLines={1}
            darkModeDisabled
            font='Nunito-Bold'
            textStyle="text-xl text-primary-500 line-clamp-1"
            label={props.product.name}
          />
          <View className="flex flex-row " >
            <ThemedText darkModeDisabled label='Quantità: ' font='Nunito-Italic' textStyle='color-primary-500' />
            <ThemedText label={`${props.product.quantity} ${props.product.uma} `} />
          </View>
          <View className="flex flex-row " >
            <ThemedText darkModeDisabled label='Prezzo: ' font='Nunito-Italic' textStyle='color-primary-500' />
            <ThemedText label={`${props.product.price} €`} />
          </View>
        </View>
      </View>

      {/* Azioni Prodotto */}
      {
        props.addableToCart ?
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={(e) => addProductToCart(e)}
            className="absolute bottom-0 right-0 rounded-tl-xl rounded-br-xl bg-primary-500 p-2"
          >
            <Ionicons name="add" size={26} color="white" />
          </TouchableOpacity>
        : 
        null
      }
      {/* Snackbar */}
      <TopSnackbar
        status={barStatus}
        message={showSnackbar} 
        onHide={() => setShowSnackbar('')} 
      />
    </TouchableOpacity>
  ) 
}

export default ProductMiniCard