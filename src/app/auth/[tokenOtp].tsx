import Dialog from "@/components/Dialog";
import { FontSize, GLOBAL_COLOR, Spacing } from "@/constants/globalValue";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View, Alert, ActivityIndicator } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/services/AuthService";

function ConfirmOtpScreen() {
  const { tokenOtp } = useLocalSearchParams<{ tokenOtp: string }>();
  const [value, setValue] = useState("");
  const [isSussess, setIsSuccess] = useState<boolean>(false);
  const CELL_COUNT = 6;

  const ref = useBlurOnFulfill({
    value,
    cellCount: CELL_COUNT,
  });

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const verifyOtpMutation = useMutation({
    mutationFn: (otp: string) => AuthService.verifyOtp(tokenOtp, otp),
    onSuccess: () => {
      setIsSuccess(true);
    },
    onError: (error: any) => {
      console.error("OTP verification failed:", error);
      const msg = error?.response?.data?.message || "Mã OTP không hợp lệ hoặc đã hết hạn!";
      Alert.alert("Lỗi", msg);
    },
  });

  const onConfirm = () => {
    if (value.length !== CELL_COUNT || verifyOtpMutation.isPending) return;
    verifyOtpMutation.mutate(value);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#bec7f2" }}>
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
        {/* nhập mã OTP */}
        <View
          style={{
            padding: Spacing.md,
            alignItems: "center",
            gap: Spacing.lg,
            flex: 1,
            backgroundColor: GLOBAL_COLOR.neutral,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <Text
            style={{
              color: GLOBAL_COLOR.primary,
              fontSize: FontSize.sm,
              textAlign: "center",
            }}
          >
            Mã OTP đã được gửi đến email của bạn. Vui lòng nhập mã để xác nhận
            tài khoản.
          </Text>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            keyboardType="number-pad"
            renderCell={({ index, symbol, isFocused }) => (
              <View
                key={index}
                style={{
                  borderWidth: 1,
                  borderColor: isFocused ? GLOBAL_COLOR.primary : "##9899a3",
                  width: 40,
                  height: 40,
                  margin: 4,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: Spacing.sm,
                }}
              >
                <Text>{symbol || (isFocused ? <Cursor /> : null)}</Text>
              </View>
            )}
          />
          <TouchableOpacity
            style={{
              backgroundColor: GLOBAL_COLOR.primary,
              paddingVertical: Spacing.sm,
              paddingHorizontal: Spacing.lg,
              borderRadius: 10,
              marginTop: Spacing.md,
              minWidth: 120,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={onConfirm}
            disabled={verifyOtpMutation.isPending}
          >
            {verifyOtpMutation.isPending ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text
                style={{
                  color: GLOBAL_COLOR.neutral,
                  fontFamily: "Inter_700Bold",
                  fontSize: FontSize.lg,
                }}
              >
                XÁC NHẬN
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <Dialog
          visible={isSussess}
          iconName="alarm-outline"
          title="Đăng ký thành công!"
          description="Chào mừng bạn đến với BookHaven! Tài khoản của bạn đã được tạo thành công. Hãy bắt đầu khám phá thế giới tri thức cùng chúng tôi."
          onConfirm={() => router.replace("/auth")}
          onCancel={() => {
            setIsSuccess(false);
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default ConfirmOtpScreen;
