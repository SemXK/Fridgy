import { CustomertPivot } from '@/constants/interfaces/pivots';
import { User } from '@/constants/interfaces/usersInterface';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import ThemedFormField from '../inputs/CustomFormField';
import PrimaryButton from '../pressable/PrimaryButton';
import ThemedText from '../ui/ThemedText';

interface FSFInterface {
  onSubmit: () => void;
  customer: CustomertPivot<User>;
}

const FitnessStatForm = ({onSubmit, customer}: FSFInterface) => {
  // * Form Fields
  const [weight, setWeight] = useState<string>('')
  const [weightGoal, setWeightGoal] = useState<string>('')
  const [height, setHeight] = useState<string>('')
  const [age, setAge] = useState<string>('')
  const [bodyFatPercentage, setBodyFatPercentage] = useState<string>('')
  const [muscularMassPercentage, setMuscularMassPercentage] = useState<string>('')
  


  // $ Functions
  const getLastFitnessStats = () => {

  }

  // £ Effects
  useEffect(() => {
    getLastFitnessStats()
  }, []);

  return (
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
            setValue={setAge}
            label='Età'
            keyboardType="decimal-pad"
          />
        </View>

        <View className="w-1/3">
          <ThemedFormField
            value={height}
            setValue={setHeight}
            label='Altezza (cm)'
            keyboardType="decimal-pad"
          />   
        </View>

        <View className="w-1/3">
          <ThemedFormField
            value={weightGoal}
            setValue={setWeightGoal}
            label='Obbiettivo (kg)'
            keyboardType="decimal-pad"
          />              
        </View> 
      </View>


      <ThemedFormField
        value={weight}
        setValue={setWeight}
        label='Peso (kg)'
      />

      <PrimaryButton
        buttonText='Crea Piano Alimentare'
        onPress={
          () => null
          // () => onSubmit(name, description)
        }
      />
    </KeyboardAvoidingView>
  )
}

export default FitnessStatForm