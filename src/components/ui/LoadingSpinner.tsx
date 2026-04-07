import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../../utils/helpers";

interface LoadingSpinnerProps {
className?: string;
size?: number;

// New features
fullScreen?: boolean;
text?: string;
}

export const LoadingSpinner = ({
className,
size = 24,
fullScreen = false,
text,
}: LoadingSpinnerProps) => {
return (
<div
className={cn(
"flex flex-col items-center justify-center gap-2",
fullScreen ? "h-screen w-full" : "p-6",
className
)}
> <Loader2
     className="animate-spin text-indigo-600"
     size={size}
   />

```
  {text && (
    <p className="text-sm text-slate-500">{text}</p>
  )}
</div>


);
};
