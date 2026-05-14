import { Product, ProductType } from "@/constants/interfaces/productInterface";
import { darkColor } from "@/constants/theme";
import React, { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PieChart, pieDataItem } from "react-native-gifted-charts";
import PagerView from 'react-native-pager-view';
import ThemedText from "../ui/ThemedText";

// const pieData = [
//   {
//     value: 49,
//     color: '#009FFF',
//     gradientCenterColor: '#006DFF',
//     focused: true,
//   },
//   {value: 40, color: '#93FCF8'},
//   {value: 16, color: '#BDB2FA'},
//   {value: 3, color: '#FFA5BA'},
// ];

interface FGD {
  productList: Product[]
}

const FridgeGraphDetail = ({productList}: FGD) => {

  // * States
  const [graphData, setGraphData] = useState<pieDataItem[]>([])

  // $ Memoized Functions
  const createProductTypeGraph = useMemo(() => {

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
            color: prodType.color
          })
        }

      })
    });

    // 1$ Save Graph Data
    setGraphData(pieDataItems)

  }, [])


  
  // * Functions
  const handlePageChange = (event:any) => {
    console.log(Object.keys(event), event.nativeEvent.position)
  }

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
                  data={graphData}
                  donut
                  showGradient
                  sectionAutoFocus
                  radius={90}
                  innerRadius={60}
                  innerCircleColor={'#232B5D'}
                  centerLabelComponent={() => {
                    return (
                      <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text
                          style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
                          47%
                        </Text>
                        <Text style={{fontSize: 14, color: 'white'}}>Excellent</Text>
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