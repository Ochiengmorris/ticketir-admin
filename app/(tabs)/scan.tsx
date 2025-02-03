import { COLORS, MARGIN } from "@/constants/sizes";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tab Scan</Text>
      <View style={styles.separator} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: MARGIN.medium,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
