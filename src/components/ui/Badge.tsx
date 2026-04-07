import React from "react";
import { cn } from "../../utils/helpers";

type Variant =
| "success"
| "warning"
| "danger"
| "info"
| "neutral"
| "role"
| "status";

interface BadgeProps {
children?: React.ReactNode;
variant?: Variant;
value?: string; // 👈 dynamic backend value
className?: string;
}

export const Badge = ({
children,
variant = "neutral",
value,
className,
}: BadgeProps) => {
// ===============================
// 🎨 STATIC VARIANTS
// ===============================
const baseVariants = {
success: "bg-emerald-50 text-emerald-700 border-emerald-100",
warning: "bg-amber-50 text-amber-700 border-amber-100",
danger: "bg-red-50 text-red-700 border-red-100",
info: "bg-indigo-50 text-indigo-700 border-indigo-100",
neutral: "bg-slate-50 text-slate-700 border-slate-100",
};

// ===============================
// 🔐 ROLE BASED (FROM BACKEND)
// ===============================
const roleVariants: any = {
superadmin: "bg-purple-100 text-purple-700 border-purple-200",
schooladmin: "bg-blue-100 text-blue-700 border-blue-200",
teacher: "bg-green-100 text-green-700 border-green-200",
student: "bg-yellow-100 text-yellow-700 border-yellow-200",
parent: "bg-pink-100 text-pink-700 border-pink-200",
};

// ===============================
// 📊 STATUS BASED (FROM BACKEND)
// ===============================
const statusVariants: any = {
active: "bg-green-50 text-green-700 border-green-100",
inactive: "bg-gray-100 text-gray-600 border-gray-200",
pending: "bg-yellow-50 text-yellow-700 border-yellow-100",
paid: "bg-green-50 text-green-700 border-green-100",
unpaid: "bg-red-50 text-red-700 border-red-100",
};

// ===============================
// 🔀 FINAL STYLE LOGIC
// ===============================
let finalStyle = baseVariants[variant as keyof typeof baseVariants];

if (variant === "role" && value) {
finalStyle = roleVariants[value] || baseVariants.neutral;
}

if (variant === "status" && value) {
finalStyle = statusVariants[value] || baseVariants.neutral;
}

return (
<span
className={cn(
"inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
finalStyle,
className
)}
>
{children || value} </span>
);
};
