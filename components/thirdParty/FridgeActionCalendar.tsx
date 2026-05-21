import { getFridgeActionsColor } from '@/constants/functions';
import { FridgeAction } from '@/constants/interfaces/productInterface';
import { darkColor, primaryColor } from '@/constants/theme';
import { ProductController } from '@/controllers/ProductController';
import { useLocalSearchParams } from 'expo-router';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Appearance, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';
import '../../constants/locale';
const vacation = {key: 'vacation', color: 'red', selectedDotColor: 'blue'};
const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
const workout = {key: 'workout', color: 'green'};

const FridgeActionCalendar = () => {
  // % Context
  const { fridgeId }= useLocalSearchParams<{ fridgeId: string }>()
  
  // * States
  const [fridgeActions, setFridgeActions] = useState<MarkedDates>({})
  const [calendarStartDate, setCalendarStartDate] = useState<Date>(new Date())
  const [calendarEndDate, setCalendarEndDate] = useState<Date>(new Date())

  useEffect(() => {
    getFridgeActions()
  }, [])

  // * Functions
  const getFridgeActions = async () => {
    await ProductController.getFridgeHistory(fridgeId, calendarStartDate, calendarEndDate)
    .then(
      (res) => {
        mapFridgeActionsToMarkedDates(res as FridgeAction[]);
    })
    .catch((e) => {
      console.log({fridgeActionError: e})
    })
  }
  const mapFridgeActionsToMarkedDates = (actions: FridgeAction[]) => {
    const markedDates: MarkedDates = {}
    actions.map((action) => {
      const date = moment(action.created_at).format('YYYY-MM-DD')
      markedDates[date] = {
        dots: actions.map((act) => {
          return {key: act.id.toString(), color: getFridgeActionsColor(act.fridgeActionTypeId)}
        }) 
      }
    })
    console.log(markedDates)
    setFridgeActions(markedDates)
  }

  return (
    <View className="h-12">

      <Calendar
        headerStyle={{
          paddingHorizontal: 16,
        }}
        theme={{
          calendarBackground: darkColor[800],
          contentStyle: {
            backgroundColor: 'red',
            padding: 8,
          },
          arrowColor: primaryColor[500],
          agendaDayTextColor: primaryColor[500],
          textDayStyle:{
            color: Appearance.getColorScheme() === 'light' ?  darkColor[800] : 'white',
            backgroundColor: Appearance.getColorScheme() === 'light' ?'white' : darkColor[800],
          },
          monthTextColor: primaryColor[500],
          backgroundColor: 'red',
          textMonthFontWeight: '700',
          textMonthFontSize: 12

        }}
        firstDay={1}
        hideDayNames
        monthFormat='MMMM yyyy'
        markingType={'multi-dot'}
        markedDates={fridgeActions}
      />
    </View>

  )
}

export default FridgeActionCalendar