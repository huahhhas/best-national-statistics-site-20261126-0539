// Atlas data — 40 countries, 9 indicators each.
// Figures are approximate estimates for 2023–2024, compiled from the
// World Bank's World Development Indicators, UN World Population Prospects
// 2024 and the IMF World Economic Outlook (October 2024). Populations are
// mid-year 2024 estimates; GDP is nominal, in current US dollars.
// Fields: code (ISO 3166-1 alpha-3), name, region, capital,
// pop (millions), gdp (US$ billions), gdppc (US$), life (years),
// area (km2), age (median years), urban (% of population),
// co2 (tonnes per person, 2023), net (% using the internet).
export const COUNTRIES = [
  { code: "CHN", name: "China", region: "Asia", capital: "Beijing", pop: 1412, gdp: 18750, gdppc: 13280, life: 78.6, area: 9596961, age: 39.5, urban: 65, co2: 8.0, net: 78 },
  { code: "IND", name: "India", region: "Asia", capital: "New Delhi", pop: 1450, gdp: 3889, gdppc: 2680, life: 68.4, area: 3287263, age: 28.7, urban: 36, co2: 2.0, net: 55 },
  { code: "USA", name: "United States", region: "Americas", capital: "Washington, D.C.", pop: 340, gdp: 29170, gdppc: 85700, life: 79.6, area: 9833517, age: 38.9, urban: 83, co2: 13.8, net: 92 },
  { code: "IDN", name: "Indonesia", region: "Asia", capital: "Jakarta", pop: 283, gdp: 1402, gdppc: 4950, life: 69.9, area: 1904569, age: 30.1, urban: 58, co2: 2.5, net: 66 },
  { code: "PAK", name: "Pakistan", region: "Asia", capital: "Islamabad", pop: 251, gdp: 373, gdppc: 1490, life: 66.1, area: 881913, age: 20.6, urban: 37, co2: 0.9, net: 36 },
  { code: "NGA", name: "Nigeria", region: "Africa", capital: "Abuja", pop: 232, gdp: 253, gdppc: 1090, life: 54.6, area: 923768, age: 18.1, urban: 54, co2: 0.7, net: 46 },
  { code: "BRA", name: "Brazil", region: "Americas", capital: "Brasília", pop: 216, gdp: 2170, gdppc: 10030, life: 75.9, area: 8515767, age: 34.0, urban: 88, co2: 2.2, net: 82 },
  { code: "BGD", name: "Bangladesh", region: "Asia", capital: "Dhaka", pop: 173, gdp: 451, gdppc: 2620, life: 73.2, area: 147570, age: 27.0, urban: 40, co2: 0.6, net: 39 },
  { code: "RUS", name: "Russia", region: "Europe", capital: "Moscow", pop: 144, gdp: 2010, gdppc: 13960, life: 72.8, area: 17098242, age: 40.3, urban: 75, co2: 11.4, net: 89 },
  { code: "MEX", name: "Mexico", region: "Americas", capital: "Mexico City", pop: 130, gdp: 1849, gdppc: 14200, life: 75.5, area: 1964375, age: 29.8, urban: 81, co2: 3.6, net: 81 },
  { code: "ETH", name: "Ethiopia", region: "Africa", capital: "Addis Ababa", pop: 129, gdp: 205, gdppc: 1590, life: 66.0, area: 1104300, age: 19.8, urban: 22, co2: 0.2, net: 19 },
  { code: "JPN", name: "Japan", region: "Asia", capital: "Tokyo", pop: 124, gdp: 4026, gdppc: 32600, life: 84.1, area: 377975, age: 49.5, urban: 92, co2: 8.5, net: 83 },
  { code: "PHL", name: "Philippines", region: "Asia", capital: "Manila", pop: 118, gdp: 461, gdppc: 3910, life: 71.7, area: 300000, age: 25.7, urban: 48, co2: 1.4, net: 68 },
  { code: "EGY", name: "Egypt", region: "Africa", capital: "Cairo", pop: 113, gdp: 381, gdppc: 3370, life: 70.5, area: 1001450, age: 24.5, urban: 43, co2: 2.3, net: 72 },
  { code: "COD", name: "DR Congo", region: "Africa", capital: "Kinshasa", pop: 105, gdp: 74, gdppc: 700, life: 62.4, area: 2344858, age: 16.5, urban: 46, co2: 0.1, net: 27 },
  { code: "VNM", name: "Vietnam", region: "Asia", capital: "Hanoi", pop: 100, gdp: 476, gdppc: 4760, life: 74.7, area: 331212, age: 32.9, urban: 39, co2: 3.2, net: 79 },
  { code: "IRN", name: "Iran", region: "Asia", capital: "Tehran", pop: 89, gdp: 401, gdppc: 4520, life: 74.7, area: 1648195, age: 33.3, urban: 76, co2: 7.9, net: 79 },
  { code: "TUR", name: "Türkiye", region: "Europe", capital: "Ankara", pop: 86, gdp: 1355, gdppc: 15770, life: 77.2, area: 783562, age: 33.6, urban: 77, co2: 5.0, net: 83 },
  { code: "DEU", name: "Germany", region: "Europe", capital: "Berlin", pop: 84, gdp: 4650, gdppc: 55300, life: 81.8, area: 357588, age: 46.8, urban: 78, co2: 7.1, net: 92 },
  { code: "THA", name: "Thailand", region: "Asia", capital: "Bangkok", pop: 72, gdp: 528, gdppc: 7350, life: 77.0, area: 513120, age: 40.8, urban: 53, co2: 3.8, net: 89 },
  { code: "GBR", name: "United Kingdom", region: "Europe", capital: "London", pop: 69, gdp: 3495, gdppc: 50500, life: 81.8, area: 242495, age: 40.7, urban: 84, co2: 4.9, net: 95 },
  { code: "FRA", name: "France", region: "Europe", capital: "Paris", pop: 68, gdp: 3130, gdppc: 46000, life: 82.9, area: 551695, age: 42.8, urban: 82, co2: 4.3, net: 94 },
  { code: "TZA", name: "Tanzania", region: "Africa", capital: "Dodoma", pop: 67, gdp: 79, gdppc: 1180, life: 66.9, area: 945087, age: 18.0, urban: 35, co2: 0.2, net: 32 },
  { code: "ZAF", name: "South Africa", region: "Africa", capital: "Pretoria", pop: 60, gdp: 380, gdppc: 6330, life: 64.9, area: 1221037, age: 28.3, urban: 68, co2: 7.4, net: 72 },
  { code: "ITA", name: "Italy", region: "Europe", capital: "Rome", pop: 59, gdp: 2320, gdppc: 39500, life: 83.4, area: 302073, age: 48.2, urban: 71, co2: 5.3, net: 91 },
  { code: "KEN", name: "Kenya", region: "Africa", capital: "Nairobi", pop: 55, gdp: 116, gdppc: 2090, life: 63.3, area: 580876, age: 19.7, urban: 29, co2: 0.3, net: 33 },
  { code: "MMR", name: "Myanmar", region: "Asia", capital: "Naypyidaw", pop: 54, gdp: 63, gdppc: 1160, life: 66.9, area: 676578, age: 29.5, urban: 31, co2: 0.4, net: 44 },
  { code: "COL", name: "Colombia", region: "Americas", capital: "Bogotá", pop: 52, gdp: 418, gdppc: 8000, life: 77.5, area: 1141748, age: 32.3, urban: 81, co2: 1.6, net: 77 },
  { code: "KOR", name: "South Korea", region: "Asia", capital: "Seoul", pop: 52, gdp: 1870, gdppc: 35900, life: 83.4, area: 100210, age: 44.5, urban: 81, co2: 11.0, net: 97 },
  { code: "SDN", name: "Sudan", region: "Africa", capital: "Khartoum", pop: 50, gdp: 31, gdppc: 610, life: 65.8, area: 1886068, age: 19.6, urban: 35, co2: 0.5, net: 26 },
  { code: "ESP", name: "Spain", region: "Europe", capital: "Madrid", pop: 48, gdp: 1647, gdppc: 34100, life: 83.9, area: 505990, age: 45.1, urban: 81, co2: 4.9, net: 94 },
  { code: "UGA", name: "Uganda", region: "Africa", capital: "Kampala", pop: 49, gdp: 55, gdppc: 1110, life: 68.9, area: 241550, age: 17.0, urban: 26, co2: 0.1, net: 27 },
  { code: "ARG", name: "Argentina", region: "Americas", capital: "Buenos Aires", pop: 46, gdp: 633, gdppc: 13800, life: 77.4, area: 2780400, age: 32.5, urban: 92, co2: 3.7, net: 89 },
  { code: "DZA", name: "Algeria", region: "Africa", capital: "Algiers", pop: 46, gdp: 264, gdppc: 5740, life: 76.4, area: 2381741, age: 29.1, urban: 74, co2: 3.7, net: 71 },
  { code: "IRQ", name: "Iraq", region: "Asia", capital: "Baghdad", pop: 45, gdp: 265, gdppc: 5900, life: 72.9, area: 438317, age: 21.5, urban: 71, co2: 4.6, net: 75 },
  { code: "CAN", name: "Canada", region: "Americas", capital: "Ottawa", pop: 40, gdp: 2230, gdppc: 55800, life: 82.6, area: 9984670, age: 41.5, urban: 82, co2: 14.3, net: 93 },
  { code: "MAR", name: "Morocco", region: "Africa", capital: "Rabat", pop: 38, gdp: 144, gdppc: 3780, life: 75.7, area: 446550, age: 30.3, urban: 65, co2: 1.9, net: 84 },
  { code: "UKR", name: "Ukraine", region: "Europe", capital: "Kyiv", pop: 38, gdp: 188, gdppc: 4950, life: 74.3, area: 603550, age: 41.9, urban: 70, co2: 4.5, net: 85 },
  { code: "POL", name: "Poland", region: "Europe", capital: "Warsaw", pop: 37, gdp: 914, gdppc: 24800, life: 79.6, area: 312696, age: 42.6, urban: 60, co2: 7.3, net: 90 },
  { code: "UZB", name: "Uzbekistan", region: "Asia", capital: "Tashkent", pop: 36, gdp: 111, gdppc: 3070, life: 72.0, area: 447400, age: 28.7, urban: 51, co2: 3.6, net: 80 },
];

