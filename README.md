# Markdown Drop Reader

A minimal, zero-backend Markdown reader for GitHub Pages. Drop one Markdown file into the page and read it with a clean GitHub-like layout.

## Workflow

~~~text
drag .md → render in browser → read
~~~

## Privacy

The application has no server-side component and no code path that uploads the dropped Markdown text. All runtime libraries are stored in this repository.

<!-- iteration:static-drag-reader-v1 -->
## 2026-08-16 — Drag-and-drop reader

### Current status

The project is now a deliberately small static GitHub Pages application: drag one local `.md` or `.markdown` file into the page, render it in-browser with GitHub-style Markdown, read it, and open another file when desired.

- Marked 18.0.9 provides GitHub-Flavored Markdown parsing.
- DOMPurify 3.4.13 sanitizes rendered HTML.
- github-markdown-css 5.9.0 provides GitHub-like article typography.
- Runtime dependencies are vendored; there are no CDN calls after the page loads.
- There is no backend, upload endpoint, analytics, cookies, or browser storage.
- The Markdown text is read with the browser File API and remains in the browser tab.
- No archive/folder integration is included in this iteration.
