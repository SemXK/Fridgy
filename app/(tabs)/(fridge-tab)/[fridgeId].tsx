import FridgeGraphDetail from "@/components/details/FridgeGraphDetail"
import CartPageHeader from "@/components/headers/CartPageHeader"
import ThemedText from "@/components/ui/ThemedText"
import { Fridge } from "@/constants/interfaces/productInterface"
import { ProductController } from "@/controllers/ProductController"
import { router, useLocalSearchParams } from "expo-router"
import React, { useEffect, useState } from "react"
import { View } from "react-native"



const FridgeDetail = () => {
  // * Context
  const { fridgeId } = useLocalSearchParams<{ fridgeId: string }>()
  // const { openDetail, closeDetail } = useFridge()

  // *States
  const [fridgeDetail, setFridgeDetail] = useState<Fridge | undefined>(undefined);



  // * Lifecycle
  useEffect(() => {
    getFridgeDetail()
    // openDetail()
    // return () => closeDetail()
  }, [])

  // * Functions
  const getFridgeDetail = async () => {
    await ProductController.getFridgeDetail(Number(fridgeId))
    .then((res) =>  {
      setFridgeDetail(res as unknown as Fridge)
    })
    .catch((e) => {
      console.log("Fridge Detail error: ", e.message)
      router.back()
    })
  }

  const handleLikedProduct = () => { } 

  // * Display
  return (
    <View>
      {fridgeDetail ? 
      
    <>
      {/* Descrizione principale Frigo */}
      <View className="">
        <CartPageHeader />

        <ThemedText font='Nunito-ExtraBold' darkModeDisabled textStyle="text-4xl text-primary-500"  label={fridgeDetail.name} />
        <View className="flex flex-row gap-2">
          <ThemedText font='Nunito-ExtraBold'  label="Ultima Modifica: " />
          <ThemedText font='Nunito-Italic'  label={ new Date(fridgeDetail.updated_at).toLocaleDateString('it-IT')} />

        </View>
      </View>

      {/* Grafico + Elenco tipi prodotto */}
      <View className="bg-primary-700 h-1/6">
        <FridgeGraphDetail />
      </View>

      {/* Elenco Prodotti */}
      <View className="bg-primary-600 h-full">
      </View>
    </>
    :
    null
  }

    </View>
  )
}

export default FridgeDetail
