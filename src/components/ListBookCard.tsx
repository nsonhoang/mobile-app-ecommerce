import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BookCard from "./BookCard";

const mockBooks = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: "199000",
    thumbnail: "https://example.com/great-gatsby.jpg",
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: "159000",
    thumbnail: "https://example.com/to-kill-a-mockingbird.jpg",
  },
];

function ListBookCard() {
  return (
    <View style={{ marginTop: 16 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 16 }}
      >
        {mockBooks.map((book) => (
          <BookCard
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            price={book.price}
            thumbnail={book.thumbnail}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default ListBookCard;
