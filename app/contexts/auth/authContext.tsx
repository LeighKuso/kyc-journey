import { createContext } from "react";
import AuthUser from "~/types/authUser";

interface AuthContextType {
  authUser: AuthUser | null;
  setAuthUser: (user: AuthUser | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
