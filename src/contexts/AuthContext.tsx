/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-empty-function */
import { User, signInWithEmailAndPassword } from "firebase/auth";
import React, {
  Context,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { appAuth } from "../libs/FirebaseApp";

interface Auth {
  email: string | null;
  token: string | null;
}

interface LoginCredential {
  email: string;
  password: string;
}

interface AuthContext {
  auth: Auth | null;
  loading: boolean;
  login: (credential: LoginCredential) => Promise<void>;
  loginError: boolean;
  logout: () => Promise<void>;
}

const authContext: Context<AuthContext> = createContext<AuthContext>({
  auth: null,
  loading: true,
  login: async () => {},
  loginError: false,
  logout: async () => {},
});

const formatAuthState = (user: User): Auth => ({
  email: user.email,
  token: null,
});

function useProvideAuth() {
  // const navigate = useNavigate();
  const [auth, setAuth] = useState<Auth | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loginError, setLoginError] = useState<boolean>(false);

  function clear() {
    setAuth(null);
    setLoading(true);
  }

  async function login(credential: LoginCredential) {
    const { email, password } = credential;
    await signInWithEmailAndPassword(appAuth, email, password)
      // .then((user) => setAuth)
      .catch(() => setLoginError(true));
  }

  const logout = () => appAuth.signOut().then(clear);

  useEffect(() => {
    const unsubscribe = appAuth.onAuthStateChanged(
      async (authState: User | null) => {
        if (!authState) {
          setLoading(false);
          // navigate("/login");
          return;
        }

        const formattedAuth = formatAuthState(authState);
        formattedAuth.token = await authState.getIdToken();
        setAuth(formattedAuth);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  return {
    auth,
    loading,
    login,
    loginError,
    logout,
  };
}

type ProviderProps = { children: React.ReactNode };

export function AuthProvider({ children }: ProviderProps) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);
