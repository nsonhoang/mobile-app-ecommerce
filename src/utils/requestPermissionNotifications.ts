import * as Notifications from "expo-notifications";

export async function requestNotificationPermission() {
  const { status } = await Notifications.getPermissionsAsync();

  if (status !== "granted") {
    const result = await Notifications.requestPermissionsAsync();
    return result.status === "granted";
  }

  return true;
}
