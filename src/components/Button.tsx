import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { zinc } from "tailwindcss/colors";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon?: LucideIcon;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ Icon, children, disabled, className, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "flex items-center gap-2 border-2 border-zinc-900 p-2 px-8 font-medium text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-zinc-100",
          {
            "cursor-not-allowed bg-zinc-300": disabled,
            "bg-zinc-white": !disabled,
          },
          className,
        )}
        disabled={disabled}
        {...rest}
      >
        {children}
        {Icon && <Icon size={20} color={zinc[600]} />}
      </button>
    );
  },
);

Button.displayName = "Button";
