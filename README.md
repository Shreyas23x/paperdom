# Paperdome

**[pastpaperdome.in](https://pastpaperdome.in)** — fully worked, step-by-step solutions for **CIE International A-Level 9231 Further Mathematics** past papers.

A slick, single-page React site with an academic-light + glassmorphism design, an
in-browser PDF reader, filterable/searchable catalog, and animated UI.

## Tech

- **React 18** + **Vite 6**
- **framer-motion** — reveal animations, layout transitions, modal
- **lucide-react** — icons
- Plain CSS design system (`src/index.css`) using CSS variables

## Run it

```bash
npm install     # first time only
npm run dev     # start dev server → http://localhost:5173
npm run build   # production build into /dist
npm run preview # preview the production build
```

## Where things live

| Path | What |
|------|------|
| `public/papers/` | The solved-paper PDFs served by the site |
| `src/data/papers.js` | Paper catalog metadata (add new papers here) |
| `src/components/` | UI components (Hero, PaperCatalog, PaperViewer, etc.) |
| `src/index.css` | Full design system + responsive rules |

## Adding a new solved paper

1. Drop the PDF into `public/papers/` (e.g. `9231_s23_qp_42_solved.pdf`).
2. Add an entry to the `papers` array in `src/data/papers.js`:

```js
{
  id: '9231_s23_qp_42',
  component: 'P4',          // P1 | P2 | P3 | P4
  year: 2023,
  session: 's',            // 's' = May/June, 'w' = Oct/Nov
  variant: 2,
  questions: 7,
  marks: 50,
  available: true,
  file: '/papers/9231_s23_qp_42_solved.pdf',
  topics: ['Hypothesis testing', 'Poisson'],
}
```

That's it — the card, filters, counts, inline reader and download all update automatically.

## Currently included papers

| Component | Sessions |
|-----------|----------|
| Further Mechanics (Paper 3) | M/J 2021 (V1, V3), O/N 2021 (V2) |
| Further Probability & Statistics (Paper 4) | M/J 2022 (V1, V3), O/N 2025 (V1) |

Pure 1 & 2 are shown as "coming soon" placeholders.

---

*Independent study resource. Not affiliated with or endorsed by Cambridge Assessment
International Education.*
