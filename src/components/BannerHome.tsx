import { FontSize, GLOBAL_COLOR, Spacing } from "@/constants/globalValue";
import { LinearGradient } from "expo-linear-gradient";
import {
    Dimensions,
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

function BannerHome() {
  const windowWidth = Dimensions.get("window").width;
  const carouselWidth = windowWidth - Spacing.md * 2;
  const carouselHeight = 200;

  const data = Array.from({ length: 5 });

  return (
    <View style={styles.container}>
      <Carousel
        width={carouselWidth}
        height={carouselHeight}
        data={data}
        loop
        autoPlay={true}
        style={{ alignSelf: "center" }}
        renderItem={({ index }) => (
          <ImageBackground
            source={require("@/assets/images/baner.jpg")}
            style={styles.bannerImage}
            imageStyle={{ borderRadius: 12, resizeMode: "cover" }}
            key={index}
          >
            <LinearGradient
              colors={[
                "rgba(43,56,147,0.92)",
                "rgba(67,81,181,0.75)",
                "rgba(120,110,220,0.35)",
              ]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={{
                flex: 1,
                borderRadius: 12,
                flexDirection: "column",
                padding: Spacing.md,
                gap: Spacing.sm,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: GLOBAL_COLOR.neutral,
                  fontSize: FontSize.lg,
                  fontFamily: "Inter_700Bold",
                }}
              >
                Siêu Sale Mùa Hè {index + 1}
              </Text>
              <Text
                style={{
                  color: GLOBAL_COLOR.neutral,
                  fontSize: FontSize.xl,
                  fontFamily: "Inter_700Bold",
                }}
              >
                Giảm 50% cho tất cả sản phẩm
              </Text>
              <Pressable
                style={{
                  backgroundColor: GLOBAL_COLOR.neutral,
                  padding: Spacing.sm,
                  borderRadius: 20,
                  alignSelf: "flex-start",
                }}
              >
                <Text
                  style={{
                    color: GLOBAL_COLOR.primary,
                    fontSize: FontSize.lg,
                    fontFamily: "Inter_400Regular",
                  }}
                >
                  Xem ngay
                </Text>
              </Pressable>
            </LinearGradient>
          </ImageBackground>
        )}
      />
    </View>
  );
}

export default BannerHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    fontFamily: "Inter_400Regular",
  },
  banner: {
    width: "100%",
    height: 200,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
});
