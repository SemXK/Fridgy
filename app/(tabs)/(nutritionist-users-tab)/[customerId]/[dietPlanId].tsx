import BackButtonHeader from '@/components/headers/BackButtonHeader';
import DietAgendaComponent from '@/components/thirdParty/DietAgendaComponent';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



const DietPlanDetail = () => {
  // const { customerId, dietPlanId } =
  //   useLocalSearchParams<{
  //     customerId: string
  //     dietPlanId: string
  //   }>()

  // const colorScheme = Appearance.getColorScheme()
  // const isDark = colorScheme === 'dark'

  // const agendaTheme = useMemo(
  //   () => ({
  //     calendarBackground: isDark ? darkColor[800] : 'white',
  //     arrowColor: primaryColor[500],
  //     agendaDayTextColor: primaryColor[500],
  //     monthTextColor: primaryColor[500],
  //     textMonthFontWeight: '700' as const,
  //     textMonthFontSize: 12,
  //   }),
  //   [isDark]
  // )

  return (
    <SafeAreaView className="h-screen ">
      <BackButtonHeader />

      <View className="bg-rose-800 h-24">

      </View>

      <DietAgendaComponent />
    </SafeAreaView>
  )
}

export default DietPlanDetail
