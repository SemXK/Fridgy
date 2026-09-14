import React from 'react'
import { View } from 'react-native'
import ThemedText from '../ui/ThemedText'

interface MBGCInterface {

} 

const MacroBarGraphComponent = () => {
  return (
    <View>
      <ThemedText font='Nunito-Bold' textStyle='text-xl' label="2200 cal/gg" />

      <View className="w-full flex flex-row">
        <View className="bg-indigo-500 h-4  rounded-l-xl" style={{width: "50%"}}>
          <ThemedText font='Nunito-Bold' textStyle="text-center" label="Carboidrati (50%)" />
        </View>
        <View className="bg-amber-500 h-4  " style={{width: "30%"}}>
          <ThemedText font='Nunito-Bold' textStyle="text-center" label="Proteine (30%)" />

        </View>
        <View className="bg-emerald-500 h-4  rounded-r-xl" style={{width: "20%"}}>
          <ThemedText font='Nunito-Bold' textStyle="text-center" label="Grassi (20%)" />
        </View>

      </View>
    </View>
  )
}

export default MacroBarGraphComponent