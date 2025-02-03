import { COLORS, MARGIN } from "@/constants/sizes";
import { useUser } from "@clerk/clerk-expo";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { user } = useUser();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Home</Text>
      {user && <Text>Welcome, {user.emailAddresses[0].emailAddress}</Text>}
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
