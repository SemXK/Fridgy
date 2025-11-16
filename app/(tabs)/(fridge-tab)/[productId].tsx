import PrimaryButton from "@/components/pressable/PrimaryButton"
import PrimaryIconButton from "@/components/pressable/PrimaryIconButton"
import ThemedText from "@/components/ui/ThemedText"
import { productList } from "@/constants/interfaces/fakeData"
import { Product } from "@/constants/interfaces/productInterface"
import { primaryColor } from "@/constants/theme"
import { router, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { Image, Text, View } from "react-native"
import { useFridge } from "./_layout"

const FridgeDetail = () => {
  // * Context
  const { productId } = useLocalSearchParams<{ productId: string }>()
  const { openDetail, closeDetail } = useFridge()

  // *States
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(undefined);

  // * Lifecycle
  useEffect(() => {
    const product = productList.find(p => String(p.id) === productId)
    if (!product) {
      router.back();
    }
    setCurrentProduct(product);
    openDetail(product?.name as string)
    return () => closeDetail()
  }, [])

  // % Functions
  const buyProduct = () => {
    console.log(currentProduct);
  }
  const handleLikedProduct = () => { }
  return (
    <View className="relative h-full flex flex-col justify-between">
      {
        currentProduct ?
          <>
            <View className="h-[20%]">
              <Image
                source={currentProduct.image}
                resizeMode="contain"
                style={{
                  alignSelf: "center",
                  width: 250,
                  height: 250,
                  borderRadius: 16,
                }}
              />
            </View>

            <View className="p-6  h-[70%]">

              <ThemedText
                font="Nunito-ExtraBold"
                textStyle="text-4xl text-primary-500"
                label={currentProduct.name}
              />

              {/* Descrizione Prodotto */}
              <View className="flex flex-row " >
                <View
                  className='flex flex-row flex-wrap gap-1'>
                  {currentProduct.foodTypes.map((type) => {
                    return (
                      <ThemedText
                        textStyle="text-xl"
                        key={type.id}
                        font="Nunito-Italic"
                        label={type.type}
                      />
                    )
                  })}
                </View>
              </View>

              {/* Azioni */}
              <View className="w-full flex flex-row justify-center self-center gap-4 absolute bottom-4 h-12">
                <PrimaryIconButton
                  iconSpecs={{
                    name: 'heart-outline',
                    color: primaryColor[500],
                    size: 20
                  }}
                  onPress={handleLikedProduct}
                  className="w-auto bg-transparent"
                />
                <PrimaryButton
                  className="w-[80%]"
                  onPress={buyProduct}
                  buttonText="Acquista"
                />
              </View>
            </View>
          </>
          :
          <Text>Loading:...</Text>
      }

    </View>
  )
}

export default FridgeDetail
