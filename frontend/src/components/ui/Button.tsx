import React from "react";
import clsx from "clsx";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "dark" | "accent" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    const variantStyles = {
      primary:
        "bg-[#15803d] text-white hover:bg-[#166534] focus-visible:outline-[#15803d] active:bg-[#14532d]",
      dark:
        "bg-[#14532d] text-white hover:bg-[#0f3d21] focus-visible:outline-[#14532d]",
      accent:
        "bg-[#eab308] text-[#1f2937] font-semibold hover:bg-[#ca8a04] focus-visible:outline-[#eab308]",
      outline:
        "border border-[#15803d] text-[#15803d] bg-white hover:bg-[#dcfce7] focus-visible:outline-[#15803d]",
      ghost:
        "text-[#15803d] hover:bg-[#dcfce7]/50 focus-visible:outline-[#15803d]",
      danger:
        "bg-[#dc2626] text-white hover:bg-[#b91c1c] focus-visible:outline-[#dc2626]",
    };

    const sizeStyles = {
      sm: "h-9 px-3 text-xs sm:text-sm gap-1.5",
      md: "h-11 px-4 text-sm sm:text-base gap-2",
      lg: "h-12 px-6 text-base sm:text-lg gap-2.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={clsx(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
