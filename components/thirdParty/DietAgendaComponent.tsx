import { MealTypes } from '@/constants/enums/common';
import { Meal } from '@/constants/interfaces/nutritionist';
import { primaryColor } from '@/constants/theme';
import { NutritionistController } from '@/controllers/NutritionistController';
import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import XDate from 'xdate';
import GenericEmptyCardComponent from '../details/EmptyCards/GenericEmptyCard';
import MealListByMealType from '../details/Lists/MealListByMealType';
import ThemedText from '../ui/ThemedText';

const DAYS = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

interface CCHInterface {
  mealList: Meal[];
  onDayChange: (day?: number) => void;
  onEmptyListPress: () => void;
  loading: boolean;
}

export default function CustomCalendarHeader({mealList, onDayChange, onEmptyListPress, loading}: CCHInterface) {
  const [selectedDate, setSelectedDate] = useState(new XDate());
  const [dailyCalories, setDailyCalories] = useState<number>(0);
  const [dailyCarbs, setDailyCarbs] = useState<number>(0);
  const [dailyFats, setDailyFats] = useState<number>(0);
  const [dailyProteins, setDailyProteins] = useState<number>(0);

  // * Functions
  const deleteMeal = async(mealId: number) => {
    await NutritionistController.deleteMeal(mealId)
      .then(() => {
        onDayChange()
      })
  }


  const week = useMemo(() => {
    const date = selectedDate.clone();

    // Monday
    const day = date.getDay();
    const diff = day === 0 ? -6 : 1 - day;

    date.addDays(diff);

    return Array.from({length: 7}, (_, dayOfWeekIndex) => {
      return date.clone().addDays(dayOfWeekIndex);
    });
  }, [selectedDate]);

  useEffect(() => {
    let caloriesCount = 0;
    let carbsCount = 0;
    let fatsCount = 0;
    let proteinsCount = 0;

    mealList.map((meal) => {
      const quantityRatio = meal.quantity / meal.product.quantity;
      caloriesCount += quantityRatio * meal.product.kcalories;
      carbsCount += quantityRatio * meal.product.carbs;
      fatsCount += quantityRatio * meal.product.fats;
      proteinsCount += quantityRatio * meal.product.proteins;

    });

    setDailyCalories(Number(caloriesCount.toFixed(2)))
    setDailyCarbs(Number(carbsCount.toFixed(2)))
    setDailyFats(Number(fatsCount.toFixed(2)))
    setDailyProteins(Number(proteinsCount.toFixed(2)))

  }, [mealList])

  return (
    <View className="flex-1 gap-4 p-4">

      {/* MealAgenda Desc */}
      <View className="flex flex-col gap-4 bg-stone-200 dark:bg-darkColor-800 rounded-xl p-4">

        <View className="flex flex-row justify-between">
          <ThemedText
            darkModeDisabled
            textStyle='text-primary-500 text-xl'
            font='Nunito-Bold'
            label={`Apporto Calorico Giornagliero`}
          />
          <ThemedText
            textStyle=' text-xl'
            font='Nunito-Bold'
            label={`${dailyCalories} kcal`}
          />
        </View>

        <View className="flex flex-row justify-between">
          <ThemedText
            darkModeDisabled
            textStyle='text-primary-500 text-xl'
            font='Nunito-Bold'
            label={`Carboidrati`}
          />
          <ThemedText
            textStyle=' text-xl'
            font='Nunito-Bold'
            label={`${dailyCarbs} g`}
          />
        </View>

        <View className="flex flex-row justify-between">
          <ThemedText
            darkModeDisabled
            textStyle='text-primary-500 text-xl'
            font='Nunito-Bold'
            label={`Grassi`}
          />
          <ThemedText
            textStyle=' text-xl'
            font='Nunito-Bold'
            label={`${dailyFats} g`}
          />
        </View>

        <View className="flex flex-row justify-between">
          <ThemedText
            darkModeDisabled
            textStyle='text-primary-500 text-xl'
            font='Nunito-Bold'
            label={`Proteine`}
          />
          <ThemedText
            textStyle=' text-xl'
            font='Nunito-Bold'
            label={`${dailyProteins} g`}
          />
        </View>

      </View>

      {/* Days  Header */}
      <View style={styles.days}>
        {week.map((date, dayOfWeekIndex) => {
          const isSelected = date.toString('yyyy-MM-dd') ===
            selectedDate.toString('yyyy-MM-dd');

          return (
            <Pressable
              key={date.toString('yyyy-MM-dd')}
              style={styles.day}
              onPress={() => {
                setSelectedDate(date);
                onDayChange(dayOfWeekIndex)
              }}
            >


              <ThemedText label={DAYS[dayOfWeekIndex] } />

              <View
                style={[
                  styles.dayNumber,
                  isSelected && styles.selectedDay,
                ]}
              >
                <Text
                  style={[
                    styles.dayNumberText,
                    isSelected && styles.selectedDayText,
                  ]}
                >
                  {date.getDate()}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>



      {/* Meal List */}
      { !loading ? 
        <View className=" gap-4 h-full flex-1 w-full">
          <FlatList
            data={mealList.length ? [1] : []}
            style={{flex: 1}}
            ListEmptyComponent={() => {
              return (
                <GenericEmptyCardComponent 
                  title={'Piano Alimentare non implementato'} 
                  message={'Il piano alimentare non include alcun pasto per questa giornata. Crea dei pasti da assegnare per il giorno corrente'} 
                  image={require('@/assets/images/illustrations/empty_meal_list.png')}
                  buttonText='Crea Il Piano'
                  onPress={onEmptyListPress}
                />
              )
            }}  
            renderItem={() => {
              return (
                <>
                  <MealListByMealType onDelete={deleteMeal} meals={mealList.filter((item) => item.mealTypeId === MealTypes.Colazione)} title='Colazione' />
                  <MealListByMealType onDelete={deleteMeal} meals={mealList.filter((item) => item.mealTypeId === MealTypes.Spuntino)} title='Spuntino' />
                  <MealListByMealType onDelete={deleteMeal} meals={mealList.filter((item) => item.mealTypeId === MealTypes.Pranzo)} title='Pranzo' />
                  <MealListByMealType onDelete={deleteMeal} meals={mealList.filter((item) => item.mealTypeId === MealTypes.Merenda)} title='Merenda' />
                  <MealListByMealType onDelete={deleteMeal} meals={mealList.filter((item) => item.mealTypeId === MealTypes.Cena)} title='Cena' />

                </>
              )
            }}
          />


        </View>
        :
        <View className="w-full flex flex-row justify-center">
          <ActivityIndicator animating size={24} color={primaryColor[500]}  />
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  month: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },

  days: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  day: {
    alignItems: 'center',
    gap: 6,
  },

  dayName: {
    fontSize: 12,
    color: '#888',
  },

  dayNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  selectedDay: {
    backgroundColor: '#000',
  },

  dayNumberText: {
    fontSize: 16,
    color: '#222',
  },

  selectedDayText: {
    color: '#fff',
  },
});
