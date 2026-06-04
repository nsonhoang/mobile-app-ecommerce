// store/useAuthStore.ts
import { create } from "zustand";

// 1. Định nghĩa kiểu dữ liệu cho Store (Nếu dùng TypeScript)
interface AuthState {
  user: any | null;
  isLoading: boolean;
  login: (userData: any) => void;
  logout: () => void;
}

// 2. Khởi tạo Store với hàm create
export const useAuthStore = create<AuthState>((set) => ({
  // Trạng thái ban đầu (State)
  user: null,
  isLoading: false,

  // Các hành động thay đổi trạng thái (Actions)
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
}));
