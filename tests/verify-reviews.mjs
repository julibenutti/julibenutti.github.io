import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const rootIndexPath = path.join(root, "index.html");
const reviewIndexPath = path.join(root, "review/julibenutti.com/index.html");
const usersIndexPath = path.join(root, "users/index.html");
const dataPath = path.join(root, "assets/trustpilot/profiles.js");
const vercelPath = path.join(root, "vercel.json");

const rootIndexHtml = fs.readFileSync(rootIndexPath, "utf8");
assert.match(rootIndexHtml, /\/review\/julibenutti\.com\/index\.html/, "root must redirect to the review page");

assert.ok(fs.existsSync(reviewIndexPath), "review/julibenutti.com/index.html must exist");
assert.ok(fs.existsSync(usersIndexPath), "users/index.html must exist");
assert.ok(fs.existsSync(dataPath), "profiles data file must exist");

const reviewIndexHtml = fs.readFileSync(reviewIndexPath, "utf8");
const usersIndexHtml = fs.readFileSync(usersIndexPath, "utf8");

assert.match(reviewIndexHtml, /assets\/trustpilot\/profiles\.js\?v=single-juli-review-20260606/, "review page must load cache-busted shared profile data");
assert.match(usersIndexHtml, /assets\/trustpilot\/profiles\.js\?v=single-juli-review-20260606/, "users page must load the same cache-busted shared profile data");
assert.match(reviewIndexHtml, /<title>Opiniones sobre julibenutti\.com<\/title>/, "browser tab title must match the requested page title");
assert.match(reviewIndexHtml, /Finanzas y seguros[\s\S]*Inversión y patrimonio[\s\S]*Servicios financieros alternativos[\s\S]*julibenutti\.com/, "breadcrumb must show the requested full category path");
assert.match(reviewIndexHtml, /class="brand" href="https:\/\/trutspilot\.com\/review\/julibenutti\.com"/, "Trustpilot logo must link to the live review page");
assert.match(reviewIndexHtml, /href="https:\/\/trutspilot\.com\/review\/julibenutti\.com"[^>]*>33 opiniones<\/a>/, "hero opinions count must link to the live review page");
assert.match(reviewIndexHtml, /class="company-logo-link" href="https:\/\/julibenutti\.com"/, "company cover image must link to julibenutti.com");
assert.match(reviewIndexHtml, /class="company-title-link" href="https:\/\/julibenutti\.com">julibenutti\.com<\/a>/, "company title must link to julibenutti.com");
assert.match(reviewIndexHtml, /class="company-chip" href="https:\/\/julibenutti\.com">julibenutti\.com<\/a>/, "company info chip must link to julibenutti.com");
assert.match(reviewIndexHtml, /<a href="https:\/\/julibenutti\.com">julibenutti\.com<\/a>/, "company contact website must link to julibenutti.com");
assert.match(reviewIndexHtml, /5 estrellas[\s\S]*bar-pct">95%[\s\S]*4 estrellas[\s\S]*bar-pct">0%[\s\S]*3 estrellas[\s\S]*bar-pct">0%[\s\S]*2 estrellas[\s\S]*bar-pct">0%[\s\S]*1 estrella[\s\S]*bar-pct">0%/, "sidebar rating distribution must show only 5-star percentage and empty lower ratings");
assert.match(reviewIndexHtml, /Todas las opiniones[\s\S]*5 estrellas[\s\S]*filter-pct">95%[\s\S]*4 estrellas[\s\S]*filter-pct">0%[\s\S]*3 estrellas[\s\S]*filter-pct">0%[\s\S]*2 estrellas[\s\S]*filter-pct">0%[\s\S]*1 estrella[\s\S]*filter-pct">0%/, "full opinions filter must show 0% gray lower ratings");
assert.match(reviewIndexHtml, /Cómo clasifica Trustpilot las opiniones dadas las 33 opiniones/, "rating classification helper must mention the 33 reviews");
assert.doesNotMatch(reviewIndexHtml, /width: 96%|>3%<|&lt;1%|>2%/, "old lower-rating percentages must not remain");
assert.doesNotMatch(reviewIndexHtml, /<body class="pixel-perfect-mode">/, "review page must render functional HTML, not only the screenshot layer");
assert.doesNotMatch(reviewIndexHtml + usersIndexHtml, /MyFunded|Myfunded|MFF|Louis|Emma|Anah|gracias ike|Agradece la ayuda de Ike|ha sido muy grata/, "old source-brand/support copy must not remain in HTML");

const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(dataPath, "utf8"), context);

const profiles = context.window.trustpilotCloneData;
assert.equal(profiles.length, 33, "33 visible review cards are expected");

const countryCounts = profiles.reduce((counts, profile) => {
  counts[profile.country] = (counts[profile.country] || 0) + 1;
  return counts;
}, {});
assert.deepEqual(countryCounts, { AR: 27, UY: 2, CO: 2, MX: 2 }, "review cards should keep the requested country mix");

const profileTotalFromLabel = (label) => Number.parseInt(String(label).replace(/\D/g, ""), 10) || 1;
const monthNumber = new Map([
  ["abril", 3], ["mayo", 4], ["junio", 5]
]);
const parseLongDate = (value) => {
  const match = String(value).match(/^(\d{1,2}) de (abril|mayo|junio) de 2026$/);
  assert.ok(match, `date must use April-June 2026 Spanish format: ${value}`);
  return new Date(2026, monthNumber.get(match[2]), Number(match[1]));
};
const minReviewDate = new Date(2026, 3, 1);
const maxReviewDate = new Date(2026, 5, 5);
const assertDateInRequestedRange = (value) => {
  const date = parseLongDate(value);
  assert.ok(date >= minReviewDate && date <= maxReviewDate, `review date must be between 1 Apr 2026 and 5 Jun 2026: ${value}`);
};
const dataText = fs.readFileSync(dataPath, "utf8");
assert.doesNotMatch(dataText, /Alta coincidencia con LIT/, "old LIT title must be replaced");
assert.doesNotMatch(dataText, /mentorías de LIT/, "old LIT mention must be replaced with handle");
assert.match(dataText, /"Tuve coincidencia"/, "updated LIT title must be present");
assert.match(dataText, /mentorías de @lit_trading_official/, "updated LIT handle must be present");
assert.match(dataText, /Julieta me pasó un curso gratis para entenderlo mejor/, "Claude Code free-course detail must be present");
assert.match(dataText, /Vengo de trading manual y lo cuento porque venía operando bastante a ojo/, "manual-trading review rewrite must be present");
assert.match(dataText, /estoy mirando números y no me quiero poner loco/, "numbers-without-getting-crazy detail must be present");
assert.doesNotMatch(dataText, /ya me cambió la forma de mirar las entradas/, "old entries-focused wording must not remain");
assert.doesNotMatch(dataText, /código\. Para alguien que viene de consumir cursos sin convertirlos en nada usable/, "old method review without Claude Code detail must not remain");
assert.doesNotMatch(dataText, /\b(?:ene|feb|mar|jul|ago|sept|oct|nov|dic)\b 2026|Hace \d+ días|de (?:enero|febrero|marzo|julio|agosto|septiembre|octubre|noviembre|diciembre) de 2026|de \w+ de 2025/, "visible review data must not contain dates outside Apr 1-Jun 5 2026");

for (const profile of profiles) {
  assert.ok(profile.id, "profile needs id");
  assert.ok(profile.reviewId, "profile needs visible Trustpilot review id");
  assert.ok(profile.name, "profile needs name");
  assert.match(profile.country, /^(AR|UY|CO|MX)$/, "visible profiles must be from expected countries");
  assert.match(profile.profileUrl, /^\/users\/\?id=.*&review=/, "profile must link to local /users/ with id and review id");
  assert.ok(Array.isArray(profile.reviews), "profile reviews must be an array");
  assert.equal(profile.reviews.length, profileTotalFromLabel(profile.reviewCount), "profile review count must match the visible label");
  assert.equal(profile.reviews.filter((review) => review.company === "julibenutti.com").length, 1, "each profile must show exactly one julibenutti.com review");
  assert.equal(profile.reviews[0].company, "julibenutti.com", "first review should be the visible julibenutti.com review");
  assert.equal(profile.reviews[0].domain, "julibenutti.com", "first review domain should be julibenutti.com");
  assertDateInRequestedRange(profile.experienceDate);
  assertDateInRequestedRange(profile.reviews[0].date);
  assert.doesNotMatch(`${profile.title} ${profile.body} ${profile.reviews.map((r) => `${r.title} ${r.body}`).join(" ")}`, /Sistema Propio|MyFunded|Myfunded|MFF|Louis|Emma|Anah|gracias ike|Agradece la ayuda de Ike|ha sido muy grata/, "review text must not contain stale product/source copy");
}

const valentinReviews = profiles.filter((profile) => profile.name === "Valentin Silva");
assert.equal(valentinReviews.length, 2, "Valentin has two separate visible review cards");
assert.notEqual(valentinReviews[0].profileUrl, valentinReviews[1].profileUrl, "repeated reviewer cards must open review-specific profile URLs");
assert.ok(valentinReviews.every((profile) => profile.reviews.filter((review) => review.company === "julibenutti.com").length === 1), "Valentin profiles must not duplicate julibenutti.com reviews");

if (fs.existsSync(vercelPath)) {
  const vercel = JSON.parse(fs.readFileSync(vercelPath, "utf8"));
  assert.ok(Array.isArray(vercel.rewrites), "vercel.json should define static rewrites");
  assert.ok(Array.isArray(vercel.headers), "vercel.json should define headers");
}

console.log("OK: review data, profile sync, stale copy, and static hosting checks passed");
