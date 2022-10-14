import React from "react";
import clsx from "clsx";

type Theme =
  | "primary"
  | "secondary"
  | "tertiary"
  | "danger"
  | "success"
  | "warning";

type Size = "small" | "medium" | "large";

type Type = "button" | "submit" | "reset";

interface ButtonProps {
  title?: string;
  onClick?: () => void;
  theme: Theme;
  size: Size;
  children?: React.ReactNode;
  type?: Type;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  theme,
  size,
  children,
  type,
}) => {
  return (
    <button
      type={type}
      className={clsx(
        "rounded font-bold transition-colors duration-200 ease-in-out",
        {
          " bg-slate-200 text-slate-900 hover:bg-slate-400":
            theme === "primary",
          " bg-sky-200 text-sky-900 hover:bg-sky-300": theme === "secondary",
          " bg-indigo-200 text-indigo-900 hover:bg-indigo-300":
            theme === "tertiary",
          " bg-red-200 text-red-900  hover:bg-red-300": theme === "danger",
          " bg-green-200 text-green-900 hover:bg-green-300":
            theme === "success",
          " bg-yellow-200 text-yellow-900 hover:bg-yellow-300":
            theme === "warning",
          " py-1 px-2 text-xs": size === "small",
          " py-2 px-4 text-sm": size === "medium",
          " py-3 px-6 text-base": size === "large",
        }
      )}
      onClick={onClick}
    >
      {children ? children : title}
    </button>
  );
};

export default Button;
