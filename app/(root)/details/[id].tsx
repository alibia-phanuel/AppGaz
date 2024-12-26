import { useLocalSearchParams } from "expo-router";
import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";

import {
  Linking,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Stack = createStackNavigator();
//https://www.youtube.com/watch?v=B5WU6qSGw9o
export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  // Initialisation de l'état avec la valeur 'true'
  const [add, setAdd] = useState(true);
  // Fonction qui change l'état à chaque clic
  const handlePress = () => {
    setAdd((prevToggle) => !prevToggle);
  };
  const sendWhatsAppMessage = () => {
    const productName = "volant de camion";
    const message = `Bonjour, je souhaite commander l'article suivant : ${productName}`;
    const phoneNumber = "+237696603305"; // Remplace par ton numéro WhatsApp avec l'indicatif

    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    Linking.openURL(url).catch(() => {
      alert("Assurez-vous que WhatsApp est installé sur votre appareil.");
    });
  };
  return (
    <ScrollView className="pb-[100px]">
      <SafeAreaView className=" flex-1 pb-[50px]">
        <View>
          <View className="flex flex-row justify-center px-4 py-4 bg-green-100  items-center">
            <TouchableOpacity
              onPress={handlePress}
              className="flex justify-center items-center"
            >
              <View className="relative w-[30px]">
                <Image source={require("@/assets/icons/pannier.png")} />
                <View
                  className={`bg-red-600 h-2 w-2 rounded-full bottom-0 right-0  top-0 absolute ${
                    add ? "hidden" : "flex"
                  }`}
                ></View>
              </View>
              <Text className=" capitalize text-gray-800  font-bold">
                ajouter au panier
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.container}
          >
            <View
              style={[styles.card, styles.cardElevated]}
              className="flex justify-center items-center mx-4 bg-red-400 "
            >
              <Image
                className="rounded-lg shadow-lg "
                style={styles.img}
                source={require("@/assets/images/product/one.jpg")}
              />
            </View>

            <View
              style={[styles.card, styles.cardElevated]}
              className="flex justify-center items-center mx-4 "
            >
              <Image
                style={styles.img}
                source={require("@/assets/images/product/two.jpg")}
              />
            </View>

            <View
              style={[styles.card, styles.cardElevated]}
              className="flex justify-center items-center mx-4 "
            >
              <Image
                style={styles.img}
                source={require("@/assets/images/product/three.jpg")}
              />
            </View>

            <View
              style={[styles.card, styles.cardElevated]}
              className="flex justify-center items-center mx-4 "
            >
              <Image
                style={styles.img}
                source={require("@/assets/images/product/foor.jpg")}
              />
            </View>
          </ScrollView>
          <View className="px-4 ">
            <View className="py-2 pt-8">
              <Text className=" font-semibold text-[17px]">Nom du produit</Text>
            </View>

            <View>
              <Text className="py-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim
                corporis dolore facilis vero numquam dignissimos iste nostrum
                doloribus distinctio natus, aut quibusdam minus sint possimus
                non labore exercitationem. Necessitatibus, asperiores! Lorem
                ipsum dolor sit amet, consectetur adipisicing elit. Enim
                corporis dolore facilis vero numquam dignissimos iste nostrum
                doloribus distinctio natus, aut quibusdam minus sint possimus
                non labore exercitationem. Necessitatibus, asperiores! labore
                exercitationem. Necessitatibus, asperiores! Lorem ipsum dolor
                sit amet, consectetur adipisicing elit. Enim corporis dolore
                facilis vero numquam dignissimos iste nostrum doloribus
                distinctio natus, aut quibusdam minus sint possimus non labore
                exercitationem. Necessitatibus, asperiores! Lorem ipsum dolor
                sit amet, consectetur adipisicing elit. Enim corporis dolore
                facilis vero numquam dignissimos iste nostrum doloribus
                distinctio natus, aut quibusdam minus sint possimus non labore
                exercitationem. Necessitatibus, asperiores! Lorem ipsum dolor
                sit amet, consectetur adipisicing elit. Enim corporis dolore
                facilis vero numquam dignissimos iste nostrum doloribus
                distinctio natus, aut quibusdam minus sint possimus non labore
                exercitationem. Necessitatibus, asperiores! labore
                exercitationem. Necessitatibus, asperiores! Lorem ipsum dolor
                sit amet, consectetur adipisicing elit. Enim corporis dolore
                facilis vero numquam dignissimos iste nostrum doloribus
                distinctio natus, aut quibusdam minus sint possimus non labore
                exercitationem. Necessitatibus, asperiores!
              </Text>
            </View>
            <View className="flex flex-row  gap-4 py-4  items-center">
              <Text className="text-fond text-[20px] font-bold">
                100.000 FCFA
              </Text>
              <Text className="font-semibold text-[#5e5e5e] line-through">
                120.000 FCFA
              </Text>
            </View>
            <TouchableOpacity
              onPress={sendWhatsAppMessage}
              className="relative"
            >
              <View className="flex justify-center items-center py-3 bg-[#00A884] rounded-lg">
                <Text className="capitalize text-[17px] font-bold text-white">
                  commander
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 400,
    height: 400,
    borderRadius: 4,
    margin: 8,
  },
  cardElevated: {
    shadowColor: "#333",
  },
  container: {
    padding: 8,
    height: 400,
  },
  img: {
    width: 400,
    height: 400,
  },
});
