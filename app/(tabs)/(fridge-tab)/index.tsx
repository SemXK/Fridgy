import ProductMiniCard from "@/components/details/ProductMiniCard"
import { productList } from "@/constants/interfaces/fakeData"
import { Product } from "@/constants/interfaces/productInterface"
import { router } from "expo-router"
import { FlatList, View } from "react-native"
import { useFridge } from "./_layout"

const FridgeList = () => {
  const { filter } = useFridge()

  const handlePress = (product: Product) => {
    router.push(`/(fridge-tab)/${String(product.id)}`);
  }

  return (
    <FlatList
      className="w-full h-full"
      data={productList.filter(p => p.name.includes(filter))}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      contentContainerStyle={{
        paddingHorizontal: 12, // padding on left/right of whole list
        paddingBottom: 100,
      }}
      columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 12 }} // row spacing
      renderItem={({ item }) => (
        <View
          style={{
            flex: 1,
            aspectRatio: 1,
            marginHorizontal: 6, // half of the gap, so two items sum to 12px
            backgroundColor: 'white',
            borderRadius: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.15,
            shadowRadius: 3,
            elevation: 2,
          }}
        >
          <ProductMiniCard
            onPress={() => handlePress(item)}
            product={item}
          />
        </View>
      )}
    />


  )
}

export default FridgeList
