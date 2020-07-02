export interface AuthPayload {
  name: string;
  email: string;
  phone: string;
  position: any;
  file: any;
}

export interface AuthResponse {
  success: boolean;
  user_id: number;
  message: string;
}
