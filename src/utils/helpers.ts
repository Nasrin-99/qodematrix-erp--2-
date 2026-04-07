// 👉 clsx: conditional class join karne ke liye
import { clsx, type ClassValue } from "clsx";

// 👉 tailwind classes merge karne ke liye (conflict resolve karta hai)
import { twMerge } from "tailwind-merge";

// ==========================
// 🎨 CLASS MERGE
// ==========================

// 👉 multiple classNames ko merge karta hai (tailwind friendly)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs)); // 👉 clsx + tailwind merge
}

// ==========================
// 💰 FORMAT CURRENCY
// ==========================

// 👉 number ko currency format me convert karta hai (e.g. $100)
export function formatCurrency(amount: number, currency = "USD") {
  if (!amount && amount !== 0) return "-"; // 👉 null/undefined handle

  return new Intl.NumberFormat("en-US", {
    style: "currency", // 👉 currency format
    currency, // 👉 USD default
  }).format(amount);
}

// ==========================
// 📅 FORMAT DATE
// ==========================

// 👉 date ko readable format me convert karta hai
export function formatDate(date: string | Date) {
  if (!date) return "-"; // 👉 empty check

  return new Date(date).toLocaleDateString("en-US", {
    month: "short", // 👉 Jan, Feb
    day: "numeric", // 👉 1, 2
    year: "numeric", // 👉 2026
  });
}

// ==========================
// ⏰ FORMAT DATE + TIME
// ==========================

// 👉 date + time format
export function formatDateTime(date: string | Date) {
  if (!date) return "-"; // 👉 empty check

  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit", // 👉 hour show
    minute: "2-digit", // 👉 minute show
  });
}

// ==========================
// 🔐 TOKEN HELPERS
// ==========================

// 👉 localStorage se token get
export const getToken = () => {
  return localStorage.getItem("token");
};

// 👉 token save karna
export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

// 👉 token remove (logout)
export const removeToken = () => {
  localStorage.removeItem("token");
};

// ==========================
// 🌐 API ERROR HANDLER
// ==========================

// 👉 fetch API error handle karne ke liye
export const handleApiError = async (res: Response) => {
  let message = "Something went wrong"; // 👉 default message

  try {
    const data = await res.json(); // 👉 response parse
    message = data.message || message; // 👉 backend message use
  } catch {} // ❌ silent fail (optional improvement)

  throw new Error(message); // 👉 error throw
};

// ==========================
// 🧠 ROLE HELPERS
// ==========================

// 👉 check user role allowed hai ya nahi
export const hasRole = (userRole: string, roles: string[]) => {
  return roles.includes(userRole);
};

// ==========================
// 🧾 STRING HELPERS
// ==========================

// 👉 first letter capitalize
export const capitalize = (str: string) => {
  if (!str) return ""; // 👉 empty check
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// ==========================
// 🔢 NUMBER FORMAT
// ==========================

// 👉 number ko formatted string banata hai (e.g. 1,000)
export const formatNumber = (num: number) => {
  return new Intl.NumberFormat("en-US").format(num);
};