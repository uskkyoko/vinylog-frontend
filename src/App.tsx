import { Component, type ReactNode } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Albums from "./pages/Albums/Albums";
import Lists from "./pages/Lists/Lists";
import Profile from "./pages/Profile/Profile";
import Reviews from "./pages/Reviews/Reviews";
import Settings from "./pages/Settings/Settings";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import AlbumDetail from "./pages/AlbumDetail/AlbumDetail";
import ReviewDetail from "./pages/ReviewDetail/ReviewDetail";
import Search from "./pages/Search/Search";
import CreateReview from "./pages/CreateReview/CreateReview";
import { useAuth } from "./context/AuthContext";

class ErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: "2rem", fontFamily: "monospace" }}>
          <h2>Render error</h2>
          <pre style={{ color: "red" }}>
            {(this.state.error as Error).message}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { status } = useAuth();
  if (status === "loading") return null;
  if (status === "anon") return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/albums" element={<Albums />} />
        <Route path="/albums/:id" element={<AlbumDetail />} />
        <Route path="/reviews/:id" element={<ReviewDetail />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/reviews/new"
          element={
            <ProtectedRoute>
              <CreateReview />
            </ProtectedRoute>
          }
        />
        <Route path="/lists" element={<Lists />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reviews"
          element={
            <ProtectedRoute>
              <Reviews />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </ErrorBoundary>
  );
}
