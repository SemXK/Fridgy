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
      className="p-4 h-full"
      data={productList.filter(p => p.name.includes(filter))}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      contentContainerStyle={{ paddingBottom: 100 }}
      renderItem={({ item }) => (
        <View
          style={{ width: '48%', aspectRatio: 1, marginBottom: 8 }}
          className="rounded-lg"
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
