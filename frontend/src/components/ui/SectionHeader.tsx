import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  viewAllText?: string;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  viewAllHref,
  viewAllText = "सभी देखें",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={clsx(
        "flex flex-wrap items-end justify-between gap-3 border-b border-[#e5e7eb] pb-3 mb-6",
        className
      )}
    >
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#14532d] flex items-center gap-2">
          <span className="w-1.5 h-6 bg-[#15803d] rounded-full inline-block" />
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-[#4b5563] mt-1 pl-3.5">
            {subtitle}
          </p>
        )}
      </div>

      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#15803d] hover:text-[#14532d] hover:underline"
        >
          <span>{viewAllText}</span>
          <ArrowRight className="size-4" />
        </Link>
      )}
    </div>
  );
}
