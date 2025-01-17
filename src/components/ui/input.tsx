"use client";
import { cn } from "@/lib/utils";
import { Eye, EyeClosed } from "lucide-react";
import * as React from "react";
import { useState } from "react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const [currentType, setCurrentType] = useState(type ?? "text");

    function handleTypeInput() {
      if (currentType === "password") {
        return setCurrentType("text");
      }
      setCurrentType("password");
    }

    return (
      <div className="relative flex h-10 w-full rounded-sm ring-black focus-within:ring-2">
        <input
          type={currentType}
          className={cn(
            "flex-1 rounded-sm border bg-background px-3 py-2 text-base file:border-0 file:bg-transparent file:text-base file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className,
            { "pr-10": currentType === "password" },
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <span
            onClick={handleTypeInput}
            className="absolute right-0 top-0 flex h-full items-center justify-center px-2"
          >
            {currentType === "text" ? <Eye /> : <EyeClosed />}
          </span>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
