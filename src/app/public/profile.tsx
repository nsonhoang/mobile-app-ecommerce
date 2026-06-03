import { Spacing } from "@/constants/globalValue";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Profile() {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(128);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: Spacing.md }}>{/* khung Avatar và tên  */}</View>
    </SafeAreaView>
  );
}

export default Profile;
