// Atlas views — hash router and the five pages of the site.
// Every page is rendered from the embedded dataset in data.js; nothing is
// fetched at runtime. Routes: #/ (countries), #/country/<code>,
// #/rankings?m=<indicator>, #/compare?c=<CODE,CODE,...>, #/about.
import { COUNTRIES, INDICATORS, SOURCES, byCode, median, formatNumber, formatIndicator } from "./data.js";
import { hbarChart, groupedBarChart, vbarChart, PALETTE } from "./charts.js";

const REGIONS = ["All regions", "Africa", "Americas", "Asia", "Europe"];
const SORTS = [
  { key: "pop", label: "Population" },
  { key: "gdp", label: "GDP" },
  { key: "gdppc", label: "GDP per capita" },
  { key: "life", label: "Life expectancy" },
  { key: "area", label: "Area" },
  { key: "name", label: "Name A–Z" },
];

const homeState = { query: "", region: "All regions", sort: "pop", dir: -1 };

function esc(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function parseHash() {
  const raw = location.hash.replace(/^#/, "") || "/";
  const [pathPart, queryPart] = raw.split("?");
  const params = new URLSearchParams(queryPart || "");
  return { path: pathPart, params };
}

function setActiveNav(name) {
  document.querySelectorAll("[data-nav]").forEach((a) => {
    a.classList.toggle("active", a.dataset.nav === name);
  });
}

function countryLink(code, name) {
  return `<a href="#/country/${code}">${esc(name)}</a>`;
}

function rankOf(country, key) {
  const sorted = [...COUNTRIES].sort((a, b) => b[key] - a[key]);
  return sorted.findIndex((c) => c.code === country.code) + 1;
}

function indicatorRow(country, ind) {
  const rank = rankOf(country, ind.key);
  const med = median(COUNTRIES.map((c) => c[ind.key]));
  const vs = country[ind.key] >= med ? "above" : "below";
  const pct = Math.round(((country[ind.key] - med) / med) * 100);
  return `<div><dt>${esc(ind.label)}</dt><dd>${esc(formatIndicator(country, ind))}<br><span class="kpi-sub">rank #${rank} of ${COUNTRIES.length} · ${Math.abs(pct)}% ${vs} median</span></dd></div>`;
}

// ---------- Home: search, filter, sortable table, charts ----------
export function renderHome() {
  setActiveNav("home");
  const app = document.getElementById("app");
  const totalPop = COUNTRIES.reduce((s, c) => s + c.pop, 0);
  const totalGdp = COUNTRIES.reduce((s, c) => s + c.gdp, 0);
  const topPop = [...COUNTRIES].sort((a, b) => b.pop - a.pop).slice(0, 5);
  const topGdp = [...COUNTRIES].sort((a, b) => b.gdp - a.gdp).slice(0, 5);

  app.innerHTML = `
  <div class="hero">
    <h1>Every country, by the numbers.</h1>
    <p class="lede">Population, GDP, life expectancy, land area and more for ${COUNTRIES.length} countries — searchable, sortable and comparable, with every figure sourced and dated.</p>
    <div class="stat-strip">
      <div class="stat"><b>${formatNumber(totalPop)}m</b><span>people covered (2024)</span></div>
      <div class="stat"><b>$${formatNumber(totalGdp)}bn</b><span>combined GDP (2024)</span></div>
      <div class="stat"><b>${COUNTRIES.length}</b><span>country profiles</span></div>
      <div class="stat"><b>${INDICATORS.length}</b><span>indicators per country</span></div>
    </div>
  </div>
  <section>
    <h2>All countries</h2>
    <p class="section-note">Search by name, filter by region, or click a column heading to sort. Click any country for its full profile.</p>
    <div class="controls">
      <input type="search" id="q" placeholder="Search countries…" value="${esc(homeState.query)}" aria-label="Search countries">
      <label for="region">Region</label>
      <select id="region">${REGIONS.map((r) => `<option ${r === homeState.region ? "selected" : ""}>${r}</option>`).join("")}</select>
      <label for="sort">Sort by</label>
      <select id="sort">${SORTS.map((s) => `<option value="${s.key}" ${s.key === homeState.sort ? "selected" : ""}>${s.label}</option>`).join("")}</select>
      <span class="result-count" id="count"></span>
    </div>
    <div class="table-wrap"><table class="data" id="ctable">
      <thead><tr>
        <th><button data-sort="name">Country</button></th>
        <th><button data-sort="region">Region</button></th>
        <th><button data-sort="pop">Population</button></th>
        <th><button data-sort="gdp">GDP (US$ bn)</button></th>
        <th><button data-sort="gdppc">GDP / person</button></th>
        <th><button data-sort="life">Life exp. (yrs)</button></th>
        <th><button data-sort="area">Area (km²)</button></th>
      </tr></thead>
      <tbody id="tbody"></tbody>
    </table></div>
    <p class="source-line">Figures are 2023–2024 estimates. Sources: World Bank WDI, UN World Population Prospects 2024, IMF WEO October 2024.</p>
  </section>
  <section class="grid-2">
    <div class="card">
      <h3>Most populous countries</h3>
      <p class="chart-note">Population, millions, 2024</p>
      ${hbarChart(topPop.map((c) => ({ label: c.name, value: c.pop })), (v) => `${formatNumber(v)}m`, { title: "Most populous countries" })}
      <p><a href="#/rankings?m=pop">See the full population ranking →</a></p>
    </div>
    <div class="card">
      <h3>Largest economies</h3>
      <p class="chart-note">Nominal GDP, US$ billions, 2024</p>
      ${hbarChart(topGdp.map((c) => ({ label: c.name, value: c.gdp })), (v) => `$${formatNumber(v)}bn`, { title: "Largest economies" })}
      <p><a href="#/rankings?m=gdp">See the full GDP ranking →</a></p>
    </div>
  </section>
  <section>
    <div class="card">
      <h3>Compare countries side by side</h3>
      <p>Pick any two to four countries and see every indicator next to each other, with a chart for each one.</p>
      <p><a class="btn" href="#/compare?c=CHN,IND,USA">Compare China, India &amp; the USA</a>
      <a class="btn ghost" href="#/compare">Choose your own →</a></p>
    </div>
  </section>`;

  const tbody = document.getElementById("tbody");
  const count = document.getElementById("count");
  function drawTable() {
    const q = homeState.query.trim().toLowerCase();
    let rows = COUNTRIES.filter((c) => {
      const matchesQuery = !q || c.name.toLowerCase().includes(q) || c.code.toLowerCase() === q;
      const matchesRegion = homeState.region === "All regions" || c.region === homeState.region;
      return matchesQuery && matchesRegion;
    });
    const key = homeState.sort;
    rows = [...rows].sort((a, b) => {
      if (key === "name" || key === "region") return homeState.dir * String(a[key]).localeCompare(String(b[key]));
      return homeState.dir * (a[key] - b[key]);
    });
    count.textContent = `${rows.length} of ${COUNTRIES.length} countries`;
    if (!rows.length) {
      tbody.innerHTML = `<tr><td colspan="7" class="empty">No countries match “${esc(homeState.query)}”. Try another search.</td></tr>`;
      return;
    }
    tbody.innerHTML = rows.map((c) => `<tr>
      <td class="country">${countryLink(c.code, c.name)}</td>
      <td>${esc(c.region)}</td>
      <td class="num">${formatNumber(c.pop)}m</td>
      <td class="num">$${formatNumber(c.gdp)}bn</td>
      <td class="num">$${formatNumber(c.gdppc)}</td>
      <td class="num">${formatNumber(c.life, 1)}</td>
      <td class="num">${formatNumber(c.area)}</td>
    </tr>`).join("");
  }
  drawTable();
  document.getElementById("q").addEventListener("input", (e) => { homeState.query = e.target.value; drawTable(); });
  document.getElementById("region").addEventListener("change", (e) => { homeState.region = e.target.value; drawTable(); });
  document.getElementById("sort").addEventListener("change", (e) => { homeState.sort = e.target.value; homeState.dir = -1; drawTable(); });
  document.querySelectorAll("#ctable th button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.sort;
      if (homeState.sort === key) homeState.dir *= -1;
      else { homeState.sort = key; homeState.dir = key === "name" || key === "region" ? 1 : -1; }
      document.getElementById("sort").value = key;
      drawTable();
    });
  });
}

