import DiscountMiniCard from '@/components/details/DiscountMiniCard';
import ProductMiniCard from '@/components/details/ProductMiniCard';
import ProductTypeMiniCard from '@/components/details/ProductTypeMiniCard';
import ThemedText from '@/components/ui/ThemedText';
import { discountList } from '@/constants/interfaces/fakeData';
import { Discount, Product, ProductType } from '@/constants/interfaces/productInterface';
import { ProductController } from '@/controllers/ProductController';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { UserContext } from '../_layout';

const HomePage = () => {

  // * Context
  const user = useContext(UserContext);

  // * Display State
  const [showSnackbar, setShowSnackbar] = useState<string>("");

  // * Variables State
  const [productList, setProductList] = useState<Product[]>([])
  const [productTypeList, setProductTypeList] = useState<ProductType[]>([])

  // * lifecycle
  useEffect(() => {
    getProductTypes()
    getShopItems()
  }, [])

  // * API calls
  const getShopItems = async () => {
    await ProductController
      .getShopProducts()
      .then((res) => {
        setProductList(res as Product[])
      })
      .catch(e => {
        setShowSnackbar(e.message)
      })
  }
  const getProductTypes = async () => {
    await ProductController
      .getProductTypes()
      .then((res) => {
        setProductTypeList(res as ProductType[])
      })
      .catch(e => {
        setShowSnackbar(e.message)
      })
  }

  // * Functions
  const handleTouch = ( ) => {
    setShowSnackbar("Messaggio")
  }  
  const productTypePress = (productType: ProductType) => {
    // router.push(`/(fridge-tab)/${String(product.id)}`);
  }
  const handleEndReached = () => {
    console.log("api call")
  }
  const popularProductPress = (product: Product) => {
  }
  const discountPress = (discount: Discount) => {
  }

  // * Sections
  const sections = [
    {
      key: "categories",
      title: "Categorie",
      height: 100,
      width: 125,
      data: productTypeList,
      renderCard: (item: ProductType) => (
        <ProductTypeMiniCard
          onPress={() => productTypePress(item)}
          item={item}
        />
      )
    },
    {
      key: "favorites",
      title: "I Tuoi Preferiti",
      height: 200,
      width: 200,
      data: productList,
      renderCard: (item: Product) => (
        <ProductMiniCard
          onPress={() => popularProductPress(item)}
          product={item}
        />
      )
    },
    {
      key: "popular",
      title: "Prodotti Popolari",
      height: 200,
      width: 200,
      data: productList,
      renderCard: (item: Product) => (
        <ProductMiniCard
          onPress={() => popularProductPress(item)}
          product={item}
        />
      )
    },
    {
      key: "discounts",
      title: "Offerte e Sconti",
      height: 200,
      width: 200,
      data: discountList,
      renderCard: (item: Discount) => (
        <DiscountMiniCard
          onPress={() => discountPress(item)}
          item={item}
        />
      )
    }
  ];

  // * Display
  return (
    <FlatList
      className='mb-20'
      data={sections}
      keyExtractor={(item) => item.key}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
      renderItem={({ item }) => (
        <View style={{ marginTop: 20 }}>
          <ThemedText
            darkModeDisabled
            font="Nunito-ExtraBold"
            textStyle="text-primary-500 text-2xl p-4"
            label={item.title}
          />

          <FlatList
            data={item.data} // the array of products
            horizontal
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            windowSize={3}
            removeClippedSubviews={true}
            keyExtractor={(product) => String(product.id)}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 12,
              gap: 8,
            }}
            renderItem={({ item: product }) => (
              <View
                style={{
                  width: item.width, // use outer section width
                  height: item.height, // use outer section height
                  backgroundColor: "white",
                  borderRadius: 12,
                  marginRight: 8,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.15,
                  shadowRadius: 3,
                  elevation: 2,
                }}
              >
                {item.renderCard(product)}
              </View>
            )}
          />
        </View>

      )}
    />
  );

}

export default HomePage 