import { darkColor, primaryColor } from '@/constants/theme';
import React from 'react';
import { Appearance, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import '../../constants/locale';

const vacation = {key: 'vacation', color: 'red', selectedDotColor: 'blue'};
const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
const workout = {key: 'workout', color: 'green'};

const FridgeActionCalendar = () => {
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
        markedDates={{
          '2026-05-22': {dots: [vacation, massage, workout]},
          '2026-05-23': {dots: [massage, workout]}
        }}
      />
    </View>

  )
}

export default FridgeActionCalendar