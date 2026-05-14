import { Product, ProductType } from "@/constants/interfaces/productInterface";
import { darkColor } from "@/constants/theme";
import React, { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PieChart, pieDataItem } from "react-native-gifted-charts";
import PagerView from 'react-native-pager-view';
import ThemedText from "../ui/ThemedText";
interface FGD {
  productList: Product[]
}

const FridgeGraphDetail = ({productList}: FGD) => {

  // * States
  const [graphData, setGraphData] = useState<pieDataItem[]>([])
  const [focusedProductType, setFocusedProductType] = useState<pieDataItem | undefined>(undefined)
  const [totalProductTypes, setTotalProductTypes] = useState<number>(0)

  // $ Memoized Functions
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
    setGraphData(pieDataItems)
    let currentTotalItems = 0
    pieDataItems.map((pieItem) => {
      currentTotalItems += pieItem.value
    })
    setTotalProductTypes(currentTotalItems)
  }, [])

  // * Functions
  const handlePageChange = (event:any) => {
    // console.log(Object.keys(event), event.nativeEvent.position)
    console.log("click")

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
                padding: 16,
                marginRight: 10,
                borderRadius: 20,
                backgroundColor: darkColor[800],
              }}>
              <ThemedText font="Nunito-ExtraBold" label="Tipologia Prodotto"  />
              <View style={{padding: 20, alignItems: 'center'}}>
                <PieChart
                  focusOnPress
                  onPress={(item: pieDataItem) => setFocusedProductType(item)}
                  data={graphData}
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
                            <View>
                              <ThemedText font="Nunito-ExtraBold" textStyle="text-center" label={focusedProductType.value + " Prodotti"} />
                              {/* <ThemedText font="Nunito-ExtraBold" textStyle="text-center" label={Math.round(focusedProductType.value * 100 / totalProductTypes) + "%"} /> */}
                            </View>
                          </>
                        }
                      </View>
                    );
                  }}
                />
              </View>
              {/* {renderLegendComponent()} */}
            </View>
        </View>



        <View  key="2">
          <Text>Product Type</Text>
        </View>
        <View  key="3">
          <Text>Brand Type</Text>
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