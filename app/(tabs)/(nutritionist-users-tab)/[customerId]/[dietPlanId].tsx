import BackButtonHeader from '@/components/headers/BackButtonHeader';
import DietAgendaComponent from '@/components/thirdParty/DietAgendaComponent';
import BottomSheetComponent from '@/components/ui/BottomSheet';
import { Meal } from '@/constants/interfaces/nutritionist';
import { DailyMealsPayload } from '@/constants/interfaces/requestPayloads/nutritionistPayloads';
import { NutritionistController } from '@/controllers/NutritionistController';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';



const DietPlanDetail = () => {
  // ? Params
  const { customerId, dietPlanId } = useLocalSearchParams<{
    customerId: string
    dietPlanId: string
  }>()

  // * States
  const [mealList, setMealList] = useState<Meal[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [showNewMeal, setShowNewMeal] = useState<boolean>(false)

  // $ functions
  const handleChangeDay = async(dayOfWeek: number = new Date().getUTCDay() - 1) => {
    setLoading(true)
    const payload: DailyMealsPayload = {
      secondUserId: Number(customerId),
      dietId: Number(dietPlanId),
      dayOfWeek
    }
    await NutritionistController.getDayMeal(payload)
      .then((res) => {
        setMealList(res as Meal[])
      })
      .finally(() => {
        setLoading(false)
      })
  }

  // £ Effects
  useEffect(() => {
    handleChangeDay()
  }, [])
  return (
    <SafeAreaView className="h-screen ">
      <BackButtonHeader />

      <DietAgendaComponent 
        mealList={mealList}
        onDayChange={handleChangeDay} 
        onEmptyListPress={() => setShowNewMeal(true)}
        loading={loading} 
      />

    {/* BottomSheet */}
    {
      showNewMeal && 
      <BottomSheetComponent
        height={.8}
        onClose={() => setShowNewMeal(false)}
        ShownComponent={() => null}
      />
    }

    </SafeAreaView>
  )
}

export default DietPlanDetail
