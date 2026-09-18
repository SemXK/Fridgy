import { ProductMacros } from '@/constants/interfaces/productInterface';
import React, { useState } from 'react';
import { View } from 'react-native';
import ThemedText from '../ui/ThemedText';

{/* <ThemedText font='Nunito-Bold' textStyle="text-center" label={`${macros.carbs} g`} /> */}
interface MBGCInterface {
  macros: ProductMacros,
  mealQuantity: number;
}

const MacroBarGraphComponent = ({macros, mealQuantity}: MBGCInterface) => {
  const [macroQuantity] = useState<number>(macros.carbs + macros.fats + macros.proteins);

  return (
    <View className="flex-1 ">
      <ThemedText font='Nunito-Bold' textStyle='text-xl' label={`${macros.kcalories} kcal`} />

      {/* Bar Graph */}
      <View className="w-full flex flex-row flex-1 " style={{marginBottom: 4}}>
        <View className={`bg-indigo-500 h-4  ${macroQuantity === macros.carbs ? 'rounded-xl' : 'rounded-l-xl'} `}    style={{width: `${(macros.carbs / macroQuantity) * 100}%`}} />
        <View className={`bg-amber-500 h-4 ${macroQuantity === macros.fats ? 'rounded-xl' : ''}`}                    style={{width: `${(macros.fats / macroQuantity) * 100}%`}} />
        <View className={`bg-emerald-500 h-4 ${macroQuantity === macros.proteins ? 'rounded-xl' : 'rounded-r-xl'}`}  style={{width: `${(macros.proteins / macroQuantity) * 100}%`}} />

        {/* <View className="bg-rose-500 h-4"              style={{width: `${(macros.saturatedAcidFats || 0) / mealQuantity * 100}%`}} />
        <View className="bg-rose-400 h-4"                  style={{width: `${(macros.monosaturatedAcidFats || 0) / mealQuantity * 100}%`}} />
        <View className="bg-rose-600 h-4"                  style={{width: `${(macros.polysaturatedAcidFats || 0) / mealQuantity * 100}%`}} />
        <View className="bg-emerald-500 h-4"               style={{width: `${(macros.carbs || 0) / mealQuantity * 100}%`}} />
        <View className="bg-emerald-500 h-4"               style={{width: `${(macros.sugars || 0) / mealQuantity * 100}%`}} />
        <View className="bg-emerald-500 h-4"               style={{width: `${(macros.fibers || 0) / mealQuantity * 100}%`}} />
        <View className="bg-emerald-500 h-4"               style={{width: `${(macros.proteins || 0) / mealQuantity * 100}%`}} />
        <View className="bg-rose-500 h-4  rounded-r-xl"    style={{width: `${(macros.salt || 0) / mealQuantity * 100}%`}} /> */}
      </View>

      {/* Macros Labels */}
      <View className="w-full flex flex-row flex-1 justify-between items-center">
        <View className="flex flex-row gap-2 items-center align-center">
          <View className="h-2  aspect-square rounded-lg bg-indigo-500" />
          <ThemedText label="Carboidrati" />
        </View>
        <View className="flex flex-row gap-2 items-center align-center">
          <View className="h-2  aspect-square rounded-lg bg-amber-500" />
          <ThemedText label="Grassi" />
        </View>   
        <View className="flex flex-row gap-2 items-center align-center">
          <View className="h-2  aspect-square rounded-lg bg-emerald-500" />
          <ThemedText label="Proteine" />
        </View>              
      </View>


    </View>
  )
}

export default MacroBarGraphComponent