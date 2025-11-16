import ThemedFormField from '@/components/inputs/CustomFormField'
import ThemedText from '@/components/ui/ThemedText'
import { primaryColor } from '@/constants/theme'
import { AntDesign } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { router, Slot } from 'expo-router'
import React, { createContext, useContext, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// ? Context
const FridgeContext = createContext<{
  filter: string
  setFilter: (v: string) => void
  openDetail: (title: string) => void
  closeDetail: () => void
}>({} as any)
export const useFridge = () => useContext(FridgeContext)

// ? Component
const FridgeLayout = () => {

  // % States
  const [intoDetail, setIntoDetail] = useState<boolean>(false)
  const [filter, setFilter] = useState<string>("");
  const [headerTitle, setHeaderTitle] = useState("Il tuo inventario")

  // & Animation Section
  const openDetail = (title: string) => {
    setIntoDetail(true);
    setHeaderTitle(title);
  }
  const closeDetail = () => {
    setIntoDetail(false);
    setHeaderTitle("Il tuo inventario")
  }

  // * Display
  return (
    <FridgeContext.Provider value={{ filter, setFilter, openDetail, closeDetail }}>

      <SafeAreaView className="h-screen w-screen relative bg-white dark:bg-black ">

        {/* Header */}
        {
          !intoDetail ?
            <LinearGradient
              className="w-full p-4"
              colors={['#fff', '#fff', '#ffffffbb', 'transparent']}
              locations={[0, 0.1, 0.9, 1]}
            >

              <ThemedText
                label="Il tuo inventario"
                font="Nunito-ExtraBold"
                textStyle='text-4xl text-primary-500 '
              />
              {/* Inupt filter */}

              <ThemedFormField
                value={filter}
                setValue={setFilter}
                label="Cerca..."
              />
            </LinearGradient>

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

