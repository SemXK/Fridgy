import ThemedText from '@/components/ui/ThemedText'
import { Meal } from '@/constants/interfaces/nutritionist'
import React from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable'
import MealCardComponent from '../detailCards/MealCardComponent'

interface MLBMTInterface {
  meals: Meal[];
  title: string;
  onDelete: (id: number) => void
}

const MealListByMealType = ({meals, title, onDelete}: MLBMTInterface) => {

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
                <ReanimatedSwipeable
                  renderLeftActions={() => (
                    <TouchableOpacity onPress={() => onDelete(item.id)}  className="h-32 mb-4 w-24 bg-red-500 rounded-xl items-center justify-center">
                      <ThemedText
                        label="Elimina"
                        darkModeDisabled
                        textStyle="text-white font-semibold"
                      />
                    </TouchableOpacity>
                  )}
                  onSwipeableOpen={(direction) => {
                    if (direction === 'left') {
                      onDelete(item.id);
                    }
                  }}
                  overshootLeft={false}
                >
                  <View className="h-32 mb-4">
                    <MealCardComponent meal={item} />
                  </View>
                </ReanimatedSwipeable>
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