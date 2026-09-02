import EmptyStoreCard from '@/components/details/EmptyStoreCard'
import ProductAdditionToStore from '@/components/details/ProductAdditionToStore'
import ProductInStore from '@/components/details/ProductInStore'
import StoreDetailHeader from '@/components/headers/StoreDetailHeader'
import PrimaryIconButton from '@/components/pressable/PrimaryIconButton'
import MapsCard from '@/components/thirdParty/MapsCard'
import BottomSheetComponent from '@/components/ui/BottomSheet'
import ThemedText from '@/components/ui/ThemedText'
import UrlImage from '@/components/ui/UrlImage'
import { PaginatedResponse, Product } from '@/constants/interfaces/productInterface'
import { AddProductToQuantityPayload, ProductToQuantity } from '@/constants/interfaces/requestPayloads/productPayloads'
import { Store } from '@/constants/interfaces/store'
import { primaryColor } from '@/constants/theme'
import { ProductController } from '@/controllers/ProductController'
import { StoreController } from '@/controllers/StoreController'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Appearance, FlatList, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import colors from 'tailwindcss/colors'

const StoreDetail = () => {
  // % Params
  const {storeId} = useLocalSearchParams<{ storeId: string }>()


  // * States
  const [prouctLoading, setProductLoading] = useState<boolean>(false)

  const [store, setStore] = useState<Store | null>(null)
  const [productList, setProductList] = useState<Product[]>([])
  const [showMapSheet, setShowMapSheet] = useState<boolean>(false)
  const [showProductAddition, setShowProductAddition] = useState<boolean>(false)

  // $ Effects
  useEffect(() => {
    getStoreDetail()
    getProductList(true)
  }, [])

  // £ Functions
  const getStoreDetail = async () => {
    if(storeId) {
      await StoreController.getStoreDetail(storeId)
        .then((res) =>  {
          const storeDetail = res as Store;
          setStore(storeDetail)
        })
        .catch(() => {
          router.back()
        })
    }
    else {
      router.back()
    }
  }
  const getProductList = async (reset: boolean = false) => {
    setProductLoading(true)
    await StoreController.getStoresProducts(storeId)
      .then((res) =>  {
        const response = res as PaginatedResponse<Product>;
        if(reset) {
          setProductList(response.data)
        }
        else {
          setProductList(prev => [...prev, ...response.data])
        }
      })
      .finally(() => {
        setProductLoading(false)
      })
  }
  const addProductsToStore = async (data: ProductToQuantity[]) => {
    if(store) {
      const payload: AddProductToQuantityPayload = {
        storeId: store.id,
        productsToAdd: data
      }
      await ProductController.addProductsToStore(payload)
        .then(() => {
          getProductList(true)
          setShowProductAddition(false)
        })
    }
  }

  // * Display
  return (
    <View className="h-screen w-screen flex-1 ">
      {
        !store ?
        <View className="w-full flex-1 flex flex-row justify-center">
          <ActivityIndicator animating size={24} color={primaryColor[500]}  />
        </View>
        :
        <FlatList
          data={[1]}
          renderItem={() => {
            return (
              <View className="flex-1">

                {/* Main Store Info */}
                <View className="bg-darkColor-900 rounded-xl  flex flex-col  w-screen aspect-square relative ">

                  {/* Store Image */}
                  <UrlImage 
                    source={store.profileImage || ''} 
                    resizeMode='cover' 
                    className="flex-1 rounded-xl w-screen aspect-square" 
                  />

                  {/* Header */}
                  <StoreDetailHeader headerClass='absolute top-12 w-full' mapsPress={() => setShowMapSheet(true)}/>

                  {/* Gradient */}
                  <LinearGradient
                    colors={['transparent', Appearance.getColorScheme() === 'light' ? 'white' : 'black']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 0,
                      height: 150,
                    }}
                  />

                  {/* Store Info  Bottom Row */}
                  <View className="absolute bottom-0 h-20  w-full flex flex-row justify-between items-center p-2">
                    {/* Store Name + Addr */}
                    <View className="w-2/3">
                      <ThemedText
                        label={store.name}
                        darkModeDisabled
                        textStyle='text-primary-500 text-2xl'
                        font="Nunito-Bold"
                      />
                      <ThemedText
                        label={store.address || 'indirizzo'}
                        textStyle='text-md'
                      />
                    </View>

                    {/* Store Actions */}
                    <View className=" h-full p-0 flex flex-row justify-center">
                      <PrimaryIconButton 
                        className='self-center'
                        onPress={() => setShowProductAddition(true)} 
                        iconSpecs={{
                          name: "hamburger-plus",
                          color: primaryColor[500],
                          size: 32
                        }}
                      />
                      <PrimaryIconButton 
                        className='self-center'
                        onPress={() => {}} 
                        iconSpecs={{
                          name: "store-edit",
                          color: primaryColor[500],
                          size: 32
                        }}
                      />
                    </View>
                  </View>

                </View>

                {/* Store Badges */}
                <View className="flex-1 px-2">
                  
                  {/* Badges */}
                  <View className=" flex flex-row justify-center gap-8 h-fit ">
                    <View className="flex-1 flex flex-row gap-2 rounded-xl h-24 w-1/2 items-center">
                      <PrimaryIconButton 
                        className='self-center'
                        onPress={() => null} 
                        iconSpecs={{
                          name: "clock",
                          color: primaryColor[500],
                          size: 20
                        }}
                      />
                      <View className="flex">
                        <ThemedText
                          darkModeDisabled
                          textStyle='text-primary-500 text-md'
                          font="Nunito-Bold" 
                          label={`Attivo dal`}
                        />
                        <ThemedText
                          style={{fontSize: 10}}
                          label={moment(store.created_at).format('DD-MM-yyyy')}
                        />
                      </View>
                    </View>

                    <View className="flex-1 flex flex-row gap-2 rounded-xl h-24 w-1/2 items-center">
                      <PrimaryIconButton 
                        className='self-center'
                        onPress={() => null} 
                        iconSpecs={{
                          name: "star-half-full",
                          color: colors.amber[500],
                          size: 20
                        }}
                      />
                      <View className="flex">
                        <ThemedText
                          darkModeDisabled
                          textStyle='text-amber-500 text-md'
                          font="Nunito-Bold" 
                          label={`${store.rating}`}
                        />
                        <ThemedText
                          label={`${store.reviewsCount || 0} recensioni`}
                        />
                      </View>
                    </View>

                    <View className="flex-1 flex flex-row gap-2 rounded-xl h-24 w-1/2 items-center">
                      <PrimaryIconButton 
                        className='self-center'
                        onPress={() => null} 
                        iconSpecs={{
                          name: "package-variant-closed",
                          color: colors.lime[500],
                          size: 20
                        }}
                      />
                      <View className="flex ">
                        <ThemedText
                          darkModeDisabled
                          textStyle="text-lime-500"
                          font="Nunito-Bold" 
                          label={`Prodotti`}
                        />
                        <ThemedText
                          style={{fontSize: 10}}
                          label={`${store.productListCount || productList.length} prodotti`}
                        />
                      </View>
                    </View>
                  </View>

                  {/* Lista Prodotti */}
                  {
                    !prouctLoading ? 
                      <FlatList
                        className="mb-20"
                        data={productList}
                        ListEmptyComponent={() => (
                          <EmptyStoreCard onPress={() => setShowProductAddition(true)} />
                        )}
                        contentContainerStyle={{
                          paddingBottom: 20,
                        }}
                        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                        renderItem={({ item }) => <ProductInStore product={item} />}
                      />
                      :
                        <ActivityIndicator animating size={24} color={primaryColor[500]}  />
                  }

                </View>

              </View>
            )
          }}
        />
      }

    {/* Map BottomSheet */}
    {
      showMapSheet && 
      <BottomSheetComponent
        height={.8}
        onClose={() => setShowMapSheet(false)}
        ShownComponent={() => <MapsCard lat={store?.lat || 0} lng={store?.lng || 0} />}
      />
    }

    {/* Add Products BottomSheet */}
    {
      showProductAddition && 
      <BottomSheetComponent
        height={.8}
        onClose={() => setShowProductAddition(false)}
        ShownComponent={() => <ProductAdditionToStore onSubmit={(e) => addProductsToStore(e)} />}
      />
    }
    </View>
  )
}

export default StoreDetail