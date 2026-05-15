import CreateNewFridgeComponent from "@/components/details/CreateNewFridgeComponent"
import EmptyFridgeListComponent from "@/components/details/EmptyFridgeListComponent"
import FridgeMiniCard from "@/components/details/FridgeMiniCard"
import AnimatedUnassignedProductDetail from "@/components/details/UnassignedProductDetail"
import HomePageHeader from "@/components/headers/HomePageHeader"
import BottomSheetComponent from "@/components/ui/BottomSheet"
import ThemedText from "@/components/ui/ThemedText"
import { Fridge, UnassignedProduct } from "@/constants/interfaces/productInterface"
import { primaryColor } from "@/constants/theme"
import { ProductController } from "@/controllers/ProductController"
import { MaterialIcons } from "@expo/vector-icons"
import { useFocusEffect } from "@react-navigation/native"
import { AxiosError } from "axios"
import * as Haptics from 'expo-haptics'
import React, { useCallback, useEffect, useRef, useState } from "react"
import { ActivityIndicator, FlatList, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"


const FridgeList = () => {
  // * References
  const fridgeVerticalHeights = useRef<{y: number,height: number, fridgeId: number}[]>([]);
  const fridgeListVerticalPosition = useRef<number>(300); // Vertical start position of the flatlist that contains the list of fridges, needs to be loaded dinamically 
  const currentHoldingFridge = useRef<number | undefined>(undefined);

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
  const itemDragEvent = (x: number, y: number) => {
    const holdingFridge = fridgeVerticalHeights.current.find(f => {return y >= f.y && y <= f.y + f.height})
    if(holdingFridge) {
      currentHoldingFridge.current = holdingFridge.fridgeId
      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      )
    }
    else {
      currentHoldingFridge.current = undefined
    }
    // console.log("item Dragging", y,fridgeListVerticalPosition.current, fridgeVerticalHeights.current[0])

  }
  const assignProductToFridge = async (unsignedProductId: number) => {
    const fridgeId = currentHoldingFridge.current;
    if(fridgeId) {
      console.log({ fridgeId: currentHoldingFridge.current, unsignedProductId })
      await ProductController.assignProductToFridge(
        fridgeId,
        unsignedProductId
      ).then(() => {
        getFridgeList()
        getUnassignedProducts()
      })
      .catch(e => console.log(e))
    }
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
    <SafeAreaView >
      <HomePageHeader title="Il mio inventario"/> 

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
              {unassignedProducts.map((prod) => <AnimatedUnassignedProductDetail 
                key={prod.id} 
                unassignedProduct={prod} 
                onDragOverFridge={itemDragEvent} 
                onDropOnFridge={assignProductToFridge}
                />
              )}
            </View>

          {/* Fridge List */}
          <View className="relative">
            <View className="flex flex-row justify-between items-center mb-4">
              <ThemedText label="I miei frigoriferi" darkModeDisabled font="Nunito-Bold" textStyle="text-primary-500 text-2xl"/>
              <TouchableOpacity onPress={() => setNewFridgeModal(true)} >
                  <MaterialIcons
                    name="add"
                    size={24}
                    color={primaryColor[500]}
                  />
                </TouchableOpacity>
            </View>
          </View>

          <FlatList
            data={fridgeList}
            keyExtractor={item => String(item.id)}
            numColumns={1}
            onLayout={(layout) => {
              fridgeVerticalHeights.current = []
              // console.log(layout)
              // fridgeListVerticalPosition.current = layout.nativeEvent.layout.y
            }}
            style={{ flex: 1 }}
            contentContainerStyle={{
              paddingBottom: 160,
              gap: 64,
            }}
            ListEmptyComponent={() => <EmptyFridgeListComponent onPress={() => setNewFridgeModal(true)}/>}
            renderItem={({ item }) => (
            <View
              onLayout={(event) => {
                const { y, height } = event.nativeEvent.layout;

                // 1* needed for the drag and release animation of products to assing to fridge
                fridgeVerticalHeights.current[fridgeVerticalHeights.current.length] = { 
                  y: fridgeListVerticalPosition.current + fridgeVerticalHeights.current.length * height, 
                  height, 
                  fridgeId: item.id 
                }

              }}
            >
              <FridgeMiniCard fridge={item} callbackFunction={getFridgeList} />
            </View>
            )}
          />
        </View>

      }

      {/* BottomSheet */}
      {
        newFridgeModal && 
        <BottomSheetComponent
          height={1}
          onClose={() => handleCloseModal()}
          ShownComponent={CreateNewFridgeComponent}
        />
    }
    </SafeAreaView>
  )
}

export default FridgeList
