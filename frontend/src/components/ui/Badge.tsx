import React from "react";
import clsx from "clsx";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "info" | "danger" | "outline" | "accent";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const baseStyles = "inline-flex items-center font-medium rounded-full";

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[11px]",
    md: "px-2.5 py-1 text-xs sm:text-sm",
  };

  const variantStyles = {
    default: "bg-[#f3f4f6] text-[#374151]",
    success: "bg-[#dcfce7] text-[#14532d] border border-[#86efac]",
    warning: "bg-[#fef3c7] text-[#92400e] border border-[#fde68a]",
    info: "bg-[#e0f2fe] text-[#0369a1] border border-[#bae6fd]",
    danger: "bg-[#fee2e2] text-[#991b1b] border border-[#fecaca]",
    accent: "bg-[#fef08a] text-[#854d0e] border border-[#fde047]",
    outline: "border border-[#d1d5db] text-[#374151] bg-white",
  };

  return (
    <span
      className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}
