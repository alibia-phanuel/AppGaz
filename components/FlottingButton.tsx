import { router } from "expo-router";
import station from "@/assets/images/station.png";
import { AntDesign } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { Image, Animated, Text, View, TouchableOpacity } from "react-native";
const FlottingButton = () => {
  //    ainitialize animated value using useRef
  const animated = useRef(new Animated.Value(0)).current;
  const [open, setOpen] = useState(false);
  //   Rotation animated fir the main button
  const rotation = {
    transform: [
      {
        rotate: animated.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"],
        }),
      },
    ],
  };
  const toggleMenu = () => {
    const toValue = open ? 0 : 1;
    Animated.spring(animated, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();
    setOpen(!open);
  };
  //   Get abimated styles for the seconda button based on Tr
  const getAnimatedStyle = (translateY) => ({
    transform: [
      {
        scale: animated,
      },
      {
        translateY: animated.interpolate({
          inputRange: [0, 1],
          outputRange: [0, translateY],
        }),
      },
    ],
  });
  return (
    <View className="absolute  bottom-[5%]  w-full flex  justify-center items-center right-[5%]">
      <TouchableOpacity
        style={[getAnimatedStyle(0)]}
        onPress={() => {
          router.push(`/(root)/station`);
        }}
      >
        <Animated.View className=" bg-white flex-row items-center h-[50px] w-[60%] rounded-lg gap-x-2  justify-center  shadow-lg pr-4 ">
          <Image source={station} className="h-[34px] w-[34px]"></Image>
          <Text className=" capitalize font-semibold text-gray-600">
            carburant
          </Text>
        </Animated.View>
      </TouchableOpacity>
      <TouchableOpacity className="rounded-full" onPress={toggleMenu}>
        <Animated.View
          style={[rotation]}
          className="w-[50px] h-[50px] bg-green-400 mt-4 flex justify-center items-center rounded-full  "
        >
          <AntDesign name="plus" size={24} color="#fff" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default FlottingButton;
