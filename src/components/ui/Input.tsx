import React from "react";
import { cn } from "../../utils/helpers";

interface InputProps
extends React.InputHTMLAttributes<HTMLInputElement> {
label?: string;
error?: string;

// Extra features
hint?: string;
required?: boolean;
leftIcon?: React.ReactNode;
rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
(
{
className,
label,
error,
hint,
required,
leftIcon,
rightIcon,
...props
},
ref
) => {
return ( <div className="w-full space-y-1.5">
{/* ===============================
LABEL
=============================== */}
{label && ( <label className="text-sm font-medium text-slate-700">
{label}
{required && <span className="text-red-500 ml-1">*</span>} </label>
)}

```
    {/* ===============================
        INPUT WRAPPER (ICON SUPPORT)
    =============================== */}
    <div className="relative">
      {leftIcon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {leftIcon}
        </span>
      )}

      <input
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-lg border bg-white text-sm transition-all",
          "border-slate-200 px-3 py-2 placeholder:text-slate-500",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
          "disabled:cursor-not-allowed disabled:opacity-50",

          leftIcon && "pl-10",
          rightIcon && "pr-10",

          error && "border-red-500 focus-visible:ring-red-500",

          className
        )}
        {...props}
      />

      {rightIcon && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
          {rightIcon}
        </span>
      )}
    </div>

    {/* ===============================
        ERROR / HINT
    =============================== */}
    {error ? (
      <p className="text-xs text-red-500">{error}</p>
    ) : hint ? (
      <p className="text-xs text-slate-500">{hint}</p>
    ) : null}
  </div>
);


}
);

Input.displayName = "Input";
