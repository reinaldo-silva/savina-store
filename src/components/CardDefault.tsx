import clsx from "clsx";
import { ComponentProps } from "react";

export function CardDefault({
  children,
  className,
  ...rest
}: ComponentProps<"div">) {
  return (
    <div
      className={clsx(
        "border-2 border-zinc-300 bg-zinc-50 p-4 shadow",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
