import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const styles = {
  primary:
    "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg",
  secondary:
    "bg-slate-700 hover:bg-slate-800 text-white shadow-md hover:shadow-lg",
  danger:
    "bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg",
};

const Button = ({
  children,
  type = "button",
  variant = "primary",
  onClick,
  disabled = false,
  className = "",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-5
        py-2.5
        rounded-xl
        font-semibold
        transition-all
        duration-200
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${styles[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;