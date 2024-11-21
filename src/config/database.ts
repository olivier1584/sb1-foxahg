import dotenv from 'dotenv';
import { ConnectionOptions } from 'mysql2/promise';

dotenv.config();

export const dbConfig: ConnectionOptions = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'b2b_orders',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  ssl: {
    rejectUnauthorized: false
  }
};