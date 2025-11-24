import DiscountMiniCard from '@/components/details/DiscountMiniCard';
import ProductMiniCard from '@/components/details/ProductMiniCard';
import ProductTypeMiniCard from '@/components/details/ProductTypeMiniCard';
import ThemedText from '@/components/ui/ThemedText';
import { discountList, productList, productType } from '@/constants/interfaces/fakeData';
import { Discount, Product, ProductType } from '@/constants/interfaces/productInterface';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { UserContext } from '../_layout';

const HomePage = () => {

  // * Context
  const user = useContext(UserContext);

  // * State
  const [showSnackbar, setShowSnackbar] = useState<string>("");

  // * lifecycle
  useEffect(() => {
  }, [])

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
      data: productType,
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
            data={item.data}
            horizontal
            keyExtractor={(i) => String(i.id)}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 12,
              gap: 8
            }}
            renderItem={({ item: product }) => (
              <View
                style={{
                  width: item.width,
                  height: item.height,
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