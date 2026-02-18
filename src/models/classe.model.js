// ============================================
//  MODÈLE : CLASSE
//  Fichier : src/models/classe.model.js
//  Table   : classe(id, libelle)
// ============================================

const { pool } = require("../config/db");

const ClasseModel = {

  /**
   * Récupère toutes les classes de la base de données.
   * @returns {Promise<Array>} - Liste de toutes les classes
   * @example SELECT * FROM classe
   */
  findAll: async () => {
    // TODO : Écrire la requête SQL pour récupérer toutes les classes
    // TODO : Exécuter la requête avec pool.query()
    // TODO : Retourner les résultats
    throw new Error("Non implémenté");
  },

  /**
   * Récupère une classe par son identifiant.
   * @param {number} id - L'identifiant de la classe
   * @returns {Promise<Object|null>} - La classe trouvée ou null
   * @example SELECT * FROM classe WHERE id = ?
   */
  findById: async (id) => {
    // TODO : Écrire la requête SQL avec un paramètre id
    // TODO : Retourner uniquement le premier résultat (rows[0])
    throw new Error("Non implémenté");
  },

  /**
   * Crée une nouvelle classe.
   * @param {Object} data - Les données de la classe { libelle }
   * @returns {Promise<Object>} - Le résultat de l'insertion (insertId)
   * @example INSERT INTO classe (libelle) VALUES (?)
   */
  create: async (data) => {
    // TODO : Déstructurer data pour extraire libelle
    // TODO : Écrire la requête INSERT
    // TODO : Retourner le résultat
    throw new Error("Non implémenté");
  },

  /**
   * Met à jour les informations d'une classe.
   * @param {number} id - L'identifiant de la classe à modifier
   * @param {Object} data - Les nouvelles données { libelle }
   * @returns {Promise<Object>} - Le résultat de la mise à jour
   * @example UPDATE classe SET libelle = ? WHERE id = ?
   */
  update: async (id, data) => {
    // TODO : Écrire la requête UPDATE
    // TODO : Utiliser les paramètres pour éviter les injections SQL
    throw new Error("Non implémenté");
  },

  /**
   * Supprime une classe par son identifiant.
   * @param {number} id - L'identifiant de la classe à supprimer
   * @returns {Promise<Object>} - Le résultat de la suppression
   * @example DELETE FROM classe WHERE id = ?
   */
  delete: async (id) => {
    // TODO : Écrire la requête DELETE
    throw new Error("Non implémenté");
  },
};

module.exports = ClasseModel;
