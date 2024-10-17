import React, { forwardRef, ReactNode, HTMLAttributes } from "react";
import clsx from "clsx";

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  children: ReactNode;
}

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ size = "md", children, className, ...rest }, ref) => {
    return (
      <p
        ref={ref}
        className={clsx(
          {
            "text-xs": size === "xs",
            "text-sm": size === "sm",
            "text-base": size === "md",
            "text-lg": size === "lg",
            "text-xl": size === "xl",
          },
          className,
        )}
        {...rest}
      >
        {children}
      </p>
    );
  },
);

Text.displayName = "Text";
