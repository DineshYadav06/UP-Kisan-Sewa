import React from "react";
import clsx from "clsx";
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "info" | "success" | "warning" | "danger";
  title?: string;
  children: React.ReactNode;
}

export function Alert({
  type = "info",
  title,
  children,
  className,
  ...props
}: AlertProps) {
  const icons = {
    info: <Info className="size-5 text-[#0284c7] shrink-0 mt-0.5" />,
    success: <CheckCircle2 className="size-5 text-[#15803d] shrink-0 mt-0.5" />,
    warning: <AlertTriangle className="size-5 text-[#d97706] shrink-0 mt-0.5" />,
    danger: <AlertCircle className="size-5 text-[#dc2626] shrink-0 mt-0.5" />,
  };

  const containerStyles = {
    info: "bg-[#f0f9ff] border-[#bae6fd] text-[#0369a1]",
    success: "bg-[#f0fdf4] border-[#bbf7d0] text-[#14532d]",
    warning: "bg-[#fffbeb] border-[#fde68a] text-[#92400e]",
    danger: "bg-[#fef2f2] border-[#fecaca] text-[#991b1b]",
  };

  return (
    <div
      role="alert"
      className={clsx(
        "flex gap-3 p-4 rounded-lg border text-sm sm:text-base leading-relaxed",
        containerStyles[type],
        className
      )}
      {...props}
    >
      {icons[type]}
      <div className="flex-1">
        {title && <h4 className="font-bold mb-1">{title}</h4>}
        <div>{children}</div>
      </div>
    </div>
  );
}
