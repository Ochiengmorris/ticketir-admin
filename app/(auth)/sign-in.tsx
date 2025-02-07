import {
  BORDER_RADIUS,
  COLORS,
  FONT_SIZE,
  MARGIN,
  PADDING,
  SPACING,
} from "@/constants/sizes";
import { useOAuth, useSignIn } from "@clerk/clerk-expo";
import { AntDesign } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX

    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const SignIn = () => {
  useWarmUpBrowser();
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoadingGoogle, setIsLoadingGoogle] = React.useState(false);
  const [isLoadingFacebook, setIsLoadingFacebook] = React.useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = React.useState(false);

  const onPressOAuth = React.useCallback(async () => {
    if (!isLoaded) return;
    setIsLoadingGoogle(true);
    try {
      const OAuthResult = await startOAuthFlow({
        redirectUrl: Linking.createURL("/(tabs)/home", {
          scheme: "com.johnte.ticketradmin",
        }),
      });
      // const readable = JSON.parse(JSON.stringify(OAuthResult, null, 2));
      // console.log(readable);

      const { createdSessionId, setActive, authSessionResult } = OAuthResult;
      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else if (!createdSessionId && authSessionResult?.type === "success") {
        Alert.alert(
          "Authentication error",
          "Only one account can be signed in on a device at a time."
        );
      }
    } catch (err) {
      const newError = JSON.parse(JSON.stringify(err, null, 2));
      Alert.alert(
        "Error",
        newError?.errors?.[0]?.message || "An error occurred"
      );
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoadingGoogle(false);
    }
  }, []);

  // Handle the submission of the sign-in form
  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return;
    setIsLoadingEmail(true);

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(tabs)/home");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      const newError = JSON.parse(JSON.stringify(err, null, 2));
      Alert.alert(
        "Error",
        newError?.errors?.[0]?.message || "An error occurred"
      );
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoadingEmail(false);
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <>
      <SafeAreaView
        className="flex-1 "
        style={{ backgroundColor: COLORS.black }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <Text
              style={{
                marginTop: MARGIN.large,
                fontSize: FONT_SIZE.heading * 1.5,
                padding: PADDING.large,
                fontWeight: "bold",
                color: COLORS.white,
              }}
            >
              <Text style={{ color: COLORS.primary }}>Umoja</Text>Tickets
            </Text>

            {/* Sign in form */}
            <View
              style={{
                marginTop: MARGIN.large,
                padding: PADDING.large,
                borderWidth: 1,
                backgroundColor: COLORS.lightBlue,
                borderTopEndRadius: BORDER_RADIUS.large * 2,
                borderTopStartRadius: BORDER_RADIUS.large * 2,
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontSize: FONT_SIZE.large * 1.5,
                  fontWeight: "bold",
                  color: COLORS.black,
                }}
              >
                Sign In
              </Text>
              <Text
                style={{
                  fontSize: FONT_SIZE.medium,
                  marginTop: MARGIN.small,
                  color: COLORS.black,
                }}
              >
                To keep connected with us please sign in with your personal info
              </Text>

              <View
                style={{
                  marginTop: MARGIN.large,
                  marginHorizontal: MARGIN.small,
                  display: "flex",
                  flexDirection: "column",
                  gap: SPACING.medium,
                  backgroundColor: "transparent",
                }}
              >
                <TextInput
                  autoCapitalize="none"
                  placeholder="Email Address"
                  value={emailAddress}
                  onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
                  style={{
                    marginTop: MARGIN.small,

                    paddingVertical: PADDING.medium,
                    fontSize: FONT_SIZE.large,
                    paddingHorizontal: PADDING.medium,
                    borderRadius: BORDER_RADIUS.small,
                  }}
                  className="bg-black/10"
                />
                <TextInput
                  placeholder="Password"
                  value={password}
                  onChangeText={(password) => setPassword(password)}
                  secureTextEntry
                  style={{
                    marginTop: MARGIN.small,
                    paddingVertical: PADDING.medium,
                    fontSize: FONT_SIZE.large,
                    paddingHorizontal: PADDING.medium,
                    borderRadius: BORDER_RADIUS.small,
                  }}
                  className="bg-black/10"
                />

                <View
                  style={{
                    marginTop: MARGIN.small,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    backgroundColor: "transparent",
                  }}
                >
                  <Text style={{ color: COLORS.primary }}>Forgot Password</Text>
                </View>

                <TouchableOpacity
                  style={{
                    marginTop: MARGIN.large,
                    backgroundColor: COLORS.black,
                    paddingVertical: PADDING.medium,
                    paddingHorizontal: PADDING.large,
                    borderRadius: BORDER_RADIUS.small,
                  }}
                  activeOpacity={0.6}
                  onPress={onSignInPress}
                >
                  {isLoadingEmail ? (
                    <ActivityIndicator size={25} color={COLORS.white} />
                  ) : (
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: FONT_SIZE.large,
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      Sign In
                    </Text>
                  )}
                </TouchableOpacity>
              </View>

              <View
                style={{
                  backgroundColor: "transparent",
                  display: "flex",
                  flex: 1,
                  justifyContent: "flex-end",
                  padding: PADDING.small,
                  marginTop: MARGIN.small,
                }}
              >
                <View
                  style={{
                    position: "relative",
                    marginBottom: MARGIN.large,
                  }}
                >
                  <View style={{ height: 1, backgroundColor: "#000" }} />
                  <Text
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2"
                    style={{
                      backgroundColor: COLORS.lightBlue,
                      color: COLORS.black,
                    }}
                  >
                    OR CONTINUE WITH
                  </Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: SPACING.medium,
                    backgroundColor: 'transparent",',
                    marginBottom: MARGIN.large,
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      paddingVertical: PADDING.medium,
                      paddingHorizontal: PADDING.large,
                      borderRadius: BORDER_RADIUS.small,
                      display: "flex",
                      flexDirection: "row",
                      gap: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 0.5,
                      borderColor: "#ccc",
                      flex: 1,
                    }}
                    activeOpacity={0.4}
                  >
                    <AntDesign
                      name="facebook-square"
                      size={24}
                      color={COLORS.black}
                    />
                    <Text
                      style={{
                        color: "#000",
                        fontSize: FONT_SIZE.large,
                        fontWeight: "bold",
                      }}
                    >
                      Facebook
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      paddingVertical: PADDING.medium,
                      paddingHorizontal: PADDING.large,
                      borderRadius: BORDER_RADIUS.small,
                      display: "flex",
                      flexDirection: "row",
                      gap: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 0.5,
                      borderColor: "#ccc",
                      flex: 1,
                    }}
                    activeOpacity={0.4}
                    onPress={onPressOAuth}
                  >
                    {isLoadingGoogle ? (
                      <ActivityIndicator size="small" color={COLORS.black} />
                    ) : (
                      <>
                        <AntDesign
                          name="google"
                          size={24}
                          color={COLORS.black}
                        />
                        <Text
                          style={{
                            color: "#000",
                            fontSize: FONT_SIZE.large,
                            fontWeight: "bold",
                          }}
                        >
                          Google
                        </Text>
                      </>
                    )}
                  </TouchableOpacity>
                </View>

                <View>
                  <Text style={{ textAlign: "center", fontSize: 16 }}>
                    Don't have an account?{" "}
                    <Text
                      onPress={() => router.push("/(auth)/sign-up")}
                      style={{ color: COLORS.primary, fontWeight: "bold" }}
                    >
                      Sign Up
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      <StatusBar style="light" backgroundColor={COLORS.black} />
    </>
  );
};
export default SignIn;
