import EditEventComp from "@/components/EditEventComp";
import { COLORS, MARGIN, PADDING } from "@/constants/sizes";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const EditEvent = () => {
  // if (!event) return null;
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: COLORS.black,
          height: 400,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: -1,
        }}
      />

      <View
        style={{
          paddingHorizontal: PADDING.medium,
          paddingVertical: PADDING.large,
          gap: 15,
          flexDirection: "row",
          alignItems: "center",
          marginTop: MARGIN.small,
        }}
      >
        <Pressable
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.lightBlue,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 50,
          }}
          onPress={() => {
            router.back();
          }}
        >
          <FontAwesome6 name="chevron-left" size={20} color={COLORS.black} />
        </Pressable>
        <Text
          style={{
            color: COLORS.lightBlue,
            fontSize: 22,
            fontWeight: "bold",
          }}
        >
          <Text style={{ color: COLORS.primary }}>Edit</Text> Event
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: COLORS.lightBlue,
          marginHorizontal: MARGIN.small - 4,
          marginTop: MARGIN.large,
          paddingHorizontal: PADDING.medium - (MARGIN.small - 4),
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          paddingVertical: PADDING.medium,
          paddingBottom: PADDING.large * 2,
        }}
      >
        <EditEventComp />
      </ScrollView>
    </SafeAreaView>
  );
};
export default EditEvent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBlue,
    position: "relative",
  },
  header: {},
});
