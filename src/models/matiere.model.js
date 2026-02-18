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
   * @example SELECT m.*, c.libelle AS classe FROM matiere m JOIN classe c ON m.id_classe = c.id
   */
  findAll: async () => {
    // TODO : Écrire la requête SQL avec une jointure sur la table classe
    throw new Error("Non implémenté");
  },

  /**
   * Récupère une matière par son identifiant.
   * @param {number} id - L'identifiant de la matière
   * @returns {Promise<Object|null>} - La matière ou null
   */
  findById: async (id) => {
    // TODO : Requête SELECT avec WHERE id = ?
    throw new Error("Non implémenté");
  },

  /**
   * Récupère toutes les matières d'une classe donnée.
   * @param {number} idClasse - L'identifiant de la classe
   * @returns {Promise<Array>} - Liste des matières de la classe
   * @example SELECT * FROM matiere WHERE id_classe = ?
   */
  findByClasse: async (idClasse) => {
    // TODO : Filtrer les matières par id_classe
    throw new Error("Non implémenté");
  },

  /**
   * Crée une nouvelle matière.
   * @param {Object} data - { nom, id_classe }
   * @returns {Promise<Object>} - Résultat de l'insertion
   */
  create: async (data) => {
    // TODO : Déstructurer data ({ nom, id_classe })
    // TODO : Écrire la requête INSERT
    throw new Error("Non implémenté");
  },

  /**
   * Met à jour une matière existante.
   * @param {number} id - Identifiant de la matière
   * @param {Object} data - { nom, id_classe }
   * @returns {Promise<Object>} - Résultat de la mise à jour
   */
  update: async (id, data) => {
    // TODO : Écrire la requête UPDATE
    throw new Error("Non implémenté");
  },

  /**
   * Supprime une matière.
   * @param {number} id - Identifiant de la matière
   * @returns {Promise<Object>} - Résultat de la suppression
   */
  delete: async (id) => {
    // TODO : Écrire la requête DELETE
    throw new Error("Non implémenté");
  },
};

module.exports = MatiereModel;
