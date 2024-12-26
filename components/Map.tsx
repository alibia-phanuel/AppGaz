import { Text } from "react-native";
import gasImage from "@/assets/images/gas-station.png";
import React, { useEffect, useState } from "react";
import GasStationMarker from "@/components/mapComponents/GasStationMarker";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
import * as Location from "expo-location";

const gasStations = [
  {
    name: "Station Ivoirelub",
    latitude: 5.45007,
    longitude: -4.01339,
    avatar: gasImage,
  },
  {
    name: "Petro Ivoire (Bingerville)",
    latitude: 5.39923,
    longitude: -3.96619,
    avatar: gasImage,
  },
  {
    name: "Total (Marcory)",
    latitude: 5.3159,
    longitude: -3.99325,
    avatar: gasImage,
  },
  {
    name: "Shell Koumassi",
    latitude: 5.3081,
    longitude: -4.0129,
    avatar: gasImage,
  },
  {
    name: "Oilibya (Riviera 2)",
    latitude: 5.37322,
    longitude: -3.98362,
    avatar: gasImage,
  },
  {
    name: "Total Yopougon",
    latitude: 5.35357,
    longitude: -4.06478,
    avatar: gasImage,
  },
  {
    name: "Pétroci (Cocody)",
    latitude: 5.348,
    longitude: -3.994,
    avatar: gasImage,
  },
  {
    name: "Shell (Treichville)",
    latitude: 5.3179,
    longitude: -4.0209,
    avatar: gasImage,
  },
  {
    name: "Total Abobo",
    latitude: 5.43365,
    longitude: -4.03489,
    avatar: gasImage,
  },
  {
    name: "Petroci Koumassi",
    latitude: 5.29657,
    longitude: -4.0175,
    avatar: gasImage,
  },
];

const Map = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
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
  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      className="w-full h-full rounded-2xl"
      showsPointsOfInterest={false}
      initialRegion={{
        latitude: 5.3364,
        longitude: -4.0268,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
      showsUserLocation={true}
      userInterfaceStyle="light"
    >
      {gasStations.map((station) => (
        <GasStationMarker key={station.name} station={station} />
      ))}
    </MapView>
  );
};

export default Map;

const Loading: React.FC = () => <Text>Chargement en cours...</Text>;

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <Text className="text-red-400">{message}</Text>
);
