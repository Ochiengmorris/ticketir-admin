import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import "react-native-reanimated";

import SyncUserWithConvex from "@/components/SyncUserWithConvex";
import ClerkAuthProvider from "@/utils/ClerkProvider";
import ConvexClientProvider from "@/utils/ConvexProvider";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import { Toaster } from "sonner-native";
import "../global.css";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "/(auth)/sign-in",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClerkAuthProvider>
        <ConvexClientProvider>
          <PaperProvider>
            {/* Ensure that the user is synced with Convex before showing the app. */}

            <SyncUserWithConvex />
            <RootLayoutNav />
            <Toaster />
          </PaperProvider>
        </ConvexClientProvider>
      </ClerkAuthProvider>
    </GestureHandlerRootView>
  );
}

function RootLayoutNav() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast />
    </>
  );
}
