import ThemedFormField from '@/components/inputs/CustomFormField'
import PrimaryButton from '@/components/pressable/PrimaryButton'
import ThemedText from '@/components/ui/ThemedText'
import UrlImage from '@/components/ui/UrlImage'
import { Product, ProductListHomePageResponse } from '@/constants/interfaces/productInterface'
import { primaryColor } from '@/constants/theme'
import { ProductController } from '@/controllers/ProductController'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

/**
 * List of most popular products, 
 * can be used as scrolalble row (wrappedList = true) or a grid (false)
 * can be used to chose product(s)
 */

interface PLCInterface {
  multiChoice?: boolean;
  wrappedList?: boolean;
  outputFunction: (productIds: number[]) => void;
  buttonText: string;
  
}

const ProductListComponent = ({multiChoice, wrappedList, outputFunction, buttonText}: PLCInterface) => {
  // * States
  const [prodName, setProdName] = useState<string>('');
  const [productList, setProductList] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const [itemsPerPage, setItemPerPage] = useState<number>(25);

  // $ Functions
  const productPress = (product: Product) => {
    if(selectedProductIds.includes(product.id)) {
      setSelectedProductIds((prev) => prev.filter((itemId) => itemId != product.id));
    }
    else {
      if(multiChoice) {
        setSelectedProductIds((prev) => prev.concat(product.id))
      }
      else {
        setSelectedProductIds([product.id])
      }
    }
  }
  const getProducts = async () => {
    setLoading(true)
    await ProductController
      .getShopProducts(prodName, itemsPerPage)
      .then((res) => {
        const response = res as ProductListHomePageResponse
        setProductList(response.popularProducts.data,)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  // £ Effects
  useEffect(() => {
    const handler = setTimeout(() => {
      getProducts();
    }, 1000);
    return () => clearTimeout(handler);
  }, [prodName]);

  return (
    <View className="gap-4 flex flex-1 flex-wrap">

      <ThemedFormField
        label="Prodotto"
        value={prodName}
        setValue={setProdName}
      />

      {
        loading ?
        <View className="w-full flex flex-row justify-center">
          <ActivityIndicator animating size={24} color={primaryColor[500]}  />
        </View>
        :
        <View className="flex  flex-1 w-full">
          <FlatList
            numColumns={wrappedList ? 3 : 1}
            columnWrapperStyle={wrappedList ? styles.columnWrapper : undefined}
            data={productList}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={wrappedList ? styles.gridItem : styles.listItem}
                onPress={() => productPress(item)}
                className={`${selectedProductIds.includes(item.id) ? 'bg-primary-500' : 'bg-stone-100 dark:bg-darkColor-800'} rounded-xl p-3 justify-start`}
              >
                <UrlImage
                  source={item.image}
                  className="self-center"
                  style={{ width: '70%', height: '70%' }}
                  resizeMode="contain"
                />
                <ThemedText
                  label={item.name}
                  numberOfLines={1}
                  darkModeDisabled={!selectedProductIds.includes(item.id)}
                  font="Nunito-Bold"
                  textStyle="text-xl text-primary-500"
                />
              </TouchableOpacity>
            )}
          />

        </View>
      }
      <View className="absolute bottom-8 w-1/2  self-center">
        <PrimaryButton buttonText={buttonText} onPress={() => outputFunction(selectedProductIds)} />
      </View>
    </View>
  )
}

export default ProductListComponent

const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  gridItem: {
    width: '30%',
    height: 110,
  },
  listItem: {
    width: '100%',
    height: 110,
    marginBottom: 12,
  },
})