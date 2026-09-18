import MealForm from '@/components/forms/MealForm';
import BackButtonHeader from '@/components/headers/BackButtonHeader';
import PrimaryButton from '@/components/pressable/PrimaryButton';
import DietAgendaComponent from '@/components/thirdParty/DietAgendaComponent';
import BottomSheetComponent from '@/components/ui/BottomSheet';
import { Meal } from '@/constants/interfaces/nutritionist';
import { CreateMealPayload, DailyMealsPayload } from '@/constants/interfaces/requestPayloads/nutritionistPayloads';
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
  const [dayOfWeek, setDayOfWeek] = useState<number>( new Date().getUTCDay() - 1)

  // $ functions
  const handleChangeDay = async(dayOfWeek: number) => {
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
        setDayOfWeek(dayOfWeek)

      })
  }
  const handleNewMeal = async(payload: Partial<CreateMealPayload>) => {
    payload.dietId = Number(dietPlanId)
    payload.dayOfWeek = dayOfWeek
    NutritionistController.createMeal(payload as CreateMealPayload)
      .then((res) => {
        handleChangeDay(dayOfWeek)
        setShowNewMeal(false)
      })
  }

  // £ Effects
  useEffect(() => {
    handleChangeDay(dayOfWeek)
  }, [])

  return (
    <SafeAreaView className="h-screen gap-4">
      <BackButtonHeader />

      {/* Actions */}
      <PrimaryButton 
        buttonText='Aggiungi Pasto'
        onPress={() => setShowNewMeal(true)}
      />

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
        ShownComponent={() => <MealForm onSubmit={handleNewMeal} />}
      />
    }

    </SafeAreaView>
  )
}

export default DietPlanDetail
