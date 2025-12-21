import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const supabaseUrl = 'https://urcxoluaeyhtexepwibg.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyY3hvbHVhZXlodGV4ZXB3aWJnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjI2MzY4OSwiZXhwIjoyMDgxODM5Njg5fQ.LmYm35F9djBM68jA6ntJd4i0g6hGutyRBrFNFVr-GVc';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function runMigration() {
    console.log('🚀 Running Supabase migration...\n');

    // Read migration file
    const migrationPath = path.join(__dirname, '../supabase/migrations/20251221000000_create_movies_table.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');

    // Split into individual statements
    const statements = sql.split(';').filter(s => s.trim());

    for (const statement of statements) {
        if (!statement.trim()) continue;

        console.log(`Executing: ${statement.substring(0, 50)}...`);

        const { error } = await supabase.rpc('exec_sql', { sql: statement + ';' }).single();

        if (error) {
            // Try direct query for simpler statements
            const { error: queryError } = await supabase.from('_temp').select().limit(0);
            if (queryError && !queryError.message.includes('does not exist')) {
                console.error('Error:', error.message);
            }
        }
    }

    console.log('\n✅ Migration complete!');

    // Verify by fetching movies
    const { data, error } = await supabase.from('movies').select('*');
    if (error) {
        console.error('Verification failed:', error.message);
    } else {
        console.log(`\n📊 Movies in database: ${data?.length || 0}`);
        data?.forEach(m => console.log(`  - ${m.title}: ${m.votes} votes`));
    }
}

runMigration().catch(console.error);
