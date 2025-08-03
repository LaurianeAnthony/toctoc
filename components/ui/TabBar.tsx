import { useTheme } from "@/hooks/useTheme";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Typography } from "./Typography";

const TabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
    const {colors } = useTheme()

    return (
         <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title !== undefined
              ? options.title
              : route.name;


        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            console.log(route.name)
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.tabBar, { backgroundColor: isFocused ? colors.interactive.primary.background.focused : colors.interactive.primary.background.default }]}
          >
            {options.tabBarIcon &&
              options.tabBarIcon({
                focused: isFocused,
                color: colors.content.secondary,
                size: 32,
              })
            }
            <Typography style={{ color: colors.content.secondary }}>
              {label}
            </Typography>
          </TouchableOpacity>
        );
      })}
    </View>
    )
}

export default TabBar;


const styles = StyleSheet.create({
  tabBar: {
    flex: 1, alignItems: 'center', justifyContent: 'center', padding: 12, paddingBottom: 16
  },
});
