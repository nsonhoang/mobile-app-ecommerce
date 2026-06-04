import CartAvatar from "@/components/CartAvatar";
import { FontSize, GLOBAL_COLOR, Spacing } from "@/constants/globalValue";
import { useAuthStore } from "@/hooks/useAuthStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Profile() {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      { text: "Hủy", style: "cancel" },
      { text: "Đăng xuất", style: "destructive", onPress: () => logout() },
    ]);
  };

  if (!user) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text> Vui lòng đăng nhập để xem thông tin cá nhân </Text>
        <TouchableOpacity
          style={{
            backgroundColor: GLOBAL_COLOR.primary,
            padding: Spacing.md,
            borderRadius: 5,
            marginTop: Spacing.md,
          }}
          onPress={() => router.push("/auth")}
        >
          <Text
            style={{
              color: "#ffff",
              fontSize: FontSize.md,
              fontFamily: "Inter_700Bold",
            }}
          >
            Đăng nhập ngay
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f7f9fb" }}>
      <View style={{ padding: Spacing.md }}>
        {/* khung Avatar và tên
         */}
        <CartAvatar
          name={user?.name || "Người dùng"}
          size={100}
          onPress={() => {
            console.log("sẽ router tơi trang chỉnh sửa");
          }}
        />

        {/* thẻ  */}
        <View
          style={{
            marginTop: Spacing.lg,
            borderWidth: 1,
            borderColor: "#e0e0e0",
            borderRadius: 10,
          }}
        >
          <Pressable style={styles.button}>
            <Ionicons name="cube-outline" style={styles.icon} size={24} />
            <Text style={styles.text}>Đơn hàng của bạn</Text>
            <Ionicons name="chevron-forward" size={24} color={"#757684"} />
          </Pressable>

          <Pressable style={styles.button}>
            <Ionicons name="location-outline" style={styles.icon} size={24} />
            <Text style={styles.text}>Địa chỉ</Text>
            <Ionicons name="chevron-forward" size={24} color={"#757684"} />
          </Pressable>
          <Pressable style={styles.button}>
            <Ionicons name="ticket-outline" style={styles.icon} size={24} />
            <Text style={styles.text}>Mã giảm giá</Text>
            <Ionicons name="chevron-forward" size={24} color={"#757684"} />
          </Pressable>
          <Pressable style={styles.button}>
            <Ionicons name="settings-outline" style={styles.icon} size={24} />
            <Text style={styles.text}>Cài đặt</Text>
            <Ionicons name="chevron-forward" size={24} color={"#757684"} />
          </Pressable>
          <Pressable style={styles.button}>
            <Ionicons
              name="help-circle-outline"
              style={styles.icon}
              size={24}
            />
            <Text style={styles.text}>Hỗ trợ</Text>
            <Ionicons name="chevron-forward" size={24} color={"#757684"} />
          </Pressable>
        </View>
        {/* nút đăn xuất */}
        <View>
          <TouchableOpacity
            style={{
              marginTop: Spacing.lg,
              borderWidth: 1,
              borderColor: "#e0e0e0",
              borderRadius: 10,
              padding: Spacing.md,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: Spacing.sm,
            }}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={24} color="#e53935" />
            <Text
              style={{
                fontSize: FontSize.lg,
                color: "#e53935",
              }}
            >
              Đăng xuất
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderColor: "#cdcedc",
  },
  text: {
    flex: 1,
    fontSize: FontSize.md,
  },
  icon: {
    marginRight: Spacing.md,
    color: "#757684",
  },
});

export default Profile;
