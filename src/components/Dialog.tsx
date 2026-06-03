import { GLOBAL_COLOR, Spacing } from "@/constants/globalValue";
import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps, ReactNode } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

type DialogProps = {
  visible: boolean;
  title: string;
  description?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
  children?: ReactNode;
};

export default function Dialog({
  visible,
  title,
  description,
  iconName = "alert-circle-outline",
  iconColor = GLOBAL_COLOR.primary,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  onConfirm,
  onCancel,
  loading = false,
  children,
}: DialogProps) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent
    >
      <Pressable style={styles.backdrop} onPress={onCancel}>
        <Pressable style={styles.card} onPress={() => undefined}>
          <View
            style={[styles.iconWrap, { backgroundColor: `${iconColor}15` }]}
          >
            <Ionicons name={iconName} size={28} color={iconColor} />
          </View>

          <Text style={styles.title}>{title}</Text>

          {description ? (
            <Text style={styles.description}>{description}</Text>
          ) : null}

          {children ? <View style={styles.content}>{children}</View> : null}

          <View style={styles.actions}>
            <Pressable
              onPress={onCancel}
              style={({ pressed }) => [
                styles.secondaryButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.secondaryText}>{cancelText}</Text>
            </Pressable>

            <Pressable
              onPress={onConfirm}
              disabled={loading}
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && !loading && styles.pressed,
                loading && styles.primaryButtonDisabled,
              ]}
            >
              <Text style={styles.primaryText}>
                {loading ? "Đang xử lý..." : confirmText}
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.55)",
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.lg,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    borderRadius: 24,
    backgroundColor: "#ffffff",
    padding: Spacing.lg,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
  },
  title: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "700",
  },
  description: {
    color: "#4b5563",
    fontSize: 14,
    lineHeight: 20,
    marginTop: Spacing.xs,
  },
  content: {
    marginTop: Spacing.md,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: Spacing.lg,
  },
  secondaryButton: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#d1d5db",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  primaryButton: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GLOBAL_COLOR.primary,
  },
  primaryButtonDisabled: {
    opacity: 0.75,
  },
  secondaryText: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "600",
  },
  primaryText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.85,
  },
});
