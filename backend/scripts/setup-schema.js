const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const PB_URL = process.env.PB_URL || 'http://127.0.0.1:8090';
const ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL || 'dev@bau-nakit.local';
const ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD || 'devadmin123';
const SCHEMA_PATH = path.join(__dirname, '..', 'pb_schema.json');
const PB_BIN = path.join(__dirname, '..', 'pocketbase');
const PB_DATA = path.join(__dirname, '..', 'pb_data');

/** Порядок создания: сначала коллекции без зависимостей */
const COLLECTION_ORDER = [
  'product_collections',
  'product_colors',
  'product_types',
  'shops',
  'products',
  'registry',
  'packaging',
];

async function authWithPassword() {
  const legacy = await fetch(`${PB_URL}/api/admins/auth-with-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identity: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });

  if (legacy.ok) {
    const data = await legacy.json();
    return data.token;
  }

  const auth = await fetch(`${PB_URL}/api/collections/_superusers/auth-with-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identity: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });

  if (!auth.ok) {
    return null;
  }

  const data = await auth.json();
  return data.token;
}

async function ensureAdmin() {
  const token = await authWithPassword();
  if (token) {
    return token;
  }

  console.log('Creating local superuser account...');
  const result = spawnSync(PB_BIN, ['superuser', 'upsert', ADMIN_EMAIL, ADMIN_PASSWORD], {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
  });

  if (result.status !== 0) {
    throw new Error('Failed to create PocketBase superuser');
  }

  const retry = await authWithPassword();
  if (!retry) {
    throw new Error('Superuser login failed after create');
  }

  return retry;
}

async function listCollectionNames(token) {
  const res = await fetch(`${PB_URL}/api/collections?perPage=500`, {
    headers: { Authorization: token },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to list collections: ${text}`);
  }

  const data = await res.json();
  return new Set(data.items.map((item) => item.name));
}

async function importCollections(token, collections) {
  const res = await fetch(`${PB_URL}/api/collections/import`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ collections, deleteMissing: false }),
  });

  if (res.ok) {
    return true;
  }

  if (res.status !== 404) {
    const text = await res.text();
    throw new Error(`Schema import failed: ${text}`);
  }

  return false;
}

async function createCollection(token, collection) {
  const res = await fetch(`${PB_URL}/api/collections`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(collection),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to create "${collection.name}": ${text}`);
  }
}

async function main() {
  if (!fs.existsSync(SCHEMA_PATH)) {
    console.error('pb_schema.json not found');
    process.exit(1);
  }

  const collections = JSON.parse(fs.readFileSync(SCHEMA_PATH, 'utf8'));
  const byName = new Map(collections.map((c) => [c.name, c]));

  console.log('Authenticating...');
  const token = await ensureAdmin();

  const existing = await listCollectionNames(token);
  const missing = COLLECTION_ORDER.filter((name) => byName.has(name) && !existing.has(name));

  if (missing.length === 0) {
    console.log('All schema collections already exist.');
    return;
  }

  const toImport = COLLECTION_ORDER.filter((name) => byName.has(name) && !existing.has(name)).map(
    (name) => byName.get(name),
  );

  console.log(`Applying ${toImport.length} collection(s)...`);

  const usedBulkImport = await importCollections(token, toImport);
  if (usedBulkImport) {
    console.log('Schema imported via collections/import API.');
    return;
  }

  for (const collection of toImport) {
    console.log(`  + ${collection.name}`);
    await createCollection(token, collection);
  }

  console.log('Schema applied successfully.');
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});