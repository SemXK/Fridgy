import HomePageHeader from '@/components/headers/HomePageHeader'
import { Slot } from 'expo-router'
import React, { createContext, useContext, useState } from 'react'
import { View } from 'react-native'
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
        <HomePageHeader title="Il mio inventario"/>

        {/* Children Components */}
        <View className="mt-42">
          <Slot />
        </View>

      </SafeAreaView>
    </FridgeContext.Provider>

  )
}

export default FridgeLayout

// {/* Header con tasti sopra */}
// {
//   !intoDetail ?
//   <View>
//     <View className="w-full p-4" >
//       {/* Inupt filter */}
//       <ThemedFormField
//         value={filter}
//         setValue={setFilter}
//         label="Cerca..."
//       />
//     </View>
//   </View>
//     :
//     <View className="w-full flex flex-row justify-between px-4">
//       <TouchableOpacity
//         onPress={() => router.back()}
//         className="flex flex-row items-center align-middle"
//       >
//         <AntDesign
//           name='left'
//           size={16}
//           color={primaryColor[500]}
//         />
//         <ThemedText
//           darkModeDisabled
//           textStyle='text-primary-500'
//           label='Indietro'
//         />
//       </TouchableOpacity>

//       <CartButton />
//     </View>
// }