import { GLOBAL_COLOR } from "@/constants/globalValue";
import { Pressable, Text } from "react-native";

interface CategoryItemProps {
  // Define any props you need for the CategoryItem component
  name: string;
  isSelected?: boolean;
}

function CategoryItem({ name, isSelected }: CategoryItemProps) {
  return (
    <Pressable
      style={{
        padding: 10,
        backgroundColor: isSelected ? "#d0e1fb" : "#e6e8ea",
        borderRadius: 5,
      }}
    >
      <Text style={{ color: isSelected ? GLOBAL_COLOR.primary : "#333" }}>
        {name}
      </Text>
    </Pressable>
  );
}

export default CategoryItem;
