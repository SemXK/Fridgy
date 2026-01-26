import HomePageHeader from '@/components/headers/HomePageHeader'
import ThemedFormField from '@/components/inputs/CustomFormField'
import CartButton from '@/components/pressable/CartButton'
import ThemedText from '@/components/ui/ThemedText'
import { primaryColor } from '@/constants/theme'
import { AntDesign } from '@expo/vector-icons'
import { router, Slot } from 'expo-router'
import React, { createContext, useContext, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// ? Context
const FridgeContext = createContext<{
  filter: string
  setFilter: (v: string) => void
  openDetail: () => void
  closeDetail: () => void
}>({} as any)
export const useFridge = () => useContext(FridgeContext)

// ? Component
const FridgeLayout = () => {

  // % States
  const [intoDetail, setIntoDetail] = useState<boolean>(false)
  const [filter, setFilter] = useState<string>("");

  // & Animation Section
  const openDetail = () => {
    setIntoDetail(true);
  }
  const closeDetail = () => {
    setIntoDetail(false);
  }

  // * Display
  return (
    <FridgeContext.Provider value={{ filter, setFilter, openDetail, closeDetail }}>
      <SafeAreaView className="h-screen w-screen relative bg-white dark:bg-black ">
        {/* * Auth Header */}

        {/* Header con tasti sopra */}
        {
          !intoDetail ?
          <View>
              <HomePageHeader />
            <View className="w-full p-4" >

              <ThemedText
                darkModeDisabled
                label="Il mio inventario"
                font="Nunito-ExtraBold"
                textStyle='text-4xl text-primary-500 '
              />

              {/* Inupt filter */}
              <ThemedFormField
                value={filter}
                setValue={setFilter}
                label="Cerca..."
              />
            </View>
          </View>
            :
            <View className="w-full flex flex-row justify-between px-4">
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex flex-row items-center align-middle"
              >
                <AntDesign
                  name='left'
                  size={16}
                  color={primaryColor[500]}
                />
                <ThemedText
                  darkModeDisabled
                  textStyle='text-primary-500'
                  label='Indietro'
                />
              </TouchableOpacity>

              <CartButton />
            </View>
        }

        {/* Children Components */}
        <View className="mt-42">
          <Slot />
        </View>

      </SafeAreaView>
    </FridgeContext.Provider>

  )
}

export default FridgeLayout

