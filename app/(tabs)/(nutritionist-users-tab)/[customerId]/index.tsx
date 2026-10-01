import DietListComponent from '@/components/details/Lists/DietListComponent'
import MiniProfileComponent from '@/components/details/MiniSections/MiniProfileComponent'
import DietForm from '@/components/forms/DietForm'
import FitnessStatForm from '@/components/forms/FitnessStatForm'
import CustomerBodyFatComponent from '@/components/graphs/CustomerBodyFatComponent'
import CustomerCaloryConsumptionComponent from '@/components/graphs/CustomerCaloryConsumptionComponent'
import CustomerMuscularMassComponent from '@/components/graphs/CustomerMuscolarMassComponent'
import CustomerWeightComponent from '@/components/graphs/CustomerWeightComponent'
import BackButtonHeader from '@/components/headers/BackButtonHeader'
import { DataPoint } from '@/components/thirdParty/LineGraph'
import BottomSheetComponent from '@/components/ui/BottomSheet'
import ThemedText from '@/components/ui/ThemedText'
import { CustomertPivot } from '@/constants/interfaces/pivots'
import { CreateDietPlanInterface } from '@/constants/interfaces/requestPayloads/nutritionistPayloads'
import { User } from '@/constants/interfaces/usersInterface'
import { primaryColor } from '@/constants/theme'
import { NutritionistController } from '@/controllers/NutritionistController'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import moment from 'moment'
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
  const [showNewStatsSheet, SetNewStatsSheet] = useState<boolean>(false)
  
  const [weightList, setWeightList] = useState<DataPoint[]>([])
  const [fatList, setFatList] = useState<DataPoint[]>([])
  const [muscleList, setMuscleList] = useState<DataPoint[]>([])
  const [fitnessDateList, setFitnessDateList] = useState<DataPoint[]>([])
  const [caloriesList, setCaloriesList] = useState<DataPoint[]>([])

  // $ Functions
  const getCustomerDetail = async () => {
    setLoading(true)
    await NutritionistController.getCustomerDetail(customerId)
      .then((res) => {
        const user = res as CustomertPivot<User>;
        setCustomer(user)

        // 1$ Create Data from user to create Graphs
        if(user.fitnessStats) {
          const weightData: DataPoint[] = []
          const fatData: DataPoint[] = []
          const muscleData: DataPoint[] = []
          const caloriesData: DataPoint[] = []
          const periodData: DataPoint[] = []
          user.fitnessStats.map((item) => {
            weightData.push({value: item.weight, label: 'kg'})
            fatData.push({value: item.bodyFatPercentage, label: '%'})
            muscleData.push({value: item.muscularMassPercentage, label: '%'})
            periodData.push({value: item.id, label: moment(item.created_at).format('DD/MM').toString()})
            caloriesData.push({value: item.dailyCalories, label: 'kcal'})
          })
          setWeightList(weightData)
          setFatList(fatData)
          setMuscleList(muscleData)
          setCaloriesList(caloriesData)
          setFitnessDateList(periodData)
        }

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
  const saveNewFitnessStats = async () => {

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
      <BackButtonHeader />
      {
        !loading && customer ?
        <View className="p-4 gap-4 h-full flex-1">
          <FlatList
            data={[1]}
            showsVerticalScrollIndicator={false}
            renderItem={() => {
              return (
                <View className='gap-4'>
                  {/* Users Main Info */}
                  <MiniProfileComponent user={customer as User} />

                  {/* Grafici Statistiche */}
                  <View className="mb-4">

                    <View className="flex flex-row justify-between items-center mb-4 ">
                      <ThemedText
                        label="Statistiche "
                        darkModeDisabled
                        textStyle='text-primary-500 text-2xl'
                        font="Nunito-Bold"
                      />

                      <MaterialCommunityIcons
                        onPress={() => SetNewStatsSheet(true)} 
                        name='chart-box-plus-outline'
                        color={primaryColor[500]}
                        size={24}
                      />

                    </View>

                    <View className="flex flex-col  gap-4 w-full ">
                      <CustomerWeightComponent dataList={weightList} periodList={fitnessDateList} />
                      <CustomerBodyFatComponent dataList={fatList} periodList={fitnessDateList} />
                      <CustomerMuscularMassComponent dataList={muscleList} periodList={fitnessDateList}/>
                      <CustomerCaloryConsumptionComponent dataList={caloriesList} periodList={fitnessDateList}/>
                    </View>
                  </View>

                  {/* Lista Piani Alimentari */}
                  <DietListComponent newDietPress={() => setShowNewDietSheet(true)} currentUserDetail={customer}/>


                </View>
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
    {
      showNewStatsSheet && 
      <BottomSheetComponent
        height={.8}
        onClose={() => SetNewStatsSheet(false)}
        ShownComponent={() => <FitnessStatForm customer={customer!} onSubmit={saveNewFitnessStats} />}
      />
    }


    </SafeAreaView>
  )
}

export default CustomerDetailPage