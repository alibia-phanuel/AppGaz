import React, { useState } from "react";
import Card from "@/components/share/Card";
import { useLocalSearchParams } from "expo-router";
import filter from "@/assets/images/setting.png";
import Checkbox from "expo-checkbox";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import gasImage from "@/assets/images/gas-station.png";

export default function ShowProductStation() {
  const { id } = useLocalSearchParams();
  const [isChecked, setChecked] = useState(false);
  const [isCheckedOne, setCheckedOne] = useState(false);
  const [isCheckedTwo, setCheckedTwo] = useState(false);
  const [isCheckedThree, setCheckedThree] = useState(false);
  const [showModal, setShowModal] = useState("hidden");
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };
  return (
    <SafeAreaView className="pb-[100px]">
      <StatusBar hidden />
      <View className="bg-white px-4 py-6 flex-row justify-between  items-center relative">
        <View className="flex-row justify-center items-center gap-2">
          <Image source={gasImage} className="h-[50px] w-[50px]" />
          <Text className="font-bold  text-gray-700">
            Carburant de la station {"\n"}
            {id}
          </Text>
        </View>
        <TouchableOpacity onPress={handleToggle}>
          <Image source={filter} className="h-[30px] w-[30px] "></Image>
        </TouchableOpacity>
        <View
          className={`${
            isVisible ? "" : "hidden"
          } bg-white border border-gray-400 z-50 absolute w-1/3 p-2 gap-1 rounded-lg shadow-lg top-3 left-[63%] `}
        >
          <View className="flex-row items-center">
            <Checkbox value={isChecked} onValueChange={setChecked} />
            <Text className="font-semibold ml-1">Super</Text>
          </View>

          <View className="flex-row items-center ">
            <Checkbox value={isCheckedOne} onValueChange={setCheckedOne} />
            <Text className="font-semibold ml-1">Gazoil</Text>
          </View>

          <View className="flex-row items-center ">
            <Checkbox value={isCheckedTwo} onValueChange={setCheckedTwo} />
            <Text className="font-semibold ml-1">Essence</Text>
          </View>

          <View className="flex-row items-center ">
            <Checkbox value={isCheckedThree} onValueChange={setCheckedThree} />
            <Text className="font-semibold ml-1">Pétrole</Text>
          </View>
        </View>
      </View>
      <ScrollView>
        <View className="boxCARD  mt-5 flex flex-row flex-wrap  mb-[230px]">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
