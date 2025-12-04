import { primaryColor } from '@/constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

function getFocusedRouteName(route: any): string {
  let r = route;
  while (r?.state && r.state.index != null) {
    r = r.state.routes[r.state.index];
  }
  return r?.name;
}

export default function AnimatedTabBar({ state, descriptors, navigation }: any) {
  const route = state.routes[state.index];
  const focusedChild = getFocusedRouteName(route);
  const isHome = route.name === "Home";
  const isFridgeIndex = route.name === "(fridge-tab)" && focusedChild === "index";

  if (!isHome && !isFridgeIndex) {
    return null;
  }

  return (
    <View
      style={{
        width: "70%",
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
        if (options.tabBarItemStyle?.display === 'none') {
          return null
        }
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
            </MotiView>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
