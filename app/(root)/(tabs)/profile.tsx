import { useAuth, useUser } from "@clerk/clerk-expo";
import { Image, TouchableOpacity, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import { router } from "expo-router";

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/sign-in");
  };
  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="px-5"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="flex-row items-center   justify-between">
          <Text className="text-xl font-JakartaBold my-5">Mon profil</Text>
        </View>

        <View className="flex items-center justify-center my-5">
          <Image
            source={{
              uri: user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl,
            }}
            style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
            className="rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300"
          />
        </View>

        <View className="flex flex-col items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 px-5 py-3">
          <View className="flex flex-col items-start justify-start w-full">
            <InputField
              label="Email"
              placeholder={
                user?.primaryEmailAddress?.emailAddress || "Non trouvé"
              }
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />
          </View>

          <InputField
            label="Prénom"
            placeholder={user?.firstName || "Not Found"}
            containerStyle="w-full"
            inputStyle="p-3.5"
            editable={false}
          />

          <InputField
            label="Nom de famille"
            placeholder={user?.lastName || "Not Found"}
            containerStyle="w-full"
            inputStyle="p-3.5"
            editable={false}
          />
        </View>
        <TouchableOpacity
          onPress={handleSignOut}
          className="flex-row items-center justify-center mt-10"
        >
          <Text className="bg-red-400 text-white  rounded-lg p-2">
            Se déconnecter
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
