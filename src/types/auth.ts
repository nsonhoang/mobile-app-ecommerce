export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  code: number;
  timestamp: string;
}

export interface UserResponseDto {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  status: "ACTIVE" | "INACTIVE";
  roleId: string;
}

export interface LoginData {
  accessToken: string;
  expiresAt: number;
  csrfToken: string;
  tokenType: string;
}

export type LoginResponse = ApiResponse<LoginData>;

export interface RegisterData {
  otpToken: string;
}

export type RegisterResponse = ApiResponse<string>; // Returns otpToken as data
export type ValidateOtpResponse = ApiResponse<UserResponseDto>;
