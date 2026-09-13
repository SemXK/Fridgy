import GenericEmptyCardComponent from '@/components/details/EmptyCards/GenericEmptyCard'
import MiniProfileComponent from '@/components/details/MiniSections/MiniProfileComponent'
import CustomerBodyFatComponent from '@/components/graphs/CustomerBodyFatComponent'
import CustomerCaloryConsumptionComponent from '@/components/graphs/CustomerCaloryConsumptionComponent'
import CustomerMuscularMassComponent from '@/components/graphs/CustomerMuscolarMassComponent'
import CustomerWeightComponent from '@/components/graphs/CustomerWeightComponent'
import CartPageHeader from '@/components/headers/CartPageHeader'
import ThemedText from '@/components/ui/ThemedText'
import { DietDetail } from '@/constants/interfaces/nutritionist'
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

  const [customer, setCustomer] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [dietList, setDietList] = useState<DietDetail[]>([]);

  // $ Functions
  const getCustomerDetail = async () => {
    setLoading(true)
    await NutritionistController.getCustomerDetail(customerId)
      .then((res) => {
        const user = res as User;
        setCustomer(user)
      })
      .finally(() => {
        setLoading(false)
      });
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
    <SafeAreaView className="">
      <CartPageHeader />
      {
        !loading && customer ?
        <View className="p-4 gap-4 h-full ">
          <FlatList
            data={[1]}
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
                  <View>
                    <ThemedText
                      label="Lista Piani Alimentari"
                      darkModeDisabled
                      textStyle='text-primary-500 text-2xl'
                      font="Nunito-Bold"
                    />
                    <View className="flex flex-row flex-wrap gap-4 w-full ">
                      <FlatList
                        data={dietList}
                        ListEmptyComponent={() => { return (
                          <GenericEmptyCardComponent 
                            title="Nessun Piano Alimentare"
                            message={`Crea il primo piano alimentare per ${customer.name}`}
                            image={require('@/assets/images/illustrations/emptyFridge.png')}
                            buttonText='Crea Il Piano'
                            onPress={() => null} 
                          />
                          )
                        }}
                        renderItem={({item}) => null}
                      />
                    </View>
                  </View>
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
      {/* * Users Main Info */}
        
    </SafeAreaView>
  )
}

export default CustomerDetailPage