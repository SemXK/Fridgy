import { Product } from '@/constants/interfaces/productInterface';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import React from 'react';
import { GestureResponderEvent, Image, ImageSourcePropType, TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import colors from "tailwindcss/colors";
import ThemedText from '../ui/ThemedText';

interface Props {
  product: Product,
  onPress: () => void
}

const ProductMiniCard = (props: Props) => {

  // % Functions
  const handleFavouriteClick = (e: GestureResponderEvent, product: Product) => {
    e.stopPropagation();

  }

  // * Display
  return (
    <TouchableOpacity
      className="relative w-full h-full aspect-square bg-stone-100 rounded-xl p-4 justify-start "
      onPress={props.onPress}

    >
      {/* Tasto Favourite */}
      <View className="absolute top-0 right-0 ">
        <TouchableOpacity
          onPress={(e) => {
            handleFavouriteClick(e, props.product);
          }}
          activeOpacity={.1}
          className="rounded-full"
        >
          <IconButton
            icon="heart"
            size={26}
            iconColor={colors.rose[500]}
            className='text-rose-500'
          />
        </TouchableOpacity>
      </View>


      {/* Descrizione Prodotto */}
      <Image

        className="w-1/2 h-2/3 self-center aspect-square rounded-xl "
        source={props.product.image as ImageSourcePropType}
        width={160}
        height={160}
        resizeMode="contain"
      />

      <ThemedText
        font="Nunito-ExtraBold"
        textStyle="text-2xl text-primary-500"
        label={props.product.name}
      />

      {/* Descrizione Prodotto */}
      <View className="flex flex-row " >
        <ThemedText label='Quantità: ' font='Nunito-Italic' textStyle='color-primary-500' />
        <ThemedText label={`${props.product.quantity}`} />
      </View>

      {/* Tipo di prodotto */}
      <View

        className='flex flex-row flex-wrap gap-1'>
        {props.product.foodTypes.map((type) => {
          return (
            <ThemedText
              key={type.id}
              font="Nunito-Italic"
              label={type.type}
            />
            // <PillComponent
            //   key={type.id}
            //   textStyle='text-white line-clamp-1 text-center'
            //   containerClassName={`${type.color}`}
            //   label={type.type}
            // />
          )
        }

        )
        }
      </View>

      {/* Azioni Prodotto */}
      <View
        className="absolute bottom-0 right-0 rounded-tl-2xl rounded-br-2xl bg-primary-500 p-2"
      >
        <Ionicons
          name="add"
          size={26}
          color="white"
        />
      </View>

    </TouchableOpacity>
  )
}

export default ProductMiniCard