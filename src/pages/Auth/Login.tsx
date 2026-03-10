import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/Button";
import { FormField } from "../../components/FormField";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setError(null);
    setLoading(true);
    try {
      await login({
        email: fd.get("email") as string,
        password: fd.get("password") as string,
      });
      navigate("/");
    } catch (e) {
      setError(`Invalid email or password. ${e}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth">
      <div className="auth__card">
        <div className="auth__header">
          <p className="eyebrow">Welcome back</p>
          <h1 className="auth__title">Log In</h1>
        </div>
        <form className="auth__form" onSubmit={handleSubmit}>
          <FormField label="Email" htmlFor="email">
            <input
              className="form-field__input"
              type="email"
              id="email"
              name="email"
              required
            />
          </FormField>
          <FormField label="Password" htmlFor="password">
            <input
              className="form-field__input"
              type="password"
              id="password"
              name="password"
              required
            />
          </FormField>
          <Button
            type="submit"
            variant="primary"
            className="auth__submit"
            disabled={loading}
          >
            {loading ? "Logging in…" : "Log In"}
          </Button>
        </form>
        {error && <p className="auth__error">{error}</p>}
        <p className="auth__alt">
          No account?{" "}
          <Link to="/signup" className="auth__link">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
}
