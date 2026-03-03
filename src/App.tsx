import { Component, type ReactNode } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import "./components/NavBar/NavBar.css";
import Home from "./pages/Home/Home";
import Albums from "./pages/Albums/Albums";
import Lists from "./pages/Lists/Lists";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";

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

export default function App() {
  return (
    <>
      <header className="site-header">
        <NavBar />
      </header>
      <main>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/lists" element={<Lists />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </ErrorBoundary>
      </main>
    </>
  );
}
