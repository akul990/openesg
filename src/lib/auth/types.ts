export type Plan = "free" | "starter" | "professional";

export interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: Plan;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
}
