"use client";
import { animated, useSpring } from "@react-spring/web";
import clsx from "clsx";
import { House, LucideIcon, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { UrlObject } from "url";

const FooterNavigation = () => {
  const [isVisible, setIsVisible] = useState(false);

  const style = useSpring({
    to: { transform: isVisible ? "translateY(0%)" : "translateY(100%)" },
    config: { tension: 170, friction: 26 },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <animated.footer
      style={style}
      className="fixed bottom-0 left-0 right-0 border-t bg-white shadow-lg md:hidden"
    >
      <nav className="flex items-center justify-around py-2">
        <IconButton Icon={House} to={"/"} description="Início" />
        <IconButton Icon={Search} to={"/search"} description="Pesquisar" />
        <IconButton
          Icon={ShoppingCart}
          to={"/shop-cart"}
          description="Carrinho"
          notifyNumber={2}
        />
        <IconButton Icon={User} to={"/profile"} description="Perfil" />
      </nav>
    </animated.footer>
  );
};

type Url = string | UrlObject;

interface IconButtonProps {
  Icon: LucideIcon;
  description: string;
  to?: Url;
  notifyNumber?: number;
}

function IconButton({ Icon, to, description, notifyNumber }: IconButtonProps) {
  const pathname = usePathname();
  const isActive = pathname === to;

  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setTextWidth((isActive ? ref.current.offsetWidth : 0) + 56);
    }
  }, [description, isActive]);

  const ref = useRef<HTMLSpanElement>(null);

  const descriptionSpring = useSpring({
    opacity: isActive ? 1 : 0,
    config: { tension: 200, friction: 20 },
  });

  const contentSpring = useSpring({
    width: textWidth,
    config: { tension: 200, friction: 20 },
  });

  return (
    <Link href={to || pathname} className="relative">
      <animated.div
        style={contentSpring}
        className={clsx(
          "flex items-center gap-2 rounded-full p-3 transition-colors",
          {
            "text-zinc-900": isActive,
            "text-zinc-400": !isActive,
          },
        )}
      >
        <div className="relative">
          <Icon size={20} strokeWidth={isActive ? 3 : 2} />
          {notifyNumber && (
            <span
              className={clsx(
                "absolute -right-3 -top-3 flex size-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-white",
                {
                  "!text-[9px]": notifyNumber > 9,
                },
              )}
            >
              {notifyNumber > 9 ? "9+" : notifyNumber}
            </span>
          )}
        </div>

        <animated.span
          style={descriptionSpring}
          ref={ref}
          className={clsx(
            "absolute left-9 overflow-hidden whitespace-nowrap font-bold",
            {},
          )}
        >
          {description}
        </animated.span>
      </animated.div>
    </Link>
  );
}

export { FooterNavigation };
