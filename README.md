[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/huahhhas/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/huahhhas/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

# Atlas — National Statistics Explorer

A national statistics site that runs entirely from its own files: population, GDP, GDP per capita, life expectancy, land area, median age, urban share, CO₂ per person and internet use for **40 countries**, with every figure sourced and dated.

## What it does

- **Countries** (`#/`): searchable, region-filterable, sortable table of all 40 countries, plus charts of the most populous countries and the largest economies.
- **Country profiles** (`#/country/USA`): key-figure cards, a "vs the median country" chart, every indicator with its rank of 40, and neighbours from the same region.
- **Rankings** (`#/rankings`): top-10 lists for each of the 9 indicators, with a bar chart and a table, plus a life-expectancy spread chart.
- **Compare** (`#/compare?c=CHN,IND,USA`): any 2–4 countries side by side — grouped bar charts and a full indicator table with the best value in each row highlighted.
- **Sources & method** (`#/about`): where every number comes from, what each indicator means, and the limits of the estimates.

## Data

Approximate 2023–2024 estimates compiled from the World Bank's World Development Indicators, UN World Population Prospects 2024 and the IMF World Economic Outlook (October 2024). All data is embedded in `app/data.js` — the site makes no network requests, sets no cookies and runs no trackers. It works fully offline on desktop and phone.

## Run it locally

```sh
node serve.ts        # serves app/ on http://localhost:8080
```

## Hand it in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/` to the output directory and writes `dossier.json` with the vendored `vendor/makefun-frontend.ts` library.

## Layout

- `app/index.html` — the single page shell
- `app/style.css` — the whole visual design (system fonts, no external assets)
- `app/data.js` — the 40-country dataset, indicators and sources
- `app/charts.js` — inline-SVG chart builders (no libraries)
- `app/views.js` — hash router and the five pages
- `app/main.js` — bootstrap
- `screenshots/` — real renders of the site (desktop home, country profile, compare, phone home)
- `main.ts` — the hand-in program; `vendor/makefun-frontend.ts` — the kit's dossier library, unchanged

## License

MIT — see [LICENSE](LICENSE).
