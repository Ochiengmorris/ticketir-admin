import { useUser } from "@clerk/clerk-expo";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const { user } = useUser();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      {user && <Text>Welcome, {user.emailAddresses[0].emailAddress}</Text>}
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