// ---------- Country detail ----------
export function renderCountry(code) {
  const country = byCode(code);
  const app = document.getElementById("app");
  if (!country) {
    setActiveNav("home");
    app.innerHTML = `<p class="breadcrumb"><a href="#/">← All countries</a></p>
      <section><div class="card"><h2>Country not found</h2>
      <p>There is no profile for “${esc(code)}”. Atlas covers ${COUNTRIES.length} countries.</p>
      <p><a class="btn" href="#/">Browse all countries</a></p></div></section>`;
    return;
  }
  setActiveNav("home");
  const medPop = median(COUNTRIES.map((c) => c.pop));
  const neighbors = COUNTRIES.filter((c) => c.region === country.region && c.code !== country.code)
    .sort((a, b) => b.pop - a.pop).slice(0, 5);
  const density = Math.round((country.pop * 1e6) / country.area);
  const chartRows = INDICATORS.slice(0, 6).map((ind) => ({
    label: ind.label,
    value: Math.round((country[ind.key] / median(COUNTRIES.map((c) => c[ind.key]))) * 100),
    color: "#0e7c7b",
  }));
  app.innerHTML = `
  <p class="breadcrumb"><a href="#/">All countries</a> › ${esc(country.region)} › <strong>${esc(country.name)}</strong></p>
  <div class="country-head">
    <div><h1>${esc(country.name)}</h1><span class="region-tag">${esc(country.region)} · Capital: ${esc(country.capital)}</span></div>
  </div>
  <div class="kpi-grid">
    <div class="kpi"><div class="kpi-label">Population</div><div class="kpi-value">${formatNumber(country.pop)}m</div><div class="kpi-sub">Rank #${rankOf(country, "pop")} of ${COUNTRIES.length} · median ${formatNumber(medPop)}m</div></div>
    <div class="kpi"><div class="kpi-label">GDP</div><div class="kpi-value">$${formatNumber(country.gdp)}bn</div><div class="kpi-sub">Rank #${rankOf(country, "gdp")} · $${formatNumber(country.gdppc)} per person</div></div>
    <div class="kpi"><div class="kpi-label">Life expectancy</div><div class="kpi-value">${formatNumber(country.life, 1)} yrs</div><div class="kpi-sub">Rank #${rankOf(country, "life")} · median ${formatNumber(median(COUNTRIES.map((c) => c.life)), 1)} yrs</div></div>
    <div class="kpi"><div class="kpi-label">Population density</div><div class="kpi-value">${formatNumber(density)} /km²</div><div class="kpi-sub">${formatNumber(country.area)} km² of land</div></div>
  </div>
  <section class="grid-2">
    <div class="card">
      <h3>${esc(country.name)} vs the median country</h3>
      <p class="chart-note">Each bar: this country's value as a percentage of the 40-country median (100 = exactly median).</p>
      ${hbarChart(chartRows, (v) => `${v}% of median`, { title: "Country versus median" })}
    </div>
    <div class="card">
      <h3>All indicators, 2023–2024</h3>
      <dl class="facts">
        ${INDICATORS.map((ind) => indicatorRow(country, ind)).join("")}
      </dl>
      <p class="source-line">Sources: World Bank WDI, UN World Population Prospects 2024, IMF WEO October 2024. Figures are estimates; see <a href="#/about">Sources &amp; method</a>.</p>
    </div>
  </section>
  <section class="grid-2">
    <div class="card">
      <h3>More from ${esc(country.region)}</h3>
      <ul class="tight">
        ${neighbors.map((c) => `<li>${countryLink(c.code, c.name)} — ${formatNumber(c.pop)}m people, $${formatNumber(c.gdp)}bn GDP</li>`).join("")}
      </ul>
      <p><a href="#/rankings">Browse all rankings →</a></p>
    </div>
    <div class="card">
      <h3>Compare ${esc(country.name)}</h3>
      <p>Put ${esc(country.name)} next to other countries on every indicator.</p>
      <p><a class="btn" href="#/compare?c=${country.code},USA,CHN">Compare with the USA &amp; China</a></p>
    </div>
  </section>`;
}

