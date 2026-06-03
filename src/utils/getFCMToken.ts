import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export async function getFCMToken() {
  if (!Device.isDevice) {
    throw new Error("Must use physical device");
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });

  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();

    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    throw new Error("Permission denied");
  }

  const token = await Notifications.getDevicePushTokenAsync();

  return token.data;
}
