const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "/api/v1";

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    next: { revalidate: 60 },
    headers: {
      Accept: "application/json",
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) {
    throw new Error(`API ${res.status}: ${path}`);
  }
  return res.json() as Promise<T>;
}

export type HomePayload = {
  announcements: Array<{
    title_hi: string;
    body_hi?: string;
    show_from?: string;
    pinned?: boolean;
    source_name?: string;
    updated_at?: string;
  }>;
  schemes: Array<{
    slug: string;
    name_hi: string;
    official_link?: string;
    source_name?: string;
    updated_at?: string;
  }>;
  advisories: Array<{
    title_hi: string;
    body_hi?: string;
    valid_from?: string;
    valid_to?: string;
    source_name?: string;
  }>;
  trainings: Array<{
    title_hi: string;
    start_date?: string;
    venue?: string;
    district?: string;
  }>;
  mandi_highlights: Array<{
    market?: string;
    commodity?: string;
    modal_price?: number;
    arrival_date?: string;
    district?: string;
  }>;
  official_portals: Array<{ name_hi: string; url: string }>;
};

export type CropList = {
  items: Array<{
    slug: string;
    name_hi: string;
    name_en?: string;
    category?: string;
    seasons?: string[];
    summary_hi?: string;
    source_name?: string;
    updated_at?: string;
  }>;
  total: number;
};
