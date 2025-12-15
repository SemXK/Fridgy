/* eslint-disable react-hooks/exhaustive-deps */
import DiscountMiniCard from '@/components/details/DiscountMiniCard';
import ProductMiniCard from '@/components/details/ProductMiniCard';
import ProductTypeMiniCard from '@/components/details/ProductTypeMiniCard';
import HomePageHeader from '@/components/headers/HomePageHeader';
import ThemedFormField from '@/components/inputs/CustomFormField';
import ThemedText from '@/components/ui/ThemedText';
import { discountList } from '@/constants/interfaces/fakeData';
import { Discount, Product, ProductType } from '@/constants/interfaces/productInterface';
import { primaryColor } from '@/constants/theme';
import { ProductController } from '@/controllers/ProductController';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { UserContext } from '../_layout';

interface HomePageSection {
  key: string;
  loading: boolean;
  title?: string;
  data: Product[] | ProductType[] | Discount[];
  renderCard: (item: any) => React.JSX.Element;
  height?: number;
  width?: number;
}

const HomePage = () => {

  // * Context
  const user = useContext(UserContext);

  // * Display State
  const [showSnackbar, setShowSnackbar] = useState<string>("");

  // * Variables State
  const [productList, setProductList] = useState<Product[]>([])
  const [productTypeList, setProductTypeList] = useState<ProductType[]>([])
  const [filter, setFilter] = useState<string>("");
  const [filterLoading, setFilterLoading] = useState<boolean>(false)


  // * lifecycle
  useEffect(() => {
    getProductTypes()
    getShopItems()
  }, [])

  useEffect(() => {
    const handler = setTimeout(() => {
      if (filter) {
        getShopItems();
      }
    }, 1000);
    return () => clearTimeout(handler);
  }, [filter]);

  // * API calls
  const getShopItems = async () => {
    setFilterLoading(true)
    await ProductController
      .getShopProducts(filter)
      .then((res) => {
        setProductList(res as Product[])
        setFilterLoading(false)
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
 
  // * Press Functions
  const productTypePress = (productType: ProductType) => {}
  const popularProductPress = (product: Product) => {}
  const discountPress = (discount: Discount) => {}

  // * Sections
  const sections: HomePageSection[] = [
    {
      key: "categories",
      loading: false,
      data: productTypeList,
      renderCard: (item: ProductType) => (
        <ProductTypeMiniCard
          onPress={() => productTypePress(item)}
          item={item}
        />
      )
    },
    {
      key: "discounts",
      loading: false,
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
    },    
    {
      key: "favorites",
      title: "I Tuoi Preferiti",
      loading: filterLoading,

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
      loading: filterLoading,

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

  ];

  // * Display
  return (
    <View className="h-full py-2">

      {/* * Auth Header */}
      <HomePageHeader />

      {/* Filter */}
      <View className="p-4">
        <ThemedFormField
          value={filter}
          setValue={setFilter}
          label="Cerca..."
        />
      </View>

      {/* Discount  */}
      {/* <Onboarding
        className="h-1/4"
        pages={[
          {
            backgroundColor: "transparent",
            image: (
              <View
                style={{
                  height: 20,   // 25% screen height
                  width: width,            // full width
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                  source={require("../../assets/images/foodImages/butter.png")}
                />
              </View>
            ),
            title: "Onboarding",
            subtitle: "Done with React Native Onboarding Swiper",
          },
        ]}
      /> */}

      {/* * Lista di liste  */}
      <FlatList
        className='mb-20'
        data={sections}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40, gap:20 }}
        renderItem={({ item }) => (
          <View >
            <ThemedText
              darkModeDisabled
              font="Nunito-ExtraBold"
              textStyle="text-primary-500 text-2xl p-4"
              label={item.title || ""}
            />
          {
          item.loading ? 
              <View className="w-full flex flex-row justify-center">
                <ActivityIndicator animating size={24} color={primaryColor[500]} />
              </View>
              :
              <FlatList
                data={item.data} 
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
            }

          </View>
  
        )}
      />
    </View>
  );

}

export default HomePage 