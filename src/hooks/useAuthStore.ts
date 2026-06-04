import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string | null;
  status: string;
  roleId: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  csrfToken: string | null;
  isLoading: boolean;
  initializeAuth: () => Promise<void>;
  login: (user: User, token: string, csrfToken: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  csrfToken: null,
  isLoading: true, // Start as true so that layout guard waits for initialization

  initializeAuth: async () => {
    try {
      const token = await SecureStore.getItemAsync("access_token");
      const csrf = await SecureStore.getItemAsync("csrf_token");
      const userStr = await SecureStore.getItemAsync("user_info");
      
      if (token && userStr) {
        set({
          accessToken: token,
          csrfToken: csrf || null,
          user: JSON.parse(userStr),
          isLoading: false,
        });
      } else {
        set({ accessToken: null, csrfToken: null, user: null, isLoading: false });
      }
    } catch (error) {
      console.error("Failed to initialize auth from storage:", error);
      set({ accessToken: null, csrfToken: null, user: null, isLoading: false });
    }
  },

  login: async (user, token, csrfToken) => {
    try {
      await SecureStore.setItemAsync("access_token", token);
      await SecureStore.setItemAsync("csrf_token", csrfToken);
      await SecureStore.setItemAsync("user_info", JSON.stringify(user));
      set({ user, accessToken: token, csrfToken });
    } catch (error) {
      console.error("Failed to save auth credentials:", error);
    }
  },

  logout: async () => {
    try {
      await SecureStore.deleteItemAsync("access_token");
      await SecureStore.deleteItemAsync("csrf_token");
      await SecureStore.deleteItemAsync("user_info");
      set({ user: null, accessToken: null, csrfToken: null });
    } catch (error) {
      console.error("Failed to clear auth credentials:", error);
    }
  },
}));
