import { WithStateSetters } from '@/constants/interfaces/common'
import { Fridge } from '@/constants/interfaces/productInterface'
import React from 'react'
import { View } from 'react-native'
import ThemedFormField from '../inputs/CustomFormField'
import ThemedTextArea from '../inputs/CustomTextArea'


const FridgeForm = ({name, description, setName, setDescription}: WithStateSetters<Fridge, 'name' | 'description'>) => {
  return (
    <View className="flex flex-col gap-4">

      <ThemedFormField
        value={name as string}
        setValue={setName}
        label="Nome"
      />
      <ThemedTextArea
        value={description as string}
        setValue={setDescription}
        label="Descrizione"
      />      
    </View>
  )
}

export default FridgeForm