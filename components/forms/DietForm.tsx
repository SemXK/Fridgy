import React, { useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import ThemedFormField from '../inputs/CustomFormField';
import PrimaryButton from '../pressable/PrimaryButton';
import ThemedText from '../ui/ThemedText';

interface DFInterface {
  onSubmit: (name: string, description: string) => void
}

const DietForm = ({onSubmit}: DFInterface) => {
  // * State
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  return (
    <KeyboardAvoidingView className="flex gap-4 px-4">
      <View>
        <ThemedText 
          darkModeDisabled
          label='Crea Il Piano Alimentare'
          textStyle='text-2xl text-primary-500'
          font="Nunito-Bold"
        />
        <ThemedText 
          label='Inizia creando il piano alimentare, nel quale potrai aggiungere i vari pasti per il cliente'
        />
      </View>
      <ThemedFormField 
        value={name}
        setValue={setName}
        label='Nome'
      />
      <ThemedFormField 
        value={description}
        setValue={setDescription}
        label='Descrizione'
        multiline
      />

      <PrimaryButton 
        buttonText='Crea Piano Alimentare'
        onPress={() => onSubmit(name, description)}
      />
    </KeyboardAvoidingView>
  )
}

export default DietForm