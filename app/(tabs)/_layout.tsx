import { Tabs } from "expo-router";
import React from "react";

import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBar from "@/components/ui/TabBar";
import { Platform } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color, size }) => (
            <IconSymbol size={size} name="calendar-month" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="checklist"
        options={{
          title: "Checklist",
          tabBarIcon: ({ color, size }) => (
            <IconSymbol size={size} name="assignment-turned-in" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="example"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <IconSymbol size={size} name="settings" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
