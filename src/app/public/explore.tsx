import BookCard from "@/components/BookCard";
import CategoryList from "@/components/CategoryList";
import { Spacing } from "@/constants/globalValue";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { FlatList, Pressable, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const mockBooks = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Classic",
    price: "199000",
    thumbnail: "https://example.com/great-gatsby.jpg",
    rating: 4.5,
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Classic",
    price: "159000",
    thumbnail: "https://example.com/to-kill-a-mockingbird.jpg",
    rating: 4.8,
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    category: "Dystopian",
    price: "179000",
    thumbnail: "https://example.com/1984.jpg",
    rating: 4.6,
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Romance",
    price: "149000",
    thumbnail: "https://example.com/pride-and-prejudice.jpg",
    rating: 4.7,
  },
  {
    id: "5",
    title: "1984",
    author: "George Orwell",
    category: "Dystopian",
    price: "179000",
    thumbnail: "https://example.com/1984.jpg",
    rating: 4.6,
  },
  {
    id: "6",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Romance",
    price: "149000",
    thumbnail: "https://example.com/pride-and-prejudice.jpg",
    rating: 4.7,
  },
];

export default function UiDemoScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={mockBooks}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: Spacing.md }}
        contentContainerStyle={{ padding: Spacing.md, gap: Spacing.md }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={{ gap: Spacing.md }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: Spacing.sm,
                height: 40,
                borderRadius: 8,
                paddingHorizontal: Spacing.sm,
                backgroundColor: "#e6e8ea",
              }}
            >
              <MaterialIcons name="search" size={24} color="#1c1c1e" />
              <TextInput
                placeholder="Tìm kiếm sản phẩm..."
                style={{ flex: 1 }}
              />
              <Pressable>
                <Ionicons name="options-outline" size={24} color="#1c1c1e" />
              </Pressable>
            </View>

            <CategoryList />
          </View>
        }
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              gap: Spacing.sm,
              justifyContent: "center",
            }}
          >
            <BookCard
              id={item.id}
              title={item.title}
              author={item.author}
              price={item.price}
              thumbnail={item.thumbnail}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
