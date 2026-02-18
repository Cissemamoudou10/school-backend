// ============================================
//  MODÈLE : ADMIN
//  Fichier : src/models/admin.model.js
//  Table   : admin(id, nom, prenoms, numero, email, adress, date_creation)
// ============================================

const { pool } = require("../config/db");

const AdminModel = {

  /**
   * Récupère tous les administrateurs.
   * @returns {Promise<Array>} - Liste des admins
   */
  findAll: async () => {
    // TODO : SELECT * FROM admin
    throw new Error("Non implémenté");
  },

  /**
   * Récupère un admin par son identifiant.
   * @param {number} id
   * @returns {Promise<Object|null>}
   */
  findById: async (id) => {
    // TODO : SELECT * FROM admin WHERE id = ?
    throw new Error("Non implémenté");
  },

  /**
   * Récupère un admin par son email (utile pour l'authentification).
   * @param {string} email
   * @returns {Promise<Object|null>}
   */
  findByEmail: async (email) => {
    // TODO : SELECT * FROM admin WHERE email = ?
    throw new Error("Non implémenté");
  },

  /**
   * Crée un nouvel administrateur.
   * @param {Object} data - { nom, prenoms, numero, email, adress }
   * @returns {Promise<Object>} - Résultat de l'insertion
   */
  create: async (data) => {
    // TODO : Déstructurer data
    // TODO : date_creation sera NOW() dans la requête SQL
    // TODO : INSERT INTO admin (nom, prenoms, numero, email, adress, date_creation) VALUES (?, ?, ?, ?, ?, NOW())
    throw new Error("Non implémenté");
  },

  /**
   * Met à jour un administrateur.
   * @param {number} id
   * @param {Object} data - { nom, prenoms, numero, email, adress }
   * @returns {Promise<Object>}
   */
  update: async (id, data) => {
    // TODO : UPDATE admin SET nom=?, prenoms=?, ... WHERE id=?
    throw new Error("Non implémenté");
  },

  /**
   * Supprime un administrateur.
   * @param {number} id
   * @returns {Promise<Object>}
   */
  delete: async (id) => {
    // TODO : DELETE FROM admin WHERE id = ?
    throw new Error("Non implémenté");
  },
};

module.exports = AdminModel;
