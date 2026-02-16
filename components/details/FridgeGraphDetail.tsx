import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PagerView from 'react-native-pager-view';

const FridgeGraphDetail = () => {

  const handlePageChange = (event:any) => {
    console.log(Object.keys(event), event.nativeEvent.position)
  }
  return (
    <View style={styles.container}>
      <PagerView style={styles.container} initialPage={0} onPageScroll={handlePageChange}>
        <View style={styles.page} key="1">
          <Text>Pie Chart</Text>
        </View>
        <View style={styles.page} key="2">
          <Text>Product Type</Text>
        </View>
        <View style={styles.page} key="3">
          <Text>Brand Type</Text>
        </View>
        <View style={styles.page} key="4">
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
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});