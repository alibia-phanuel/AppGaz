import { StyleSheet, View, Text, StatusBar } from "react-native";
import * as Location from "expo-location";
import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
const Home = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  if (!location) {
    return (
      <View className="flex-1 justify-center  items-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View className="flex ">
        <MapView
          className="w-full h-full"
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="My Location"
          />
        </MapView>
      </View>
    </SafeAreaView>
  );
};

export default Home;
