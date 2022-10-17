import pg from 'pg';

const { Pool } = pg;

const user = 'postgres';
const password = '123123';
const host = 'localhost';
const port = 5432;
const database = 'shortly';


const connection = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
      rejectUnauthorized: false
  }
};

export default connection;