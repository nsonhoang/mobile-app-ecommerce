import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function OrderScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text style={{ fontSize: 24, fontWeight: "700", textAlign: "center" }}>
          Orders
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default OrderScreen;
