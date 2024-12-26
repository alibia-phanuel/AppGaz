import { Stack } from "expo-router";
const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="category/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="details/[id]" options={{ headerShown: false }} />
      <Stack.Screen
        name="showProductStation/[id]"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="find-ride" options={{ headerShown: false }} />
      <Stack.Screen name="station" options={{ headerShown: false }} />
      <Stack.Screen
        name="confirm-ride"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="book-ride"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;
