import { Spacing } from "@/constants/globalValue";
import { ScrollView, View } from "react-native";
import CategoryItem from "./CategoryItem";

function CategoryList() {
  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: Spacing.sm }}
      >
        <CategoryItem name="Electronics" isSelected={true} />
        <CategoryItem name="Clothing" />
        <CategoryItem name="Home & Kitchen" />
        <CategoryItem name="Books" />
        <CategoryItem name="Toys & Games" />
        <CategoryItem name="Sports & Outdoors" />
        <CategoryItem name="Health & Personal Care" />
      </ScrollView>
    </View>
  );
}

export default CategoryList;
