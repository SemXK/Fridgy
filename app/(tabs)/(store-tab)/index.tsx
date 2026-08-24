import EmptyStoreListComponent from '@/components/details/EmptyStoreListComponent'
import StoreDetail from '@/components/details/StoreDetailCard'
import ProducerHeader from '@/components/headers/ProducerHeader'
import PrimaryButton from '@/components/pressable/PrimaryButton'
import TopSnackbar from '@/components/ui/SnackbarComponent'
import { SnackbarStatus } from '@/constants/enums/common'
import { Store } from '@/constants/interfaces/store'
import { primaryColor } from '@/constants/theme'
import { StoreController } from '@/controllers/StoreController'
import { useFocusEffect } from '@react-navigation/native'
import { router } from 'expo-router'
import React, { useState } from 'react'
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
  useFocusEffect(() => {
    getStoreList()
  })

  return (
    <SafeAreaView className="flex-1">
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
          {
            storeList.length ?
            <View className="mb-4 w-full">
              <PrimaryButton
                buttonText='Aggiungi'
                onPress={() => router.navigate('/(tabs)/(store-tab)/createStore')}
              />
            </View>
            : null
          }

          <FlatList
            showsVerticalScrollIndicator={false}
            data={storeList}
            keyExtractor={item => String(item.id)}
            numColumns={1}
            style={{ flex: 1,  }}
            contentContainerStyle={{
              paddingBottom: 160,
              gap:8,
              marginBottom: 32
            }}
            ListEmptyComponent={() => <EmptyStoreListComponent onPress={() => router.navigate('/(tabs)/(store-tab)/createStore')} />}
            renderItem={({ item }) => (<StoreDetail store={item}  />)}
          />
        </View>
      }

    </SafeAreaView>
  )
}

export default StoreListComponent