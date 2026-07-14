import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LockKeyhole, LogOut, ShieldCheck, UserRound } from "lucide-react";

type AuthMode = "login" | "register";
type AuthUser = { id: string; email: string; fullName: string; role: string; createdAt: string };
type StoredAuth = { token: string; expiresAt: string; user: AuthUser };

const API_BASE = import.meta.env.VITE_NYIKA_API_URL ?? "http://127.0.0.1:8787";
const AUTH_STORAGE_KEY = "nyika.auth";

function readStoredAuth(): StoredAuth | null {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    return stored ? JSON.parse(stored) as StoredAuth : null;
  } catch {
    return null;
  }
}

export function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [storedAuth, setStoredAuth] = useState<StoredAuth | null>(() => readStoredAuth());
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("traveller");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = readStoredAuth();
    if (!auth?.token) return;

    fetch(`${API_BASE}/api/auth/me`, {
      headers: { Authorization: `Bearer ${auth.token}` }
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Session expired");
        const data = await response.json();
        const nextAuth = { ...auth, user: data.user as AuthUser };
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextAuth));
        setStoredAuth(nextAuth);
      })
      .catch(() => {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        setStoredAuth(null);
      });
  }, []);

  async function submitAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_BASE}/api/auth/${mode === "login" ? "login" : "register"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Nyika-Client": "web-mvp" },
        body: JSON.stringify({ email, password, fullName, role })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Login failed");
      }

      const nextAuth: StoredAuth = { token: data.token, expiresAt: data.expiresAt, user: data.user };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextAuth));
      setStoredAuth(nextAuth);
      setMessage("You are signed in.");
      setPassword("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    const token = storedAuth?.token;
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setStoredAuth(null);
    setMessage("Logged out.");

    if (token) {
      fetch(`${API_BASE}/api/auth/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      }).catch(() => undefined);
    }
  }

  return (
    <section className="section pageTop authPage">
      <div className="container authShell">
        <div className="authIntro">
          <span className="pill">Postgres login</span>
          <h1>Secure accounts for Nyika AI.</h1>
          <p>Login now has a real backend path: users and sessions are stored in PostgreSQL when the backend is connected with <code>DATABASE_URL</code>.</p>
          <div className="authTrustGrid">
            <span><ShieldCheck size={18} /> Passwords are hashed</span>
            <span><LockKeyhole size={18} /> Sessions use secure tokens</span>
            <span><UserRound size={18} /> Roles support travellers, operators and admins</span>
          </div>
        </div>

        <div className="authCard">
          {storedAuth ? (
            <div className="authSignedIn">
              <span className="pill">Signed in</span>
              <h2>{storedAuth.user.fullName || storedAuth.user.email}</h2>
              <p>{storedAuth.user.email}</p>
              <p className="authRole">{storedAuth.user.role}</p>
              <div className="authActions">
                <Link className="button" to="/saved-trips">Open memories</Link>
                <button className="button secondary" type="button" onClick={logout}><LogOut size={18} /> Log out</button>
              </div>
            </div>
          ) : (
            <>
              <div className="authModeTabs">
                <button className={mode === "login" ? "active" : ""} type="button" onClick={() => setMode("login")}>Login</button>
                <button className={mode === "register" ? "active" : ""} type="button" onClick={() => setMode("register")}>Create account</button>
              </div>

              <form className="authForm" onSubmit={submitAuth}>
                {mode === "register" && (
                  <label>
                    Full name
                    <input value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Trust Zhou" autoComplete="name" />
                  </label>
                )}

                <label>
                  Email
                  <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" type="email" autoComplete="email" />
                </label>

                <label>
                  Password
                  <input value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} />
                </label>

                {mode === "register" && (
                  <label>
                    Account type
                    <select value={role} onChange={(event) => setRole(event.target.value)}>
                      <option value="traveller">Traveller</option>
                      <option value="operator">Tourism operator</option>
                      <option value="admin">Admin</option>
                    </select>
                  </label>
                )}

                <button className="button" type="submit" disabled={loading}>
                  {loading ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
                </button>
              </form>
            </>
          )}

          {message && <p className="authMessage">{message}</p>}
        </div>
      </div>
    </section>
  );
}