export const INDICATORS = [
  { key: "pop", label: "Population", unit: "million", decimals: 0, higher: "Largest population" },
  { key: "gdp", label: "GDP", unit: "US$ bn", decimals: 0, higher: "Largest economy" },
  { key: "gdppc", label: "GDP per capita", unit: "US$", decimals: 0, higher: "Richest per person" },
  { key: "life", label: "Life expectancy", unit: "years", decimals: 1, higher: "Longest lives" },
  { key: "area", label: "Land area", unit: "km²", decimals: 0, higher: "Largest country" },
  { key: "age", label: "Median age", unit: "years", decimals: 1, higher: "Oldest population" },
  { key: "urban", label: "Urban population", unit: "%", decimals: 0, higher: "Most urban" },
  { key: "co2", label: "CO₂ per person", unit: "tonnes", decimals: 1, higher: "Highest emissions" },
  { key: "net", label: "Internet users", unit: "%", decimals: 0, higher: "Most connected" },
];

export const SOURCES = [
  { name: "World Bank — World Development Indicators", detail: "Population, GDP, GDP per capita, life expectancy, urban share, CO₂ per capita, internet users. 2023–2024 editions." },
  { name: "United Nations — World Population Prospects 2024", detail: "Mid-year population estimates and median age." },
  { name: "IMF — World Economic Outlook, October 2024", detail: "Nominal GDP in current US dollars." },
];

export function byCode(code) {
  return COUNTRIES.find((c) => c.code === code) || null;
}

export function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function formatNumber(value, decimals = 0) {
  return value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function formatIndicator(country, indicator) {
  const value = country[indicator.key];
  return `${formatNumber(value, indicator.decimals)} ${indicator.unit}`;
}
