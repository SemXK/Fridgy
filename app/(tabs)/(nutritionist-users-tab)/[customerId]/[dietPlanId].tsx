import ThemedText from '@/components/ui/ThemedText'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const DietPlanDetail = () => {
  // * Context
  const {customerId, dietPlanId} = useLocalSearchParams<{ customerId: string , dietPlanId: string }>()

  return (
    <SafeAreaView>
      <ThemedText label={`Dettaglio Piano Alimentare: ${customerId} ${dietPlanId}`} />
    </SafeAreaView>
  )
}

export default DietPlanDetail