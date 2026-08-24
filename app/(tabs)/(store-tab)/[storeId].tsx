import StoreDetailHeader from '@/components/headers/StoreDetailHeader'
import PrimaryIconButton from '@/components/pressable/PrimaryIconButton'
import ThemedText from '@/components/ui/ThemedText'
import UrlImage from '@/components/ui/UrlImage'
import { Store } from '@/constants/interfaces/store'
import { primaryColor } from '@/constants/theme'
import { StoreController } from '@/controllers/StoreController'
import { useFocusEffect } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import React, { useState } from 'react'
import { Appearance, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

const StoreDetail = () => {
  // % Params
  const {storeId} = useLocalSearchParams<{ storeId: string }>()


  // * States
  const [store, setStore] = useState<Store | null>(null)

  // £ Functions
  const getStoreDetail = async () => {
    if(storeId) {
      await StoreController.getStoreDetail(storeId)
        .then((res) =>  {
          const storeDetail = res as Store;
          setStore(storeDetail)
        })
        .finally(() => {
        })
    }
    else {
      router.back()
    }
  }

  // $ Effects
  useFocusEffect(() => {
    getStoreDetail()
  })
  return (
    <View className="h-screen w-screen flex-1">
      {
        !store ?
        <View className="w-full flex-1 flex flex-row justify-center">
          <ActivityIndicator animating size={24} color={primaryColor[500]}  />
        </View>
        :
        <View className="flex-1">

          <View className="bg-darkColor-900 rounded-xl  flex flex-col  w-screen aspect-square relative ">


            {/* Store Image */}
            <UrlImage 
              source={store.profileImage || ''} 
              resizeMode='cover' 
              className="flex-1 rounded-xl w-screen aspect-square -z-10" 
            />

            {/* Header */}
            <StoreDetailHeader headerClass='absolute top-12 w-full'/>

            {/* Gradient */}
            <LinearGradient
              colors={['transparent', Appearance.getColorScheme() === 'light' ? 'white' : 'black']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: 150,
              }}
            />

            {/* Store Info  Bottom Row */}
            <View className="absolute bottom-0 h-20  w-full flex flex-row justify-between items-center p-2">
              {/* Store Name + Addr */}
              <View >
                <ThemedText
                  label={store.name}
                  darkModeDisabled
                  textStyle='text-primary-500 text-2xl'
                  font="Nunito-Bold"
                />
                <ThemedText
                  label={store.address || 'indirizzo'}
                  textStyle='text-md'
                />
              </View>

              {/* Store Actions */}
              <View className=" h-full p-0 flex flex-row justify-center">
                <PrimaryIconButton 
                  className='self-center'
                  onPress={() => {}} 
                  iconSpecs={{
                    name: "hamburger-plus",
                    color: primaryColor[500],
                    size: 32
                  }}
                />
                <PrimaryIconButton 
                  className='self-center'
                  onPress={() => {}} 
                  iconSpecs={{
                    name: "store-edit",
                    color: primaryColor[500],
                    size: 32
                  }}
                />
              </View>
            </View>

          </View>

        </View>
      }
    </View>
  )
}

export default StoreDetail