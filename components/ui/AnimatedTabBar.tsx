import { primaryColor } from '@/constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function AnimatedTabBar({ state, descriptors, navigation }: any) {
  return (
    <View
      style={{
        width: "80%",
        position: 'absolute',
        bottom: 12,
        margin: 10,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: primaryColor[500],
        borderRadius: 16,
        paddingVertical: 10,

      }}
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.title ?? route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const icons: Record<string, string> = {
          'Home': 'home-outline',
          '(fridge-tab)': 'fridge-outline',
          'Recipes': 'silverware-fork-knife',
          'Profile': 'account-outline',
        };

        const iconName = icons[route.name] || 'circle-outline';

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.7}
            style={{ flex: 1, alignItems: 'center' }}
          >
            <MotiView
              className="items-center"
              animate={{
                scale: isFocused ? 1.15 : 1,
                translateY: isFocused ? -4 : 0,
              }}
              transition={{ type: 'timing', duration: 250 }}
            >
              <MaterialCommunityIcons
                name={iconName}
                size={24}
                color={isFocused ? 'white' : primaryColor[200]}
              />
              <Text
                style={{
                  fontSize: 11,
                  marginTop: 4,
                  color: isFocused ? 'white' : primaryColor[200],
                  fontWeight: isFocused ? '600' : '400',
                }}
              >
                {label}
              </Text>
            </MotiView>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