// ---------- Rankings ----------
export function renderRankings(metric) {
  setActiveNav("rankings");
  const app = document.getElementById("app");
  const ind = INDICATORS.find((i) => i.key === metric) || INDICATORS[0];
  const top = [...COUNTRIES].sort((a, b) => b[ind.key] - a[ind.key]).slice(0, 10);
  app.innerHTML = `
  <section class="hero">
    <h1>Rankings</h1>
    <p class="lede">The top 10 of ${COUNTRIES.length} countries on each indicator. Pick an indicator to re-rank the list.</p>
    <div class="chip-row" role="group" aria-label="Choose an indicator">
      ${INDICATORS.map((i) => `<a class="chip ${i.key === ind.key ? "on" : ""}" href="#/rankings?m=${i.key}">${esc(i.label)}</a>`).join("")}
    </div>
  </section>
  <section class="grid-2">
    <div class="card">
      <h3>${esc(ind.higher)} — top 10</h3>
      <p class="chart-note">${esc(ind.label)}, ${ind.key === "co2" ? "2023" : "2024"}</p>
      ${hbarChart(top.map((c) => ({ label: c.name, value: c[ind.key] })), (v) => formatIndicator({ [ind.key]: v }, ind).replace(` ${ind.unit}`, ` ${ind.unit}`), { title: `${ind.label} ranking` })}
    </div>
    <div class="card">
      <h3>Top 10 table</h3>
      <table class="method-table">
        <thead><tr><th>#</th><th>Country</th><th>${esc(ind.label)}</th></tr></thead>
        <tbody>
          ${top.map((c, i) => `<tr><td><span class="rank-badge">${i + 1}</span></td><td>${countryLink(c.code, c.name)}</td><td><strong>${esc(formatIndicator(c, ind))}</strong></td></tr>`).join("")}
        </tbody>
      </table>
      <p class="source-line">Median across all ${COUNTRIES.length} countries: ${esc(formatIndicator({ [ind.key]: median(COUNTRIES.map((c) => c[ind.key])) }, ind))}.</p>
    </div>
  </section>
  <section>
    <div class="card">
      <h3>Life expectancy across the 40</h3>
      <p class="chart-note">Years at birth, 2024 — from the shortest-lived to the longest-lived country in Atlas.</p>
      ${vbarChart([...COUNTRIES].sort((a, b) => a.life - b.life).filter((_, i) => i % 4 === 0).map((c) => ({ label: c.name, short: c.code, value: c.life })), (v) => `${formatNumber(v, 0)} yrs`, { title: "Life expectancy spread" })}
      <p class="source-line">Every fourth country shown, sorted by life expectancy. Shortest: ${esc([...COUNTRIES].sort((a, b) => a.life - b.life)[0].name)} (${formatNumber(Math.min(...COUNTRIES.map((c) => c.life)), 1)} yrs); longest: ${esc([...COUNTRIES].sort((a, b) => b.life - a.life)[0].name)} (${formatNumber(Math.max(...COUNTRIES.map((c) => c.life)), 1)} yrs).</p>
    </div>
  </section>`;
}

