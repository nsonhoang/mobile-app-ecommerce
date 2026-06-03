import CartItem from "@/components/CartItem";
import ConfirmCheckerCart from "@/components/ConfirmCheckerCarts";
import Skeleton from "@/components/Skeleton";
import { FontSize, GLOBAL_COLOR, Spacing } from "@/constants/globalValue";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export const mockCartItems = [
  {
    id: "1",
    title: "Clean Code",
    author: "Robert C. Martin",
    price: "249000",
    quantity: 1,
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg",
  },
  {
    id: "2",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    price: "249000",
    quantity: 2,
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780201616224-L.jpg",
  },
  {
    id: "3",
    title: "Design Patterns",
    author: "Erich Gamma",
    price: "329000",
    quantity: 1,
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780201633610-L.jpg",
  },
  {
    id: "4",
    title: "Refactoring",
    author: "Martin Fowler",
    price: "279000",
    quantity: 1,
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780201485677-L.jpg",
  },
  {
    id: "5",
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    price: "159000",
    quantity: 3,
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780596517748-L.jpg",
  },
  {
    id: "6",
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    price: "199000",
    quantity: 1,
    imageUrl: "https://covers.openlibrary.org/b/isbn/9781491904244-L.jpg",
  },
  {
    id: "7",
    title: "Atomic Habits",
    author: "James Clear",
    price: "179000",
    quantity: 2,
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
  },
  {
    id: "8",
    title: "Deep Work",
    author: "Cal Newport",
    price: "169000",
    quantity: 1,
    imageUrl: "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg",
  },
  {
    id: "9",
    title: "The Clean Coder",
    author: "Robert C. Martin",
    price: "219000",
    quantity: 1,
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780137081073-L.jpg",
  },
  {
    id: "10",
    title: "Head First Design Patterns",
    author: "Eric Freeman",
    price: "289000",
    quantity: 1,
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780596007126-L.jpg",
  },
];

function CartScreen() {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [isLoadingConfirm, setIsLoadingConfirm] = useState(false);

  // useEffect(() => {
  //   console.log("Checked items:", isLoadingConfirm, checkedItems);
  //   const timer = setTimeout(() => {
  //     setLoadingConfirm(false);
  //   }, 3000);
  //   console.log("Timer set for loading confirm");

  //   return () => clearTimeout(timer);
  // }, [checkedItems.length]);
  const handleCheckboxChange = (id: string) => {
    setIsLoadingConfirm(true);
    const timer = setTimeout(() => {
      setIsLoadingConfirm(false);
    }, 3000);
    setCheckedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  // tính tổng tiền
  const calculateTotalPrice = useMemo(() => {
    return mockCartItems
      .filter((item) => checkedItems.includes(item.id))
      .reduce((sum, item) => sum + parseInt(item.price) * item.quantity, 0);
  }, [checkedItems]);

  //tính ship
  const calculateShippingFee = useMemo(() => {
    return checkedItems.length > 0 ? 30000 : 0;
  }, [checkedItems.length]);

  return (
    <SafeAreaView
      style={{ flex: 1, padding: Spacing.md, position: "relative" }}
    >
      {/* title */}
      <FlatList
        ListHeaderComponent={
          <View style={{ flex: 1 }}>
            <View>
              <Text
                style={{
                  fontFamily: "Inter_700Bold",
                  fontSize: 24,
                }}
              >
                Giỏ hàng của bạn
              </Text>
            </View>
            {/*list danh sách sản phẩm đã đc thêm vào  giỏ hàng */}
            <View style={{ flex: 1, marginTop: Spacing.md }}></View>
          </View>
        }
        showsVerticalScrollIndicator={false}
        data={mockCartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CartItem
            {...item}
            isSelected={checkedItems.includes(item.id)}
            handleCheckboxChange={handleCheckboxChange}
          />
        )}
      />
      {checkedItems.length > 0 && (
        <Animated.View
          entering={SlideInDown.duration(300)}
          exiting={SlideOutDown.duration(300)}
          style={[
            {
              flexDirection: "column",
              justifyContent: "flex-end",
              gap: Spacing.sm,
              backgroundColor: GLOBAL_COLOR.neutral,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              borderEndWidth: 1,
              borderStartWidth: 1,
              borderTopWidth: 1,
              borderColor: "#e6e8ea",
              padding: Spacing.md,
              position: "absolute",
              bottom: Spacing.md,
              right: Spacing.md,
              left: Spacing.md,
            },
          ]}
        >
          {/* Hiển thị giá và ship */}
          <ConfirmCheckerCart
            totalPrice={calculateTotalPrice}
            shippingFee={calculateShippingFee}
            isLoading={isLoadingConfirm}
          />
          {isLoadingConfirm ? (
            <View>
              <Skeleton width="100%" height={50} borderRadius={20} />
            </View>
          ) : (
            <Pressable
              style={{
                flex: 1,
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                gap: Spacing.sm,
                borderRadius: 20,
                padding: Spacing.md,
                backgroundColor: "#007AFF",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "Inter_700Bold",
                  fontSize: FontSize.lg,
                }}
              >
                Xác nhận mua hàng
              </Text>
              <Ionicons
                name="arrow-forward"
                size={24}
                color="#fff"
                style={{ paddingLeft: Spacing.xs }}
              />
            </Pressable>
          )}
        </Animated.View>
      )}
    </SafeAreaView>
  );
}
export default CartScreen;
