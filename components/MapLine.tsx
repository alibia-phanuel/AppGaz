import {
  Text,
  View,
  Animated,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { router } from "expo-router";
import MapView, { PROVIDER_DEFAULT, Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import { getDistance } from "geolib";

const Map = () => {
  const [showMessage, setShowMessage] = useState(true); // État pour afficher/masquer le message
  const slideAnim = new Animated.Value(0); // Animation pour le déplacement vertical
  const [isModalVisible, setIsModalVisible] = useState(false);
  const translateY = useRef(new Animated.Value(500)).current; // Initialisation hors de l'écran
  // Fonction pour ouvrir la modale
  const openModal = () => {
    setIsModalVisible(true);
    // Réinitialise la position de l'animation
    translateY.setValue(0);
  };

  // Fonction pour fermer la modale avec animation
  const closeModal = () => {
    Animated.timing(translateY, {
      toValue: 500, // Descend la modale vers le bas
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsModalVisible(false); // Une fois l'animation terminée, cache la modale
    });
  };
  // Gestion du bouton "Oui"
  const handleYes = () => {
    setIsModalVisible(false); // Ferme la modale
    Alert.alert("Merci !", "Vos données ont été réinitialisées.");
    router.replace("/(root)/(tabs)/home"); // Redirection vers la page d'accueil
  };

  // Gestion du bouton "Non"
  const handleNo = () => {
    closeModal(); // Ferme la modale avec animation
  };

  // Fonction pour masquer le message avec animation
  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: -100, // Transition vers le haut
      duration: 300, // Durée de l'animation (ms)
      useNativeDriver: true,
    }).start(() => setShowMessage(false)); // Masquer après l'animation
  };
  // Fonction pour confirmer la commande
  const handleConfirmOrder = () => {
    setLocation(null); // Réinitialise les coordonnées de l'utilisateur
    Alert.alert(
      "Merci pour votre patience",
      "Votre commande a été confirmée.",
      [
        {
          text: "OK",
          onPress: () => router.replace("/(root)/(tabs)/home"), // Redirige vers la route confirm-ride
        },
      ]
    );
  };
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [stationLocation, setStationLocation] = useState({
    latitude: 5.3159, // Coordonnées fictives de la station
    longitude: -3.99325,
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("L'autorisation d'accéder à l'emplacement a été refusée");
          return;
        }
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
      } catch (error) {
        setErrorMsg(
          "Une erreur s'est produite lors de la récupération de l'emplacement"
        );
      }
    })();
  }, []);

  if (errorMsg) return <ErrorMessage message={errorMsg} />;
  if (!location) return <Loading />;
  const convertToLatLng = (location: LocationObject) => ({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  });
  const coordinates = convertToLatLng(location);

  // Calcul de la distance entre deux points géographiques (emplacement utilisateur et station)
  const distance = getDistance(
    {
      latitude: location.coords.latitude, // Latitude de l'utilisateur (point de départ)
      longitude: location.coords.longitude, // Longitude de l'utilisateur (point de départ)
    },
    {
      latitude: stationLocation.latitude, // Latitude de la station (point d'arrivée)
      longitude: stationLocation.longitude, // Longitude de la station (point d'arrivée)
    }
  );

  return (
    <View className="flex-1">
      {/* Message flottant pour afficher la distance */}
      {showMessage && (
        <Animated.View
          style={{
            transform: [{ translateY: slideAnim }],
          }}
          className="absolute top-20 left-4 right-4 bg-white rounded-lg shadow-lg p-3 flex justify-center items-center z-10"
        >
          <Text className="text-lg font-bold text-gray-700">
            La distance entre vous et la station est de{" "}
            {formatDistance(distance, true)} mètres. Le livreur va se mettre en
            route d'ici quelques minutes restez joignable s'il vous plaît
            sweet vous remercie.
          </Text>
          {/* Bouton de fermeture */}
          <TouchableOpacity
            onPress={handleClose}
            className="absolute top-1 right-1 bg-red-500 px-3 py-1 rounded-full"
          >
            <Text className="text-white font-bold">X</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      {/* Carte */}
      <MapView
        provider={PROVIDER_DEFAULT}
        className="w-full h-full rounded-2xl"
        showsPointsOfInterest={false}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
        userInterfaceStyle="light"
      >
        {/* Marqueur pour l'utilisateur */}
        <Marker
          coordinate={coordinates}
          title="Votre position"
          description="C'est ici que vous êtes actuellement"
        />

        {/* Marqueur pour la station */}
        <Marker
          coordinate={stationLocation}
          title="Station de gaz"
          description="Station où la commande a été passée"
        />

        {/* Ligne rouge entre l'utilisateur et la station */}
        <Polyline
          coordinates={[coordinates, stationLocation]}
          strokeColor="green" // Couleur de la ligne
          strokeWidth={3} // Épaisseur de la ligne
        />
      </MapView>
      {/* Boutons en bas */}
      <View className="flex-1">
        {/* Boutons en bas */}
        <View className="absolute bottom-5 left-4 right-4 flex flex-row justify-between space-x-4">
          <TouchableOpacity
            onPress={openModal}
            className="flex-1 bg-green-500 rounded-lg p-4 justify-center items-center"
          >
            <Text className="text-white font-bold text-lg">
              Confirmer la commande
            </Text>
          </TouchableOpacity>
        </View>

        {/* Modale */}
        {isModalVisible && (
          <Modal transparent visible={isModalVisible} animationType="none">
            <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
              <Animated.View
                style={{
                  transform: [{ translateY }],
                  backgroundColor: "white",
                  width: "90%",
                  borderRadius: 10,
                  padding: 20,
                  elevation: 5,
                }}
              >
                <Text className="text-center text-lg font-bold mb-4">
                  Vous avez reçu votre commande ?
                </Text>

                {/* Boutons Oui/Non */}
                <View className="flex-row justify-between space-x-4">
                  <TouchableOpacity
                    onPress={handleYes}
                    className="flex-1 bg-blue-500 rounded-lg p-3 justify-center items-center"
                  >
                    <Text className="text-white font-bold text-lg">Oui</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleNo}
                    className="flex-1 bg-red-500 rounded-lg p-3 justify-center items-center"
                  >
                    <Text className="text-white font-bold text-lg">Non</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </View>
          </Modal>
        )}
      </View>
    </View>
  );
};
const convertToLatLng = (location: LocationObject) => ({
  latitude: location.coords.latitude,
  longitude: location.coords.longitude,
});
function formatDistance(distance: number, useComma: boolean = false): string {
  const separator = useComma ? "," : ".";

  return distance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}
export default Map;

const Loading: React.FC = () => <Text>Chargement en cours...</Text>;

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <Text className="text-red-400">{message}</Text>
);
