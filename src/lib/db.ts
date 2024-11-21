import mysql from 'mysql2/promise';
import { dbConfig } from '../config/database';

export async function getConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    return connection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}