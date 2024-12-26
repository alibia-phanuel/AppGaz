import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView } from "react-native";
import Map from "@/components/Map";
import FlottingButton from "@/components/FlottingButton";
//import gasImage from "@/assets/images/gas-station.png";

const Home = () => {
  return (
    <SafeAreaView className="flex-1 px-5 relative">
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View>
          <Text className="text-xl font-JakartaBold my-5 ">
            Trouvé du carburant a Abidjan🚩
          </Text>
        </View>
        <View className="bg-transparent h-[85vh]">
          <Map></Map>
        </View>
      </ScrollView>
      <FlottingButton />
    </SafeAreaView>
  );
};

export default Home;
