import { GLOBAL_COLOR, Spacing } from "@/constants/globalValue";
import { Pressable, StyleSheet, Text } from "react-native";

interface ButtonSelectStatusProps {
  status: {
    label: string;
    value: string;
  };
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
}
function ButtonSelectStatus({
  status,
  selectedStatus,
  setSelectedStatus,
}: ButtonSelectStatusProps) {
  return (
    <Pressable
      style={{
        backgroundColor:
          selectedStatus === status.value ? GLOBAL_COLOR.primary : "#fff",
        marginRight: Spacing.md,
        padding: Spacing.sm,
        borderWidth: 1,
        borderColor:
          selectedStatus === status.value ? GLOBAL_COLOR.primary : "#cdcedc",
        borderRadius: 30,
      }}
      key={status.value}
      onPress={() => setSelectedStatus(status.value)}
    >
      <Text
        style={{ color: selectedStatus === status.value ? "#fff" : "#000" }}
      >
        {status.label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
export default ButtonSelectStatus;
