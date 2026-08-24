import { StoreAccessType } from '@/constants/enums/storeAccessType'
import { UserAccessType } from '@/constants/interfaces/usersInterface'
import React from 'react'
import { View } from 'react-native'
import ThemedText from '../ThemedText'



interface SAPinterface {
  accessType: UserAccessType
}
const StoreAccessTypePill = ({accessType}: SAPinterface) => {

  // % functions
  const getPillBackgroundColor= () => {
    switch(accessType.id) {
      case StoreAccessType.CEO:
        return "bg-primary-500/25"
      case StoreAccessType.Manager:
        return "bg-amber-500/25"
      case StoreAccessType.Contabile:
        return "bg-emerald-500/25"
      case StoreAccessType.Dipendente:
        return "bg-indigo-500/25"
    }
  }
  const getPillTextColor= () => {
    switch(accessType.id) {
      case StoreAccessType.CEO:
        return "text-primary-500"
      case StoreAccessType.Manager:
        return "text-amber-500"
      case StoreAccessType.Contabile:
        return "text-emerald-500"
      case StoreAccessType.Dipendente:
        return "text-indigo-500"
    }
  }

  // * Display
  return (
    <View className={`${getPillBackgroundColor()} w-1/3 flex flex-row justify-center rounded-xl`} >
      <ThemedText 
        font="Nunito-Bold"
        darkModeDisabled
        textStyle={getPillTextColor()}
        label={accessType.type}
      />
    </View>
  )
}

export default StoreAccessTypePill