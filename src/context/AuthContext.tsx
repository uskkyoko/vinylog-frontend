import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import type { UserOut, LoginRequest, SignupRequest } from "../types";
import { api, setAuthToken } from "../api";

type AuthStatus = "loading" | "authed" | "anon";

interface AuthState {
  user: UserOut | null;
  status: AuthStatus;
}

type AuthAction =
  | { type: "AUTH_SUCCESS"; payload: UserOut }
  | { type: "AUTH_FAILURE" }
  | { type: "UPDATE_USER"; payload: UserOut }
  | { type: "LOGOUT" };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "AUTH_SUCCESS":
      return { user: action.payload, status: "authed" };
    case "AUTH_FAILURE":
    case "LOGOUT":
      return { user: null, status: "anon" };
    case "UPDATE_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

interface AuthContextValue extends AuthState {
  login: (creds: LoginRequest) => Promise<void>;
  signup: (data: SignupRequest) => Promise<void>;
  logout: () => void;
  updateCurrentUser: (user: UserOut) => void;
  followUser: (username: string) => Promise<void>;
  unfollowUser: (username: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    status: "loading",
  });

  useEffect(() => {
    api
      .getMe()
      .then((user) => dispatch({ type: "AUTH_SUCCESS", payload: user }))
      .catch(() => dispatch({ type: "AUTH_FAILURE" }));
  }, []);

  async function login(creds: LoginRequest) {
    const { access_token } = await api.login(creds);
    setAuthToken(access_token);
    const user = await api.getMe();
    dispatch({ type: "AUTH_SUCCESS", payload: user });
  }

  async function signup(data: SignupRequest) {
    const { access_token } = await api.signup(data);
    setAuthToken(access_token);
    const user = await api.getMe();
    dispatch({ type: "AUTH_SUCCESS", payload: user });
  }

  function logout() {
    api.logout().catch(() => {});
    setAuthToken(null);
    dispatch({ type: "LOGOUT" });
  }

  function updateCurrentUser(user: UserOut) {
    dispatch({ type: "UPDATE_USER", payload: user });
  }

  async function followUser(username: string) {
    await api.followUser(username);
  }

  async function unfollowUser(username: string) {
    await api.unfollowUser(username);
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        signup,
        logout,
        updateCurrentUser,
        followUser,
        unfollowUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
