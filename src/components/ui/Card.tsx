import React from "react";
import { cn } from "../../utils/helpers";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
children: React.ReactNode;
className?: string;

// Header
title?: string;
subtitle?: string;
headerRight?: React.ReactNode;

// Footer
footer?: React.ReactNode;

// States (backend driven)
isLoading?: boolean;
isEmpty?: boolean;
}

export const Card: React.FC<CardProps> = ({
children,
className,
title,
subtitle,
headerRight,
footer,
isLoading,
isEmpty,
...props
}) => {
return (
<div
className={cn(
"bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden",
className
)}
{...props}
>
{/* ===============================
HEADER
=============================== */}
{(title || subtitle || headerRight) && ( <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100"> <div>
{title && ( <h3 className="text-lg font-semibold text-slate-900">
{title} </h3>
)}
{subtitle && ( <p className="text-sm text-slate-500">{subtitle}</p>
)} </div>

```
      {headerRight && <div>{headerRight}</div>}
    </div>
  )}

  {/* ===============================
      BODY (WITH STATES)
  =============================== */}
  <div className="p-6">
    {isLoading ? (
      <div className="flex justify-center py-6">
        <div className="w-6 h-6 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    ) : isEmpty ? (
      <div className="text-center text-slate-500 text-sm">
        No data available
      </div>
    ) : (
      children
    )}
  </div>

  {/* ===============================
      FOOTER
  =============================== */}
  {footer && (
    <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
      {footer}
    </div>
  )}
</div>


);
};
