// Update on Mar.26
// AWS connection for future use (currently not yet involved AWS, need run "npm install pg" for postgreSQL use)
// (currently we use the localhost:3000 to fetch the backend mockup data in client/public folder)
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({ // we will fill in these infomation later for security
  host: '111',
  user: '111',
  password: '111',
  database: '111',
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

export default pool;