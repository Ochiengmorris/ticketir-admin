import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
const IndexPage = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/(tabs)/home"} />;
  } else {
    return <Redirect href={"/(auth)/sign-in"} />;
  }
};
export default IndexPage;
