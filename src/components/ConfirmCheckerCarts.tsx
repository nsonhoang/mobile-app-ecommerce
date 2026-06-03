import { FontSize } from "@/constants/globalValue";
import { formatMoney } from "@/utils/formatMoney";
import { Text, View } from "react-native";
import Skeleton from "./Skeleton";

interface ConfirmCheckerCartProps {
  totalPrice: number;
  shippingFee: number;
  isLoading?: boolean;
}

function ConfirmCheckerCart({
  totalPrice,
  shippingFee,
  isLoading,
}: ConfirmCheckerCartProps) {
  if (isLoading) {
    // hiệu ứng skeleton
    return (
      <View style={{}}>
        <Skeleton width="100%" height={20} borderRadius={4} />
        <Skeleton
          width="100%"
          height={20}
          borderRadius={4}
          style={{ marginTop: 10 }}
        />
        <Skeleton
          width="100%"
          height={20}
          borderRadius={4}
          style={{ marginTop: 10 }}
        />
      </View>
    );
  }

  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: "Inter_400Regular", fontSize: FontSize.md }}>
          Tổng tiền hàng:
        </Text>
        <Text
          style={{
            fontFamily: "Inter_700Bold",
            fontSize: FontSize.md,
            color: "#007AFF",
          }}
        >
          ${formatMoney(totalPrice.toString())}
        </Text>
      </View>
      {/* <Text
        style={{
          fontFamily: "Inter_400Regular",
          fontSize: FontSize.md,
        }}
      >
        Phí vận chuyển: ${formatMoney(shippingFee.toString())}
      </Text> */}
      {/* phí ship*/}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: "Inter_400Regular", fontSize: FontSize.md }}>
          Phí vận chuyển:
        </Text>
        <Text
          style={{
            fontFamily: "Inter_700Bold",
            fontSize: FontSize.md,
            color: "#007AFF",
          }}
        >
          ${formatMoney(shippingFee.toString())}
        </Text>
      </View>
      {/* đừng kẻ ngang */}
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          marginVertical: 10,
        }}
      />
      {/* tổng thanh toán */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: "Inter_400Regular", fontSize: FontSize.md }}>
          Tổng thanh toán:
        </Text>
        <Text
          style={{
            fontFamily: "Inter_700Bold",
            fontSize: FontSize.md,
            color: "#007AFF",
          }}
        >
          ${formatMoney((totalPrice + shippingFee).toString())}
        </Text>
      </View>
    </View>
  );
}

export default ConfirmCheckerCart;
