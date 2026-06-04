import axios from "axios";
import * as Device from "expo-device";
import { Platform } from "react-native";
import { useAuthStore } from "@/hooks/useAuthStore";
import { API_URL } from "@/constants/globalValue";

export const getDeviceId = () => {
  return `${Device.osName || Platform.OS}-${Device.osVersion || ""}-${Device.modelName || "Device"}`;
};

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add authorization token and device id
api.interceptors.request.use(
  async (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const csrf = useAuthStore.getState().csrfToken;
    if (csrf) {
      config.headers["x-csrf-token"] = csrf;
    }
    config.headers["x-device-id"] = getDeviceId();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Flag to prevent multiple concurrent refresh token requests
let isRefreshing = false;
// Queue to hold requests that are waiting for the refresh token
let failedQueue: {
  resolve: (value: any) => void;
  reject: (reason: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response interceptor to handle errors globally (e.g. 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 Unauthorized and request has not been retried yet
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      // If we are already refreshing, push request to queue
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const deviceId = getDeviceId();
        const csrfToken = useAuthStore.getState().csrfToken;

        // Perform the refresh token call using basic axios to avoid interceptor loop
        const refreshResponse = await axios.post(
          `${API_URL}/v1/auth/refresh-token`,
          {},
          {
            withCredentials: true,
            headers: {
              "x-device-id": deviceId,
              "x-csrf-token": csrfToken || "",
            },
          }
        );

        const { accessToken, csrfToken: newCsrfToken } = refreshResponse.data.data;

        // Update auth store with new tokens
        const currentUser = useAuthStore.getState().user;
        if (currentUser) {
          await useAuthStore.getState().login(currentUser, accessToken, newCsrfToken);
        } else {
          useAuthStore.setState({ accessToken, csrfToken: newCsrfToken });
        }

        // Resolve pending requests in the queue
        processQueue(null, accessToken);

        // Update original request headers and retry
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        originalRequest.headers["x-csrf-token"] = newCsrfToken;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh token fails (expired/invalid refresh token), log user out
        processQueue(refreshError, null);
        await useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
