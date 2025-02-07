import { COLORS } from "@/constants/sizes";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/(tabs)/home"} />;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="light" backgroundColor={COLORS.black} />
    </>
  );
}
