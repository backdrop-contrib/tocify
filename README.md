# Tocify

Provides a configurable Table of Contents (TOC) block for Backdrop CMS using the tocbot library. It scans page headings, assigns anchor IDs, and renders a scroll-synced, collapsible TOC with customizable classes and behavior.

## Requirements
- Backdrop CMS 1.x
- jQuery (core)

## Installation
1. Place this module in `modules/custom/tocify`.
2. Enable **Tocify** at `/admin/modules`.

## Configuration
- Go to **Configuration » User interface » Tocify** (`/admin/config/user-interface/tocify`).
- Key options:
  - **Content container selector**: CSS selector for the content area to scan (default `.node-content`).
  - **Heading selector**: Comma-separated heading tags to include (default `h1, h2, h3`).
  - **Scroll offset**: Pixels to offset scrolling for fixed headers (default `80`).
  - **Collapse depth**: Heading levels to keep expanded (default `6`).
  - **Smooth scroll / Ordered list / Include HTML**: Toggle behaviors and markup handling.
  - **Advanced**: Classes, fixed-position selectors, offsets, throttle time, and scroll-sync toggle.

## Usage
- Add the block **Table of Contents (Tocify)** to a region (`/admin/structure/layouts` or block UI).
- The block auto-renders when eligible headings are found in the target content.

## Troubleshooting
- If no TOC appears, verify the content container selector matches the page markup and that headings exist for the configured levels.
- If headings are missing IDs, ensure JavaScript is loading and not deferred in a way that blocks tocbot.
- For sticky/fixed behavior, confirm the configured fixed selector exists and that CSS doesn’t override positioning.

## Maintainers
- [Alan Mels](https://github.com/alanmels)
- Contributions welcome via issues/PRs.

## License
- This project is GPL v2 software.
