import CreateNewFridgeComponent from "@/components/details/CreateNewFridgeComponent"
import EmptyFridgeListComponent from "@/components/details/EmptyFridgeListComponent"
import FridgeMiniCard from "@/components/details/FridgeMiniCard"
import BottomSheetComponent from "@/components/ui/BottomSheet"
import { Fridge } from "@/constants/interfaces/productInterface"
import { primaryColor } from "@/constants/theme"
import { ProductController } from "@/controllers/ProductController"
import { AxiosError } from "axios"
import React, { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, View } from "react-native"
import { useFridge } from "./_layout"

const FridgeList = () => {
  const { filter } = useFridge()

  // * Functions
  const getFridgeList = async () => {
    setLoading(true)
    await ProductController.getFridges().then((fl: Fridge[] | AxiosError) => {
      if (!(fl instanceof AxiosError)) {
        setFridgeList(fl)
      }
    })
    .catch(e => {console.log(e)})
    .finally(() => {setLoading(false)})
  }
  const handleCloseModal = () => {
    setNewFridgeModal(false)
    getFridgeList()
  }
  // * States
  const [loading, setLoading] = useState<boolean>(false)
  const [fridgeList, setFridgeList] = useState<Fridge[]>([])
  const [newFridgeModal, setNewFridgeModal] = useState<boolean>(false);

  // * Effects
  useEffect(() => {
    getFridgeList()
  }, [])

  return (
    <>
    {
      loading ?
        <View className="w-full flex flex-row justify-center">
          <ActivityIndicator animating size={24} color={primaryColor[500]} />
        </View>
        :
        <FlatList
          className="w-full h-full"
          data={fridgeList}
          keyExtractor={item => String(item.id)}
          numColumns={1}
          contentContainerStyle={{
            paddingHorizontal: 12,
            paddingBottom: 100,
            gap: 64
          }}
          
          ListEmptyComponent={() => <EmptyFridgeListComponent onPress={() => setNewFridgeModal(true)}/>}
          renderItem={({ item }) => (
              <FridgeMiniCard fridge={item}/>
          )}
        />
      }

      {/* BottomSheet */}
      {
        newFridgeModal && 
        <BottomSheetComponent
          height={0.6}
          onClose={() => handleCloseModal()}
          ShownComponent={CreateNewFridgeComponent}
        />
      }
    </>
  )
}

export default FridgeList
