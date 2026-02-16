import React from 'react'
import { View } from 'react-native'
import MenuButton from '../pressable/MenuButton'
import OpenCameraButton from '../pressable/OpenCameraButton'
import UploadFromGalleryButton from '../pressable/UploadFromGalleryButton'

const ProductCreationHeader = () => {
  return (
      <View className="flex flex-row justify-between h-8">
        <View className="flex flex-row items-center">
          <MenuButton />
          {/* <ThemedText 
            font='Nunito-ExtraBold' 
            textStyle='text-4xl text-primary-500' 
            darkModeDisabled label="Crea il prodotto"
          /> */}
        </View>

        <View className="flex flex-row">
          <UploadFromGalleryButton />
          <OpenCameraButton />
        </View>
      </View>
  )
}

export default ProductCreationHeader