// ---------- Compare ----------
export function renderCompare(codesParam) {
  setActiveNav("compare");
  const app = document.getElementById("app");
  let codes = (codesParam || "")
    .split(",").map((s) => s.trim().toUpperCase()).filter((c) => byCode(c));
  codes = [...new Set(codes)].slice(0, 4);
  if (codes.length < 2) codes = ["CHN", "IND", "USA", "IDN"].slice(0, Math.max(2, codes.length));
  const chosen = codes.map((c) => byCode(c));

  function pickerRow(slot, selected) {
    return `<div><label for="pick${slot}">Country ${slot + 1}</label>
      <select id="pick${slot}" data-slot="${slot}">
        <option value="">— none —</option>
        ${COUNTRIES.map((c) => `<option value="${c.code}" ${c.code === selected ? "selected" : ""}>${esc(c.name)}</option>`).join("")}
      </select></div>`;
  }
  const best = (key) => Math.max(...chosen.map((c) => c[key]));
  app.innerHTML = `
  <section class="hero">
    <h1>Compare countries</h1>
    <p class="lede">Pick two to four countries and see every indicator side by side. The best value in each row is highlighted.</p>
  </section>
  <section>
    <div class="compare-picker">
      ${[0, 1, 2, 3].map((s) => pickerRow(s, chosen[s] ? chosen[s].code : "")).join("")}
    </div>
    <div class="card">
      <h3>${chosen.map((c) => esc(c.name)).join(" vs ")}</h3>
      <div class="legend">${chosen.map((c, i) => `<span><i style="background:${PALETTE[i % PALETTE.length]}"></i>${esc(c.name)}</span>`).join("")}</div>
      ${groupedBarChart(chosen, INDICATORS.slice(0, 5), (c, ind) => formatIndicator(c, ind))}
      <p class="chart-note">Bars are scaled within each indicator (population, GDP, GDP per capita, life expectancy, land area), so bars compare countries, not indicators.</p>
    </div>
  </section>
  <section>
    <div class="table-wrap"><table class="data">
      <thead><tr><th>Indicator</th>${chosen.map((c) => `<th>${esc(c.name)}</th>`).join("")}</tr></thead>
      <tbody>
        ${INDICATORS.map((ind) => `<tr>
          <td class="country">${esc(ind.label)} <span style="color:var(--muted);font-weight:400">(${esc(ind.unit)})</span></td>
          ${chosen.map((c) => `<td class="num ${c[ind.key] === best(ind.key) ? "winner" : ""}">${esc(formatIndicator(c, ind))}${c[ind.key] === best(ind.key) ? " ★" : ""}</td>`).join("")}
        </tr>`).join("")}
        <tr><td class="country">Capital</td>${chosen.map((c) => `<td>${esc(c.capital)}</td>`).join("")}</tr>
        <tr><td class="country">Region</td>${chosen.map((c) => `<td>${esc(c.region)}</td>`).join("")}</tr>
      </tbody>
    </table></div>
    <p class="source-line">★ marks the best value in the row (highest for every indicator shown). Figures are 2023–2024 estimates; sources on the <a href="#/about">Sources &amp; method</a> page.</p>
  </section>`;

  document.querySelectorAll(".compare-picker select").forEach((sel) => {
    sel.addEventListener("change", () => {
      const next = [0, 1, 2, 3]
        .map((s) => document.getElementById(`pick${s}`).value)
        .filter(Boolean);
      const unique = [...new Set(next)];
      if (unique.length < 2) return;
      location.hash = `#/compare?c=${unique.join(",")}`;
    });
  });
}

