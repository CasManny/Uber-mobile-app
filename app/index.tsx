import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

const Home = () => {
  const { isSignedIn } = useAuth();
  console.log(isSignedIn);
  if (isSignedIn) {
    return <Redirect href={"/(root)/(tabs)/home"} />;
  }
  return (
    // <Redirect href={"/(auth)/welcome"} />
    <Redirect href={"/(root)/(tabs)/home"} />
  )
};

export default Home;
