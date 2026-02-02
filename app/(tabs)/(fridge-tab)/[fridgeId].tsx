import FridgeGraphDetail from "@/components/details/FridgeGraphDetail"
import ThemedText from "@/components/ui/ThemedText"
import { Product } from "@/constants/interfaces/productInterface"
import { useLocalSearchParams } from "expo-router"
import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { useFridge } from "./_layout"



const FridgeDetail = () => {
  // * Context
  const { fridgeId } = useLocalSearchParams<{ fridgeId: string }>()
  const { openDetail, closeDetail } = useFridge()

  // *States
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(undefined);

  // * Lifecycle
  useEffect(() => {

    openDetail()
    return () => closeDetail()
  }, [])

  // % Functions
  const handleLikedProduct = () => { }
  return (
    <View className="relative h-full bg-primary-900">

      {/* Descrizione principale Frigo */}
      <View className="bg-primary-800">
        <ThemedText font='Nunito-ExtraBold' textStyle='text-4xl'  label="Nome Carrello" />
        <ThemedText font='Nunito-ExtraBold'   label="Descrizione Carrello" />
        <View className="flex flex-row gap-2">
          <ThemedText font='Nunito-ExtraBold'  label="Ultima Modifica: " />
          <ThemedText font='Nunito-Italic'  label="Oggi" />

        </View>
      </View>

      {/* Grafico + Elenco tipi prodotto */}
      <View className="bg-primary-700 h-1/3">
        <FridgeGraphDetail />
      </View>

      {/* Elenco Prodotti */}
      <View className="bg-primary-600 h-full">

      </View>
    </View>
  )
}

export default FridgeDetail
