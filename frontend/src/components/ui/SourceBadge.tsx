import React from "react";
import { CheckCircle, ExternalLink, Calendar } from "lucide-react";
import clsx from "clsx";

export interface SourceBadgeProps {
  sourceName?: string;
  sourceUrl?: string;
  updatedAt?: string;
  verified?: boolean;
  className?: string;
}

export function SourceBadge({
  sourceName = "NDUAT / ICAR",
  sourceUrl,
  updatedAt,
  verified = true,
  className,
}: SourceBadgeProps) {
  const formattedDate = updatedAt
    ? new Date(updatedAt).toLocaleDateString("hi-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "नियमित सत्यापित";

  return (
    <div
      className={clsx(
        "inline-flex flex-wrap items-center gap-2 text-[11px] text-[#4b5563] bg-[#f8fafc] border border-[#e2e8f0] px-2.5 py-1 rounded-md",
        className
      )}
    >
      <span className="flex items-center gap-1 font-medium text-[#14532d]">
        {verified && <CheckCircle className="size-3 text-[#15803d]" />}
        स्रोत: {sourceName}
      </span>

      {sourceUrl && (
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 text-[#0284c7] hover:underline"
          title="आधिकारिक स्रोत देखें"
        >
          <span>आधिकारिक लिंक</span>
          <ExternalLink className="size-3" />
        </a>
      )}

      {updatedAt && (
        <span className="flex items-center gap-1 text-[#6b7280] border-l border-[#d1d5db] pl-2">
          <Calendar className="size-3" />
          अंतिम अद्यतन: {formattedDate}
        </span>
      )}
    </div>
  );
}
