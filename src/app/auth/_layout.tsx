import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Sign in",
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: "Create Account",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[tokenOtp]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
