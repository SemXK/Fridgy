import { productList } from "@/constants/interfaces/fakeData"
import { Product } from "@/constants/interfaces/productInterface"
import { router, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { Image, Pressable, Text, View } from "react-native"
import { useFridge } from "./_layout"

const FridgeDetail = () => {
  // * Context
  const { productId } = useLocalSearchParams<{ productId: string }>()
  const { expandHeader, collapseHeader } = useFridge()

  // *States
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(undefined);

  // * Lifecycle
  useEffect(() => {
    const product = productList.find(p => String(p.id) === productId)
    if (!product) {
      router.back();
    }
    setCurrentProduct(product);
    // 1* Header Animation
    expandHeader(product?.name as string)
    return () => collapseHeader()
  }, [])

  return (
    <View className="">
      {
        currentProduct ?
          <>
            <Image
              source={currentProduct.image}
              resizeMode="contain"
              style={{
                position: "absolute",
                top: 80, // adjust to align with your header
                alignSelf: "center",
                width: 180,
                height: 180,
                borderRadius: 16,
              }}
            />

            <View className="p-6">
              <Pressable
                className="mt-6 bg-primary-500 py-3 rounded-xl"
                onPress={() => router.back()}
              >
                <Text className="text-white text-center text-lg font-semibold">
                  Indietro
                </Text>
              </Pressable>
            </View>
          </>
          :
          <Text>Loading:...</Text>
      }

    </View>
  )
}

export default FridgeDetail
