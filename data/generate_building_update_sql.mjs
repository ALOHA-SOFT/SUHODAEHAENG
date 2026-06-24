import fs from "node:fs/promises";
import path from "node:path";

const inputJson = path.resolve(process.cwd(), "forms_id_address.json");
const outputSql = path.resolve(process.cwd(), "update_forms_building_name.sql");
const outputMap = path.resolve(process.cwd(), "forms_building_name_map.json");
const searchEndpoint = "https://postcode.map.kakao.com/search";

function sqlEscape(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'");
}

function htmlAttrDecode(value) {
  return String(value || "")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function normalizeAddress(text) {
  return String(text || "")
    .trim()
    .replace(/\([^)]*\)/g, "")
    .replace(/서울특별시/g, "서울")
    .replace(/부산광역시/g, "부산")
    .replace(/대구광역시/g, "대구")
    .replace(/인천광역시/g, "인천")
    .replace(/광주광역시/g, "광주")
    .replace(/대전광역시/g, "대전")
    .replace(/울산광역시/g, "울산")
    .replace(/세종특별자치시/g, "세종")
    .replace(/[\s,-]/g, "")
    .toLowerCase();
}

function extractAttr(tag, attrName) {
  const pattern = new RegExp(`${attrName}="([^"]*)"`);
  const match = tag.match(pattern);
  return match ? htmlAttrDecode(match[1]) : "";
}

function parseCandidates(html) {
  const startTagMatches = html.match(/<li\s+class="list_post_item[\s\S]*?>/g) || [];

  return startTagMatches.map((tag) => ({
    addr: extractAttr(tag, "data-addr"),
    buildingName: extractAttr(tag, "data-building_name"),
  }));
}

function chooseCandidate(inputAddress, candidates) {
  if (candidates.length === 0) {
    return {
      buildingName: "",
      matchedAddr: "",
      score: 0,
    };
  }

  const target = normalizeAddress(inputAddress);
  let best = {
    buildingName: "",
    matchedAddr: "",
    score: -1,
  };

  for (const candidate of candidates) {
    const source = normalizeAddress(candidate.addr);
    let score = 0;

    if (!source) {
      score = 0;
    } else if (source === target) {
      score = 100;
    } else if (source.includes(target) || target.includes(source)) {
      score = 85;
    } else {
      const minLength = Math.min(source.length, target.length);
      let prefix = 0;
      while (prefix < minLength && source[prefix] === target[prefix]) {
        prefix += 1;
      }
      score = Math.floor((prefix / Math.max(1, target.length)) * 70);
    }

    const bonus = candidate.buildingName ? 10 : 0;
    const finalScore = score + bonus;

    if (finalScore > best.score) {
      best = {
        buildingName: candidate.buildingName || "",
        matchedAddr: candidate.addr || "",
        score: finalScore,
      };
    }
  }

  return best;
}

async function resolveFromKakao(address) {
  const params = new URLSearchParams({
    origin: "https://example.com",
    region_name: address,
  });

  const response = await fetch(`${searchEndpoint}?${params.toString()}`, {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml",
      Referer: "https://postcode.map.kakao.com/",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const html = await response.text();
  const candidates = parseCandidates(html);
  return chooseCandidate(address, candidates);
}

async function loadRows() {
  const raw = await fs.readFile(inputJson, "utf8");
  const parsed = JSON.parse(raw);

  if (!Array.isArray(parsed)) {
    throw new Error("Input JSON must be an array");
  }

  return parsed
    .map((row) => ({
      id: String(row.id || "").trim(),
      address: String(row.address || "").trim(),
    }))
    .filter((row) => row.id.length > 0 && row.address.length > 0);
}

async function main() {
  const rows = await loadRows();
  if (rows.length === 0) {
    throw new Error("No valid rows found in forms_id_address.json");
  }

  const results = [];

  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i];

    try {
      const resolved = await resolveFromKakao(row.address);

      results.push({
        id: row.id,
        address: row.address,
        matchedAddr: resolved.matchedAddr,
        buildingName: String(resolved.buildingName || "").trim(),
        score: resolved.score,
        ok: true,
        reason: "resolved",
      });
    } catch (error) {
      results.push({
        id: row.id,
        address: row.address,
        matchedAddr: "",
        buildingName: "",
        score: 0,
        ok: false,
        reason: "request_error",
        error: String(error),
      });
    }

    // Avoid sending too many requests in a tight burst.
    await new Promise((resolve) => setTimeout(resolve, 120));

    if ((i + 1) % 20 === 0 || i === rows.length - 1) {
      console.log(`Resolved ${i + 1}/${rows.length}`);
    }
  }

  await fs.writeFile(outputMap, JSON.stringify(results, null, 2), "utf8");

  const sqlLines = [
    "-- Auto-generated SQL for forms.building update",
    "START TRANSACTION;",
  ];

  for (const item of results) {
    if (!item.buildingName) continue;

    sqlLines.push(
      `UPDATE forms SET building='${sqlEscape(item.buildingName)}' WHERE id='${sqlEscape(item.id)}';`
    );
  }

  sqlLines.push("COMMIT;");

  await fs.writeFile(outputSql, `${sqlLines.join("\n")}\n`, "utf8");

  const successCount = results.filter((r) => r.buildingName).length;
  console.log(`Saved mapping JSON: ${outputMap}`);
  console.log(`Saved SQL file: ${outputSql}`);
  console.log(`Resolved building names: ${successCount}/${results.length}`);
}

main().catch((err) => {
  console.error("Failed to generate update SQL:", err);
  process.exitCode = 1;
});
