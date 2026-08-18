import { TabBarIcons } from '@/constants/iconConstants';
import { primaryColor } from '@/constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import React from 'react';
import { Appearance, TouchableOpacity, View } from 'react-native';

function getFocusedRouteName(route: any): string {
  let r = route;
  while (r?.state && r.state.index != null) {
    r = r.state.routes[r.state.index];
  }
  return r?.name;
}

export default function AnimatedTabBar({ state, descriptors, navigation }: any) {
  // * list the routes with tab bar displayed
  const route = state.routes[state.index];
  const focusedChild = getFocusedRouteName(route);
  const isHome = route.name === "Home";
  const isProductDetail = route.name === "productDetail";
  const isFridgeIndex = route.name === "(fridge-tab)";
  const isProductCreation = route.name === "ProductCreation";
  const isProfilePage = route.name === "(profile-tab)";

  // * Specify which page shows the Tab Bar
  if (!isHome && !isFridgeIndex && !isProductDetail && !isProductCreation && !isProfilePage) {
    return null;
  }

  return (
    <View
      style={{
        width: "80%",
        position: 'absolute',
        bottom: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'transparent',
        gap: 4,
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

        const iconName = TabBarIcons[route.name] || 'circle-outline';
        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.7}
            // className="bg-white dark:bg-darkColor-800 p-2 rounded-2xl aspect-square  flex flex-col items-center justify-center"
            style={{ flex: 1, alignItems: 'center' }}
          >
            <MotiView
              className="bg-white dark:bg-darkColor-800 p-2 rounded-2xl aspect-square w-16 flex flex-col items-center justify-center"
              animate={{
                // scale: isFocused ? 1.15 : 1,
                translateY: isFocused ? -4 : 0,
              }}
              transition={{ type: 'timing', duration: 250 }}
            >
              <MaterialCommunityIcons
                name={iconName as any}
                size={24}
                color={isFocused ? primaryColor[500] : Appearance.getColorScheme() === 'dark' ? 'white' : 'black' }
              />
            </MotiView>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
