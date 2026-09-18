import ThemedText from '@/components/ui/ThemedText'
import { Meal } from '@/constants/interfaces/nutritionist'
import React from 'react'
import { FlatList, View } from 'react-native'
import MealCardComponent from '../detailCards/MealCardComponent'

interface MLBMTInterface {
  meals: Meal[];
  title: string;
}

const MealListByMealType = ({meals, title}: MLBMTInterface) => {
  return (
    <>
    {
      meals.length ?
        <View>
          <ThemedText label={title} darkModeDisabled textStyle='text-primary-500 text-2xl' />
          <FlatList
            data={meals}
            showsVerticalScrollIndicator={false}
            style={{flex: 1}}
            renderItem={({item}) => {
              return (
                <View className="h-32 mb-4">
                  <MealCardComponent meal={item} />
                </View>
              )
            }}
          />
        </View>      
        :
        <>
        </>

    }
    </>

  )
}

export default MealListByMealType