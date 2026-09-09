#!/usr/bin/env python3
from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
import re
import sys

DIST = Path("docs/.vitepress/dist")

PORTFOLIO_PAGES = {
    "/": DIST / "index.html",
    "/es/": DIST / "es" / "index.html",
    "/projects/": DIST / "projects" / "index.html",
    "/projects/miad-rag-real-estate/": DIST / "projects" / "miad-rag-real-estate" / "index.html",
    "/journey/": DIST / "journey" / "index.html",
    "/case-studies/": DIST / "case-studies" / "index.html",
    "/archive/": DIST / "archive" / "index.html",
    "/archive/under-construction/": DIST / "archive" / "under-construction" / "index.html",
}

TECH_DOC_ROUTES = {
    "/technical-docs/retainai/": DIST / "technical-docs" / "retainai" / "index.html",
    "/technical-docs/versovector/": DIST / "technical-docs" / "versovector" / "index.html",
    "/technical-docs/relationalstats/": DIST / "technical-docs" / "relationalstats" / "index.html",
    "/technical-docs/gradientmesh/": DIST / "technical-docs" / "gradientmesh" / "index.html",
    "/technical-docs/luasf/": DIST / "technical-docs" / "luasf" / "index.html",
}

SENSITIVE_PATTERNS = [
    re.compile(r"\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b"),
    re.compile(r"\b\d{10}\b"),
    re.compile(r"\baddress\b", re.IGNORECASE),
    re.compile(r"\bdirecci[oó]n\b", re.IGNORECASE),
]

IGNORED_IMAGE_PREFIXES = ("/icons/",)


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.h1_count = 0
        self.title_count = 0
        self.canonical_count = 0
        self.og_title = 0
        self.og_description = 0
        self.og_url = 0
        self.og_image = 0
        self.twitter_card = 0
        self.img_without_alt: list[str] = []
        self.img_without_dimensions: list[str] = []
        self.external_links_without_rel: list[str] = []
        self.hrefs: list[str] = []

    def handle_starttag(self, tag: str, attrs_raw) -> None:
        attrs = dict(attrs_raw)
        if tag == "h1": self.h1_count += 1
        if tag == "title": self.title_count += 1
        if tag == "link" and attrs.get("rel") == "canonical": self.canonical_count += 1
        if tag == "meta":
            if attrs.get("property") == "og:title": self.og_title += 1
            if attrs.get("property") == "og:description": self.og_description += 1
            if attrs.get("property") == "og:url": self.og_url += 1
            if attrs.get("property") == "og:image": self.og_image += 1
            if attrs.get("name") == "twitter:card": self.twitter_card += 1
        if tag == "img":
            src = attrs.get("src", "(missing src)")
            is_ignored_icon = src.startswith(IGNORED_IMAGE_PREFIXES)
            if attrs.get("alt") is None and not is_ignored_icon: self.img_without_alt.append(src)
            if (not attrs.get("width") or not attrs.get("height")) and not is_ignored_icon: self.img_without_dimensions.append(src)
        if tag == "a":
            href = attrs.get("href", "")
            self.hrefs.append(href)
            if href.startswith(("http://", "https://")):
                safe_rel = "noopener" in attrs.get("rel", "") or "noreferrer" in attrs.get("rel", "")
                if attrs.get("target") == "_blank" and not safe_rel:
                    self.external_links_without_rel.append(href)


def read_page(path: Path) -> str:
    if not path.exists(): raise FileNotFoundError(path)
    return path.read_text(encoding="utf-8", errors="ignore")


def check_page(route: str, path: Path) -> list[str]:
    errors: list[str] = []
    html = read_page(path)
    parser = PageParser(); parser.feed(html)
    if parser.h1_count != 1: errors.append(f"{route}: expected exactly 1 h1, found {parser.h1_count}")
    if parser.title_count < 1: errors.append(f"{route}: missing <title>")
    if parser.canonical_count != 1: errors.append(f"{route}: expected exactly 1 canonical link, found {parser.canonical_count}")
    if parser.og_title < 1: errors.append(f"{route}: missing og:title")
    if parser.og_description < 1: errors.append(f"{route}: missing og:description")
    if parser.og_url < 1: errors.append(f"{route}: missing og:url")
    if parser.og_image < 1: errors.append(f"{route}: missing og:image")
    if parser.twitter_card < 1: errors.append(f"{route}: missing twitter:card")
    for src in parser.img_without_alt: errors.append(f"{route}: image without alt: {src}")
    for src in parser.img_without_dimensions: errors.append(f"{route}: image without width/height: {src}")
    for href in parser.external_links_without_rel: errors.append(f"{route}: external _blank link without noopener: {href}")
    for pattern in SENSITIVE_PATTERNS:
        if pattern.search(html): errors.append(f"{route}: possible sensitive information matched: {pattern.pattern}")
    if "/legacy/root-under-construction/" in parser.hrefs:
        errors.append(f"{route}: links to forbidden legacy Site History route")
    return errors


