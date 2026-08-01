#!/usr/bin/env python3
from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
import re
import sys


DIST = Path("docs/.vitepress/dist")

PAGES = {
    "/": DIST / "index.html",
    "/es/": DIST / "es" / "index.html",
    "/projects/": DIST / "projects" / "index.html",
    "/journey/": DIST / "journey" / "index.html",
    "/case-studies/": DIST / "case-studies" / "index.html",
    "/archive/": DIST / "archive" / "index.html",
    "/archive/under-construction/": DIST / "archive" / "under-construction" / "index.html",
}

SENSITIVE_PATTERNS = [
    re.compile(r"\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b"),
    re.compile(r"\b\d{10}\b"),
    re.compile(r"\baddress\b", re.IGNORECASE),
    re.compile(r"\bdirecci[oó]n\b", re.IGNORECASE),
]

IGNORED_IMAGE_PREFIXES = (
    "/icons/",
)


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

    def handle_starttag(self, tag: str, attrs_raw) -> None:
        attrs = dict(attrs_raw)

        if tag == "h1":
            self.h1_count += 1

        if tag == "title":
            self.title_count += 1

        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonical_count += 1

        if tag == "meta":
            if attrs.get("property") == "og:title":
                self.og_title += 1
            if attrs.get("property") == "og:description":
                self.og_description += 1
            if attrs.get("property") == "og:url":
                self.og_url += 1
            if attrs.get("property") == "og:image":
                self.og_image += 1
            if attrs.get("name") == "twitter:card":
                self.twitter_card += 1

        if tag == "img":
            src = attrs.get("src", "(missing src)")
            alt = attrs.get("alt")
            width = attrs.get("width")
            height = attrs.get("height")

            is_ignored_icon = src.startswith(IGNORED_IMAGE_PREFIXES)

            if alt is None and not is_ignored_icon:
                self.img_without_alt.append(src)

            if (not width or not height) and not is_ignored_icon:
                self.img_without_dimensions.append(src)

        if tag == "a":
            href = attrs.get("href", "")
            if href.startswith("http://") or href.startswith("https://"):
                target = attrs.get("target")
                rel = attrs.get("rel", "")
                safe_rel = "noopener" in rel or "noreferrer" in rel

                if target == "_blank" and not safe_rel:
                    self.external_links_without_rel.append(href)


def read_page(path: Path) -> str:
    if not path.exists():
        raise FileNotFoundError(path)
    return path.read_text(encoding="utf-8", errors="ignore")


def check_page(route: str, path: Path) -> list[str]:
    errors: list[str] = []
    html = read_page(path)
    parser = PageParser()
    parser.feed(html)

    if parser.h1_count != 1:
        errors.append(f"{route}: expected exactly 1 h1, found {parser.h1_count}")

    if parser.title_count < 1:
        errors.append(f"{route}: missing <title>")

    if parser.canonical_count != 1:
        errors.append(f"{route}: expected exactly 1 canonical link, found {parser.canonical_count}")

    if parser.og_title < 1:
        errors.append(f"{route}: missing og:title")
    if parser.og_description < 1:
        errors.append(f"{route}: missing og:description")
    if parser.og_url < 1:
        errors.append(f"{route}: missing og:url")
    if parser.og_image < 1:
        errors.append(f"{route}: missing og:image")
    if parser.twitter_card < 1:
        errors.append(f"{route}: missing twitter:card")

    for src in parser.img_without_alt:
        errors.append(f"{route}: image without alt: {src}")

    for src in parser.img_without_dimensions:
        errors.append(f"{route}: image without width/height: {src}")

    for href in parser.external_links_without_rel:
        errors.append(f"{route}: external _blank link without noopener: {href}")

    for pattern in SENSITIVE_PATTERNS:
        if pattern.search(html):
            errors.append(f"{route}: possible sensitive information matched: {pattern.pattern}")

    return errors


def main() -> int:
    if not DIST.exists():
        print("Build output not found. Run: npm run docs:build", file=sys.stderr)
        return 2

    errors: list[str] = []

    for route, path in PAGES.items():
        try:
            errors.extend(check_page(route, path))
        except FileNotFoundError:
            errors.append(f"{route}: missing generated file {path}")

    root_html = read_page(DIST / "index.html")
    if "under construction" in root_html.lower() or "espere mientras" in root_html.lower():
        errors.append("/: root appears to contain the old under-construction placeholder")

    if errors:
        print("Quality check failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print("Quality check passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
