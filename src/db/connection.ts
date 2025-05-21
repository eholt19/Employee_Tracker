import { Pool } from 'pg';


const pool = new Pool({
  user: 'postgres',          
  password: 'Unicorn*19',    
  host: 'localhost',
  database: 'employees_db', 
  port: 5432,
});

export default pool;
