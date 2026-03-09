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
  token: string | null;
  status: AuthStatus;
}

type AuthAction =
  | { type: "AUTH_SUCCESS"; payload: { user: UserOut; token: string } }
  | { type: "AUTH_FAILURE" }
  | { type: "UPDATE_USER"; payload: UserOut }
  | { type: "LOGOUT" };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "AUTH_SUCCESS":
      return {
        user: action.payload.user,
        token: action.payload.token,
        status: "authed",
      };
    case "AUTH_FAILURE":
    case "LOGOUT":
      return { user: null, token: null, status: "anon" };
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
    token: null,
    status: "loading",
  });

  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (!stored) {
      dispatch({ type: "AUTH_FAILURE" });
      return;
    }
    setAuthToken(stored);
    api
      .getMe()
      .then((user) =>
        dispatch({ type: "AUTH_SUCCESS", payload: { user, token: stored } }),
      )
      .catch(() => {
        localStorage.removeItem("token");
        setAuthToken(null);
        dispatch({ type: "AUTH_FAILURE" });
      });
  }, []);

  async function login(creds: LoginRequest) {
    const { access_token } = await api.login(creds);
    localStorage.setItem("token", access_token);
    setAuthToken(access_token);
    const user = await api.getMe();
    dispatch({ type: "AUTH_SUCCESS", payload: { user, token: access_token } });
  }

  async function signup(data: SignupRequest) {
    const { access_token } = await api.signup(data);
    localStorage.setItem("token", access_token);
    setAuthToken(access_token);
    const user = await api.getMe();
    dispatch({ type: "AUTH_SUCCESS", payload: { user, token: access_token } });
  }

  function logout() {
    api.logout().catch(() => {});
    localStorage.removeItem("token");
    setAuthToken(null);
    dispatch({ type: "LOGOUT" });
  }

  function updateCurrentUser(user: UserOut) {
    dispatch({ type: "UPDATE_USER", payload: user });
  }

  async function followUser(username: string) {
    await api.followUser(username);
    const user = await api.getMe();
    dispatch({ type: "UPDATE_USER", payload: user });
  }

  async function unfollowUser(username: string) {
    await api.unfollowUser(username);
    const user = await api.getMe();
    dispatch({ type: "UPDATE_USER", payload: user });
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
