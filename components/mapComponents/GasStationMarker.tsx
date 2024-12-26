import { Marker } from "react-native-maps";
import { View, Text, Image } from "react-native";
import { GasStation } from "@/app/types/type";

const GasStationMarker: React.FC<{
  station: GasStation;
}> = ({ station }) => (
  <Marker
    key={station.name}
    coordinate={{
      latitude: station.latitude,
      longitude: station.longitude,
    }}
    title={station.name}
  >
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        height: 70,
        width: 70,
      }}
    >
      <Image
        style={{
          backgroundColor: "white",
          borderRadius: 25,
          justifyContent: "center",
          alignItems: "center",
        }}
        source={station.avatar}
      />
      <Text
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 17,
        }}
      >
        {station.name}
      </Text>
    </View>
  </Marker>
);

export default GasStationMarker;
