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
    <View className="relative h-full flex flex-col justify-between">
      <ThemedText label="Carrello"/>

    </View>
  )
}

export default FridgeDetail
