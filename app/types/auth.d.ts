interface User {
  id: string;
  email?: string | null;
  name?: string | null;
  status: false;
}

interface UserInput {
  email: string;
  password: string;
  name?: string;
}

interface AuthResponse {
  success: boolean;
  data?: any;
  error?: string;
}

interface Token {
  access_token: string;
  expires_in: bigint;
  token_type: string;
}
