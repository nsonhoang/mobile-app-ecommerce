import { ScrollView, View } from "react-native";
import CartBookWithStarRate from "./CardBoookWithStarRate";

const mockBooks = [
  {
    id: "1",
    title: "The Great Gatsby",
    category: "Classic",
    price: "199000",
    thumbnail: "https://example.com/great-gatsby.jpg",
    rating: 4.5,
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    category: "Classic",
    price: "159000",
    thumbnail: "https://example.com/to-kill-a-mockingbird.jpg",
    rating: 4.8,
  },
];
function ListCartBookWithStarRateVertical() {
  return (
    <View style={{ marginTop: 16 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 16 }}
      >
        {mockBooks.map((book) => (
          <CartBookWithStarRate key={book.id} {...book} />
        ))}
      </ScrollView>
    </View>
  );
}

export default ListCartBookWithStarRateVertical;
