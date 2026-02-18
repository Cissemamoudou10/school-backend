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
    // TODO : SELECT p.*, c.libelle AS classe FROM prof p JOIN classe c ON p.id_classe = c.id
    throw new Error("Non implémenté");
  },

  /**
   * Récupère un professeur par son identifiant.
   * @param {number} id
   * @returns {Promise<Object|null>}
   */
  findById: async (id) => {
    // TODO : SELECT avec WHERE p.id = ?
    throw new Error("Non implémenté");
  },

  /**
   * Récupère tous les professeurs d'une classe.
   * @param {number} idClasse
   * @returns {Promise<Array>}
   */
  findByClasse: async (idClasse) => {
    // TODO : SELECT * FROM prof WHERE id_classe = ?
    throw new Error("Non implémenté");
  },

  /**
   * Récupère un professeur par son email.
   * @param {string} email
   * @returns {Promise<Object|null>}
   */
  findByEmail: async (email) => {
    // TODO : SELECT * FROM prof WHERE email = ?
    throw new Error("Non implémenté");
  },

  /**
   * Crée un nouveau professeur.
   * @param {Object} data - { nom, prenoms, numero, email, adress, id_classe }
   * @returns {Promise<Object>}
   */
  create: async (data) => {
    // TODO : INSERT INTO prof (nom, prenoms, numero, email, adress, id_classe, date_creation)
    //        VALUES (?, ?, ?, ?, ?, ?, NOW())
    throw new Error("Non implémenté");
  },

  /**
   * Met à jour un professeur.
   * @param {number} id
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  update: async (id, data) => {
    // TODO : UPDATE prof SET ... WHERE id = ?
    throw new Error("Non implémenté");
  },

  /**
   * Supprime un professeur.
   * @param {number} id
   * @returns {Promise<Object>}
   */
  delete: async (id) => {
    // TODO : DELETE FROM prof WHERE id = ?
    throw new Error("Non implémenté");
  },
};

module.exports = ProfModel;
