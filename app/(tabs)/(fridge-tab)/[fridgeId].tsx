import AssignedProductToFridgeDetail from "@/components/details/AssignedProductDetail"
import EditFridgeComponent from "@/components/details/EditFridgeComponent"
import FridgeGraphDetail from "@/components/details/FridgeGraphDetail"
import FridgeUserList from "@/components/details/Lists/FridgeUserList"
import ProductConsumptionBottomSheet from "@/components/details/ProductConsumptionBottomSheet"
import BackButtonHeader from "@/components/headers/BackButtonHeader"
import LinkCodeDisplay from "@/components/nutritionistComponents/LinkCodeDisplay"
import FridgeActionDailyAgenda from "@/components/thirdParty/FridgeActionDailyAgenda"
import BottomSheetComponent from "@/components/ui/BottomSheet"
import CustomModal from "@/components/ui/CustomModal"
import ThemedText from "@/components/ui/ThemedText"
import { FridgeInvitationCode } from "@/constants/interfaces/nutritionist"
import { Product } from "@/constants/interfaces/productInterface"
import { styleShadows } from "@/constants/styles/style-shadows"
import { primaryColor } from "@/constants/theme"
import { ConsumerController } from "@/controllers/ConsumerController"
import { getEcho } from '@/scripts/LaravelEcho'
import { FontAwesome6, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { useLocalSearchParams } from "expo-router"
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
  const { fridgeAgendaProps, setFridgeAgendaProps, fridgeDetail, getFridgeDetail } = useFridge()

  // % Animation states
  const productWidth = useSharedValue(FOUR_ROW_FLATLIST_WIDTH) // in %

  // % Animation Functions
  const productViewWidth = useAnimatedStyle(() => ({
    width: `${productWidth.value}%`
  }))

  // * Context
  const { fridgeId } = useLocalSearchParams<{ fridgeId: string }>()

  // *States
  const [fridgeWebSocket, setFridgeWebSocket] = useState<any>(null);

  const [columnsOfProducts, setColumnsOfProducts] = useState<number>(4);
  const [editingFridgeIsOpen, setEditingFridgeIsOpen] = useState<boolean>(false);
  const [consumingProduct, setConsumingProduct] = useState<Product | null>(null); // BottomSheet for product usage
  const [showCodeModal, setShowCodeModal] = useState<boolean>(false);
  const [showUserList, setShowUserList] = useState<boolean>(false);
  const [linkCode, setLinkCode] = useState<string>("");

  // * Lifecycle
  useEffect(() => {
    setupWebSocket()
    return () => {
      fridgeWebSocket?.stopListening(`fridge-channel-${fridgeId}`);
      setFridgeWebSocket(null)
    };
  }, [])
  useEffect(() => {
    getFridgeDetail(fridgeId)
  }, [fridgeId])

  // * Functions
  const setupWebSocket = async () => {
    const echo = await getEcho() as any;
    const channel = echo.channel(`fridge-channel-${fridgeId}`)
    
    channel.listen(`.FridgeChannel`, () => {
      setShowCodeModal(false)
      getFridgeDetail(fridgeId)
    })
    setFridgeWebSocket(channel)

  }
  const handleProductViewDisplay = (displayType: string) => {
    switch (displayType) {
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
  const editFridge = () => {
    setEditingFridgeIsOpen(true)
  }
  const handleCloseModal = () => {
    setEditingFridgeIsOpen(false)
  }
  const consumeProduct = (selectedProd: Product) => {
    setConsumingProduct(selectedProd)
  }
  const showInviteCode = async () => {
    await ConsumerController.createFridgeInvitationCode(fridgeId)
      .then((res) => {
        const response = res as FridgeInvitationCode
        setLinkCode(response.linkCode)
        setShowCodeModal(true)
      })
  }

  // * Display
  return (
    <SafeAreaView className="flex-1">
      <BackButtonHeader />

      {
        fridgeDetail ?

          <View className="mb-8 flex-1 p-2 gap-2 ">
            {/* Descrizione principale Frigo */}
            <View>

              <View className="flex flex-row justify-between">
                <ThemedText font='Nunito-Bold' darkModeDisabled textStyle="text-2xl text-primary-500" label={fridgeDetail.name} />
                
                <View className="flex flex-row gap-4">

                  <TouchableOpacity onPress={() => setShowUserList(true)} >
                    <FontAwesome6 name="users" size={20} color={primaryColor[500]} />
                  </TouchableOpacity>
                  {
                    fridgeDetail.propertyPivot.canEdit ?
                    <TouchableOpacity onPress={showInviteCode} >
                      <FontAwesome6 name="user-plus" size={20} color={primaryColor[500]} />
                    </TouchableOpacity>
                    :
                    null
                  }
                  <TouchableOpacity onPress={editFridge} >
                    <FontAwesome6 name="edit" size={20} color={primaryColor[500]} />
                  </TouchableOpacity>
                </View>

              </View>

              <View className="flex flex-row gap-2">
                <ThemedText font='Nunito-Bold' label="Ultima Modifica: " />
                <ThemedText font='Nunito-Italic' label={new Date(fridgeDetail.updated_at).toLocaleDateString('it-IT')} />
              </View>
            </View>

            {/* Grafico + Elenco tipi prodotto */}
            <View className="h-[40%] w-screen mb-4 ">
              <FridgeGraphDetail productList={fridgeDetail.productList} />
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
                      color={columnsOfProducts === 1 ? primaryColor[500] : primaryColor[900]}

                      onPress={() => handleProductViewDisplay('row')}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <MaterialCommunityIcons
                      name="view-grid"
                      size={26}
                      color={columnsOfProducts === 2 ? primaryColor[500] : primaryColor[900]}

                      onPress={() => handleProductViewDisplay('doubleCol')}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <MaterialCommunityIcons
                      name="view-comfy"
                      size={32}
                      color={columnsOfProducts === 4 ? primaryColor[500] : primaryColor[900]}
                      onPress={() => handleProductViewDisplay('fourCol')}
                    />
                  </TouchableOpacity>

                </View>
              </View>

              {/* Dipslay prodotti  */}
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
                    styleShadows.shadow
                  ]}>
                    <AssignedProductToFridgeDetail 
                      product={item} 
                      itemsPerColumns={columnsOfProducts} 
                      onPressFunc={consumeProduct} 
                    />
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

      {/* Edit Fridge BottomSheet */}
      {
        editingFridgeIsOpen &&
        <BottomSheetComponent
          height={.7}
          onClose={() => handleCloseModal()}
          ShownComponent={EditFridgeComponent}
        />
      }

      {/* Product Consumption BottomSheet */}
      {
        !!consumingProduct &&
        <BottomSheetComponent
          height={.7}
          onClose={() => setConsumingProduct(null)}
          ShownComponent={() => <ProductConsumptionBottomSheet product={consumingProduct} />}
        />
      }

      {/* User List BottomSheet */}
      {
        !!showUserList &&
        <BottomSheetComponent
          height={.7}
          onClose={() => setShowUserList(false)}
          ShownComponent={() => <FridgeUserList fridgeId={fridgeId}/>}
        />
      }

      {/* Modal Invite Code */}
      <CustomModal
        visible={showCodeModal}
        onClose={() => setShowCodeModal(false)}
        ChildComponent={() => {
          return (
            <LinkCodeDisplay 
              title="Il tuo codice invito"
              message="Condividi questo codice con chi vuoi invitare al tuo inventario"
              linkCode={linkCode} 
              onPress={() => setShowCodeModal(false)} 
            />
          )
        }}
      />


    </SafeAreaView>
  )
}

export default FridgeDetail
