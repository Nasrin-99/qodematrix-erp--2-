import React from "react";
import { cn } from "../../utils/helpers";

interface ButtonProps
extends React.ButtonHTMLAttributes<HTMLButtonElement> {
variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "success";
size?: "sm" | "md" | "lg" | "icon";
isLoading?: boolean;
fullWidth?: boolean;
leftIcon?: React.ReactNode;
rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
(
{
className,
variant = "primary",
size = "md",
isLoading,
fullWidth,
leftIcon,
rightIcon,
children,
...props
},
ref
) => {
// ===============================
// 🎨 VARIANTS
// ===============================
const variants = {
primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm",
secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
outline:
"border border-slate-200 bg-transparent hover:bg-slate-50 text-slate-700",
ghost: "hover:bg-slate-100 text-slate-600",
danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
success: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm",
};


// ===============================
// 📏 SIZES
// ===============================
const sizes = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 py-2 text-sm",
  lg: "h-12 px-8 text-base",
  icon: "h-10 w-10",
};

return (
  <button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
      "disabled:pointer-events-none disabled:opacity-50",
      variants[variant],
      sizes[size],
      fullWidth && "w-full",
      className
    )}
    disabled={isLoading || props.disabled}
    {...props}
  >
    {/* ===============================
        ⏳ LOADING STATE (API CALL)
    =============================== */}
    {isLoading ? (
      <svg
        className="mr-2 h-4 w-4 animate-spin"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 
          0 0 5.373 0 12h4zm2 
          5.291A7.962 7.962 0 
          014 12H0c0 3.042 
          1.135 5.824 3 
          7.938l3-2.647z"
        />
      </svg>
    ) : (
      leftIcon && <span className="mr-2">{leftIcon}</span>
    )}

    {children}

    {!isLoading && rightIcon && (
      <span className="ml-2">{rightIcon}</span>
    )}
  </button>
);


}
);

Button.displayName = "Button";
