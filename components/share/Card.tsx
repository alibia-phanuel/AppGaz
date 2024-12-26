import { Text, View, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Link } from "expo-router";
//Ajoue de id
const Card = () => {
  const router = useRouter();
  return (
    <TouchableOpacity className="bg-white w-[45%] p-4 rounded-lg shadow-lg m-2 relative">
      <View className=" w-full ">
        <View>
          <View className=" flex justify-center items-center">
            <Image
              source={{
                uri: "https://reactnative.dev/img/tiny_logo.png",
              }}
              width={50}
              height={50}
            />
          </View>
          <View className="boxCARDw-full my-5 ">
            <Text className="text-lg font-bold capitalize">tiltle yolo</Text>
            <Text className="text-sm text-gray-500">
              Petit descriptions Lorem ipsum dolor sit amet consectetur
              adipisicing elit.
            </Text>
          </View>
          <Link
            href={{
              pathname: "/(root)/details/[id]",
              params: { id: 1 },
            }}
          >
            <View className="flex flex-row   items-center justify-center">
              <Text className="text-lg font-bold capitalize mr-2">
                100.000 FCFA
              </Text>
              <Image
                source={{
                  uri: "https://img.icons8.com/external-smashingstocks-hand-drawn-black-smashing-stocks/99/external-eye-password-security-cyber-attack-hacking-smashingstocks-hand-drawn-black-smashing-stocks.png",
                }}
                width={30}
                height={30}
              />
            </View>
          </Link>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default Card;
