import RideLayout from "@/components/RideLayout";
import location from "@/assets/images/station.png";
import { StyleSheet, Text, StatusBar, View, Image } from "react-native";
import TouchableOpacityRedirect from "@/components/share/TouchableOpacityRedirect";
import React from "react";

const Station = () => {
  return (
    <RideLayout
      title={"Dans quelle station voulez-vous commander du carburant ?"}
      snapPoints={["65%", "85%"]}
    >
      <View className="gap-4 flex-col">
        <View className="flex-row  items-center gap-2">
          <Image source={location} className="h-[45px] w-[45px]" />
          <Text className="font-semibold capitalize text-lg">carburant</Text>
        </View>
        <View className="flex gap-2 flex-col">
          <TouchableOpacityRedirect
            title="super"
            desc="Le carburant Super est conçu pour offrir des performances optimales pour vos moteurs essence. Idéal pour les véhicules légers et utilitaires, il garantit une combustion propre et efficace tout en réduisant les émissions polluantes."
          />

          <TouchableOpacityRedirect
            title="Gazoil"
            desc="Le Gazoil est un carburant spécialement conçu pour les moteurs diesel, offrant une performance maximale et une durabilité accrue. Parfait pour les véhicules lourds et légers, il assure une combustion efficace et une meilleure économie de carburant."
          />
          <TouchableOpacityRedirect
            title="Essence"
            desc="L'Essence est un carburant de haute qualité conçu pour les moteurs à combustion interne. Idéal pour les véhicules légers et les motos, il garantit une performance fluide et une expérience de conduite agréable."
          />

          <TouchableOpacityRedirect
            title="Petrole"
            desc="Le Pétrole est un carburant polyvalent utilisé principalement pour le chauffage et certains moteurs spécifiques. Il offre une énergie fiable et une combustion stable pour divers besoins domestiques et industriels."
          />
        </View>
      </View>
    </RideLayout>
  );
};

export default Station;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});
