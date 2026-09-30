import { UserContext } from '@/app/_layout'
import DietListComponent from '@/components/details/Lists/DietListComponent'
import MiniProfileComponent from '@/components/details/MiniSections/MiniProfileComponent'
import CustomerBodyFatComponent from '@/components/graphs/CustomerBodyFatComponent'
import CustomerCaloryConsumptionComponent from '@/components/graphs/CustomerCaloryConsumptionComponent'
import CustomerMuscularMassComponent from '@/components/graphs/CustomerMuscolarMassComponent'
import CustomerWeightComponent from '@/components/graphs/CustomerWeightComponent'
import BackButtonHeader from '@/components/headers/BackButtonHeader'
import { DataPoint } from '@/components/thirdParty/LineGraph'
import { NutritionistPivot } from '@/constants/interfaces/pivots'
import { User } from '@/constants/interfaces/usersInterface'
import { primaryColor } from '@/constants/theme'
import { ConsumerController } from '@/controllers/ConsumerController'
import { getEcho } from '@/scripts/LaravelEcho'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'


const NutritionistDetailPage = () => {
  // * Context
  const { nutritionistId } = useLocalSearchParams<{ nutritionistId: string }>()
  const { user } =  useContext(UserContext)

  // * States
  const [nutritionist, setNutritionist] = useState<NutritionistPivot<User> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [nutritionistWebSocket, setNutritionistWebSocket] = useState<any>(null);

  const [weightList, setWeightList] = useState<DataPoint[]>([])
  const [fatList, setFatList] = useState<DataPoint[]>([])
  const [muscleList, setMuscleList] = useState<DataPoint[]>([])
  const [fitnessDateList, setFitnessDateList] = useState<DataPoint[]>([])
  const [caloriesList, setCaloriesList] = useState<DataPoint[]>([])

  // $ Functions
  const getNutritionistDetail = async () => {
    setLoading(true)
    await ConsumerController.getNutritionistDetail(nutritionistId)
      .then((res) => {
        setNutritionist(res as NutritionistPivot<User>)
        // const weightData: DataPoint[] = []
        // const fatData: DataPoint[] = []
        // const muscleData: DataPoint[] = []
        // const caloriesData: DataPoint[] = []
        // const periodData: DataPoint[] = []

        // 1$ Create Data from user to create Graphs
        // user.fitnessStats.map((item) => {
        //   weightData.push({value: item.weight, label: 'kg'})
        //   fatData.push({value: item.bodyFatPercentage, label: '%'})
        //   muscleData.push({value: item.muscularMassPercentage, label: '%'})
        //   periodData.push({value: item.id, label: moment(item.created_at).format('DD/MM').toString()})
        //   caloriesData.push({value: item.dailyCalories, label: 'kcal'})
        // })
        // setWeightList(weightData)
        // setFatList(fatData)
        // setMuscleList(muscleData)
        // setCaloriesList(caloriesData)
        // setFitnessDateList(periodData)
        
        

      })
      .finally(() => {
        setLoading(false)
      });
  }
  const setupWebSocket = async () => {
    const echo = await getEcho() as any;
    const channel = echo.channel(`customer-diet-channel-${user?.id}`)

    setNutritionistWebSocket(channel)
    channel.listen(`.DietStatusActivation`, () => {
      getNutritionistDetail()
    })
  }
  useEffect(() => {
    if(nutritionistId) {
      getNutritionistDetail();
      setupWebSocket()
    }
    else {
      router.back()
    }
  }, [nutritionistId])

  return (
    <SafeAreaView className="flex-1 h-screen">
      <BackButtonHeader />
      {
        !loading && nutritionist ?
        <View className="p-4 gap-4 h-full flex-1">
          <FlatList
            data={[1]}
            showsVerticalScrollIndicator={false}
            renderItem={() => {
              return (
                <View className='gap-4'>
                  {/* Users Main Info */}
                  <MiniProfileComponent user={nutritionist as User} />

                  {/* Lista Piani Alimentari */}
                  <DietListComponent  user={nutritionist}/>

                  {/* Grafici Statistiche */}
                  <View className="mb-4">
                    <View className="flex flex-col  gap-4 w-full ">
                      <CustomerWeightComponent dataList={weightList} periodList={fitnessDateList} />
                      <CustomerBodyFatComponent dataList={fatList} periodList={fitnessDateList} />
                      <CustomerMuscularMassComponent dataList={muscleList} periodList={fitnessDateList}/>
                      <CustomerCaloryConsumptionComponent dataList={caloriesList} periodList={fitnessDateList}/>
                    </View>
                  </View>

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


    </SafeAreaView>
  )
}

export default NutritionistDetailPage


