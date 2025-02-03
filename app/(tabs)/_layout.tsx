import { Redirect, Tabs } from "expo-router";
import React from "react";

import TabBar from "@/components/TabBar";
import { COLORS } from "@/constants/sizes";
import { useAuth } from "@clerk/clerk-expo";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <>
      <Tabs tabBar={(props) => <TabBar {...props} />}>
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="scan"
          options={{
            title: "Scan",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
          }}
        />
      </Tabs>
      <StatusBar style="dark" backgroundColor={COLORS.white} />
    </>
  );
}
