# Reverse engineering

Research notes on how other products build features we care about. Made with [REA](https://github.com/morluto/rea). Not part of the website build (Vite only bundles `src/` and `public/`).

| Target | Feature | Notes |
| --- | --- | --- |
| Pipedrive | Deal pipeline (kanban) | [pipedrive/deal-pipeline](pipedrive/deal-pipeline/README.md) |

Rules for this folder:
- Use only public artefacts or accounts we own. No credentials, cookies or HAR files with tokens get committed.
- Tag every claim with its source, and keep raw evidence next to the write-up in `evidence/`.
