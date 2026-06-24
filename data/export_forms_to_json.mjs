import fs from "node:fs/promises";
import path from "node:path";
import mysql from "mysql2/promise";

const outputFile = path.resolve(process.cwd(), "forms_id_address.json");

const dbConfig = {
  host: "suhodaehaeng.com",
  port: 3306,
  user: "suhodaehaeng",
  password: "suho2025*",
  database: "suhodaehaeng",
  timezone: "Z",
  ssl: false,
};

function normalizeId(rawId) {
  if (Buffer.isBuffer(rawId)) {
    return rawId.toString("utf8").trim();
  }

  if (rawId === null || rawId === undefined) {
    return "";
  }

  return String(rawId).trim();
}

async function main() {
  const conn = await mysql.createConnection(dbConfig);

  try {
    const [rows] = await conn.query(
      `
      SELECT id, address
      FROM forms
      WHERE address IS NOT NULL
        AND TRIM(address) <> ''
      ORDER BY id ASC
      `
    );

    const payload = rows.map((row) => ({
      id: normalizeId(row.id),
      address: String(row.address).trim(),
    }));

    await fs.writeFile(outputFile, JSON.stringify(payload, null, 2), "utf8");

    console.log(`Saved ${payload.length} rows to ${outputFile}`);
  } finally {
    await conn.end();
  }
}

main().catch((err) => {
  console.error("Failed to export forms:", err);
  process.exitCode = 1;
});
