import { useAuthStore } from "@/hooks/useAuthStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function RootLayoutNav() {
  const router = useRouter();
  const segments = useSegments();
  const { user, isLoading, initializeAuth } = useAuthStore();

  // Hydrate auth state on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  // Simple and robust Route Guard
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "auth";
    // const inProtectedTab =
    //   segments[0] === "public" &&
    //   [
    //     "carts", "orders", "profile"
    //   ].includes(segments[1] || "");

    // if (!user
    //   && inProtectedTab) {
    //   // Not logged in -> Redirect to login page
    //   router.replace("/auth");
    // } else if (user && inAuthGroup) {
    //   // Logged in -> Redirect to home page
    //   router.replace("/public");
    // }
  }, [user, isLoading, segments]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f7fb",
        }}
      >
        <ActivityIndicator size="large" color="#1E40AF" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="public" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootLayoutNav />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
