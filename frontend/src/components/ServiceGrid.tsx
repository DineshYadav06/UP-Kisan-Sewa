"use client";

import Link from "next/link";
import {
  CloudSun,
  Clapperboard,
  GraduationCap,
  Landmark,
  MapPinned,
  MessageCircleQuestion,
  Sprout,
  Store,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

const ITEMS = [
  { href: "/crops", key: "crops", Icon: Sprout },
  { href: "/mandi", key: "mandi", Icon: Store },
  { href: "/weather", key: "weather", Icon: CloudSun },
  { href: "/schemes", key: "schemes", Icon: Landmark },
  { href: "/trainings", key: "trainings", Icon: GraduationCap },
  { href: "/farmer/ask", key: "ask", Icon: MessageCircleQuestion },
  { href: "/kvk", key: "kvk", Icon: MapPinned },
  { href: "/videos", key: "videos", Icon: Clapperboard },
] as const;

export function ServiceGrid() {
  const { t } = useI18n();
  return (
    <section className="panel overflow-hidden">
      <h2 className="panel-title">{t("home.services")}</h2>
      <ul className="grid grid-cols-2 gap-px bg-[#d5ddd7] sm:grid-cols-4">
        {ITEMS.map(({ href, key, Icon }) => (
          <li key={href} className="bg-white">
            <Link
              href={href}
              className="flex min-h-[6.5rem] flex-col items-center justify-center gap-2 p-3 text-center text-ink no-underline hover:bg-brand-soft"
            >
              <span className="rounded-full bg-brand-soft p-2 text-brand-key">
                <Icon className="size-6" aria-hidden />
              </span>
              <span className="text-sm font-semibold">{t(`nav.${key}`)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
