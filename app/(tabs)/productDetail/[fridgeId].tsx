import PrimaryButton from "@/components/pressable/PrimaryButton"
import PrimaryIconButton from "@/components/pressable/PrimaryIconButton"
import ThemedText from "@/components/ui/ThemedText"
import { productList } from "@/constants/interfaces/fakeData"
import { Product } from "@/constants/interfaces/productInterface"
import { primaryColor } from "@/constants/theme"
import { router, useLocalSearchParams } from "expo-router"
import React, { useEffect, useState } from "react"
import { Image, Text, View } from "react-native"
import { useFridge } from "../(fridge-tab)/_layout"


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
    openDetail()
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
                source={currentProduct.image as any}
                resizeMode="contain"
                style={{
                  alignSelf: "center",
                  width: 250,
                  height: 250,
                  borderRadius: 16,
                }}
              />
            </View>

            <View className="p-6 flex flex-col gap-4 h-[70%]">

              {/* Titolo prodotto */}
              <View>
                <ThemedText
                  darkModeDisabled
                  font="Nunito-ExtraBold"
                  textStyle="text-4xl text-primary-500"
                  label={currentProduct.name}
                />
                {/* <View className="flex flex-row " >
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
                </View> */}
              </View>

              {/* Descrizione Prodotto */}
              <View>
                <ThemedText
                  darkModeDisabled
                  font="Nunito-ExtraBold"
                  textStyle="text-2xl text-primary-500"
                  label="Descrizione del prodotto"
                />
                <ThemedText
                  font="Nunito-Italic"
                  label={currentProduct.description || 'Nessuna descrizione presente'}
                />

              </View>

              {/* Grafico Prezzi di acquisto */}
              <View>
                <ThemedText
                  darkModeDisabled
                  font="Nunito-ExtraBold"
                  textStyle="text-2xl text-primary-500"
                  label="Storico acquisti"
                />
                <View className="w-full h-48 flex flex-row justify-center items-center rounded-lg border-2 border-primary-500/50 bg-stone-100 dark:bg-darkColor-900">
                  <ThemedText
                    font="Nunito-ExtraLight"
                    label="Non implementato"
                  />
                </View>
              </View>

              {/* Azioni */}
              <View className="w-full flex flex-row justify-center self-center gap-4 absolute bottom-12 h-12">
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
