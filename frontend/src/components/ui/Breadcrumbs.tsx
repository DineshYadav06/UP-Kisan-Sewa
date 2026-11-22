import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-2.5 px-3 sm:px-0 text-xs sm:text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-[#4b5563]">
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1 text-[#15803d] hover:underline"
          >
            <Home className="size-3.5" />
            <span>होम</span>
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-1.5">
              <ChevronRight className="size-3 text-[#9ca3af]" />
              {isLast || !item.href ? (
                <span className="font-semibold text-[#14532d]" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="text-[#15803d] hover:underline">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
