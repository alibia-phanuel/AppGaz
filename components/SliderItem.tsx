import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { ImageSliderType } from "@/data/SliderData";
import { LinearGradient } from "expo-linear-gradient";

import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
type Props = {
  item: ImageSliderType;
  index: number;
  scrollX: SharedValue<number>;
};
const { width } = Dimensions.get("screen");
const SliderItem = ({ item, index, scrollX }: Props) => {
  const rnAnimatedSyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            //plage d'entre
            [(index - 1) * width, index * width, (index + 1) * width],
            //plage de sortie
            [-width * 0.25, 0, width * 0.25],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            //plage d'entre
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[styles.itemContainer, rnAnimatedSyle]}
      className="overflow-hidden rounded-lg"
    >
      <Image source={item.image} className="w-[360px] h-[154px] rounded-lg" />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.1)"]}
        style={styles.bg}
      >
        <View className="w-1/2 h-full rounded-l-lg  flex justify-center bg-[#000000d8]">
          <Text className="text-white relative bottom-6 font-bold text-[30px] text-center">
            Sweet{" "}
          </Text>
          <Text className="text-white  text-center px-4">
            Trouver du gaz dans {"\n"} toute la Côte d'Ivoire.
          </Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    width: width,
  },
  bg: {
    position: "absolute",
    height: 154,
    width: 360,
  },
});
