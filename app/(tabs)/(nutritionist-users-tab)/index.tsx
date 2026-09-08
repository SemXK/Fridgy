import EmptyClientList from '@/components/details/EmptyCards/EmptyClientList'
import HomePageHeader from '@/components/headers/HomePageHeader'
import LinkCodeDisplay from '@/components/nutritionistComponents/LinkCodeDisplay'
import CustomModal from '@/components/ui/CustomModal'
import { NutritionistLinkCode } from '@/constants/interfaces/nutritionist'
import { NutritionistController } from '@/controllers/NutritionistController'
import React, { useState } from 'react'
import { FlatList, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const NutritionstClientList = () => {
  // * States
  const [linkCode, setLinkCode] = useState<string>("")
  const [showCodeModal, setShowCodeModal] = useState<boolean>(false)

  // $ Functions
  const createInviteCode = async () => {
    console.log("link")
    await NutritionistController.createInviteCode()
      .then((res) => {
        const resp = res as NutritionistLinkCode
        setLinkCode(resp.linkCode)
        setShowCodeModal(true)
      })
  }

  return (
    <SafeAreaView >
      
      {/* * Auth Header */}
      <HomePageHeader />

      <View className="px-4">
        <FlatList 
          data={[]}
          ListEmptyComponent={() => <EmptyClientList onPress={createInviteCode} />}
          renderItem={() => <></>}
        />
        
      </View>

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