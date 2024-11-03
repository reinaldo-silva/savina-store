import clsx from "clsx";
import { forwardRef, HTMLAttributes, ReactNode } from "react";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: ReactNode;
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as: Tag = "h2", children, className, ...rest }, ref) => {
    return (
      <Tag
        ref={ref}
        className={clsx(
          "text-balance font-title font-bold uppercase text-zinc-900",
          {
            "text-4xl": Tag === "h1",
            "text-3xl": Tag === "h2",
            "text-2xl": Tag === "h3",
            "text-xl": Tag === "h4",
            "text-lg": Tag === "h5",
            "text-base": Tag === "h6",
          },
          className,
        )}
        {...rest}
      >
        {children}
      </Tag>
    );
  },
);

Heading.displayName = "Heading";
