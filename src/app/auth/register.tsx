import AuthFormInput from "@/components/AuthFormInput";
import { FontSize, GLOBAL_COLOR, Spacing } from "@/constants/globalValue";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/services/AuthService";

type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone?: string;
};

function RegisterScreen() {
  const [isSecureEntry, setIsSecureEntry] = useState<boolean>(true);
  const [isSecureConfirmEntry, setIsSecureConfirmEntry] =
    useState<boolean>(true);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterFormValues>({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password");

  const registerMutation = useMutation({
    mutationFn: AuthService.register,
    onSuccess: (otpToken) => {
      // Redirect to OTP verification screen with the token
      router.push(`/auth/${otpToken}`);
    },
    onError: (error: any) => {
      console.error("Register error:", error);
      const msg = error?.response?.data?.message || "Đăng ký thất bại. Vui lòng kiểm tra lại thông tin!";
      Alert.alert("Lỗi", msg);
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    registerMutation.mutate({
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      name: data.name,
      phone: data.phone || undefined,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#bec7f2" }}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            zIndex: 100,
          }}
        >
          {/* khung chào mừng */}
          <View
            style={{
              padding: Spacing.md,
              alignItems: "center",
            }}
          >
            <View>
              <MaterialCommunityIcons
                name="book-open-variant"
                size={64}
                color={GLOBAL_COLOR.primary}
              />
            </View>
            <Text
              style={{
                color: GLOBAL_COLOR.primary,
                fontFamily: "Inter_700Bold",
                fontSize: FontSize.lg,
              }}
            >
              BookHaven
            </Text>
            <Text
              style={{
                color: GLOBAL_COLOR.primary,
                fontFamily: "Inter_400Regular",
                fontSize: FontSize.sm,
              }}
            >
              Khởi đầu hành trình tri thức mới của bạn
            </Text>
          </View>
          {/* khung form đăng ký */}
          <View
            style={{
              flex: 1,
              backgroundColor: "#ffffff",
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              paddingHorizontal: Spacing.md,
            }}
          >
            {/* form đăng ký */}

            <View
              style={{
                borderRadius: 30,
                borderWidth: 1,
                borderColor: "#d8dce6",
                padding: Spacing.lg,
              }}
            >
              <Text
                style={{
                  color: GLOBAL_COLOR.primary,
                  fontFamily: "Inter_700Bold",
                  fontSize: FontSize.lg,
                  marginBottom: Spacing.md,
                }}
              >
                Tạo tài khoản
              </Text>
              {/* Họ và tên */}
              <Controller
                control={control}
                name="name"
                rules={{
                  required: "Họ và tên không được để trống",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <AuthFormInput
                    label="Họ và tên"
                    iconName="person-outline"
                    placeholder="Nhập họ và tên"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    errorMessage={errors.name?.message}
                  />
                )}
              />
              {/* Email */}
              <Controller
                control={control}
                name="email"
                rules={{
                  required: "Email không được để trống",
                  validate: {
                    isString: (value) =>
                      typeof value === "string" || "Email phải là chuỗi kí tự",
                    isEmail: (value) =>
                      /^\S+@\S+\.\S+$/.test(value) || "Email không hợp lệ",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <AuthFormInput
                    label="Email"
                    iconName="mail-outline"
                    placeholder="Nhập email"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={(text) => onChange(text.trim())}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    errorMessage={errors.email?.message}
                  />
                )}
              />
              {/* Số điện thoại */}
              <Controller
                control={control}
                name="phone"
                rules={{
                  validate: (value) => {
                    if (!value || value.trim() === "") {
                      return true;
                    }

                    return (
                      /^[0-9]{9,11}$/.test(value) ||
                      "Phone phải là số từ 9-11 chữ số"
                    );
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <AuthFormInput
                    label="Số điện thoại"
                    iconName="call-outline"
                    placeholder="Nhập số điện thoại"
                    value={value ?? ""}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    keyboardType="phone-pad"
                    errorMessage={errors.phone?.message}
                  />
                )}
              />
              {/* Mật khẩu */}
              <Controller
                control={control}
                name="password"
                rules={{
                  required: "Mật khẩu không được để trống",
                  minLength: {
                    value: 6,
                    message: "Mật khẩu phải có ít nhất 6 ký tự",
                  },
                  maxLength: {
                    value: 50,
                    message: "Mật khẩu không được vượt quá 50 ký tự",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <AuthFormInput
                    label="Mật khẩu"
                    iconName="lock-closed-outline"
                    placeholder="••••••••"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    secureTextEntry={isSecureEntry}
                    onToggleSecureEntry={() => setIsSecureEntry(!isSecureEntry)}
                    errorMessage={errors.password?.message}
                  />
                )}
              />
              {/* Xác nhận mật khẩu */}
              <Controller
                control={control}
                name="confirmPassword"
                rules={{
                  required: "Mật khẩu nhập lại không được để trống",
                  minLength: {
                    value: 6,
                    message: "Mật khẩu phải có ít nhất 6 ký tự",
                  },
                  maxLength: {
                    value: 50,
                    message: "Mật khẩu không được vượt quá 50 ký tự",
                  },
                  validate: (value) =>
                    value === passwordValue || "Mật khẩu nhập lại không khớp",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <AuthFormInput
                    label="Xác nhận mật khẩu"
                    iconName="shield-checkmark-outline"
                    placeholder="••••••••"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    secureTextEntry={isSecureConfirmEntry}
                    onToggleSecureEntry={() =>
                      setIsSecureConfirmEntry(!isSecureConfirmEntry)
                    }
                    errorMessage={errors.confirmPassword?.message}
                  />
                )}
              />

              {/* nút đăng ký */}
              <TouchableOpacity
                style={[
                  styles.button,
                  (!isValid || isSubmitting || registerMutation.isPending) &&
                    styles.buttonDisabled,
                ]}
                onPress={handleSubmit(onSubmit)}
                disabled={!isValid || isSubmitting || registerMutation.isPending}
              >
                {registerMutation.isPending ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <Text style={styles.buttonText}>Đăng ký</Text>
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
                <Text>Hoặc đăng ký bằng</Text>
                <View
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: "#d8dce6",
                    marginHorizontal: Spacing.sm,
                  }}
                />
              </View>
              {/* nút đăng ký bằng mạng xã hội */}
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
            </View>
            {/*  có tài khoản đăng nhập nagfy */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                gap: 4,
                marginTop: Spacing.lg,
                marginBottom: Spacing.lg,
              }}
            >
              <Text>Chưa có tài khoản?</Text>
              <TouchableOpacity
                onPress={() => {
                  router.push("/auth");
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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

export default RegisterScreen;
