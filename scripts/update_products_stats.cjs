const fs = require('fs');

let code = fs.readFileSync('src/data/productsData.js', 'utf8');

// The 6 hidden SKUs
const hiddenSkus = new Set(['RP-003', 'RP-016', 'RP-025', 'RP-030', 'RP-035', 'RP-040']);

// The 4 out of stock SKUs
const habisSkus = new Set(['RP-006', 'RP-011', 'RP-017', 'RP-023']);

// Check helper
const helperCode = `// Helper untuk menghasilkan ISO timestamp aktual yang stabil dan dinamis
const _now = new Date();
const _todayAt = (h, m) => {
  const d = new Date(_now);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
};
const _yesterdayAt = (h, m) => {
  const d = new Date(_now);
  d.setDate(d.getDate() - 1);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
};
const _daysAgoAt = (days, h, m) => {
  const d = new Date(_now);
  d.setDate(d.getDate() - days);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
};

`;

if (!code.includes('_todayAt')) {
  code = code.replace('export const productsData = [', helperCode + 'export const productsData = [');
}

// Regex to find each product block and update availability, isPublished, and updatedAt
// We can match `{ id: X, sku: 'RP-YYY', ... createdAt: '...' }`
code = code.replace(/\{(\s*id:\s*(\d+),\s*sku:\s*'(RP-\d+)'[\s\S]*?createdAt:\s*'[^']+',)/g, (match, prefix, id, sku) => {
  // Determine availability
  const availability = habisSkus.has(sku) ? "'Habis'" : "'Tersedia'";
  // Determine isPublished
  const isPublished = hiddenSkus.has(sku) ? 'false' : 'true';

  // Determine updatedAt
  let updatedAtExpr = '_daysAgoAt(5, 10, 0)';
  if (sku === 'RP-001') updatedAtExpr = '_todayAt(9, 20)';
  else if (sku === 'RP-002') updatedAtExpr = '_todayAt(8, 45)';
  else if (sku === 'RP-006') updatedAtExpr = '_yesterdayAt(16, 10)';
  else if (sku === 'RP-003') updatedAtExpr = '_yesterdayAt(14, 30)';
  else if (sku === 'RP-007') updatedAtExpr = '_yesterdayAt(11, 5)';
  else {
    const dayOffset = 2 + (parseInt(id, 10) % 5);
    updatedAtExpr = `_daysAgoAt(${dayOffset}, 10, 0)`;
  }

  // Replace availability
  let updatedBlock = match.replace(/availability:\s*'[^']+',/, `availability: ${availability},`);
  // Replace isPublished
  updatedBlock = updatedBlock.replace(/isPublished:\s*(true|false),/, `isPublished: ${isPublished},`);
  // Add updatedAt if not present
  if (!updatedBlock.includes('updatedAt:')) {
    updatedBlock = updatedBlock.replace(/createdAt:\s*'[^']+',/, (m) => `${m}\n    updatedAt: ${updatedAtExpr},`);
  }

  return updatedBlock;
});

fs.writeFileSync('src/data/productsData.js', code, 'utf8');
console.log('Successfully updated productsData.js');
