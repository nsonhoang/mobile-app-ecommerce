import { FontSize } from "@/constants/globalValue";
import { Text, View } from "react-native";

function RequireLogin({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: FontSize.lg, color: "#555" }}>
        Vui lòng đăng nhập để tiếp tục
      </Text>
      {children}
    </View>
  );
}

export default RequireLogin;
