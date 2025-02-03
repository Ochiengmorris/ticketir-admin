import {
  BORDER_RADIUS,
  COLORS,
  FONT_SIZE,
  MARGIN,
  PADDING,
  SPACING,
} from "@/constants/sizes";
import { useOAuth, useSignUp } from "@clerk/clerk-expo";
import { AntDesign } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
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
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const SignUpScreen = () => {
  useWarmUpBrowser();
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoadingGoogle, setIsLoadingGoogle] = React.useState(false);
  const [isLoadingFacebook, setIsLoadingFacebook] = React.useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = React.useState(false);

  const onPressOAuth = React.useCallback(async () => {
    if (!isLoaded) return;
    setIsLoadingGoogle(true);
    try {
      const { createdSessionId, signUp, signIn, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/(tabs)/home", {
            scheme: "com.johnte.ticketradmin",
          }),
        });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // Use signIn or signUp returned from startOAuthFlow
        // for next steps, such as MFA
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoadingGoogle(false);
    }
  }, []);

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    setIsLoadingEmail(true);

    try {
      // Create user account without requiring email verification
      const signUpAttempt = await signUp.create({
        emailAddress,
        password,
        username,
      });
      // console.log("signUp attempt", signUpAttempt);

      // Set the session as active and redirect user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/(tabs)/home");
      } else {
        const newError = JSON.parse(JSON.stringify(signUpAttempt, null, 2));
        Alert.alert("Error", newError.errors[0].message || "An error occurred");
      }
    } catch (err) {
      const newError = JSON.parse(JSON.stringify(err, null, 2));
      Alert.alert(
        "Error",
        newError?.errors?.[0]?.message || "An error occurred"
      );
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoadingEmail(false);
    }
  };

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
                Sign Up
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
                  placeholder="Username"
                  value={username}
                  onChangeText={(username) => setUsername(username)}
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
                  onPress={onSignUpPress}
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
                      Sign Up
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
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      <StatusBar style="light" backgroundColor={COLORS.black} />
    </>
  );
};
export default SignUpScreen;
