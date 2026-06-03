import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface SkeletonProps {
  width: number | string;
  height: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

export default function Skeleton({
  width,
  height,
  borderRadius = 8,
  style,
}: SkeletonProps) {
  const opacity = useSharedValue(0.45);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 900 }), -1, true);
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const containerStyle = [
    styles.container,
    {
      width,
      height,
      borderRadius,
    },
    style,
    animatedStyle,
  ] as any;

  return (
    <Animated.View style={containerStyle}>
      <LinearGradient
        colors={["#D1D5DB", "#9CA3AF", "#D1D5DB"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F2F4F7",
    overflow: "hidden",
  },
  gradient: {
    ...StyleSheet.absoluteFill,
  },
});
