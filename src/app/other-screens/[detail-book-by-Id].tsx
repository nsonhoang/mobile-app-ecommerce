import CustomHeader from "@/components/CustomHeader";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

function DetailBookScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  return (
    <View>
      <CustomHeader
        title="Tên sách"
        leftIcon={
          <Pressable
            onPress={() => {
              // Handle back button press
              router.back();
            }}
          >
            <MaterialIcons name="arrow-back" size={26} color="#111" />
          </Pressable>
        }
        onLeftIconPress={() => {
          // Handle back button press
          router.back();
        }}
      />
      <Text>Detail Book Screen</Text>
      <Text>Book ID: {id}</Text>
    </View>
  );
}

export default DetailBookScreen;