// ---------- About / sources ----------
export function renderAbout() {
  setActiveNav("about");
  const app = document.getElementById("app");
  app.innerHTML = `
  <section class="hero">
    <h1>Sources &amp; method</h1>
    <p class="lede">Atlas is an independent explorer, not an official statistics office. Here is exactly where every number comes from and what it means.</p>
  </section>
  <section>
    <div class="card">
      <h3>Where the figures come from</h3>
      <table class="method-table">
        <thead><tr><th>Source</th><th>What it provides</th></tr></thead>
        <tbody>
          ${SOURCES.map((s) => `<tr><td><strong>${esc(s.name)}</strong></td><td>${esc(s.detail)}</td></tr>`).join("")}
        </tbody>
      </table>
      <p class="source-line">Figures are rounded estimates compiled in November 2026 from the sources' 2023–2024 editions. Small differences from the latest official releases are expected; Atlas rounds population to the nearest million and GDP to the nearest billion dollars.</p>
    </div>
  </section>
  <section class="grid-2">
    <div class="card">
      <h3>What each indicator means</h3>
      <ul class="tight">
        <li><strong>Population</strong> — mid-year 2024 estimate, all residents.</li>
        <li><strong>GDP</strong> — nominal gross domestic product, current US dollars, 2024.</li>
        <li><strong>GDP per capita</strong> — GDP divided by population; a rough average income, not a typical wage.</li>
        <li><strong>Life expectancy</strong> — years a newborn could expect to live at 2024 mortality rates.</li>
        <li><strong>Median age</strong> — the age splitting the population in half.</li>
        <li><strong>Urban population</strong> — share living in areas each country defines as urban.</li>
        <li><strong>CO₂ per person</strong> — fossil-fuel and industry emissions per head, 2023.</li>
        <li><strong>Internet users</strong> — share of people who used the internet in the last three months.</li>
      </ul>
    </div>
    <div class="card">
      <h3>How Atlas works</h3>
      <ul class="tight">
        <li>All ${COUNTRIES.length} country profiles and ${INDICATORS.length} indicators are embedded in the site's own files.</li>
        <li>Nothing is fetched from the network: the site works offline, sets no cookies and runs no trackers.</li>
        <li>Charts are drawn as inline SVG from the same data the tables show.</li>
        <li>Rankings sort the same dataset the country pages use, so a rank on one page always matches the other.</li>
      </ul>
      <p><a class="btn" href="#/">Explore the countries →</a></p>
    </div>
  </section>
  <section>
    <div class="notice">
      <p><strong>A note on accuracy.</strong> National statistics are revised as censuses and surveys land. Atlas is a guide for exploring and comparing countries, not a source to cite in place of the World Bank, the UN or a national statistics office.</p>
    </div>
  </section>`;
}

// ---------- Router ----------
export function route() {
  const { path, params } = parseHash();
  const parts = path.split("/").filter(Boolean);
  if (parts.length === 0) return renderHome();
  if (parts[0] === "country" && parts[1]) return renderCountry(parts[1].toUpperCase());
  if (parts[0] === "rankings") return renderRankings(params.get("m") || "pop");
  if (parts[0] === "compare") return renderCompare(params.get("c") || "");
  if (parts[0] === "about") return renderAbout();
  return renderHome();
}
