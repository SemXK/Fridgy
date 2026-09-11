import InvitationAcceptCode from '@/components/details/customerComponents/InvitationAcceptCode'
import NutritionistCardComponent from '@/components/details/detailCards/NutritionistCardComponent'
import EmptyNutritionistList from '@/components/details/EmptyCards/EmptyNutritionistList'
import HomePageHeader from '@/components/headers/HomePageHeader'
import CustomModal from '@/components/ui/CustomModal'
import { NutritionistPivot } from '@/constants/interfaces/pivots'
import { User } from '@/constants/interfaces/usersInterface'
import { primaryColor } from '@/constants/theme'
import { ConsumerController } from '@/controllers/ConsumerController'
import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const NutritionistListComponent = () => {
  // * States
  const [showCodeModal, setShowCodeModal] = useState<boolean>(false)


  const [nutritionistList, setNutritionistList] = useState<NutritionistPivot<User>[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // % Functions
  const onLinkAccepted = () => {
    setShowCodeModal(false)
    getNutritionistList()
  }
  const getNutritionistList = async () => {
    setLoading(true)
    await ConsumerController.getOwnNutritionistList()
      .then((res) => {
        console.log(res)
        setNutritionistList(res as NutritionistPivot<User>[])
      })
      .finally(() => {
        setLoading(false)
      })
  }
  useEffect(() => {
    getNutritionistList()

  }, [])

  return (
    <SafeAreaView>
      {/* * Auth Header */}
      <HomePageHeader />

      {/* Lista Nutrizionisti */}
        {
        loading ?
          <View className="w-full flex flex-row justify-center">
            <ActivityIndicator animating size={24} color={primaryColor[500]}  />
          </View>
          :
          <View className="px-4">
            <FlatList 
              data={nutritionistList}
              ListEmptyComponent={() => <EmptyNutritionistList onPress={() => setShowCodeModal(true)} />}
              renderItem={({item}) => <NutritionistCardComponent nutritionist={item} />}
            />
            
          </View>
          }

      {/* Modal */}
      <CustomModal
        visible={showCodeModal}
        onClose={() => setShowCodeModal(false)}
        ChildComponent={() => <InvitationAcceptCode onLinkAccepted={onLinkAccepted} />}
      />



    </SafeAreaView>
  )
}

export default NutritionistListComponent