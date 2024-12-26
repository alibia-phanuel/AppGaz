import { router, useLocalSearchParams } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import RideLayout from "@/components/RideLayout";
import FormField from "@/components/FormField";
import location from "@/assets/images/station.png";
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const [isSubmitting, setSubmitting] = useState(false);
  const [selectedStation, setSelectedStation] = useState("");
  const [form, setForm] = useState({
    name: "",
    litre: "",
    phoneNumber: "",
  });
  const submit = async () => {
    // Validation des champs
    if (!form.name.trim()) {
      return Alert.alert("Erreur", "Veuillez entrer votre nom.");
    }
    if (
      !form.phoneNumber.trim() ||
      Number(form.phoneNumber) <= 0 ||
      isNaN(Number(form.phoneNumber))
    ) {
      return Alert.alert(
        "Erreur",
        "Veuillez entrer votre numéro de téléphone valide."
      );
    }
    if (
      !form.litre.trim() ||
      isNaN(Number(form.litre)) ||
      Number(form.litre) <= 0
    ) {
      return Alert.alert(
        "Erreur",
        "Veuillez entrer un numéro de téléphone valide."
      );
    }
    if (!selectedStation) {
      return Alert.alert("Erreur", "Veuillez choisir une station.");
    }

    // Si toutes les vérifications passent
    setSubmitting(true); // Début du processus d'envoi
    try {
      // Simulation de l'envoi des données
      const dataToSend = {
        name: form.name,
        litre: form.litre,
        station: selectedStation,
        phoneNumber: form.phoneNumber,
        fuelType: id,
      };

      console.log("Données envoyées :", dataToSend);

      // TODO: Remplacez par votre appel API ou méthode d'envoi vers la base de données
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simule un délai

      Alert.alert("Succès", "Votre commande a été envoyée avec succès.");
      setForm({ name: "", litre: "", phoneNumber: "" }); // Réinitialisation du formulaire
      setSelectedStation("");
    } catch (error) {
      Alert.alert("Erreur", "Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setSubmitting(false); // Fin du processus d'envoi
      router.replace("/(root)/confirm-ride");
    }
  };

  return (
    <RideLayout
      title={"Dans quelle station voulez-vous commander du carburant ?"}
      snapPoints={["65%", "85%"]}
    >
      <View className="gap-4 flex-col">
        <View className="flex-row  items-center gap-2">
          <Image source={location} className="h-[45px] w-[45px]" />
          <Text className="font-semibold capitalize text-lg">
            carburant {id}
          </Text>
        </View>
        <View className="flex gap-2 flex-col">
          <View>
            <View className=" bg-[#cfcfcf46] rounded-lg  flex justify-center items-center  p-8">
              <Image
                className="h-[150px] w-[150px]"
                source={require("@/assets/images/stationCommand.png")}
              ></Image>
            </View>
            <View>
              <View className="flex flex-row">
                <FormField
                  value={form.name}
                  placeholder="Entrée votre nom"
                  otherStyles="w-[48%] mx-1"
                  handleChangeText={(e) => setForm({ ...form, name: e })}
                />
                <FormField
                  value={form.litre}
                  placeholder="Nombre de litres"
                  enableKeyboardType={true}
                  keyboardType="numeric"
                  otherStyles="w-[48%] mx-1"
                  handleChangeText={(e) => setForm({ ...form, litre: e })}
                />
              </View>
              <View>
                <FormField
                  value={form.phoneNumber}
                  placeholder="Numéro de téléphone"
                  enableKeyboardType={true}
                  keyboardType="numeric"
                  otherStyles="mx-1"
                  handleChangeText={(e) => setForm({ ...form, phoneNumber: e })}
                />
              </View>
              <View className="mx-1 my-4">
                <Text className="mb-2">Choisi la station</Text>
                <View className="border   rounded-lg">
                  <Picker
                    selectedValue={selectedStation}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedStation(itemValue)
                    }
                  >
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="php" value="php" />
                    <Picker.Item label="css" value="css" />
                  </Picker>
                </View>
              </View>
              <TouchableOpacity
                onPress={submit}
                className="bg-green-400 p-4 flex justify-center items-center rounded-lg"
              >
                <Text className="text-white font-bold text-center">
                  Commander
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </RideLayout>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});
