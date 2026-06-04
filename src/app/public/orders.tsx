import ButtonSelectStatus from "@/components/ButtonSelectStatus";
import CartItemBookOrder from "@/components/CartItemBookOrder";
import RequireLogin from "@/components/RequireLogin";
import { FontSize, GLOBAL_COLOR, Spacing } from "@/constants/globalValue";
import { useAuthStore } from "@/hooks/useAuthStore";
import { formatMoney } from "@/utils/formatMoney";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const orderStatus = [
  { label: "Tất cả", value: "all" },
  { label: "Chờ xác nhận", value: "pending" },
  { label: "Đang xử lý", value: "processing" },
  { label: "Hoàn thành", value: "completed" },
  { label: "Đã hủy", value: "cancelled" },
];

function OrderScreen() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const { user } = useAuthStore();

  if (!user) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <RequireLogin>
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
        </RequireLogin>
      </SafeAreaView>
    );
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={{ flex: 1, padding: Spacing.md }}>
        <View style={{ flex: 1 }}>
          {/* list  danh sách trạng thái đơn */}
          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {orderStatus.map((status) => (
                <ButtonSelectStatus
                  key={status.value}
                  selectedStatus={selectedStatus}
                  setSelectedStatus={setSelectedStatus}
                  status={status}
                />
              ))}
            </ScrollView>
          </View>
          {/* danh sách đơn hàng  */}
          <View style={{ flex: 1, marginTop: Spacing.md }}>
            <View
              style={{
                marginTop: Spacing.md,
                padding: Spacing.md,
                backgroundColor: "#fff",
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={{ color: "#797a88", fontSize: FontSize.md }}>
                    Mã đơn
                  </Text>
                  <Text style={{ fontSize: FontSize.md }}>12-02-2024</Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    borderColor: "#e0e0e0",
                    paddingHorizontal: Spacing.sm,
                    backgroundColor: "#d0e1fb",
                    borderRadius: 30,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#546aa8",
                      fontFamily: "Inter_700Bold",
                    }}
                  >
                    Đang xử lý
                  </Text>
                </View>
              </View>
              {/* hình ảnh sản phẩm */}
              <CartItemBookOrder />
              {/* sách 2 */}
              <CartItemBookOrder />
              {/* đường kẻ  */}
              {/* tổng tiền và nút chức năng */}

              <View
                style={{
                  height: 1,
                  backgroundColor: "#e0e0e0",
                  marginVertical: Spacing.md,
                }}
              />
              {/* tổng tiền và nút chức năng */}

              <View
                style={{
                  flexDirection: "row",
                  gap: Spacing.xs,
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    gap: Spacing.xs,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: FontSize.md }}>Tổng tiền</Text>
                  <Text
                    style={{
                      fontSize: FontSize.lg,
                      fontFamily: "Inter_700Bold",
                      color: GLOBAL_COLOR.primary,
                    }}
                  >
                    {formatMoney("380000")}
                  </Text>
                </View>
                {/* nút chức năng như mua lại ...hủy đơn, hoặc là xem chi tiết */}
                <View
                  style={{
                    flexDirection: "row",
                    gap: Spacing.sm,
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#e0e0e0",
                      paddingHorizontal: Spacing.md,
                      paddingVertical: Spacing.sm,
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: FontSize.md,
                        fontFamily: "Inter_400Regular",
                      }}
                    >
                      Chi tiết
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: GLOBAL_COLOR.primary,
                      paddingHorizontal: Spacing.md,
                      paddingVertical: Spacing.sm,
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: FontSize.md,
                        fontFamily: "Inter_400Regular",
                        color: "#fff",
                      }}
                    >
                      Mua Lại
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export default OrderScreen;
