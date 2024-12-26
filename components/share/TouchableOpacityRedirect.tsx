import { router } from "expo-router";
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
interface TouchableOpacityRedirectProps {
  title: string;
  desc: string;
}
const TouchableOpacityRedirect = ({
  title,
  desc,
}: TouchableOpacityRedirectProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/(root)/category/${title}`);
      }}
      className="rounded-lg my-3 p-4 flex flex-row bg-gray-200 items-center"
    >
      <View className="">
        <View>
          <Text className="text-[30px] font-bold">{title}</Text>
        </View>
        <View>
          <Text>{desc}</Text>
        </View>
      </View>
      <View>
        <Text className="text-[25px]">{">"}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TouchableOpacityRedirect;
