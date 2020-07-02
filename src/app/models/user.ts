export interface UsersInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  position_id: string;
  registration_timestamp: number;
  photo: string;
}

export interface Link {
  next_url: string;
  prev_url: boolean;
}

export interface User {
  success: boolean;
  page: number;
  total_pages: number;
  total_users: number;
  count: number;
  links: Link;
  users: UsersInfo[];
}
