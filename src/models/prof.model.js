// ============================================
//  MODÈLE : PROF
//  Fichier : src/models/prof.model.js
//  Table   : prof(id, nom, prenoms, numero, email, date_creation, adress, id_classe)
// ============================================

const { pool } = require("../config/db");

const ProfModel = {

  /**
   * Récupère tous les professeurs avec le libellé de leur classe.
   * @returns {Promise<Array>}
   */
  findAll: async () => {
    const [rows] = await pool.query(`
      SELECT 
        p.id,
        p.nom,
        p.prenoms,
        p.numero,
        p.email,
        p.adress,
        p.date_creation,
        p.id_classe,
        c.libelle AS classe
      FROM prof p
      LEFT JOIN classe c ON p.id_classe = c.id
      ORDER BY p.nom ASC
    `);
    return rows;
  },

  /**
   * Récupère un professeur par son identifiant.
   * @param {number} id
   * @returns {Promise<Object|null>}
   */
  findById: async (id) => {
    const [rows] = await pool.query(`
      SELECT 
        p.id,
        p.nom,
        p.prenoms,
        p.numero,
        p.email,
        p.adress,
        p.date_creation,
        p.id_classe,
        c.libelle AS classe
      FROM prof p
      LEFT JOIN classe c ON p.id_classe = c.id
      WHERE p.id = ?
    `, [id]);
    return rows.length > 0 ? rows[0] : null;
  },

  /**
   * Récupère tous les professeurs d'une classe.
   * @param {number} idClasse
   * @returns {Promise<Array>}
   */
  findByClasse: async (idClasse) => {
    const [rows] = await pool.query(`
      SELECT 
        p.id,
        p.nom,
        p.prenoms,
        p.numero,
        p.email,
        p.adress,
        p.date_creation,
        p.id_classe,
        c.libelle AS classe
      FROM prof p
      LEFT JOIN classe c ON p.id_classe = c.id
      WHERE p.id_classe = ?
      ORDER BY p.nom ASC
    `, [idClasse]);
    return rows;
  },

  /**
   * Récupère un professeur par son email.
   * @param {string} email
   * @returns {Promise<Object|null>}
   */
  findByEmail: async (email) => {
    const [rows] = await pool.query(`
      SELECT * FROM prof WHERE email = ?
    `, [email]);
    return rows.length > 0 ? rows[0] : null;
  },

  /**
   * Crée un nouveau professeur.
   * @param {Object} data - { nom, prenoms, numero, email, adress, id_classe }
   * @returns {Promise<Object>}
   */
  create: async (data) => {
    const { nom, prenoms, numero, email, adress, id_classe } = data;
    const [result] = await pool.query(`
      INSERT INTO prof (nom, prenoms, numero, email, adress, id_classe, date_creation)
      VALUES (?, ?, ?, ?, ?, ?, NOW())
    `, [nom, prenoms, numero ?? null, email, adress ?? null, id_classe ?? null]);

    return { id: result.insertId, ...data };
  },

  /**
   * Met à jour un professeur.
   * @param {number} id
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  update: async (id, data) => {
    const { nom, prenoms, numero, email, adress, id_classe } = data;
    await pool.query(`
      UPDATE prof
      SET 
        nom       = ?,
        prenoms   = ?,
        numero    = ?,
        email     = ?,
        adress    = ?,
        id_classe = ?
      WHERE id = ?
    `, [nom, prenoms, numero ?? null, email, adress ?? null, id_classe ?? null, id]);

    return { id, ...data };
  },

  /**
   * Supprime un professeur.
   * @param {number} id
   * @returns {Promise<Object>}
   */
  delete: async (id) => {
    const [result] = await pool.query(`
      DELETE FROM prof WHERE id = ?
    `, [id]);
    return { deleted: result.affectedRows > 0 };
  },
};

module.exports = ProfModel;