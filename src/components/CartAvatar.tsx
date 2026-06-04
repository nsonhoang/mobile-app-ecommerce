import { FontSize, GLOBAL_COLOR } from "@/constants/globalValue";
import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface CartAvatarProps {
  name: string;
  size?: number;
  imageUri?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

function CartAvatar({
  name,
  size = 56,
  imageUri,
  onPress,
  style,
}: CartAvatarProps) {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <View
          style={[
            styles.avatar,
            { width: size, height: size, borderRadius: size / 2 },
          ]}
        >
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <Ionicons
              name="person"
              size={Math.round(size * 0.5)}
              color="#fff"
            />
          )}
        </View>
      </TouchableOpacity>
      <Text style={[styles.name, { maxWidth: size * 1.5 }]} numberOfLines={1}>
        {name}
      </Text>
    </View>
  );
}

export default CartAvatar;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "#6B7280",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  name: {
    marginTop: 6,
    fontSize: FontSize.lg,
    color: GLOBAL_COLOR.primary,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
  },
});
