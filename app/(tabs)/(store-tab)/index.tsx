import EmptyStoreListComponent from '@/components/details/EmptyStoreListComponent'
import ProducerHeader from '@/components/headers/ProducerHeader'
import TopSnackbar from '@/components/ui/SnackbarComponent'
import ThemedText from '@/components/ui/ThemedText'
import { SnackbarStatus } from '@/constants/enums/common'
import { Store } from '@/constants/interfaces/store'
import { primaryColor } from '@/constants/theme'
import { StoreController } from '@/controllers/StoreController'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { ActivityIndicator } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const StoreListComponent = () => {
  // * States
  const [loading, setLoading] = useState<boolean>(false)
  const [storeList, setStoreList] = useState<Store[]>([])
  const [showSnackbar, setShowSnackbar] = useState<string>("")
  const [barStatus, setBarStatus] = useState<SnackbarStatus>(SnackbarStatus.Info)
  // % functions
  const getStoreList = async () => {
    setLoading(true)
    await StoreController.getStoreTypes().then((stores) => {
      setStoreList(stores as Store[])
      console.log(stores)
    })
    .catch((e) => {
      setBarStatus(SnackbarStatus.Error)
      setShowSnackbar(e.message)
    })
    .finally(() => {
      setLoading(false)
    })
  }

  // £ Effect
  useEffect(() => {
    getStoreList()
  }, [])
  return (
    <SafeAreaView>
      <ProducerHeader title="Lista Negozi Gestiti"/>

      {/* Snackbar */}
      <TopSnackbar
        status={barStatus}
        message={showSnackbar} 
        onHide={() => setShowSnackbar('')} 
      />

      {
        loading ?
        <View className="w-full flex flex-row justify-center">
          <ActivityIndicator animating size={24} color={primaryColor[500]}  />
        </View>
        :
        <View className="px-4 h-full mb-32">
          <FlatList
            data={storeList}
            keyExtractor={item => String(item.id)}
            numColumns={1}
            style={{ flex: 1,  }}
            contentContainerStyle={{
              paddingBottom: 160,
              gap: 64,
            }}
            ListEmptyComponent={() => <EmptyStoreListComponent onPress={() => router.navigate('/(tabs)/(store-tab)/createStore')} />}
            renderItem={({ item }) => (
            <View>
              <ThemedText label="Work in progress" />
              {/* <FridgeMiniCard fridge={item} callbackFunction={getFridgeList} /> */}
            </View>
            )}
          />
        </View>
      }

    </SafeAreaView>
  )
}

export default StoreListComponent