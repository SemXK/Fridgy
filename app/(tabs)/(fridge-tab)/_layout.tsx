import ThemedFormField from '@/components/inputs/CustomFormField'
import ThemedText from '@/components/ui/ThemedText'
import { Product } from '@/constants/interfaces/productInterface'
import { Slot } from 'expo-router'
import React, { createContext, useContext, useState } from 'react'
import { View } from 'react-native'
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

// ? Context
const FridgeContext = createContext<{
  filter: string
  setFilter: (v: string) => void
  headerHeight: any
  expandHeader: (title: string, headerImageComponent?: React.Component) => void
  collapseHeader: () => void
}>({} as any)
export const useFridge = () => useContext(FridgeContext)

// ? Component
const FridgeLayout = () => {

  // % States
  const [filter, setFilter] = useState<string>("");
  const [headerTitle, setHeaderTitle] = useState("Il tuo inventario")

  // & Animation Section
  const headerHeight = useSharedValue<number>(20)
  const expandHeader = (title: string, headerImageComponent?: React.Component) => {
    headerHeight.value = withTiming(40, { duration: 500 })
    setHeaderTitle(title)
  }
  const collapseHeader = () => {
    setHeaderTitle("Il tuo inventario")
    headerHeight.value = withTiming(20, { duration: 500 })
  }
  const headerAnimatedStyle = useAnimatedStyle(() => ({
    height: `${headerHeight.value}%`,
  }))

  // $ Variables
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)

  // * Display
  return (
    <FridgeContext.Provider value={{ filter, setFilter, headerHeight, expandHeader, collapseHeader }}>

      <View className="h-screen bg-white dark:bg-black relative">

        {/* Header */}
        <View className="w-full  py-10 px-4  rounded-b-[50px]">
          <ThemedText
            label={headerTitle}
            font="Nunito-ExtraBold"
            textStyle='text-4xl text-primary-500'
          />
          {
            currentProduct ?
              <></>
              :
              <ThemedFormField
                value={filter}
                setValue={setFilter}
                label="Cerca..."
              />
          }

        </View>

        {/* Children Components */}
        <Slot />

      </View>
    </FridgeContext.Provider>

  )
}

export default FridgeLayout

