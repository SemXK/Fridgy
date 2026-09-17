import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import XDate from 'xdate';

const DAYS = ['L', 'M', 'M', 'G', 'V', 'S', 'D'];

export default function CustomCalendarHeader() {
  const [selectedDate, setSelectedDate] = useState(new XDate());

  const week = useMemo(() => {
    const date = selectedDate.clone();

    // Monday
    const day = date.getDay();
    const diff = day === 0 ? -6 : 1 - day;

    date.addDays(diff);

    return Array.from({length: 7}, (_, index) => {
      return date.clone().addDays(index);
    });
  }, [selectedDate]);

  return (
    <View style={styles.container}>

      {/* Days */}
      <View style={styles.days}>
        {week.map((date, index) => {
          const isSelected = date.toString('yyyy-MM-dd') ===
            selectedDate.toString('yyyy-MM-dd');

          return (
            <Pressable
              key={date.toString('yyyy-MM-dd')}
              style={styles.day}
              onPress={() => {
                setSelectedDate(date);
                console.log('Selected:', date.toString('yyyy-MM-dd'));
              }}
            >
              <Text style={styles.dayName}>
                {DAYS[index]}
              </Text>

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
