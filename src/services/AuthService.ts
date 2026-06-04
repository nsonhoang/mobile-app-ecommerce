import api from "./api";
import { LoginResponse, RegisterResponse, ValidateOtpResponse } from "@/types/auth";

export interface LoginPayload {
  email: string;
  password?: string;
  fcmToken?: string | null;
  deviceOs?: string;
}

export interface RegisterPayload {
  email: string;
  password?: string;
  confirmPassword?: string;
  name: string;
  phone?: string;
}

export const AuthService = {
  login: async (payload: LoginPayload): Promise<LoginResponse["data"]> => {
    const response = await api.post<LoginResponse>("/v1/auth/login", payload);
    return response.data.data;
  },

  register: async (payload: RegisterPayload): Promise<string> => {
    const response = await api.post<RegisterResponse>("/v1/auth/register", payload);
    return response.data.data; // This returns the otpToken as a string
  },

  verifyOtp: async (otpToken: string, otp: string): Promise<ValidateOtpResponse["data"]> => {
    const response = await api.post<ValidateOtpResponse>(`/v1/auth/register/${otpToken}`, { otp });
    return response.data.data; // Returns UserResponseDto
  },

  getProfile: async (): Promise<ValidateOtpResponse["data"]> => {
    const response = await api.get<ValidateOtpResponse>("/v1/users/profile");
    return response.data.data;
  },
};
