import AssignedProductToFridgeDetail from "@/components/details/AssignedProductDetail"
import FridgeGraphDetail from "@/components/details/FridgeGraphDetail"
import CartPageHeader from "@/components/headers/CartPageHeader"
import ThemedText from "@/components/ui/ThemedText"
import { Fridge } from "@/constants/interfaces/productInterface"
import { ProductController } from "@/controllers/ProductController"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { router, useLocalSearchParams } from "expo-router"
import React, { useEffect, useState } from "react"
import { FlatList, TouchableOpacity, View } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"

// $ Flat list constants
const FOUR_ROW_FLATLIST_WIDTH = 21
const TWO_ROW_FLATLIST_WIDTH = 48
const SINGLE_ROW_FLATLIST_WIDTH = 98


const FridgeDetail = () => {
  // % Animation states
  const productWidth = useSharedValue(FOUR_ROW_FLATLIST_WIDTH) // in %

  // % Animation Functions
  const productViewWidth = useAnimatedStyle(() => ({
    width: `${productWidth.value}%`
  }))

  // * Context
  const { fridgeId } = useLocalSearchParams<{ fridgeId: string }>()
  // const { openDetail, closeDetail } = useFridge()

  // *States
  const [fridgeDetail, setFridgeDetail] = useState<Fridge | undefined>(undefined);
  const [columnsOfProducts, setColumnsOfProducts] = useState<number>(4);


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
      router.back()
    })
  }
  const handleProductViewDisplay = (displayType: string) => {
    switch(displayType){
      case 'doubleCol': 
        setColumnsOfProducts(2)
        productWidth.value = withTiming(TWO_ROW_FLATLIST_WIDTH, {
          duration: 400
        })
      break
      case 'fourCol':
        setColumnsOfProducts(4)
        productWidth.value = withTiming(FOUR_ROW_FLATLIST_WIDTH, {
          duration: 400
        })
      break;
      case 'row':
        setColumnsOfProducts(1)
        productWidth.value = withTiming(SINGLE_ROW_FLATLIST_WIDTH, {
          duration: 400
        })
      break;

    }
  }

  // * Display
  return (
    <SafeAreaView className="flex-1">
      {
      fridgeDetail ? 
          
        <View className="mb-8 flex-1">
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
          <View className="bg-primary-700 h-32">
            <FridgeGraphDetail />
          </View>

          {/* Elenco Prodotti product_list*/}
          <View className="flex-1 p-4 gap-4">
            {/* Row per azioni / display */}
            <View className="flex flex-row justify-between">
              
              {/* Row Azioni */}
              <View className="flex flex-row gap-4">
                <TouchableOpacity>
                  <MaterialIcons 
                    name="menu-book"
                    size={32}
                    color="white"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <MaterialIcons 
                    name="restaurant"
                    size={32}
                    color="white"
                  />
                </TouchableOpacity>
              </View>

              {/* Row Display */}
              <View className="flex flex-row gap-4 items-center">
                <TouchableOpacity>
                  <MaterialCommunityIcons 
                    name="view-headline"
                    size={32}
                    color="white"
                    onPress={() => handleProductViewDisplay('row')}
                  />
                </TouchableOpacity>

                <TouchableOpacity>
                  <MaterialCommunityIcons 
                    name="view-grid"
                    size={26}
                    color="white"
                    onPress={() => handleProductViewDisplay('doubleCol')}
                  />
                </TouchableOpacity>

                <TouchableOpacity>
                  <MaterialCommunityIcons 
                    name="view-comfy"
                    size={32}
                    color="white"
                    onPress={() => handleProductViewDisplay('fourCol')}
                  />
                </TouchableOpacity>

              </View>
            </View>

            {/* Dipslay prodotti */}
              <FlatList
                key={columnsOfProducts}
                numColumns={columnsOfProducts}
                data={fridgeDetail.product_list}
                initialNumToRender={8}
                maxToRenderPerBatch={8}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => String(item.id)}
                className="flex-1"
                columnWrapperStyle={
                  columnsOfProducts > 1
                    ? {
                        justifyContent: 'flex-start',
                        marginBottom: 16,
                        gap: 16
                      }
                    : 
                    undefined
                }
                contentContainerStyle={{
                  paddingBottom: 20
                }}
                // ListEmptyComponent={() => <EmptyFridgeListComponent onPress={() => setNewFridgeModal(true)}/>}
                renderItem={({ item }) => (
                  <Animated.View style={[
                    productViewWidth,
                    columnsOfProducts === 1 && {
                      marginBottom: 16,
                    },
                ]}>
                    <AssignedProductToFridgeDetail product={item} />
                  </Animated.View>
                )}
              />
          </View>
        </View>
        :
        null
      }

    </SafeAreaView>
  )
}

export default FridgeDetail
