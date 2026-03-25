import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost" | "danger";
}

const Button = ({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) => {
  const variants = {
    primary:
      "bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-100",
    outline: "border-2 border-orange-500 text-orange-500 hover:bg-orange-50",
    ghost: "text-gray-600 hover:bg-gray-100",
    danger: "bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-100",
  };
  return (
    <button
      className={cn(
        "px-6 py-2.5 rounded-xl font-bold transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
