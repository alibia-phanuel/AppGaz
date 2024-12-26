import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StatusBar } from "react-native";
import ElevatedCards from "@/components/ElevatedCards";
import RideProductList from "@/components/RideProductList";
import Slider from "@/components/Slider";
const Ride = () => {
  const data = [
    {
      image: require("@/assets/images/a.png"),
      text: "value one",
    },
    {
      image: require("@/assets/images/b.png"),
      text: "value Two",
    },
    {
      image: require("@/assets/images/c.png"),
      text: "value Three",
    },
    {
      image: require("@/assets/images/d.png"),
      text: "value Foors",
    },
    {
      image: require("@/assets/images/e.png"),
      text: "value Five",
    },
    {
      image: require("@/assets/images/f.png"),
      text: "value SIX",
    },
    {
      image: require("@/assets/images/g.png"),
      text: "value 7",
    },
    {
      image: require("@/assets/images/h.png"),
      text: "value 8",
    },
    {
      image: require("@/assets/images/i.png"),
      text: "value 9",
    },
    {
      image: require("@/assets/images/j.png"),
      text: "value 10",
    },
  ];
  return (
    <SafeAreaView>
      <ElevatedCards />
      <ScrollView>
        <Slider itemList={data} />
        <RideProductList />
      </ScrollView>
      <StatusBar animated></StatusBar>
    </SafeAreaView>
  );
};

export default Ride;
