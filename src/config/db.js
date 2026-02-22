// ============================================
//  CONFIGURATION DE LA BASE DE DONNÉES
//  Fichier : src/config/db.js
// ============================================

const mysql = require("mysql2/promise");
require("dotenv").config();

/**
 * Création du pool de connexions MySQL.
 * Un pool permet de gérer plusieurs connexions simultanées efficacement.
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: "",
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

/**
 * Teste la connexion à la base de données au démarrage.
 * Affiche un message de succès ou d'erreur dans la console.
 */
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Connexion à la base de données réussie !");
    connection.release();
  } catch (error) {
    console.error("❌ Erreur de connexion à la base de données :", error.message);
    process.exit(1);
  }
};

module.exports = { pool, testConnection };
