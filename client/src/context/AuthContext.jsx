import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

const AuthContext = createContext(null);

function getSavedUser() {
  try {
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    sessionStorage.removeItem("user");
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getSavedUser);

  const login = useCallback((userData, accessToken) => {
    sessionStorage.setItem("user", JSON.stringify(userData));
    sessionStorage.setItem("accessToken", accessToken);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("accessToken");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }

  return context;
}