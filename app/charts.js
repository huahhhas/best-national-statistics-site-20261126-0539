// Atlas charts — small inline-SVG chart builders. No libraries, no network.
// Every chart is plain SVG so it renders identically on desktop and phone.

export const PALETTE = ["#0e7c7b", "#0f2a43", "#e8a13a", "#7a5fb0", "#c25e4b", "#3d8f5f"];

function esc(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function niceMax(value) {
  const power = Math.pow(10, Math.floor(Math.log10(value)));
  const scaled = value / power;
  const nice = scaled <= 1 ? 1 : scaled <= 2 ? 2 : scaled <= 2.5 ? 2.5 : scaled <= 5 ? 5 : 10;
  return nice * power;
}

// Horizontal bars: rows of { label, value, color? }. valueText formats the value.
export function hbarChart(rows, valueText, options = {}) {
  const width = options.width || 640;
  const labelWidth = options.labelWidth || 110;
  const rowHeight = options.rowHeight || 30;
  const barHeight = 13;
  const max = niceMax(Math.max(...rows.map((r) => r.value), 1));
  const height = rows.length * rowHeight + 8;
  const plotWidth = width - labelWidth - 70;
  let out = `<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(options.title || "Bar chart")}">`;
  rows.forEach((row, i) => {
    const y = 8 + i * rowHeight;
    const barWidth = Math.max(2, (row.value / max) * plotWidth);
    const color = row.color || PALETTE[i % PALETTE.length];
    out += `<text x="0" y="${y + 13}" font-size="13" fill="#1c2733">${esc(row.label)}</text>`;
    out += `<rect x="${labelWidth}" y="${y}" width="${barWidth}" height="${barHeight}" rx="3" fill="${color}"/>`;
    out += `<text x="${labelWidth + barWidth + 8}" y="${y + 13}" font-size="13" fill="#5a6b7a">${esc(valueText(row.value))}</text>`;
  });
  out += "</svg>";
  return out;
}

// Grouped vertical bars: one group per indicator, one bar per country.
export function groupedBarChart(countries, indicators, formatValue) {
  const width = 640;
  const height = 300;
  const padLeft = 46;
  const padBottom = 34;
  const padTop = 14;
  const plotWidth = width - padLeft - 10;
  const plotHeight = height - padTop - padBottom;
  const groupWidth = plotWidth / indicators.length;
  const barWidth = Math.min(34, (groupWidth - 14) / Math.max(countries.length, 1) - 4);
  let out = `<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Grouped comparison chart">`;
  indicators.forEach((ind, gi) => {
    const values = countries.map((c) => c[ind.key]);
    const max = niceMax(Math.max(...values, 1));
    const groupX = padLeft + gi * groupWidth;
    // gridlines at 0, 50%, 100% of this indicator's scale, inside this group only
    [0, 0.5, 1].forEach((f) => {
      const y = padTop + plotHeight - f * plotHeight;
      out += `<line x1="${groupX + 4}" y1="${y}" x2="${groupX + groupWidth - 4}" y2="${y}" stroke="#dfe6ea" stroke-width="1"/>`;
    });
    countries.forEach((c, ci) => {
      const barHeight = (c[ind.key] / max) * plotHeight;
      const x = groupX + 7 + ci * (barWidth + 4);
      const y = padTop + plotHeight - barHeight;
      out += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barWidth}" height="${Math.max(barHeight, 1).toFixed(1)}" rx="2" fill="${PALETTE[ci % PALETTE.length]}"><title>${esc(c.name)} — ${esc(ind.label)}: ${esc(formatValue(c, ind))}</title></rect>`;
    });
    out += `<text x="${(groupX + groupWidth / 2).toFixed(1)}" y="${height - 8}" font-size="12" fill="#5a6b7a" text-anchor="middle">${esc(ind.label)}</text>`;
  });
  out += `<line x1="${padLeft}" y1="${padTop}" x2="${padLeft}" y2="${padTop + plotHeight}" stroke="#9fb0bd" stroke-width="1"/>`;
  out += "</svg>";
  return out;
}

// Simple vertical bars for a single indicator across countries.
export function vbarChart(rows, valueText, options = {}) {
  const width = options.width || 640;
  const height = options.height || 260;
  const padBottom = 30;
  const padTop = 12;
  const plotHeight = height - padTop - padBottom;
  const max = niceMax(Math.max(...rows.map((r) => r.value), 1));
  const slot = width / rows.length;
  const barWidth = Math.min(44, slot * 0.6);
  let out = `<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(options.title || "Bar chart")}">`;
  [0, 0.5, 1].forEach((f) => {
    const y = padTop + plotHeight - f * plotHeight;
    out += `<line x1="0" y1="${y}" x2="${width}" y2="${y}" stroke="#dfe6ea" stroke-width="1"/>`;
    out += `<text x="2" y="${y - 3}" font-size="11" fill="#5a6b7a">${esc(valueText(max * f))}</text>`;
  });
  rows.forEach((row, i) => {
    const barHeight = (row.value / max) * plotHeight;
    const x = i * slot + (slot - barWidth) / 2;
    const y = padTop + plotHeight - barHeight;
    out += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barWidth}" height="${Math.max(barHeight, 1).toFixed(1)}" rx="2" fill="${row.color || PALETTE[i % PALETTE.length]}"><title>${esc(row.label)}: ${esc(valueText(row.value))}</title></rect>`;
    out += `<text x="${(i * slot + slot / 2).toFixed(1)}" y="${height - 8}" font-size="12" fill="#1c2733" text-anchor="middle">${esc(row.short || row.label)}</text>`;
  });
  out += "</svg>";
  return out;
}
