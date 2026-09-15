import DietListComponent from '@/components/details/Lists/DietListComponent'
import MiniProfileComponent from '@/components/details/MiniSections/MiniProfileComponent'
import DietForm from '@/components/forms/DietForm'
import CustomerBodyFatComponent from '@/components/graphs/CustomerBodyFatComponent'
import CustomerCaloryConsumptionComponent from '@/components/graphs/CustomerCaloryConsumptionComponent'
import CustomerMuscularMassComponent from '@/components/graphs/CustomerMuscolarMassComponent'
import CustomerWeightComponent from '@/components/graphs/CustomerWeightComponent'
import CartPageHeader from '@/components/headers/CartPageHeader'
import BottomSheetComponent from '@/components/ui/BottomSheet'
import ThemedText from '@/components/ui/ThemedText'
import { CustomertPivot } from '@/constants/interfaces/pivots'
import { CreateDietPlanInterface } from '@/constants/interfaces/requestPayloads/nutritionistPayloads'
import { User } from '@/constants/interfaces/usersInterface'
import { primaryColor } from '@/constants/theme'
import { NutritionistController } from '@/controllers/NutritionistController'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

const CustomerDetailPage = () => {
  // * Context
  const { customerId } = useLocalSearchParams<{ customerId: string }>()

  const [customer, setCustomer] = useState<CustomertPivot<User> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showNewDietSheet, setShowNewDietSheet] = useState<boolean>(false)

  // $ Functions
  const getCustomerDetail = async () => {
    setLoading(true)
    await NutritionistController.getCustomerDetail(customerId)
      .then((res) => {
        const user = res as CustomertPivot<User>;
        setCustomer(user)
      })
      .finally(() => {
        setLoading(false)
      });
  }
  const handleSubmit = async (name: string, description: string) => {
    setLoading(true)
    setShowNewDietSheet(false)
    const payload: CreateDietPlanInterface = {
      name,
      description,
      linkedRelationshipId: customer?.customerPivot?.id as number
    }
    await NutritionistController.createDietPlan(payload)
      .then(() => {
        getCustomerDetail()
      })
      .finally(() => {
        setLoading(false)
      })
  }

  // * Effects
  useEffect(() => {
    if(customerId) {
      getCustomerDetail();
    }
    else {
      router.back()
    }
  }, [customerId])

  return (
    <SafeAreaView className="flex-1 h-screen">
      <CartPageHeader />
      {
        !loading && customer ?
        <View className="p-4 gap-4 h-full flex-1">
          <FlatList
            data={[1]}
            showsVerticalScrollIndicator={false}
            renderItem={() => {
              return (
                <>
                  {/* Users Main Info */}
                  <MiniProfileComponent user={customer as User} />

                  {/* Grafici Statistiche */}
                  <View className="mb-4">
                    <ThemedText
                      label="Descrizioni Principali"
                      darkModeDisabled
                      textStyle='text-primary-500 text-2xl mb-4'
                      font="Nunito-Bold"
                    />
                    <View className="flex flex-row flex-wrap gap-4 w-full ">
                      <CustomerWeightComponent />
                      <CustomerBodyFatComponent />
                      <CustomerMuscularMassComponent />
                      <CustomerCaloryConsumptionComponent />
                    </View>
                  </View>

                  {/* Lista Piani Alimentari */}
                  <DietListComponent newDietPress={() => setShowNewDietSheet(true)} customer={customer}/>
                </>
              )
            }}
          />


        </View>
        :
        <View className="w-full flex flex-row justify-center">
          <ActivityIndicator animating size={24} color={primaryColor[500]}  />
        </View>
      }

    {/* BottomSheet */}
    {
      showNewDietSheet && 
      <BottomSheetComponent
        height={.8}
        onClose={() => setShowNewDietSheet(false)}
        ShownComponent={() => <DietForm onSubmit={handleSubmit} />}
      />
    }

    </SafeAreaView>
  )
}

export default CustomerDetailPage