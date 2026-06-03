import BannerHome from "@/components/BannerHome";
import CategoryList from "@/components/CategoryList";
import ListBookCard from "@/components/ListBookCard";
import ListCartBookWithStarRate from "@/components/ListCardBookWithStar";
import ListCartBookWithStarRateVertical from "@/components/ListCardBookWithStarVerical";
import Skeleton from "@/components/Skeleton";
import { FontSize, GLOBAL_COLOR, Spacing } from "@/constants/globalValue";
import {
  Inter_400Regular,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Index() {
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [loaded]);

  if (showSkeleton) {
    return <HomeSkeleton />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          {/* hiển thị ưu đãi mới nhất */}
          <View style={styles.banner}>
            <BannerHome />
          </View>
          {/* danh sách sản phẩm theo category */}
          <View style={styles.categoryList}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Text style={styles.text}>Danh mục sản phẩm</Text>
              <Pressable>
                <Text
                  style={{
                    fontSize: FontSize.sm,
                    fontFamily: "Inter_400Regular",
                    color: GLOBAL_COLOR.primary,
                  }}
                >
                  Xem tất cả
                </Text>
              </Pressable>
            </View>
            {/* Danh sách sản phẩm theo danh mục */}
            <CategoryList />
          </View>

          {/* Trending book */}

          <View style={styles.trendingBook}>
            <Text style={styles.text}>Sản phẩm bán chạy</Text>
            <View>
              {/*  */}
              <ListBookCard />
            </View>
          </View>

          {/* New arrivals */}
          <View style={styles.newArrivals}>
            <Text style={styles.text}>Sản phẩm mới</Text>
            <View>
              {/* <ListBookCard /> */}
              <ListCartBookWithStarRate />
            </View>
          </View>

          {/* Danh sach sản phẩm sách */}
          <View style={styles.allBooks}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Text style={styles.text}>Danh sách sản phẩm</Text>
              <Pressable>
                <Text
                  style={{
                    fontSize: FontSize.sm,
                    fontFamily: "Inter_400Regular",
                    color: GLOBAL_COLOR.primary,
                  }}
                >
                  Xem Thêm
                </Text>
              </Pressable>
            </View>
            <View>
              {/* <ListBookCard /> */}
              <ListCartBookWithStarRateVertical />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function HomeSkeleton() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.banner}>
            <Skeleton width="100%" height={200} borderRadius={12} />
          </View>

          <View style={styles.sectionSkeleton}>
            <Skeleton width={160} height={24} />
            <View style={styles.skeletonRow}>
              <Skeleton width={88} height={32} borderRadius={999} />
              <Skeleton width={88} height={32} borderRadius={999} />
              <Skeleton width={88} height={32} borderRadius={999} />
              <Skeleton width={88} height={32} borderRadius={999} />
              <Skeleton width={88} height={32} borderRadius={999} />
            </View>
          </View>

          <View style={styles.sectionSkeleton}>
            <Skeleton width={150} height={24} />
            <View style={styles.cardRow}>
              <Skeleton width={120} height={170} borderRadius={16} />
              <Skeleton width={120} height={170} borderRadius={16} />
              <Skeleton width={120} height={170} borderRadius={16} />
              <Skeleton width={120} height={170} borderRadius={16} />
              <Skeleton width={120} height={170} borderRadius={16} />
              <Skeleton width={120} height={170} borderRadius={16} />
            </View>
          </View>

          <View style={styles.sectionSkeleton}>
            <Skeleton width={120} height={24} />
            <View style={styles.listStack}>
              <Skeleton width="100%" height={110} borderRadius={18} />
              <Skeleton width="100%" height={110} borderRadius={18} />
              <Skeleton width="100%" height={110} borderRadius={18} />
              <Skeleton width="100%" height={110} borderRadius={18} />
              <Skeleton width="100%" height={110} borderRadius={18} />
              <Skeleton width="100%" height={110} borderRadius={18} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.md,
    fontFamily: "Inter_400Regular",
  },
  text: {
    fontSize: 18,
    fontFamily: "Inter_700Regular",
    fontWeight: "700",
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
  categoryList: {
    marginTop: Spacing.md,
    flexDirection: "column",
    gap: Spacing.sm,
  },
  trendingBook: {
    marginTop: Spacing.md,
  },
  newArrivals: {
    marginTop: Spacing.md,
  },
  allBooks: {
    marginTop: Spacing.md,
  },
  sectionSkeleton: {
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  skeletonRow: {
    flexDirection: "row",
    gap: Spacing.sm,
    flexWrap: "wrap",
  },
  cardRow: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  listStack: {
    gap: Spacing.sm,
  },
});
