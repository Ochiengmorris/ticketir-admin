import { Text, View } from "@/components/Themed";
import {
  BORDER_RADIUS,
  COLORS,
  FONT_SIZE,
  MARGIN,
  PADDING,
  SPACING,
} from "@/constants/sizes";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <SafeAreaView className="flex-1">
      <View>
        <Text
          style={{
            marginTop: MARGIN.large,
            fontSize: FONT_SIZE.heading * 1.5,
            padding: PADDING.large,
            fontWeight: "bold",
          }}
        >
          Sign In
        </Text>
      </View>

      {/* Sign in form */}
      <View
        style={{
          marginTop: MARGIN.large,
          padding: PADDING.large,
          borderWidth: 1,
          borderColor: "#ccc",
          backgroundColor: COLORS.grey,
          borderTopEndRadius: BORDER_RADIUS.large,
          borderTopStartRadius: BORDER_RADIUS.large,
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
          Welcome Back
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
            backgroundColor: COLORS.grey,
          }}
        >
          <TextInput
            placeholder="Email Address"
            value={emailAddress}
            onChangeText={setEmailAddress}
            style={{
              marginTop: MARGIN.small,

              paddingVertical: PADDING.medium,
              fontSize: FONT_SIZE.large,
              paddingHorizontal: PADDING.medium,
              borderRadius: BORDER_RADIUS.small,
            }}
            className="bg-white/30"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{
              marginTop: MARGIN.small,
              paddingVertical: PADDING.medium,
              fontSize: FONT_SIZE.large,
              paddingHorizontal: PADDING.medium,
              borderRadius: BORDER_RADIUS.small,
            }}
            className="bg-white/30"
          />

          <View
            style={{
              marginTop: MARGIN.large,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "transparent",
            }}
          >
            <View style={{ backgroundColor: "transparent" }}>
              <Text style={{ color: COLORS.black }}>Remember Me</Text>
            </View>
            <Text style={{ color: COLORS.primary }}>Forgot Password</Text>
          </View>

          <TouchableOpacity
            style={{
              marginTop: MARGIN.large,
              backgroundColor: COLORS.primary,
              paddingVertical: PADDING.medium,
              paddingHorizontal: PADDING.large,
              borderRadius: BORDER_RADIUS.small,
            }}
          >
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
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: COLORS.grey,
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
              style={{ backgroundColor: COLORS.grey, color: COLORS.black }}
            >
              OR CONTINUE WITH
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: SPACING.medium,
              backgroundColor: 'transparent",',
            }}
          >
            <TouchableOpacity
              style={{
                paddingVertical: PADDING.medium,
                paddingHorizontal: PADDING.large,
                borderRadius: BORDER_RADIUS.small,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#000",
              }}
            >
              <Text
                style={{
                  color: "#000",
                  fontSize: FONT_SIZE.large,
                  fontWeight: "bold",
                }}
              >
                Sign in with Facebook
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: PADDING.medium,
                paddingHorizontal: PADDING.large,
                borderRadius: BORDER_RADIUS.small,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#000",
              }}
            >
              <Text
                style={{
                  color: "#000",
                  fontSize: FONT_SIZE.large,
                  fontWeight: "bold",
                }}
              >
                Sign in with Google
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default SignIn;
