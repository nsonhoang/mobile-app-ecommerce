import { FontSize, GLOBAL_COLOR } from "@/constants/globalValue";
import { formatMoney } from "@/utils/formatMoney";
import { MaterialIcons } from "@expo/vector-icons";
import { ImageBackground } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";

interface CartBookWithStarRateProps {
  id: string;
  title: string;
  category: string;
  price: string;
  thumbnail: string;
  rating?: number;
}

function CartBookWithStarRate({
  id,
  title,
  category,
  price,
  thumbnail,
  rating,
}: CartBookWithStarRateProps) {
  return (
    <TouchableOpacity onPress={() => console.log("alo")}>
      <View>
        <ImageBackground
          source={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2LhvnZRvAgRYxeCk9NtFMM__mtAvWHaG1aQ&s"
          }
          cachePolicy="memory-disk"
          imageStyle={{ borderRadius: 8, resizeMode: "cover" }}
          style={{ width: 120, height: 160 }}
        ></ImageBackground>
        <View>
          <Text
            style={{
              fontSize: FontSize.xs,
              color: GLOBAL_COLOR.secondary,
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {category}
          </Text>
          <Text
            style={{ fontSize: FontSize.md }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: FontSize.md,
                fontWeight: "bold",
                color: GLOBAL_COLOR.primary,
              }}
            >
              {formatMoney(price)}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="star" size={FontSize.xs} color="#facc15" />
              <Text
                style={{ fontSize: FontSize.xs, color: GLOBAL_COLOR.secondary }}
              >
                {rating ?? "N/A"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default CartBookWithStarRate;
