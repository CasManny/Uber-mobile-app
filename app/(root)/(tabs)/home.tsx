import RideCard from "@/components/RideCard";
import { recentRides } from "@/constants/mockData";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const Home = () => {
  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        data={recentRides?.slice(0, 5)}
        renderItem={({ item }) => <RideCard ride={item} />}
      />
    </SafeAreaView>
  );
};

export default Home;
