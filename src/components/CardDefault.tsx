import clsx from "clsx";
import { ComponentProps, forwardRef } from "react";

const CardDefault = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "border-2 border-zinc-300 bg-zinc-50 p-4 shadow",
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

CardDefault.displayName = "CardDefault";

export { CardDefault };
