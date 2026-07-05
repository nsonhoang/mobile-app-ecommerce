import { Stack } from "expo-router";

function OtherScreenLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="[detail-book-by-Id]"
        options={{ headerShown: false, animation: "slide_from_left" }}
      />
    </Stack>
  );
}

export default OtherScreenLayout;
