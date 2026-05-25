import AssignedProductToFridgeDetail from "@/components/details/AssignedProductDetail"
import FridgeGraphDetail from "@/components/details/FridgeGraphDetail"
import CartPageHeader from "@/components/headers/CartPageHeader"
import FridgeActionDailyAgenda from "@/components/thirdParty/FridgeActionDailyAgenda"
import BottomSheetComponent from "@/components/ui/BottomSheet"
import ThemedText from "@/components/ui/ThemedText"
import { Fridge } from "@/constants/interfaces/productInterface"
import { primaryColor } from "@/constants/theme"
import { ProductController } from "@/controllers/ProductController"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { router, useLocalSearchParams } from "expo-router"
import React, { useEffect, useState } from "react"
import { FlatList, TouchableOpacity, View } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"
import { useFridge } from "./_layout"

// $ Flat list constants
const FOUR_ROW_FLATLIST_WIDTH = 21
const TWO_ROW_FLATLIST_WIDTH = 48
const SINGLE_ROW_FLATLIST_WIDTH = 98


const FridgeDetail = () => {
  // £ Context
  const { fridgeAgendaProps, setFridgeAgendaProps } = useFridge()

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
      const fridge = res as Fridge
      setFridgeDetail(fridge)
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
          
        <View className="mb-8 flex-1 p-2 gap-2">
          {/* Descrizione principale Frigo */}
          <View >
            <CartPageHeader />

            <ThemedText font='Nunito-Bold' darkModeDisabled textStyle="text-4xl text-primary-500"  label={fridgeDetail.name} />
            <View className="flex flex-row gap-2">
              <ThemedText font='Nunito-Bold'  label="Ultima Modifica: " />
              <ThemedText font='Nunito-Italic'  label={ new Date(fridgeDetail.updated_at).toLocaleDateString('it-IT')} />
            </View>
          </View>

          {/* Grafico + Elenco tipi prodotto */}
          <View className="h-[40%] w-screen mb-4 ">
            <FridgeGraphDetail productList={fridgeDetail.productList}/>
          </View>

          {/* Elenco Prodotti product_list*/}
          <View className="flex-1  gap-4">
            {/* Row per azioni / display */}
            <View className="flex flex-row justify-between">
              
              {/* Row Azioni */}
              <View className="flex flex-row gap-4 ">
                <TouchableOpacity>
                  <MaterialIcons 
                    name="menu-book"
                    size={32}
                    color={primaryColor[500]}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <MaterialIcons 
                    name="restaurant"
                    size={32}
                    color={primaryColor[500]}
                  />
                </TouchableOpacity>
              </View>

              {/* Row Display */}
              <View className="flex flex-row gap-4 items-center">
                <TouchableOpacity>
                  <MaterialCommunityIcons 
                    name="view-headline"
                    size={32}
                    color={ columnsOfProducts === 1 ? primaryColor[500] : primaryColor[900]}

                    onPress={() => handleProductViewDisplay('row')}
                  />
                </TouchableOpacity>

                <TouchableOpacity>
                  <MaterialCommunityIcons 
                    name="view-grid"
                    size={26}
                    color={ columnsOfProducts === 2 ? primaryColor[500] : primaryColor[900]}

                    onPress={() => handleProductViewDisplay('doubleCol')}
                  />
                </TouchableOpacity>

                <TouchableOpacity>
                  <MaterialCommunityIcons 
                    name="view-comfy"
                    size={32}
                    color={ columnsOfProducts === 4 ? primaryColor[500] : primaryColor[900]}
                    onPress={() => handleProductViewDisplay('fourCol')}
                  />
                </TouchableOpacity>

              </View>
            </View>

            {/* Dipslay prodotti */}
            <FlatList
              key={columnsOfProducts}
              numColumns={columnsOfProducts}
              data={fridgeDetail.productList}
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
              ListEmptyComponent={() => {
                return (
                  <View className="flex flex-row flex-1 items-center justify-center">
                    <ThemedText font="Nunito-Italic" textStyle="text-center" label="L'inventario è vuoto" />
                  </View>
                )
              }}
              renderItem={({ item }) => (
                <Animated.View style={[
                  productViewWidth,
                  columnsOfProducts === 1 && {
                    marginBottom: 16,
                  },
                  {                  
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.15,
                    shadowRadius: 3,
                    elevation: 2,
                  }
              ]}>
                  <AssignedProductToFridgeDetail product={item} itemsPerColumns={columnsOfProducts} />
                </Animated.View>
              )}
            />
          </View>
        </View>
        :
        null
      }

      {/* Agenda BottomSheet */}
      {
        fridgeAgendaProps && 
        <BottomSheetComponent
          height={.7}
          onClose={() => setFridgeAgendaProps(null)}
          ShownComponent={FridgeActionDailyAgenda}
        />
      }
    </SafeAreaView>
  )
}

export default FridgeDetail
