import { FontSize, GLOBAL_COLOR, Spacing } from "@/constants/globalValue";
import { getFCMToken } from "@/utils/getFCMToken";
import { requestNotificationPermission } from "@/utils/requestPermissionNotifications";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import * as Device from "expo-device";
import { Image, ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/services/AuthService";
import { useAuthStore } from "@/hooks/useAuthStore";
import { getDeviceId } from "@/services/api";

export default function AuthIndex() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSecureEntry, setIsSecureEntry] = useState<boolean>(true);

  const isFormValid = useMemo(() => {
    return email.trim().includes("@") && password.trim().length >= 6;
  }, [email, password]);

  // Login Mutation
  const loginMutation = useMutation({
    mutationFn: AuthService.login,
    onSuccess: async (data) => {
      try {
        // Temporarily save token so that subsequent profile fetch includes it
        useAuthStore.setState({ accessToken: data.accessToken });
        
        // Fetch profile
        const userProfile = await AuthService.getProfile();
        
        // Save user and token to store & secure store
        await useAuthStore.getState().login(userProfile, data.accessToken, data.csrfToken);
        
        // Redirect to homepage
        router.replace("/public");
      } catch (profileError) {
        console.error("Failed to fetch user profile after login:", profileError);
        useAuthStore.setState({ accessToken: null });
        Alert.alert("Lỗi", "Không thể tải thông tin cá nhân. Vui lòng thử lại!");
      }
    },
    onError: (error: any) => {
      console.error("Login failed:", error);
      const msg = error?.response?.data?.message || "Đăng nhập thất bại. Vui lòng kiểm tra kết nối mạng!";
      Alert.alert("Thất bại", msg);
    },
  });

  const handleSignIn = async () => {
    if (!isFormValid || loginMutation.isPending) return;

    try {
      const allowNotification = await requestNotificationPermission();

      let fcmToken: string | null = null;
      if (allowNotification) {
        const token = await getFCMToken();
        fcmToken = token ?? null;
        console.log("FCM Token:", fcmToken);
      }
      
      const deviceOs = Platform.OS;

      loginMutation.mutate({
        email,
        password,
        fcmToken,
        deviceOs,
      });
    } catch (error) {
      console.error("Sign in preparation error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* hình ảnh  */}
        <View>
          <ImageBackground
            source={require("@/assets/images/image-login.png")}
            style={{ width: "100%", height: 200 }}
            imageStyle={{ borderRadius: 16 }}
          >
            <LinearGradient
              // Mảng màu chuyển sắc: Trong suốt ở trên (0%) -> Trắng mờ ở giữa -> Trắng tinh ở đáy (100%)
              colors={["transparent", "rgba(255, 255, 255, 0.5)", "#ffffff"]}
              // Điểm bắt đầu (Phía trên cùng chính giữa)
              start={{ x: 0.5, y: 0 }}
              // Điểm kết thúc (Dưới cùng chính giữa)
              end={{ x: 0.5, y: 1 }}
              // Vị trí phân bổ màu tương ứng (Không bắt buộc, giúp tùy biến dải mờ mịn hơn)
              locations={[0, 0.4, 1]}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: 400, // Chiều cao phải bằng khít với chiều cao của thẻ Image để phủ kín
              }}
            />
          </ImageBackground>
        </View>
        {/* Title chào mừng */}
        <Text style={styles.title}>Chào mừng trở lại</Text>
        <Text style={styles.subtitle}>
          Tiếp tục khám phá hành trình tri thức của bạn
        </Text>

        {/* form đăng nhập */}
        <View>
          <Text style={styles.label}>Email</Text>
          {/* input email */}
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={FontSize.md} />
            <TextInput
              placeholder="email@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              style={styles.input}
              autoCapitalize="none"
            />
          </View>
          <Text style={styles.label}>Mật khẩu</Text>
          {/* input password */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={FontSize.md} />
            <TextInput
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={isSecureEntry}
              style={styles.input}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setIsSecureEntry(!isSecureEntry)}
              style={{ padding: Spacing.xs }}
            >
              <Ionicons
                name={isSecureEntry ? "eye-off-outline" : "eye-outline"}
                size={FontSize.md}
              />
            </TouchableOpacity>
          </View>
          {/* nút quên mật khẩu */}
          <View
            style={{
              alignItems: "flex-end",
              marginTop: Spacing.xs,
              paddingVertical: Spacing.sm,
            }}
          >
            <TouchableOpacity>
              <Text
                style={{
                  color: GLOBAL_COLOR.primary,
                  fontFamily: "Inter_700Bold",
                }}
              >
                Quên mật khẩu?
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* nút đăng nhập */}
        <TouchableOpacity
          style={[styles.button, (!isFormValid || loginMutation.isPending) && styles.buttonDisabled]}
          onPress={handleSignIn}
          disabled={!isFormValid || loginMutation.isPending}
        >
          {loginMutation.isPending ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>Đăng nhập</Text>
          )}
        </TouchableOpacity>
        {/* đường kẻ */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
            marginTop: Spacing.lg,
          }}
        >
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#d8dce6",
              marginHorizontal: Spacing.sm,
            }}
          />
          <Text>Hoặc đăng nhập bằng</Text>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#d8dce6",
              marginHorizontal: Spacing.sm,
            }}
          />
        </View>
        {/* nút đăng nhập bằng mạng xã hội */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 20,
            marginTop: Spacing.md,
          }}
        >
          <TouchableOpacity style={styles.buttonLogo}>
            <Image
              source={require("@/assets/images/logo-google.png")}
              style={{ width: 30, height: 30 }}
            />
            <Text>Google</Text>
          </TouchableOpacity>
          {/* face */}
          <TouchableOpacity style={styles.buttonLogo}>
            <FontAwesome6 name="facebook" size={24} color="#1877f2" />
            <Text>Facebook</Text>
          </TouchableOpacity>
        </View>
        {/* chưa có tài khoản đăng kí nagfy */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 4,
            marginTop: Spacing.lg,
          }}
        >
          <Text>Chưa có tài khoản?</Text>
          <TouchableOpacity
            onPress={() => {
              router.push("/auth/register");
            }}
          >
            <Text
              style={{
                color: GLOBAL_COLOR.primary,
                fontFamily: "Inter_700Bold",
              }}
            >
              Đăng ký ngay
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 36,
  },
  title: {
    color: GLOBAL_COLOR.primary,
    fontSize: 28,
    fontFamily: "Inter_700Bold",
    marginTop: Spacing.md,
    textAlign: "center",
  },
  subtitle: {
    color: "#5a6475",
    fontSize: FontSize.sm,
    textAlign: "center",
  },
  form: {
    marginTop: 28,
    gap: 10,
  },
  label: {
    color: "#2b3240",
    fontSize: 14,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
    fontWeight: "600",
  },
  input: {
    flex: 1,
    height: 46,
    padding: Spacing.md,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#ffffff",
    color: "#2b3240",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#d8dce6",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
  },
  button: {
    marginTop: 10,
    height: 46,
    borderRadius: 30,
    backgroundColor: GLOBAL_COLOR.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    backgroundColor: "#9ebeff",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
  buttonLogo: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d8dce6",
    padding: Spacing.sm,
    borderRadius: 10,
    gap: 5,
  },
});
