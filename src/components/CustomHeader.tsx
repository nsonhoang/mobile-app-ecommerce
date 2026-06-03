import { GLOBAL_COLOR, Spacing } from "@/constants/globalValue";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CustomHeader({ title = "App" }: { title?: string }) {
  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.row}>
        <View style={styles.left}>
          <Pressable
            onPress={() => router.push("/auth")}
            hitSlop={8}
            accessibilityRole="button"
            style={{ padding: 6 }}
          >
            <MaterialIcons name="menu" size={26} color="#111" />
          </Pressable>
        </View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.right}>
          <Pressable
            onPress={() => router.push("/public/explore")}
            hitSlop={8}
            style={{ padding: 6 }}
            accessibilityRole="button"
          >
            <MaterialIcons name="search" size={26} color="#1c1c1e" />
          </Pressable>
          <Pressable
            onPress={() => router.push("/public/carts")}
            hitSlop={8}
            style={{ padding: 6 }}
            accessibilityRole="button"
          >
            <Ionicons name="bag-handle-outline" size={26} color="#1c1c1e" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: GLOBAL_COLOR.neutral,
  },
  row: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.sm,
  },
  left: {
    width: 64,
  },
  title: {
    // color: "#fff",
    flex: 1,
    fontSize: 20,
    fontWeight: "700",
    textAlign: "left",
  },
  right: {
    flexDirection: "row",
    gap: 20,
    minWidth: 64,
    alignItems: "flex-end",
  },
  rightText: {
    // color: "#fff",
    fontWeight: "600",
  },
});
