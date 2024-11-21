import mysql from 'mysql2/promise';
import { dbConfig } from '../../src/config/database.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const seeds = async (connection: mysql.Connection) => {
  // Insert demo client
  await connection.execute(`
    INSERT INTO clients (code, nom, adresse1, code_postal, ville, pays)
    VALUES ('CLIENT001', 'Demo Company', '123 Business Street', '75001', 'Paris', 'France')
    ON DUPLICATE KEY UPDATE code=code
  `);

  // Get the client id
  const [clients] = await connection.execute('SELECT id FROM clients WHERE code = ?', ['CLIENT001']);
  const clientId = (clients as any[])[0].id;

  // Insert demo user
  const hashedPassword = await bcrypt.hash('demo123', 10);
  await connection.execute(`
    INSERT INTO users (login, pass, admin, id_client)
    VALUES ('demo', ?, false, ?)
    ON DUPLICATE KEY UPDATE login=login
  `, [hashedPassword, clientId]);

  // Insert demo admin
  const adminPassword = await bcrypt.hash('admin123', 10);
  await connection.execute(`
    INSERT INTO users (login, pass, admin)
    VALUES ('admin', ?, true)
    ON DUPLICATE KEY UPDATE login=login
  `, [adminPassword]);

  // Insert demo articles
  const articles = [
    ['PROD001', 'Professional Laptop', 'Electronics', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853'],
    ['PROD002', 'Office Chair', 'Furniture', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'],
    ['PROD003', 'Wireless Mouse', 'Electronics', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46']
  ];

  for (const [code, libelle, famille, url_image] of articles) {
    await connection.execute(`
      INSERT INTO articles (code, libelle, famille, url_image)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE code=code
    `, [code, libelle, famille, url_image]);
  }
};

async function seed() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log('Starting seeding...');
    await seeds(connection);
    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

seed().catch(console.error);