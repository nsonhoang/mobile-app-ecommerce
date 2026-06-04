import CartAvatar from "@/components/CartAvatar";
import { FontSize, Spacing } from "@/constants/globalValue";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Profile() {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(128);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f7f9fb" }}>
      <View style={{ padding: Spacing.md }}>
        {/* khung Avatar và tên
         */}
        <CartAvatar
          name="Nguyễn Văn A"
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