def require_in_order(html: str, labels: list[str], context: str, errors: list[str]) -> None:
    positions = [html.find(label) for label in labels]
    if any(pos < 0 for pos in positions):
        missing = [label for label, pos in zip(labels, positions) if pos < 0]
        errors.append(f"{context}: missing required labels: {missing}")
    elif positions != sorted(positions):
        errors.append(f"{context}: required labels are not in approved order")


def main() -> int:
    if not DIST.exists():
        print("Build output not found. Run: npm run docs:build", file=sys.stderr)
        return 2

    errors: list[str] = []
    for route, path in PORTFOLIO_PAGES.items():
        try: errors.extend(check_page(route, path))
        except FileNotFoundError: errors.append(f"{route}: missing generated file {path}")

    for route, path in TECH_DOC_ROUTES.items():
        if not path.exists(): errors.append(f"{route}: missing generated technical-doc route {path}")

    root_html = read_page(DIST / "index.html")
    if "under construction" in root_html.lower() or "espere mientras" in root_html.lower():
        errors.append("/: root appears to contain the old under-construction placeholder")
    # Owner-approved Phase 5E-R portrait override:
    # the original placeholder gate (OWNER PORTRAIT / FINAL ASSET PENDING)
    # was superseded when the owner explicitly approved the existing profile
    # photograph for production use. Validate the approved asset instead.
    approved_portrait = Path("docs/public/images/profile/rony-white-shirt-green-bg.jpg")
    if not approved_portrait.exists():
        errors.append(f"/: approved owner portrait asset is missing: {approved_portrait}")

    for required in [
        "I build evidence systems that turn complexity into clarity and action.",
        "Data &amp; Cloud Architect · Data/ML Platform Engineer · AI-native Builder",
        "/images/profile/rony-white-shirt-green-bg.jpg",
        "Portrait of Hubert Ronald",
    ]:
        if required not in root_html: errors.append(f"/: missing approved Home content: {required}")
    if "Capability Synthesis" in root_html: errors.append("/: Capability Synthesis must be removed")
    require_in_order(root_html, ["VersoVector", "MIAD-RAG-RealEstate", "RetainAI"], "/ Featured", errors)

    atlas_html = read_page(DIST / "projects" / "index.html")
    require_in_order(atlas_html, [
        'id="featured"', 'id="primary-evidence"', 'id="supporting-evidence"', 'id="journey-evidence"',
        'id="community"', 'id="creative-roots"', 'id="historical-foundations"', 'id="archive-gateway"'
    ], "/projects/ Atlas hierarchy", errors)

    journey_html = read_page(DIST / "journey" / "index.html")
    require_in_order(journey_html, [
        "Creative Software &amp; Product Instinct",
        "Applied Mathematics, Simulation &amp; Data Science",
        "Reproducible Development Environments",
        "Distributed Data Systems",
        "Cloud Data Architecture",
        "ML / NLP &amp; MLOps",
        "AI-native Products &amp; Platforms",
    ], "/journey/ stages", errors)

    # Language switch is Home-only.
    for route in ["/", "/es/"]:
        if "hr-locale-switch" not in read_page(PORTFOLIO_PAGES[route]):
            errors.append(f"{route}: Home language selector missing")
    for route, path in {**PORTFOLIO_PAGES, **TECH_DOC_ROUTES}.items():
        if route in ("/", "/es/"): continue
        if path.exists() and "hr-locale-switch" in read_page(path):
            errors.append(f"{route}: Home-only language selector leaked into internal page")

    # No generated HTML may expose the retired legacy route or forbidden title.
    for path in DIST.rglob("*.html"):
        html = read_page(path)
        if 'href="/legacy/root-under-construction/' in html or "href='/legacy/root-under-construction/" in html:
            errors.append(f"{path}: generated public link to forbidden legacy route")
        if "Forward Deployed Engineer" in html:
            errors.append(f"{path}: forbidden formal-title wording found")

    legacy_dir = DIST / "legacy" / "root-under-construction"
    if legacy_dir.exists(): errors.append("Build output exposes /legacy/root-under-construction/ as a generated public directory")

    retainai_html = read_page(TECH_DOC_ROUTES["/technical-docs/retainai/"]) if TECH_DOC_ROUTES["/technical-docs/retainai/"].exists() else ""
    if retainai_html and "v0.4.0-alpha.1" not in retainai_html:
        errors.append("/technical-docs/retainai/: missing Atlas release-scope context v0.4.0-alpha.1")

    if errors:
        print("Quality check failed:")
        for error in errors: print(f"- {error}")
        return 1
    print("Quality check passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
