import { FontSize, Spacing } from "@/constants/globalValue";
import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

type AuthFormInputProps = {
  label: string;
  iconName: IoniconName;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: TextInputProps["onBlur"];
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: TextInputProps["autoCapitalize"];
  secureTextEntry?: boolean;
  onToggleSecureEntry?: () => void;
  errorMessage?: string;
};

export default function AuthFormInput({
  label,
  iconName,
  placeholder,
  value,
  onChangeText,
  onBlur,
  keyboardType = "default",
  autoCapitalize = "sentences",
  secureTextEntry = false,
  onToggleSecureEntry,
  errorMessage,
}: AuthFormInputProps) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          errorMessage && styles.inputContainerError,
        ]}
      >
        <Ionicons name={iconName} size={FontSize.md} color="#9899a3" />
        <TextInput
          placeholder={placeholder}
          onBlur={onBlur}
          onChangeText={onChangeText}
          value={value}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          style={styles.input}
        />
        {onToggleSecureEntry ? (
          <TouchableOpacity
            onPress={onToggleSecureEntry}
            style={{ padding: Spacing.xs }}
          >
            <Ionicons
              name={secureTextEntry ? "eye-off-outline" : "eye-outline"}
              size={FontSize.md}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    color: "#9899a3",
    fontSize: 14,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
    fontWeight: "600",
  },
  input: {
    flex: 1,
    height: 46,
    padding: Spacing.md,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#ffffff",
    color: "#9899a3",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#9899a3",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
  },
  inputContainerError: {
    borderColor: "#d93025",
  },
  errorText: {
    color: "#d93025",
    fontSize: 12,
    marginTop: 4,
  },
});
