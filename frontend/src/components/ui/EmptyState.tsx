import React from "react";
import { FolderOpen } from "lucide-react";
import { Button } from "./Button";
import Link from "next/link";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionHref?: string;
  actionText?: string;
}

export function EmptyState({
  icon = <FolderOpen className="size-12 text-[#9ca3af]" />,
  title,
  description,
  actionHref,
  actionText,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white border border-[#e5e7eb] rounded-xl my-4">
      <div className="p-3 bg-[#f8faf5] rounded-full mb-3">{icon}</div>
      <h4 className="text-base sm:text-lg font-bold text-[#14532d]">{title}</h4>
      <p className="text-xs sm:text-sm text-[#4b5563] max-w-md mt-1 mb-4">
        {description}
      </p>
      {actionHref && actionText && (
        <Link href={actionHref}>
          <Button variant="outline" size="sm">
            {actionText}
          </Button>
        </Link>
      )}
    </div>
  );
}
