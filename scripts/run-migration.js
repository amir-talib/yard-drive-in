const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Supabase Postgres connection string
// Format: postgres://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
const connectionString = 'postgresql://postgres.urcxoluaeyhtexepwibg:YardDriveIn2024!@aws-0-eu-central-1.pooler.supabase.com:6543/postgres';

async function runMigration() {
    const client = new Client({ connectionString });

    try {
        console.log('🔌 Connecting to Supabase...');
        await client.connect();
        console.log('✅ Connected!\n');

        // Read migration file
        const migrationPath = path.join(__dirname, '../supabase/migrations/20251221000000_create_movies_table.sql');
        const sql = fs.readFileSync(migrationPath, 'utf8');

        console.log('📝 Running migration...\n');
        await client.query(sql);
        console.log('✅ Migration complete!\n');

        // Verify
        const result = await client.query('SELECT * FROM movies ORDER BY title');
        console.log(`📊 Movies in database: ${result.rows.length}`);
        result.rows.forEach(m => console.log(`  - ${m.title}: ${m.votes} votes`));

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await client.end();
    }
}

runMigration();
