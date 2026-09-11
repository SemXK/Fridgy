import { UserContext } from '@/app/_layout'
import CustomerCardComponent from '@/components/details/detailCards/CustomerCardComponent'
import EmptyClientList from '@/components/details/EmptyCards/EmptyClientList'
import NutritionistPageHeader from '@/components/headers/NutritionistHeader'
import LinkCodeDisplay from '@/components/nutritionistComponents/LinkCodeDisplay'
import CustomModal from '@/components/ui/CustomModal'
import { NutritionistLinkCode } from '@/constants/interfaces/nutritionist'
import { User } from '@/constants/interfaces/usersInterface'
import { primaryColor } from '@/constants/theme'
import { NutritionistController } from '@/controllers/NutritionistController'
import { getEcho } from '@/scripts/LaravelEcho'
import React, { useContext, useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const NutritionstClientList = () => {
  // % Context
  const { user } =  useContext(UserContext)

  // * States
  const [nutritionistWebSocket, setNutritionistWebSocket] = useState<any>(null);

  const [linkCode, setLinkCode] = useState<string>("")    //Displayed Link Code
  const [showCodeModal, setShowCodeModal] = useState<boolean>(false)

  const [clientList, setClientList] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // $ Functions
  const createInviteCode = async () => {
    await NutritionistController.createInviteCode()
      .then((res) => {
        const resp = res as NutritionistLinkCode
        setLinkCode(resp.linkCode)
        setShowCodeModal(true)
      })
  }
  const getClientList = async () => {
    setLoading(true)
    await NutritionistController.getClientList()
      .then((res) => {
        setClientList(res as  User[])
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const setupWebSocket = async () => {
    const echo = await getEcho() as any;
    const channel = echo.channel(`nutritionist-channel-${user?.id}`)

    setNutritionistWebSocket(channel)
    channel.listen(`.NutritionistLinkAccept`, () => {
      setShowCodeModal(false)
      getClientList()
    })
  }

  useEffect(() => {
    setupWebSocket()
    getClientList()

    return () => {
      nutritionistWebSocket?.stopListening(`nutritionist-channel-${user?.id}`);
      setNutritionistWebSocket(null)
    };
  }, [])

  return (
    <SafeAreaView >
      
      {/* * Auth Header */}
      <NutritionistPageHeader />
      {
        loading ?
        <View className="w-full flex flex-row justify-center">
          <ActivityIndicator animating size={24} color={primaryColor[500]}  />
        </View>
        :
        <View className="px-4">
          <FlatList 
            data={clientList}
            ListEmptyComponent={() => <EmptyClientList onPress={createInviteCode} />}
            renderItem={({item}) => <CustomerCardComponent customer={item} />}
          />
          
        </View>
      }

      {/* Modal */}
      <CustomModal
        visible={showCodeModal}
        onClose={() => setShowCodeModal(false)}
        ChildComponent={() => <LinkCodeDisplay linkCode={linkCode} onPress={() => setShowCodeModal(false)} />}
      />

    </SafeAreaView>
  )
}

export default NutritionstClientList