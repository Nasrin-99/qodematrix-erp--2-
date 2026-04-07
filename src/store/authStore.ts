import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "../api/services";

// 👉 roles define kar rahe (system me kaun kaun login kar sakta hai)
export type UserRole =
  | "superadmin"
  | "schooladmin"
  | "teacher"
  | "student"
  | "parent";

// 👉 user ka structure (backend se ye data aayega)
interface User {
  id: string;
  _id?: string;
  name: string;
  email: string;
  role: UserRole;
  schoolId?: string;
  avatar?: string;
}

// 👉 global auth state
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

// 👉 zustand store create
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({

      // 👉 initial state (app load hone pe ye values rahengi)
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      // =======================
      // 🔐 LOGIN FUNCTION
      // =======================
      login: async (email, password) => {
        try {
          console.log("🔥 LOGIN START");
          console.log("👉 EMAIL:", email);
          console.log("👉 PASSWORD:", password);

          // 👉 loading true kar rahe jab API hit ho
          set({ isLoading: true });

          // 👉 backend login API call
          const data = await authService.login({ email, password });

          // 🔥 DEBUG RESPONSE
          console.log("🔥 LOGIN RESPONSE:", data);
          console.log("👉 TOKEN:", data?.token);
          console.log("👉 USER:", data?.user);

          // 👉 agar token nahi mila to error
          if (!data?.token) {
            console.log("❌ TOKEN NAHI AAYA");
            throw new Error("Token missing");
          }

          // 👉 token ko localStorage me save kar rahe (API ke liye important)
          localStorage.setItem("token", data.token);

          console.log("✅ TOKEN SAVED IN LOCALSTORAGE");

          // 👉 state update kar rahe (global login state)
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
          });

          console.log("✅ LOGIN SUCCESS");

        } catch (error: any) {
          console.log("❌ LOGIN ERROR:", error);
          console.log("❌ ERROR RESPONSE:", error?.response);

          set({ isLoading: false });

          // 👉 backend ka actual error message dikhayega
          throw new Error(
            error?.response?.data?.message || "Login failed"
          );
        }
      },

      // =======================
      // 🔁 SET USER (PROFILE LOAD)
      // =======================
      setUser: (user) => {
        console.log("👉 SET USER:", user);

        set({
          user,
          isAuthenticated: true,
        });
      },

      // =======================
      // 🚪 LOGOUT FUNCTION
      // =======================
      logout: () => {
        console.log("🚪 LOGOUT");

        // 👉 token remove
        localStorage.removeItem("token");

        // 👉 state reset
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

    }),
    {
      name: "auth-storage",

      // 👉 persist me sirf ye save hoga (reload ke baad bhi)
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);