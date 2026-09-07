const AUTH_KEY = "peony.auth";

export interface AuthUser {
  name: string;
  email?: string;
  joined?: string;
}

export function getAuth(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthUser;
    return parsed && typeof parsed.name === "string" ? parsed : null;
  } catch {
    return null;
  }
}

export function login(): AuthUser {
  const user: AuthUser = {
    name: "Learner",
    email: "learner@peony.app",
    joined: new Date().toISOString(),
  };
  if (typeof window !== "undefined") {
    window.localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  }
  return user;
}

export function logout() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(AUTH_KEY);
  } catch {
    // ignore
  }
}
