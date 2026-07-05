import { FontSize, GLOBAL_COLOR } from "@/constants/globalValue";
import { formatMoney } from "@/utils/formatMoney";
import { Ionicons } from "@expo/vector-icons";
import { ImageBackground } from "expo-image";
import { useRouter } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type DimensionValue,
} from "react-native";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  price: string;
  thumbnail: string;
  cardWidth?: DimensionValue;
  imageHeight?: number;
}
function BookCard({
  id,
  title,
  author,
  price,
  thumbnail,
  cardWidth = 120,
  imageHeight = 160,
}: BookCardProps) {
  const router = useRouter();

  const navigateToBookDetail = () => {
    router.push({
      pathname: "/other-screens/[detail-book-by-Id]",
      params: { id } as any, // Type assertion to 'any' to bypass type checking
    });
  };
  return (
    <TouchableOpacity
      onPress={navigateToBookDetail}
      style={[styles.card, { width: cardWidth }]}
    >
      <View>
        <ImageBackground
          source={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2LhvnZRvAgRYxeCk9NtFMM__mtAvWHaG1aQ&s"
          }
          cachePolicy="memory-disk"
          imageStyle={{ borderRadius: 8, resizeMode: "cover" }}
          style={{ width: "100%", height: imageHeight }}
        >
          <View
            style={{
              position: "absolute",
              bottom: 8,
              right: 8,
              backgroundColor: GLOBAL_COLOR.primary,
              padding: 4,
              borderRadius: 99,
            }}
          >
            <Pressable onPress={() => console.log("Add to cart")}>
              <Ionicons
                name="cart-outline"
                size={24}
                color={GLOBAL_COLOR.neutral}
              />
            </Pressable>
          </View>
        </ImageBackground>
        <View style={styles.info}>
          <Text
            numberOfLines={2}
            style={{ fontSize: FontSize.sm, fontWeight: "regular" }}
          >
            {title}
          </Text>
          <Text
            numberOfLines={1}
            style={{ fontSize: FontSize.xs, color: GLOBAL_COLOR.secondary }}
          >
            {author}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: FontSize.md,
              fontWeight: "bold",
              color: GLOBAL_COLOR.primary,
            }}
          >
            {formatMoney(price)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexShrink: 0,
  },
  info: {
    marginTop: 6,
    gap: 2,
  },
});

export default BookCard;
