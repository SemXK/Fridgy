import MacroBarGraphComponent from '@/components/graphs/MacroBarGraphComponent'
import ThemedText from '@/components/ui/ThemedText'
import UrlImage from '@/components/ui/UrlImage'
import { Meal } from '@/constants/interfaces/nutritionist'
import { ProductMacros } from '@/constants/interfaces/productInterface'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'

interface MCCInterface {
  meal: Meal
}

const MealCardComponent = ({meal}: MCCInterface) => {
  // * States
  const [prodMacros, setProdMacros] = useState<ProductMacros>()

  // $ Function
  const calculateMacros = () => {
    const quantityRatio = meal.quantity / meal.product.quantity
    setProdMacros({
      kcalories:              Math.round(meal.product.kcalories * quantityRatio),
      fats:                   Math.round(meal.product.fats * quantityRatio),
      saturatedAcidFats:      Math.round(meal.product.saturatedAcidFats * quantityRatio),
      monosaturatedAcidFats:  Math.round(meal.product.monosaturatedAcidFats * quantityRatio),
      polysaturatedAcidFats:  Math.round(meal.product.polysaturatedAcidFats * quantityRatio),
      carbs:                  Math.round(meal.product.carbs * quantityRatio),
      sugars:                 Math.round(meal.product.sugars * quantityRatio),
      fibers:                 Math.round(meal.product.fibers * quantityRatio),
      proteins:               Math.round(meal.product.proteins * quantityRatio),
      salt:                   Math.round(meal.product.salt * quantityRatio),
    })
  }
  // £ Effects
  useEffect(() => {
    calculateMacros()
  }, [])

  return (
    <View className="dark:bg-darkColor-900 bg-stone-2 rounded-xl w-full h-48 flex flex-row gap-4 p-2 flex-1">
      
      <View className="dark:bg-darkColor-800 bg-white rounded-xl h-full aspect-square">
        <UrlImage 
          source={meal.product?.image || ''} 
          resizeMode='contain' 
          className="flex-1 rounded-xl aspect-square" 
        />
      </View>

      <View className="flex flex-col flex-1 justify-between">
        <View className="flex-1">
          <ThemedText
            darkModeDisabled
            textStyle='text-primary-500 text-2xl'
            font='Nunito-Bold'
            label={meal.product?.name || ''}
          />
          <ThemedText
            label={meal.description || ''}
          />
          {prodMacros && 
            <MacroBarGraphComponent 
              macros={prodMacros }
              mealQuantity={meal.quantity}
            />
        }

        </View>

        {/* <View className="flex flex-row justify-end self-end h-auto ">
          <MaterialCommunityIcons
            onPress={() => { router.navigate(`/(tabs)/(store-tab)/${props.store.id}`); } } 
            name='chevron-right'
            color={primaryColor[500]}
            size={32}
          />
        </View> */}
      </View>

    </View>
  )
}

export default MealCardComponent