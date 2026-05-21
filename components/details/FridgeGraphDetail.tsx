import { Product, ProductType } from "@/constants/interfaces/productInterface";
import { darkColor } from "@/constants/theme";
import React, { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PieChart, pieDataItem } from "react-native-gifted-charts";
import PagerView from 'react-native-pager-view';
import FridgeActionCalendar from "../thirdParty/FridgeActionCalendar";
import ThemedText from "../ui/ThemedText";
interface FGD {
  productList: Product[]
}

const FridgeGraphDetail = ({productList}: FGD) => {

  // * Graph States
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
  }, [])

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
  }, [])

  // * Functions
  const handlePageChange = (event:any) => {
    // console.log("click")

  }

  // * Display
  return (
    <View style={styles.container}>
      <PagerView style={styles.container} initialPage={0} onPageScroll={handlePageChange}>

        {/* Pie Chart */}
        <View key="1">
          {/* <Text>Product Type Chart (Meat, Milk...)</Text> */}
            <View
              style={{
                height:'100%',
                padding: 16,
                marginRight: 10,
                borderRadius: 20,
                backgroundColor: darkColor[800],
              }}>
              <ThemedText font="Nunito-ExtraBold" label="Composizione Inventario"  />
              <View style={{ alignItems: 'center'}}>
                <PieChart
                  focusOnPress
                  onPress={(item: pieDataItem) => setFocusedProductType(focusedProductType === item ? undefined : item)}
                  data={productTypeGraphData}
                  donut
                  sectionAutoFocus
                  radius={110}
                  innerRadius={80}
                  innerCircleColor={darkColor[800]}
                  centerLabelComponent={() => {
                    return (
                      <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        {focusedProductType && 
                          <>
                            {/* <Text
                              style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
                               {Math.round(focusedProductType.value * 100 / totalProductTypes) }%
                            </Text> */}
                            <ThemedText font="Nunito-ExtraBold" textStyle="text-center text-xl" label={focusedProductType.text as string} />
                            <View className="flex flex-row gap-4">
                              <ThemedText font="Nunito-ExtraBold" textStyle="text-center" label={focusedProductType.value + " Prodotti"} />
                              <ThemedText font="Nunito-ExtraBold" textStyle="text-center" label={Math.round(focusedProductType.value * 100 / totalProductTypes) + "%"} />
                            </View>
                          </>
                        }
                      </View>
                    );
                  }}
                />
              </View>
            </View>
        </View>

        <View  key="2">
          <View
            style={{
              height:'100%',
              padding: 16,
              marginRight: 10,
              borderRadius: 20,
              backgroundColor: darkColor[800],
            }}>
            <ThemedText font="Nunito-ExtraBold" label="Marche Prodotti"  />
            <View style={{ alignItems: 'center'}}>
              <PieChart
                focusOnPress
                onPress={(item: pieDataItem) => setFocusedBrand(focusedBrand === item ? undefined : item)}

                data={brandGraphData}
                donut
                sectionAutoFocus
                radius={110}
                innerRadius={80}
                innerCircleColor={darkColor[800]}
                centerLabelComponent={() => {
                  return (
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                      {focusedBrand && 
                        <>
                          {/* <Text
                            style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
                              {Math.round(focusedProductType.value * 100 / totalProductTypes) }%
                          </Text> */}
                          <ThemedText font="Nunito-ExtraBold" textStyle="text-center text-xl" label={focusedBrand.text as string} />
                          <View className="flex flex-row gap-4">
                            <ThemedText font="Nunito-ExtraBold" textStyle="text-center" label={focusedBrand.value + " Prodotti"} />
                            <ThemedText font="Nunito-ExtraBold" textStyle="text-center" label={Math.round(focusedBrand.value * 100 / totalBrands) + "%"} />
                          </View>
                        </>
                      }
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </View>

        <View  key="3">
            <View
              style={{
                height:'100%',
                padding: 16,
                marginRight: 10,
                borderRadius: 20,
                backgroundColor: darkColor[800],
              }}>
              <FridgeActionCalendar />
            </View>
        </View>
        <View  key="4">
          <Text>Last Bought Items</Text>
        </View>
      </PagerView>
    </View>
  )
}

export default FridgeGraphDetail
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});