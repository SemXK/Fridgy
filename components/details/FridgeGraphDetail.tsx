import { Product, ProductType } from "@/constants/interfaces/productInterface";
import { styleShadows } from "@/constants/styles/style-shadows";
import { darkColor, primaryColor } from "@/constants/theme";
import { ProductController } from "@/controllers/ProductController";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { Appearance, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { PieChart, pieDataItem } from "react-native-gifted-charts";
import PagerView from 'react-native-pager-view';
import { ActivityIndicator } from "react-native-paper";
import FridgeActionCalendar from "../thirdParty/FridgeActionCalendar";
import ThemedText from "../ui/ThemedText";
import UrlImage from "../ui/UrlImage";
interface FGD {
  productList: Product[]
}

const FridgeGraphDetail = ({productList}: FGD) => {
  // £ Params
  const { fridgeId } = useLocalSearchParams<{fridgeId: string }>()

  // * Graph States
  const [requestedProducts, setRequestedProducts] = useState<Product[]>([]);
  const [requestedProdLoad, setRequestedProdLoad] = useState<boolean>(false);

  const [productTypeGraphData, setProductTypeGraph] = useState<pieDataItem[]>([])
  const [brandGraphData, setBrandGraphData] = useState<pieDataItem[]>([])

  const [focusedProductType, setFocusedProductType] = useState<pieDataItem | undefined>(undefined)
  const [totalProductTypes, setTotalProductTypes] = useState<number>(0)

  const [focusedBrand, setFocusedBrand] = useState<pieDataItem | undefined>(undefined)
  const [totalBrands, setTotalBrands] = useState<number>(0)

  // $ Memoized Product Type Function 
  useMemo(() => {

    // 1$ Fetch all productTypes
    const pieDataItems: pieDataItem[] = []
    productList.map((product: Product) => {

      // 2$ Fetch through every product's type
      product.productTypes.map((prodType: ProductType) => {

        const currentGraphItem = pieDataItems.find(item => item.text === prodType.type)

        // 3$ Product already in the graph array
        if(currentGraphItem) {
          currentGraphItem.value += product.pivot?.quantity as number
        }

        // 3$ new Product for the graph array
        else {
          pieDataItems.push({
            text: prodType.type,
            value: product.pivot?.quantity as number,
            color: prodType.color,
          })
        }

      })
    });

    // 1$ Save Graph Data
    setProductTypeGraph(pieDataItems)
    let currentTotalItems = 0
    pieDataItems.map((pieItem) => {
      currentTotalItems += pieItem.value
    })
    setTotalProductTypes(currentTotalItems)
  }, [productList])

  // $ Memoized Brand Function 
  useMemo(() => {
    // 1$ Fetch all brand
    const pieDataItems: pieDataItem[] = []
    productList.map((product: Product) => {

      // 2$ Fetch brand in graph array
      const currentGraphItem = pieDataItems.find(item => item.text === product.brand.name)

      // 3$ Product already in the graph array
      if(currentGraphItem) {
        currentGraphItem.value += product.pivot?.quantity as number
      }

      // 3$ new Product for the graph array
      else {
        pieDataItems.push({
          text: product.brand.name,
          value: product.pivot?.quantity as number,
        })
      }

    });

    // 1$ Save Graph Data
    setBrandGraphData(pieDataItems)
    const currentTotalItems = pieDataItems.reduce((sum, pieItem) => sum + (pieItem.value || 0), 0)
    setTotalBrands(currentTotalItems)
  }, [productList])

  // * Functions
  const handlePageChange = (event:any) => {
    // console.log("click")
  }
  const getRequestedProducts = async () => {
    setRequestedProdLoad(true)
    await ProductController.getRequestedProduct(fridgeId).then((res) => {
      setRequestedProducts(res as Product[])
    })
    .finally(() => {
      setRequestedProdLoad(false)
    })
  }

  // * Effects
  useEffect(() => {
    getRequestedProducts();
  }, []);

  // * Display
  return (
    <View style={styles.container}>
      <PagerView style={styles.container} initialPage={0} onPageScroll={handlePageChange}>

        {/* Requested Products */}
        <View  key="1">
          
            <View
              className="rounded-xl bg-white dark:bg-darkColor-800 "
              style={{
                height:'100%',
                padding: 16,
                marginRight: 10,
                borderRadius: 20,
              }}
              >
              <ThemedText font="Nunito-Bold" label="Prodotti Richeisti"  />
              {
                requestedProdLoad ?
                <View className="w-full flex flex-row justify-center">
                  <ActivityIndicator animating size={24} color={primaryColor[500]}  />
                </View>
                :
                <View className="flex-1">
                  <FlatList 
                    numColumns={4}
                    data={requestedProducts}
                    contentContainerStyle={{ 
                      flex: 1,
                      paddingVertical: 10 ,
                      justifyContent: "space-between",
                      gap:10,
                      marginBottom: 16,
                    }}
                    
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({item}) => {
                      return (
                        <View  className="aspect-square w-1/4  rounded-xl flex flex-row items-center justify-center">
                          <UrlImage source={item.image} resizeMode='contain' />
                        </View>
                      )
                    }}
                    ListEmptyComponent={() => {
                      return (
                        <View className="flex flex-row flex-1 items-center justify-center">
                          <ThemedText font="Nunito-Italic" textStyle="text-center" label="Non ci sono richieste per prodotti" />
                        </View>
                      )
                    }}
                  />
                </View>
              }
            </View>
        </View>

        {/* Pie Chart Product Type*/}
        <View key="2">
            <View
              className="rounded-xl bg-white dark:bg-darkColor-800"
              style={{
                height:'100%',
                padding: 16,
                marginRight: 10,
                borderRadius: 20,
              }}
              >
              <ThemedText font="Nunito-Bold" label="Composizione Inventario"  />
              {
                productTypeGraphData.length ?
                <View style={{ alignItems: 'center'}}>
                  <PieChart
                    focusOnPress
                    onPress={(item: pieDataItem) => setFocusedProductType(focusedProductType === item ? undefined : item)}
                    data={productTypeGraphData}
                    donut
                    sectionAutoFocus
                    radius={110}
                    innerRadius={80}
                    innerCircleColor={ Appearance.getColorScheme() === 'dark' ? darkColor[800] : 'white'}
                    centerLabelComponent={() => {
                      return (
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                          {focusedProductType && 
                            <>
                              <ThemedText font="Nunito-Bold" textStyle="text-center text-xl" label={focusedProductType.text as string} />
                              <View className="flex flex-row gap-4">
                                <ThemedText font="Nunito-Bold" textStyle="text-center" label={focusedProductType.value + " Prodotti"} />
                                <ThemedText font="Nunito-Bold" textStyle="text-center" label={Math.round(focusedProductType.value * 100 / totalProductTypes) + "%"} />
                              </View>
                            </>
                          }
                        </View>
                      );
                    }}
                  />
                </View>
                :
                <View className="flex flex-row flex-1 items-center justify-center">
                  <ThemedText font="Nunito-Italic" textStyle="text-center" label="L'inventario è vuoto" />
                </View>
              }
            </View>
        </View>

        {/* Pie Chart Product Brand*/}
        <View  key="3">
          <View
            className="rounded-xl bg-white dark:bg-darkColor-800"
            style={{
              height:'100%',
              padding: 16,
              marginRight: 10,
              borderRadius: 20,
            }}>
            <ThemedText font="Nunito-Bold" label="Marche Prodotti"  />
            {
              brandGraphData.length ?
              <View style={{ alignItems: 'center'}}>
                <PieChart
                  focusOnPress
                  onPress={(item: pieDataItem) => setFocusedBrand(focusedBrand === item ? undefined : item)}
                  data={brandGraphData}
                  donut
                  sectionAutoFocus
                  radius={110}
                  innerRadius={80}
                  innerCircleColor={ Appearance.getColorScheme() === 'dark' ? darkColor[800] : 'white'}
                  centerLabelComponent={() => {
                    return (
                      <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        {focusedBrand && 
                          <>
                            {/* <Text
                              style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
                                {Math.round(focusedProductType.value * 100 / totalProductTypes) }%
                            </Text> */}
                            <ThemedText font="Nunito-Bold" textStyle="text-center text-xl" label={focusedBrand.text as string} />
                            <View className="flex flex-row gap-4">
                              <ThemedText font="Nunito-Bold" textStyle="text-center" label={focusedBrand.value + " Prodotti"} />
                              <ThemedText font="Nunito-Bold" textStyle="text-center" label={Math.round(focusedBrand.value * 100 / totalBrands) + "%"} />
                            </View>
                          </>
                        }
                      </View>
                    );
                  }}
                />
              </View>
              :
              <View className="flex flex-row flex-1 items-center justify-center">
                <ThemedText font="Nunito-Italic" textStyle="text-center" label="L'inventario è vuoto" />
              </View>
            }
          </View>
        </View>

        {/* Fridge Events Calendar */}
        <View  key="4">
          <View
            className="rounded-xl"
            style={{
              height:'100%',
              padding: 16,
              marginRight: 10,
              borderRadius: 20,
              backgroundColor: Appearance.getColorScheme() === 'dark' ? darkColor[800] : 'white',
            }}>
            <FridgeActionCalendar />
          </View>
        </View>


      </PagerView>
    </View>
  )
}

export default FridgeGraphDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...styleShadows.shadow
  },
});