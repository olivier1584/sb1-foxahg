import mysql from 'mysql2/promise';
import { dbConfig } from '../../src/config/database.js';

const migrations = [
  // Create users table
  `CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    login VARCHAR(50) NOT NULL UNIQUE,
    pass VARCHAR(255) NOT NULL,
    admin BOOLEAN DEFAULT FALSE,
    id_client INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,

  // Create clients table
  `CREATE TABLE IF NOT EXISTS clients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50) NOT NULL UNIQUE,
    nom VARCHAR(100) NOT NULL,
    adresse1 VARCHAR(255) NOT NULL,
    adresse2 VARCHAR(255),
    adresse3 VARCHAR(255),
    code_postal VARCHAR(10) NOT NULL,
    ville VARCHAR(100) NOT NULL,
    pays VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,

  // Create articles table
  `CREATE TABLE IF NOT EXISTS articles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50) NOT NULL UNIQUE,
    libelle VARCHAR(255) NOT NULL,
    famille VARCHAR(100) NOT NULL,
    url_image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,

  // Create entete_commande table
  `CREATE TABLE IF NOT EXISTS entete_commande (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_client INT NOT NULL,
    date DATE NOT NULL,
    date_livraison DATE NOT NULL,
    numero VARCHAR(50) NOT NULL UNIQUE,
    numero_cde_client VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_client) REFERENCES clients(id)
  )`,

  // Create lignes_commande table
  `CREATE TABLE IF NOT EXISTS lignes_commande (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_entete_commande INT NOT NULL,
    id_article INT NOT NULL,
    quantite INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_entete_commande) REFERENCES entete_commande(id),
    FOREIGN KEY (id_article) REFERENCES articles(id)
  )`,

  // Add foreign key to users table
  `ALTER TABLE users
   ADD CONSTRAINT fk_users_client
   FOREIGN KEY (id_client) REFERENCES clients(id)`
];

async function migrate() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log('Starting migrations...');

    for (const migration of migrations) {
      await connection.execute(migration);
      console.log('Migration executed successfully');
    }

    console.log('All migrations completed successfully');
  } catch (error) {
    console.error('Error during migration:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

migrate().catch(console.error);