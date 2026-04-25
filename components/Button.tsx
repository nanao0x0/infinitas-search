import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

type ButtonSize = "sm" | "md";

interface Props extends ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
  size?: ButtonSize;
}

const SIZE_MAP: Record<ButtonSize, string> = {
  sm: "px-3 py-1 text-[10px]",
  md: "px-4 py-2",
};

export const Button = ({
  children,
  size = "md",
  className,
  ...props
}: Props) => {
  return (
    <button
      type="button"
      className={clsx(
        "rounded-full bg-zinc-800 border border-zinc-500 font-bold cursor-pointer flex items-center justify-center gap-1 select-none hover:opacity-70",
        SIZE_MAP[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
