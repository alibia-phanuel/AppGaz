import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
export default function ElevatedCards() {
  return (
    <View>
      <Text className="text-xl text-[#1f2937] my-4 font-semibold ml-8">
        Boutique
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    borderRadius: 4,
    margin: 8,
  },
  cardElevated: {
    shadowColor: "#333",
  },
  container: {
    padding: 8,
    height: 130,
  },
});
