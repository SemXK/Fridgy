import { CustomertPivot } from '@/constants/interfaces/pivots';
import { FitnessStat, User } from '@/constants/interfaces/usersInterface';
import { NutritionistController } from '@/controllers/NutritionistController';
import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Pressable, View } from 'react-native';
import ThemedFormField from '../inputs/CustomFormField';
import PrimaryButton from '../pressable/PrimaryButton';
import ThemedText from '../ui/ThemedText';

interface FSFInterface {
  onSubmit: (stat: Partial<FitnessStat>) => void;
  customer: CustomertPivot<User>;
}

const FitnessStatForm = ({onSubmit, customer}: FSFInterface) => {
  // * Form Fields
  const [fitnessStat, setFitnessStat] = useState<FitnessStat | null>(null)

  const [weight, setWeight] = useState<string>('')
  const [weightGoal, setWeightGoal] = useState<string>('')
  const [height, setHeight] = useState<string>('')
  const [age, setAge] = useState<string>('')
  const [bodyFatPercentage, setBodyFatPercentage] = useState<string>('')
  const [muscularMassPercentage, setMuscularMassPercentage] = useState<string>('')
  const [dailyCalories, setDailyCalories] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(false)


  // $ Functions
  const getLastFitnessStats = async () => {
    await NutritionistController.getLastFitnessStat(customer.id)
      .then((res) => {
        const response = res as FitnessStat
        setFitnessStat(response as FitnessStat);
        setDailyCalories(String(response.dailyCalories));

      })
  }
  /**
   * Calculates the % variation of two values
   */
  const calculateVariation = (currentValue: string, previousValue: number | undefined): string => {
    if(!currentValue || !previousValue) {
      return " - "
    }
    return  ((Number(currentValue) - previousValue)  / previousValue * 100).toFixed(1) + " %"
  }
  const submitNewStats = () => {
    const payload: Partial<FitnessStat> = {
      weight: Number(weight),
      weightGoal: Number(weightGoal),
      height: Number(height),
      age: Number(age),
      bodyFatPercentage: Number(bodyFatPercentage),
      muscularMassPercentage: Number(muscularMassPercentage),
      dailyCalories: Number(dailyCalories),
    }
    if(weight && weightGoal && height && age && bodyFatPercentage && muscularMassPercentage && dailyCalories) {
      setLoading(true)
      onSubmit(payload)
    }
  }

  // £ Effects
  useEffect(() => {
    getLastFitnessStats()
  }, []);

  return (
    <Pressable
      className="flex-1"
      onPress={Keyboard.dismiss}
    >
      <KeyboardAvoidingView className="flex gap-4 px-4">
        <View>
          <ThemedText
            darkModeDisabled
            label={`Aggiunta Nuove Statistiche`}
            textStyle='text-2xl text-primary-500'
            font="Nunito-Bold"
          />
          <ThemedText 
            label={`Registra i progressi di ${customer.name}`}
          />
        </View>

        {/* Stat Generali, raramente variano */}
        <View className="flex flex-row justify-between gap-4">
          <View className="w-1/4">
            <ThemedFormField
              value={age}
              setValue={(text) => setAge(text.replace(',', '.'))}
              label='Età'
              keyboardType="decimal-pad"
            />
          </View>

          <View className="w-1/3">
            <ThemedFormField
              value={height}
              setValue={(text) => setHeight(text.replace(',', '.'))}
              label='Altezza (cm)'
              keyboardType="decimal-pad"
            />   
          </View>

          <View className="w-1/3">
            <ThemedFormField
              value={weightGoal}
              setValue={(text) => setWeightGoal(text.replace(',', '.'))}
              label='Obbiettivo (kg)'
              keyboardType="decimal-pad"
            />              
          </View> 
        </View>

        {/* Weight */}
        <View className="flex flex-row gap-4 justify-between">
          <View className="w-1/2">
            <ThemedFormField
              value={weight}
              setValue={(text) => setWeight(text.replace(',', '.'))}
              label='Peso (kg)'
              keyboardType="decimal-pad"
            />
          </View>

          <View className="flex flex-col justify-center items-center w-1/5">
            <ThemedText 
              font="Nunito-ExtraLight"
              textStyle='text-primary-500 text-sm'
              label={`Ultima misura`}
            />
            <ThemedText 
              font="Nunito-Bold"
              darkModeDisabled
              textStyle='text-primary-500 text-2xl'
              label={fitnessStat ? fitnessStat.weight + " kg" : ' - '}
            />
          </View>
          <View className="flex flex-col justify-center items-center w-1/5">
            <ThemedText 
              font="Nunito-ExtraLight"
              textStyle='text-primary-500 text-sm'
              label={`Variazione`}
            />
            <ThemedText 
              font="Nunito-Bold"
              darkModeDisabled
              textStyle={`text-2xl ${fitnessStat && fitnessStat.weight < Number(weight) ? 'text-rose-500' : 'text-emerald-500'}`}
              label={calculateVariation(weight, fitnessStat?.weight)}
            />
          </View>
        </View>

        {/* % Fat */}
        <View className="flex flex-row gap-4 justify-between">
          <View className="w-1/2">
            <ThemedFormField
              value={bodyFatPercentage}
              setValue={(text) => setBodyFatPercentage(text.replace(',', '.'))}
              label='Grasso Corporeo (%)'
              keyboardType="decimal-pad"
            />
          </View>

          <View className="flex flex-col justify-center items-center w-1/5">
            <ThemedText 
              font="Nunito-ExtraLight"
              textStyle='text-primary-500 text-sm'
              label={`Ultima misura`}
            />
            <ThemedText 
              font="Nunito-Bold"
              darkModeDisabled
              textStyle='text-primary-500 text-2xl'
              label={fitnessStat ? fitnessStat.bodyFatPercentage + " %" : ' - '}
            />
          </View>
          <View className="flex flex-col justify-center items-center w-1/5">
            <ThemedText 
              font="Nunito-ExtraLight"
              textStyle='text-primary-500 text-sm'
              label={`Variazione`}
            />
            <ThemedText 
              font="Nunito-Bold"
              darkModeDisabled
              textStyle={`text-2xl ${fitnessStat && fitnessStat.bodyFatPercentage < Number(bodyFatPercentage) ? 'text-rose-500' : 'text-emerald-500'}`}
              label={calculateVariation(bodyFatPercentage, fitnessStat?.bodyFatPercentage)}
            />
          </View>
        </View>

        {/* % Muscle Mass */}
        <View className="flex flex-row gap-4 justify-between">
          <View className="w-1/2">
            <ThemedFormField
              value={muscularMassPercentage}
              setValue={(text) => setMuscularMassPercentage(text.replace(',', '.'))}
              label='Massa Muscolare (%)'
              keyboardType="decimal-pad"

            />
          </View>

          <View className="flex flex-col justify-center items-center w-1/5">
            <ThemedText 
              font="Nunito-ExtraLight"
              textStyle='text-primary-500 text-sm'
              label={`Ultima misura`}
            />
            <ThemedText 
              font="Nunito-Bold"
              darkModeDisabled
              textStyle='text-primary-500 text-2xl'
              label={fitnessStat ? fitnessStat.muscularMassPercentage + " %" : ' - '}
            />
          </View>
          <View className="flex flex-col justify-center items-center w-1/5">
            <ThemedText 
              font="Nunito-ExtraLight"
              textStyle='text-primary-500 text-sm'
              label={`Variazione`}
            />
            <ThemedText 
              font="Nunito-Bold"
              darkModeDisabled
              textStyle={`text-2xl ${fitnessStat && fitnessStat.muscularMassPercentage > Number(muscularMassPercentage) ? 'text-rose-500' : 'text-emerald-500'}`}
              label={calculateVariation(muscularMassPercentage, fitnessStat?.muscularMassPercentage)}
            />
          </View>
        </View>

        {/* % Daily Calories */}
        <View className="flex flex-row gap-4 justify-between">
          <View className="w-1/2">
            <ThemedFormField
              value={dailyCalories}
              setValue={(text) => setDailyCalories(text.replace(',', '.'))}
              label='Calorie Giornaliere (kcal)'
              keyboardType="decimal-pad"

            />
          </View>

          <View className="flex flex-col justify-center  items-end">
            <ThemedText 
              font="Nunito-ExtraLight"
              textStyle='text-primary-500 text-sm'
              label={`Ultima misura`}
            />
            <ThemedText 
              font="Nunito-Bold"
              darkModeDisabled
              textStyle='text-primary-500 text-2xl'
              label={fitnessStat ? fitnessStat.dailyCalories + " kcal" : ' - '}
            />
          </View>
        </View>

        <PrimaryButton
          buttonText='Registra Statistiche'
          onPress={submitNewStats}
          isLoading={loading}
        />
      </KeyboardAvoidingView>
    </Pressable>
  )
}

export default FitnessStatForm