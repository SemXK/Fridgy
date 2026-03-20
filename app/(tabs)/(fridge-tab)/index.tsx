import CreateNewFridgeComponent from "@/components/details/CreateNewFridgeComponent"
import EmptyFridgeListComponent from "@/components/details/EmptyFridgeListComponent"
import FridgeMiniCard from "@/components/details/FridgeMiniCard"
import UnassignedProductDetail from "@/components/details/UnassignedProductDetail"
import PrimaryIconButton from "@/components/pressable/PrimaryIconButton"
import BottomSheetComponent from "@/components/ui/BottomSheet"
import ThemedText from "@/components/ui/ThemedText"
import { Fridge, UnassignedProduct } from "@/constants/interfaces/productInterface"
import { primaryColor } from "@/constants/theme"
import { ProductController } from "@/controllers/ProductController"
import { useFocusEffect } from "@react-navigation/native"
import { AxiosError } from "axios"
import React, { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, FlatList, View } from "react-native"


const FridgeList = () => {

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
  const getUnassignedProducts = async () => {
    setLoading(true)
    await ProductController.getUnassignedProducts().then((pl: UnassignedProduct[] | AxiosError) => {
      if (!(pl instanceof AxiosError)) {
        setUnassignedProducts(pl)
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
  const [unassignedProducts, setUnassignedProducts] = useState<UnassignedProduct[]>([])
  const [newFridgeModal, setNewFridgeModal] = useState<boolean>(false);

  // * Effects
  useFocusEffect(
    useCallback(() => {
      getUnassignedProducts()
    }, [])
  )
  useEffect(() => {
    getFridgeList()
  }, [])

  return (
    <View className="h-full">
    {
      loading ?
        <View className="w-full flex flex-row justify-center">
          <ActivityIndicator animating size={24} color={primaryColor[500]}  />
        </View>
        :
        <View className="px-4 h-full mb-32">  
        { 
          unassignedProducts.length ? 
            <ThemedText label="Prodotti da assengare"  font="Nunito-Bold"  darkModeDisabled textStyle="text-primary-500 text-2xl"/>
            :
            null
        }

          {/* Product list */}
            <View className="flex flex-row flex-wrap justify-start gap-4 mb-4">
              {unassignedProducts.map((prod) => <UnassignedProductDetail key={prod.id} unassignedProduct={prod} />)}
            </View>

          {/* Fridge List */}
          <View className="relative">

            <View className="flex flex-row justify-between items-center mb-4">
              <ThemedText label="I mien frigoriferi" darkModeDisabled font="Nunito-Bold" textStyle="text-primary-500 text-2xl"/>
              <PrimaryIconButton iconSpecs={{name: 'add', color: primaryColor[500], size: 24}} onPress={() => setNewFridgeModal(true)}/>
            </View>
            {/* <LinearGradient
              className="fixed"
              colors={[
                Appearance.getColorScheme() !== 'dark' ? 'black' : 'white',
                'transparent'
              ]} 
              style={{
                top:10,
                height: 60,
                zIndex: 10,
              }}
              pointerEvents="none"
            /> */}
          </View>

          <FlatList
            data={fridgeList}
            keyExtractor={item => String(item.id)}
            numColumns={1}
            style={{ flex: 1 }}
            contentContainerStyle={{
              paddingBottom: 160,
              gap: 64,
            }}
            ListEmptyComponent={() => <EmptyFridgeListComponent onPress={() => setNewFridgeModal(true)}/>}
            renderItem={({ item }) => (
                <FridgeMiniCard fridge={item}/>
            )}
          />
        </View>

      }

      {/* BottomSheet */}
      {
        newFridgeModal && 
        <BottomSheetComponent
          height={0.8}
          onClose={() => handleCloseModal()}
          ShownComponent={CreateNewFridgeComponent}
        />
    }
    </View>
  )
}

export default FridgeList
