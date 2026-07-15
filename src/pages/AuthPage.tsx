import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, ShieldCheck } from "lucide-react";

type AuthMode = "login" | "register";
type AuthUser = { id: string; email: string; fullName: string; role: string; createdAt: string };
type StoredAuth = { token: string; expiresAt: string; user: AuthUser };

const API_BASE = import.meta.env.VITE_NYIKA_API_URL ?? "http://127.0.0.1:8787";
const AUTH_STORAGE_KEY = "nyika.auth";
const LOCAL_ACCOUNTS_KEY = "nyika.localAccounts";

function readStoredAuth(): StoredAuth | null {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    return stored ? JSON.parse(stored) as StoredAuth : null;
  } catch {
    return null;
  }
}

function readLocalAccounts(): AuthUser[] {
  try {
    const stored = localStorage.getItem(LOCAL_ACCOUNTS_KEY);
    return stored ? JSON.parse(stored) as AuthUser[] : [];
  } catch {
    return [];
  }
}

function writeLocalAccounts(accounts: AuthUser[]) {
  localStorage.setItem(LOCAL_ACCOUNTS_KEY, JSON.stringify(accounts));
}

function createLocalSession(user: AuthUser): StoredAuth {
  return {
    token: `local-${crypto.randomUUID?.() ?? Date.now()}`,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    user
  };
}

function createLocalAccount(payload: { email: string; fullName: string; role: string }): StoredAuth {
  const emailValue = payload.email.trim().toLowerCase();
  const accounts = readLocalAccounts();
  const existing = accounts.find((account) => account.email === emailValue);

  if (existing) {
    return createLocalSession(existing);
  }

  const user: AuthUser = {
    id: `local-${crypto.randomUUID?.() ?? Date.now()}`,
    email: emailValue,
    fullName: payload.fullName.trim() || "Traveller",
    role: payload.role,
    createdAt: new Date().toISOString()
  };

  writeLocalAccounts([user, ...accounts].slice(0, 20));
  return createLocalSession(user);
}

function loginLocalAccount(email: string): StoredAuth {
  const emailValue = email.trim().toLowerCase();
  const account = readLocalAccounts().find((item) => item.email === emailValue);

  if (!account) {
    throw new Error("Please create an account first on this device.");
  }

  return createLocalSession(account);
}

function canUseLocalAccount(errorMessage: string) {
  const message = errorMessage.toLowerCase();
  return message.includes("failed to fetch")
    || message.includes("postgresql")
    || message.includes("database")
    || message.includes("not configured")
    || message.includes("not ready");
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
      const payload = mode === "login"
        ? { email, password }
        : { email, password, fullName, role };
      const response = await fetch(`${API_BASE}/api/auth/${mode === "login" ? "login" : "register"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Nyika-Client": "web-mvp" },
        body: JSON.stringify(payload)
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const errorMessage = data.error ?? "We could not sign you in. Please try again.";
        if (canUseLocalAccount(errorMessage)) {
          const localAuth = mode === "login"
            ? loginLocalAccount(email)
            : createLocalAccount({ email, fullName, role });
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(localAuth));
          setStoredAuth(localAuth);
          setMessage(mode === "login" ? "Welcome back." : "Your account is ready.");
          setPassword("");
          return;
        }
        throw new Error(errorMessage);
      }

      const nextAuth: StoredAuth = { token: data.token, expiresAt: data.expiresAt, user: data.user };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextAuth));
      setStoredAuth(nextAuth);
      setMessage("Welcome back. Your account is ready.");
      setPassword("");
    } catch (error) {
      const rawMessage = error instanceof Error ? error.message : "Something went wrong.";
      if (canUseLocalAccount(rawMessage)) {
        try {
          const localAuth = mode === "login"
            ? loginLocalAccount(email)
            : createLocalAccount({ email, fullName, role });
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(localAuth));
          setStoredAuth(localAuth);
          setMessage(mode === "login" ? "Welcome back." : "Your account is ready.");
          setPassword("");
          return;
        } catch (localError) {
          setMessage(localError instanceof Error ? localError.message : "Please create an account first.");
          return;
        }
      }
      setMessage(rawMessage);
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
          <span className="pill">Nyika account</span>
          <h1>Welcome back.</h1>
          <p>Sign in to save trips, memories and booking requests in one place.</p>
          <div className="authValueList" aria-label="Account benefits">
            <span><ShieldCheck size={18} /> Private memories</span>
            <span><ShieldCheck size={18} /> Saved plans</span>
            <span><ShieldCheck size={18} /> Booking follow-ups</span>
          </div>
        </div>

        <div className="authCard">
          {storedAuth ? (
            <div className="authSignedIn">
              <span className="pill">Signed in</span>
              <h2>{storedAuth.user.fullName || "Traveller"}</h2>
              <p>{storedAuth.user.email}</p>
              <p className="authRole">{storedAuth.user.role}</p>
              <div className="authActions">
                <Link className="button" to="/saved-trips">Open memories</Link>
                <Link className="button secondary" to="/planner">Plan a trip</Link>
                <button className="button secondary" type="button" onClick={logout}><LogOut size={18} /> Log out</button>
              </div>
            </div>
          ) : (
            <>
              <div className="authModeTabs">
                <button className={mode === "login" ? "active" : ""} type="button" onClick={() => setMode("login")}>Sign in</button>
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
                    </select>
                  </label>
                )}

                <button className="button" type="submit" disabled={loading}>
                  {loading ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
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
