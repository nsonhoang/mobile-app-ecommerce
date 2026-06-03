import { FontSize, GLOBAL_COLOR } from "@/constants/globalValue";
import { formatMoney } from "@/utils/formatMoney";
import { Ionicons } from "@expo/vector-icons";
import { ImageBackground } from "expo-image";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  price: string;
  thumbnail: string;
}
function BookCard({ id, title, author, price, thumbnail }: BookCardProps) {
  return (
    <TouchableOpacity onPress={() => console.log("id", id)}>
      <View>
        <ImageBackground
          source={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2LhvnZRvAgRYxeCk9NtFMM__mtAvWHaG1aQ&s"
          }
          cachePolicy="memory-disk"
          imageStyle={{ borderRadius: 8, resizeMode: "cover" }}
          style={{ width: 120, height: 160 }}
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
        <View>
          <Text style={{ fontSize: FontSize.sm, fontWeight: "regular" }}>
            {title}
          </Text>
          <Text
            style={{ fontSize: FontSize.xs, color: GLOBAL_COLOR.secondary }}
          >
            {author}
          </Text>
          <Text
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

export default BookCard;
