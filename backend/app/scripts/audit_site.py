import os
import re
from pathlib import Path

app_dir = Path("frontend/src/app")
routes = set()
for p in app_dir.rglob("page.tsx"):
    rel = p.parent.relative_to(app_dir).as_posix()
    route = "/" if rel == "." else "/" + rel
    routes.add(route)

print(f"=== Total registered page routes: {len(routes)} ===")
for r in sorted(routes):
    print(" ", r)

# Find all internal Link hrefs in frontend/src
href_pattern = re.compile(r'href=[\"\'](/[^\"\'?#]*)[\"\']')
src_dir = Path("frontend/src")
broken_links = {}

for f in src_dir.rglob("*.tsx"):
    text = f.read_text(encoding="utf-8", errors="ignore")
    for match in href_pattern.findall(text):
        norm = match
        if norm.startswith("/crops/") and norm != "/crops":
            norm = "/crops/[slug]"
        elif norm.startswith("/schemes/") and norm != "/schemes":
            norm = "/schemes/[slug]"
        elif norm.startswith("/districts/") and norm != "/districts":
            norm = "/districts/[slug]"
            
        if norm not in routes and norm not in ["/", "/favicon.ico"]:
            if match not in broken_links:
                broken_links[match] = set()
            broken_links[match].add(f.relative_to(src_dir).as_posix())

print(f"\n=== Broken internal links found: {len(broken_links)} ===")
for k, v in broken_links.items():
    print(f"  {k} -> referenced in {list(v)}")

# Find all API calls in frontend
api_pattern = re.compile(r'fetch\([\"\'`](http://localhost:8000/[^\"\'`$?]*)')
frontend_apis = {}
for f in src_dir.rglob("*.tsx"):
    text = f.read_text(encoding="utf-8", errors="ignore")
    for match in api_pattern.findall(text):
        if match not in frontend_apis:
            frontend_apis[match] = set()
        frontend_apis[match].add(f.relative_to(src_dir).as_posix())

print(f"\n=== API calls in frontend: {len(frontend_apis)} ===")
for k, v in frontend_apis.items():
    print(f"  {k} -> in {list(v)}")
