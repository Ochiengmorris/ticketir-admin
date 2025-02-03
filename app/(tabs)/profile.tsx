import { COLORS, MARGIN, SPACING } from "@/constants/sizes";
import { useClerk, useUser } from "@clerk/clerk-expo";
import {
  AntDesign,
  FontAwesome,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import * as Linking from "expo-linking";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const profileLinks = [
  {
    name: "Edit Profile",
    icon: <AntDesign name="edit" size={24} color="black" />,
    onPress: () => console.log("Edit Profile"),
  },
  {
    name: "Change Password",
    icon: <AntDesign name="key" size={24} color="black" />,
    onPress: () => console.log("Change Password"),
  },
  {
    name: "Logout",
    icon: <AntDesign name="logout" size={24} color="black" />,
    onPress: () => console.log("Logout"),
  },
];

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [isNotificationOn, setIsNotificationOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
      // Redirect to your desired page
      Linking.openURL(Linking.createURL("/"));
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: SPACING.small,
            marginTop: MARGIN.large,
          }}
        >
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1595152452543-e5fc28ebc2b8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
            }}
            style={{ width: 80, height: 80, borderRadius: 75 }}
          />

          <View
            style={{
              gap: SPACING.small - 12,
              flexDirection: "column",
            }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 20, textAlign: "center" }}
              className="uppercase"
            >
              {user?.username ?? user?.firstName ?? ""}
            </Text>
            <Text style={{ fontSize: 14, textAlign: "center" }}>
              {user?.emailAddresses[0].emailAddress}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => console.log("Edit Profile")}
            activeOpacity={0.5}
            style={{
              backgroundColor: COLORS.black,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 50,
            }}
          >
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: COLORS.grey }}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: MARGIN.xlarge }}>
          <Text
            style={{
              marginLeft: MARGIN.medium,
              color: COLORS.black + "90",
              fontSize: 12.5,
            }}
          >
            Organizer
          </Text>
          <View
            style={{
              marginTop: MARGIN.small * 2,
              borderWidth: 1,
              borderColor: COLORS.grey + "80",
              backgroundColor: COLORS.grey + "40",
              padding: 18,
              borderRadius: 30,
            }}
          >
            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: SPACING.large,
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: COLORS.white,
                    padding: 8,
                    borderRadius: 10,
                  }}
                >
                  <AntDesign name="calendar" size={20} color="black" />
                </View>
                <Text style={{ fontSize: 15, fontWeight: "500" }}>
                  My Events
                </Text>
              </View>
              <AntDesign
                name="arrowright"
                size={20}
                color={COLORS.black + "90"}
              />
            </TouchableOpacity>

            <View
              style={{
                marginVertical: 9,
                height: 1,
                width: "100%",
                backgroundColor: COLORS.grey,
              }}
            />

            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: SPACING.large,
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: COLORS.white,
                    padding: 8,
                    borderRadius: 10,
                  }}
                >
                  <SimpleLineIcons name="support" size={20} color="black" />
                </View>
                <Text style={{ fontSize: 15, fontWeight: "500" }}>Support</Text>
              </View>
              <AntDesign
                name="arrowright"
                size={22}
                color={COLORS.black + "90"}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginTop: MARGIN.small * 2 }}>
          <Text
            style={{
              marginLeft: MARGIN.medium,
              color: COLORS.black + "90",
              fontSize: 12.5,
            }}
          >
            Preferences
          </Text>
          <View
            style={{
              marginTop: MARGIN.small * 2,
              borderWidth: 1,
              borderColor: COLORS.grey + "80",
              backgroundColor: COLORS.grey + "40",
              padding: 18,
              borderRadius: 30,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: SPACING.large,
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: COLORS.white,
                    padding: 8,
                    borderRadius: 10,
                  }}
                >
                  <FontAwesome name="bell-o" size={20} color="black" />
                </View>
                <Text style={{ fontSize: 15, fontWeight: "500" }}>
                  Push Notifications
                </Text>
              </View>
              <Switch
                trackColor={{ false: COLORS.grey, true: COLORS.black }}
                thumbColor={COLORS.white}
                value={isNotificationOn}
                onValueChange={setIsNotificationOn}
              />
            </View>

            <View
              style={{
                marginVertical: 9,
                height: 1,
                width: "100%",
                backgroundColor: COLORS.grey,
              }}
            />

            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              onPress={handleSignOut}
              activeOpacity={0.5}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: SPACING.large,
                  justifyContent: "center",
                }}
              >
                {isLoading ? (
                  <View style={{ width: "100%", alignItems: "center" }}>
                    <ActivityIndicator
                      color={COLORS.black}
                      size={24}
                      style={{ marginHorizontal: "auto" }}
                      className="text-center"
                    />
                  </View>
                ) : (
                  <>
                    <View
                      style={{
                        backgroundColor: "#ff0059" + "20",
                        padding: 8,
                        borderRadius: 10,
                      }}
                    >
                      <MaterialIcons name="logout" size={20} color="#ff0059" />
                    </View>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "500",
                        color: "#ff0059",
                      }}
                    >
                      Support
                    </Text>
                  </>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: MARGIN.medium,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: MARGIN.medium,
  },
  separator: {
    marginVertical: 5,
    height: 1,
    width: "80%",
  },
});
