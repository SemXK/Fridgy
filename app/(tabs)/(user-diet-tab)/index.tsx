import InvitationAcceptCode from '@/components/details/customerComponents/InvitationAcceptCode'
import NutritionistCardComponent from '@/components/details/detailCards/NutritionistCardComponent'
import EmptyNutritionistList from '@/components/details/EmptyCards/EmptyNutritionistList'
import HomePageHeader from '@/components/headers/HomePageHeader'
import CustomModal from '@/components/ui/CustomModal'
import TopSnackbar from '@/components/ui/SnackbarComponent'
import { SnackbarStatus } from '@/constants/enums/common'
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

  const [barStatus, setBarStatus] = useState<SnackbarStatus>(SnackbarStatus.Info)
  const [showSnackbar, setShowSnackbar] = useState<string>("")

  // % Functions
  const onLinkAccepted = async (invitationCode: string) => {
    await ConsumerController.acceptInviteCode(invitationCode)
      .then(() => {
        setShowCodeModal(false)
        getNutritionistList()
      })
      .catch((e: Error) => {
        setShowSnackbar(e.message)
        setBarStatus(SnackbarStatus.Error)
      })
  }
  const getNutritionistList = async () => {
    setLoading(true)
    await ConsumerController.getOwnNutritionistList()
      .then((res) => {
        setNutritionistList(res as NutritionistPivot<User>[])
      })
      .finally(() => {
        setLoading(false)
      })
  }

  // $ Effects
  useEffect(() => {
    getNutritionistList()
  }, [])

  return (
    <SafeAreaView className="h-screen">
      {/* * Auth Header */}
      <HomePageHeader />

      {/* Lista Nutrizionisti */}
      {
        loading ?
          <View className="w-full flex flex-row justify-center">
            <ActivityIndicator animating size={24} color={primaryColor[500]}  />
          </View>
          :
          <View className="px-4 flex-1">
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
        ChildComponent={() => {
          return (
            <InvitationAcceptCode 
              acceptInvitationCode={onLinkAccepted} 
              title="Inserisci il codice invito"
              message="Inserisci il codice per iscriverti al tuo nutrizionista"
            />
          )
        }
      }
      />

      {/* Snackbar */}
      <TopSnackbar
        status={barStatus}
        message={showSnackbar} 
        onHide={() => setShowSnackbar('')} 
      />

    </SafeAreaView>
  )
}

export default NutritionistListComponent