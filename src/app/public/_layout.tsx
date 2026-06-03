import CustomHeader from "@/components/CustomHeader";
import { GLOBAL_COLOR } from "@/constants/globalValue";
import { NativeTabs } from "expo-router/unstable-native-tabs";

import { View } from "react-native";

const primaryColor = GLOBAL_COLOR.primary;
const backgroundInactiveColor = "#d0e1fb";

function PublicLayout() {
  return (
    <View style={{ flex: 1 }}>
      <CustomHeader title="Book Heaven" />
      <NativeTabs
        backgroundColor="#fff"
        tintColor={primaryColor}
        indicatorColor={backgroundInactiveColor}
      >
        <NativeTabs.Trigger name="index">
          <NativeTabs.Trigger.Label>Trang chủ</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon
            sf={{ default: "house", selected: "house.fill" }}
            md={{ default: "home", selected: "home_filled" }}
          />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="explore">
          <NativeTabs.Trigger.Label>Tìm kiếm</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon
            sf={{
              default: "magnifyingglass",
              selected: "magnifyingglass.circle.fill",
            }}
            md={{ default: "search", selected: "search" }}
          />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="carts">
          <NativeTabs.Trigger.Label>Giỏ hàng</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon
            sf={{
              default: "bag",
              selected: "bag.fill",
            }}
            md={{
              default: "shopping_cart",
              selected: "shopping_cart",
            }}
          />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="orders">
          <NativeTabs.Trigger.Label>Đơn hàng</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon
            sf={{
              default: "briefcase",
              selected: "briefcase.fill",
            }}
            md={{
              default: "receipt",
              selected: "receipt",
            }}
          />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="profile">
          <NativeTabs.Trigger.Label>Tôi</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon
            sf={{
              default: "person",
              selected: "person.fill",
            }}
            md={{
              default: "person",
              selected: "person_outline",
            }}
          />
        </NativeTabs.Trigger>
      </NativeTabs>
    </View>
  );
}

export default PublicLayout;
