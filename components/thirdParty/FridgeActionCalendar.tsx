import { useFridge } from '@/app/(tabs)/(fridge-tab)/_layout';
import { getFridgeActionsColor } from '@/constants/functions';
import { AgendaFridgeAction } from '@/constants/interfaces/common';
import { FridgeAction } from '@/constants/interfaces/productInterface';
import { darkColor, primaryColor } from '@/constants/theme';
import { ProductController } from '@/controllers/ProductController';
import * as Haptics from 'expo-haptics';
import { useLocalSearchParams } from 'expo-router';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Appearance, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { DateData, MarkedDates } from 'react-native-calendars/src/types';
import '../../constants/locale';

const FridgeActionCalendar = () => {
  // £ Context
  const { fridgeId }= useLocalSearchParams<{ fridgeId: string }>()
  const {setFridgeAgendaProps , fridgeDetail} = useFridge()
  
  // * States
  const [fridgeActions, setFridgeActions] = useState<MarkedDates>({})
  const [calendarStartDate, setCalendarStartDate] = useState<Date>(moment().startOf('M').toDate())
  const [calendarEndDate, setCalendarEndDate] = useState<Date>(moment().endOf('M').toDate())

  useEffect(() => {
    getFridgeActions()
  }, [fridgeDetail])

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
        dots: actions
          .filter((act: FridgeAction) => {
            return (
              moment(act.created_at).format('YYYY-MM-DD') === date
            )
          })
          .map((act, i) => {
            return {
              key: act.id.toString(), 
              color: getFridgeActionsColor(act.fridgeActionTypeId), 
              ...act
            }
        })
      }
    })
    setFridgeActions(markedDates)
  }
  const openDayAgenda = (date: DateData) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    const dots = fridgeActions[date.dateString]?.dots ?? null
    console.log({dots, date: date.dateString})
    setFridgeAgendaProps(dots as unknown as AgendaFridgeAction[])
  }


  return (
    <View className="h-12">

      <Calendar
        headerStyle={{
          paddingHorizontal: 16,
        }}
        theme={{
          calendarBackground:  Appearance.getColorScheme() === 'dark' ? darkColor[800] : 'white',
          contentStyle: {
            backgroundColor: 'red',
            padding: 8,
          },
          arrowColor: primaryColor[500],
          agendaDayTextColor: primaryColor[500],
          textDayStyle:{
            color: primaryColor[500],
            backgroundColor: Appearance.getColorScheme() === 'light' ?'white' : darkColor[800],
          },
          monthTextColor: primaryColor[500],
          backgroundColor: 'red',
          textMonthFontWeight: '700',
          textMonthFontSize: 12

        }}
        onDayLongPress={openDayAgenda}
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