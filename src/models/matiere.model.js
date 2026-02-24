// ============================================
//  MODÈLE : MATIERE
//  Fichier : src/models/matiere.model.js
//  Table   : matiere(id, nom, id_classe)
// ============================================

const { pool } = require("../config/db");

const MatiereModel = {

  /**
   * Récupère toutes les matières avec le libellé de leur classe.
   * @returns {Promise<Array>} - Liste des matières
   */
  findAll: async () => {
    const [rows] = await pool.query(`
      SELECT m.*, c.libelle AS classe
      FROM matiere m
      LEFT JOIN classe c ON m.id_classe = c.id
      ORDER BY c.libelle, m.nom
    `);
    return rows;
  },

  /**
   * Récupère une matière par son identifiant.
   * @param {number} id - L'identifiant de la matière
   * @returns {Promise<Object|null>} - La matière ou null
   */
  findById: async (id) => {
    const [rows] = await pool.query(`
      SELECT m.*, c.libelle AS classe
      FROM matiere m
      LEFT JOIN classe c ON m.id_classe = c.id
      WHERE m.id = ?
    `, [id]);
    return rows[0] || null;
  },

  /**
   * Récupère toutes les matières d'une classe donnée.
   * @param {number} idClasse - L'identifiant de la classe
   * @returns {Promise<Array>} - Liste des matières de la classe
   */
  findByClasse: async (idClasse) => {
    const [rows] = await pool.query(`
      SELECT m.*, c.libelle AS classe
      FROM matiere m
      LEFT JOIN classe c ON m.id_classe = c.id
      WHERE m.id_classe = ?
      ORDER BY m.nom
    `, [idClasse]);
    return rows;
  },

  /**
   * Crée une nouvelle matière.
   * @param {Object} data - { nom, id_classe }
   * @returns {Promise<Object>} - Résultat de l'insertion
   */
  create: async (data) => {
    const { nom, id_classe } = data;
    const [result] = await pool.query(`
      INSERT INTO matiere (nom, id_classe)
      VALUES (?, ?)
    `, [nom, id_classe]);
    return result;
  },

  /**
   * Met à jour une matière existante.
   * @param {number} id - Identifiant de la matière
   * @param {Object} data - { nom, id_classe }
   * @returns {Promise<Object>} - Résultat de la mise à jour
   */
  update: async (id, data) => {
    const { nom, id_classe } = data;
    const [result] = await pool.query(`
      UPDATE matiere
      SET nom = ?, id_classe = ?
      WHERE id = ?
    `, [nom, id_classe, id]);
    return result;
  },

  /**
   * Supprime une matière.
   * @param {number} id - Identifiant de la matière
   * @returns {Promise<Object>} - Résultat de la suppression
   */
  delete: async (id) => {
    const [result] = await pool.query(`
      DELETE FROM matiere WHERE id = ?
    `, [id]);
    return result;
  },
};

module.exports = MatiereModel;