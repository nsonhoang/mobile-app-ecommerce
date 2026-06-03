import { GLOBAL_COLOR, Spacing } from "@/constants/globalValue";
import { formatMoney } from "@/utils/formatMoney";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface CartItemProps {
  id: string;
  title: string;
  author: string;
  price: string;
  quantity: number;
  imageUrl: string;
  isSelected?: boolean;
  handleCheckboxChange?: (id: string) => void;
}

function CartItem({
  id,
  title,
  author,
  price,
  quantity,
  imageUrl,
  isSelected,
  handleCheckboxChange,
}: CartItemProps) {
  return (
    <View style={styles.cardContainer}>
      {/* 1. Hình ảnh sản phẩm bên trái */}
      {/* nút checkbox */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingRight: Spacing.sm,
        }}
      >
        <Checkbox
          style={{}}
          color={GLOBAL_COLOR.primary}
          value={isSelected}
          onValueChange={() => handleCheckboxChange && handleCheckboxChange(id)}
        />
      </View>

      <Image
        source={imageUrl}
        style={styles.bookImage}
        contentFit="cover"
        transition={200}
      />

      {/* 2. Khối thông tin bên phải (Chiếm hết không gian còn lại) */}
      <View style={styles.infoContainer}>
        {/* Hàng 1: Tên sách và Thùng rác */}
        <View style={styles.headerRow}>
          <Text style={styles.bookTitle} numberOfLines={2}>
            {title}
          </Text>
          <Pressable
            style={styles.trashSubButton}
            onPress={() => alert("Xóa khỏi giỏ")}
          >
            <Ionicons name="trash-outline" size={20} />
          </Pressable>
        </View>

        {/* Hàng 2: Tên tác giả */}
        <Text style={styles.authorText}> {author}</Text>

        {/* Hàng 3: Giá tiền và Bộ tăng giảm số lượng */}
        <View style={styles.footerRow}>
          <Text style={styles.priceText}>
            {formatMoney(parseInt(price).toString())}
          </Text>

          {/* Cụm tăng giảm số lượng */}
          <View style={styles.quantityContainer}>
            <Pressable
              // onPress={() => quantity > 1 && setQuantity(quantity - 1)}
              style={[
                styles.qtyButton /* quantity === 1 && styles.qtyButtonDisabled */,
              ]}
            >
              <Ionicons name="remove" size={16} color={"#1c1c1e"} />
            </Pressable>

            <Text style={styles.qtyText}>{quantity}</Text>

            <Pressable
              // onPress={() => setQuantity(quantity + 1)}
              style={styles.qtyButton}
            >
              <Ionicons name="add" size={16} color="#1c1c1e" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row", // Xếp ảnh và khối thông tin nằm ngang
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,

    // Tạo hiệu ứng bóng đổ đổ nhẹ cho card
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginTop: Spacing.sm,
  },
  bookImage: {
    width: 90,
    height: 120,
    borderRadius: 8,
    backgroundColor: "#f2f2f7",
  },
  infoContainer: {
    flex: 1, // Chiếm trọn không gian bên phải
    marginLeft: 12,
    justifyContent: "space-between", // Đẩy hàng đầu và hàng cuối dãn cách đều nhau
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  bookTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1c1c1e",
    flex: 1, // Ép chữ tự xuống hàng nếu quá dài, không đè lên thùng rác
    paddingRight: 8,
    lineHeight: 20,
  },
  trashSubButton: {
    padding: 4,
  },
  authorText: {
    fontSize: 13,
    color: "#8e8e93",

    flex: 1,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "700",
    color: GLOBAL_COLOR.primary, // Màu đỏ nổi bật cho giá tiền
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: "#e5e5ea",
    backgroundColor: "#e5e5ea",
    borderRadius: 50,
    // overflow: "hidden",
  },
  qtyButton: {
    width: 30,
    height: 28,
    // backgroundColor: "#f2f2f7",
    justifyContent: "center",
    alignItems: "center",
  },
  qtyButtonDisabled: {
    backgroundColor: "#e5e5ea",
  },
  qtyText: {
    minWidth: 30,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    color: "#1c1c1e",
  },
});

export default CartItem;
