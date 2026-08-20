import { WithStateSetters } from '@/constants/interfaces/common'
import { Store } from '@/constants/interfaces/store'
import React from 'react'
import { View } from 'react-native'
import ThemedFormField from '../inputs/CustomFormField'

const StoreForm = (props: WithStateSetters<Store, 'name' | 'lat' | 'lng'>) => {
  return (
    <View className="flex flex-col gap-4">

      <ThemedFormField
        value={props.name as string}
        setValue={props.setName}
        label="Nome"
      />
    </View>
  )
}

export default StoreForm