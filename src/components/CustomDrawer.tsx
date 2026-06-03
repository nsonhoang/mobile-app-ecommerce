import { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface CustomDrawerLayoutProps {
  isOpen?: boolean;
  width?: number;
  onClose?: () => void;
  children?: React.ReactNode;
}

function CustomDrawerLayout({
  isOpen = false,
  width = 280,
  onClose,
  children,
}: CustomDrawerLayoutProps) {
  const translateX = useSharedValue(-width);

  useEffect(() => {
    translateX.value = withTiming(isOpen ? 0 : -width, { duration: 250 });
  }, [isOpen, width, translateX]);

  const drawerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      width,
    };
  });

  const overlayStyle = useAnimatedStyle(() => {
    // Map translateX [-width,0] -> opacity [0,0.5]
    const progress = interpolate(translateX.value, [-width, 0], [0, 1]);
    return { opacity: progress * 0.5 };
  });

  return (
    <View style={styles.wrapper} pointerEvents={isOpen ? "auto" : "box-none"}>
      <Animated.View style={[styles.overlay, overlayStyle]}>
        <Pressable style={styles.overlayFill} onPress={onClose} />
      </Animated.View>

      <Animated.View style={[styles.container, drawerStyle]}>
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFill,
    zIndex: 40,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "#000",
  },
  overlayFill: {
    flex: 1,
  },
  container: {
    height: "100%",
    backgroundColor: "#fff",
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
});

export default CustomDrawerLayout;
