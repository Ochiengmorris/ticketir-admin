import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import React from "react";

const Authenticated = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
    </Stack>
  );
};

const NotAuthenticated = () => {
  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: true }} />
    </Stack>
  );
};

const MainLayout = () => {
  const { isSignedIn } = useAuth();
  console.log(isSignedIn);
  return (
    <>
      <SignedIn>
        <Authenticated />
      </SignedIn>
      <SignedOut>
        <NotAuthenticated />
      </SignedOut>
    </>
  );
};
export default MainLayout;
