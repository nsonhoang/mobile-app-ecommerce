import { FontSize, GLOBAL_COLOR, Spacing } from "@/constants/globalValue";
import { formatMoney } from "@/utils/formatMoney";
import { Image } from "expo-image";
import { Text, View } from "react-native";

function CartItemBookOrder() {
  return (
    <View
      style={{
        marginTop: Spacing.md,
        flexDirection: "row",
        gap: Spacing.md,
      }}
    >
      <Image
        source={
          "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQErf5tOgqbYIx6mrTdH_nBj0paM99uJY-rOrm5ONDBIxLIzunYk9ysa6zd0CdocKfPW6-6kv0-VnvA_02dAIoQEbPbh7P-6s-M90t90Yp6UFtRLaow1G19"
        }
        style={{
          width: 60,
          height: 80,
          borderRadius: 20,
        }}
        resizeMode="cover"
      />
      <View style={{ flex: 1, gap: Spacing.xs }}>
        <Text
          style={{ fontSize: FontSize.lg, fontFamily: "Inter_700Bold" }}
          numberOfLines={1}
        >
          Tên sản phẩm
        </Text>
        <Text
          style={{ fontSize: FontSize.sm, color: "#797a88" }}
          numberOfLines={1}
        >
          Tác giả
        </Text>
        <Text
          style={{
            fontSize: FontSize.md,
            fontFamily: "Inter_700Bold",
            color: GLOBAL_COLOR.primary,
          }}
        >
          {formatMoney("190000")}
        </Text>
      </View>
    </View>
  );
}

export default CartItemBookOrder;
