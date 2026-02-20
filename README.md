# Tocify

Tocify provides a configurable Table of Contents (TOC) block for Backdrop CMS using the **tocbot** JavaScript library. It scans page headings, assigns anchor IDs, and renders a scroll-synced, collapsible TOC with smooth scrolling and sensible defaults.

**Note:** Backdrop also has a separate contributed module named **Tocbot**, which uses the same underlying JS library. Tocify differs in that it was written from the ground up specifically for Backdrop and does not include any legacy Drupal code. 

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
  - **Make TOC sticky** (checkbox): Uses the default selector/class to stick the TOC block.
  - **Disable scroll sync** (checkbox): Freeze active item highlighting during scroll; only clicks change it.
  - **Extra link class**: Optional class appended to each TOC link.
  - **Headings offset / Throttle timeout**: Fine-tune highlight position and scroll handler rate.

## Usage

- Add the block **Table of Contents (Tocify)** to a region (`/admin/structure/layouts` or block UI).
- The block auto-renders when eligible headings are found in the target content.

## Troubleshooting

- If no TOC appears, verify the content container selector matches the page markup and that headings exist for the configured levels.
- If headings are missing IDs, ensure JavaScript is loading and not deferred in a way that blocks tocbot.
- For sticky behavior, enable **Make TOC sticky** and ensure no parent wrapper sets `overflow: hidden/auto` that would block `position: sticky`.

## Maintainers

- [Alan Mels](https://github.com/alanmels)
- Contributions welcome via issues/PRs.

## License

- This project is GPL v2 software.
