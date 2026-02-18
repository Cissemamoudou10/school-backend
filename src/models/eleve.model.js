// ============================================
//  MODÈLE : ELEVE
//  Fichier : src/models/eleve.model.js
//  Table   : eleve(id, nom, prenoms, numero_pere, email_pere, adress,
//                  date_naissance, lieu_naissance, date_creation, sexe, id_classe)
// ============================================

const { pool } = require("../config/db");

const EleveModel = {

  /**
   * Récupère tous les élèves avec le libellé de leur classe.
   * @returns {Promise<Array>}
   * @example SELECT e.*, c.libelle AS classe FROM eleve e JOIN classe c ON e.id_classe = c.id
   */
  findAll: async () => {
    // TODO : Requête avec JOIN sur classe pour afficher le libellé
    throw new Error("Non implémenté");
  },

  /**
   * Récupère un élève par son identifiant.
   * @param {number} id
   * @returns {Promise<Object|null>}
   */
  findById: async (id) => {
    // TODO : SELECT avec JOIN WHERE e.id = ?
    throw new Error("Non implémenté");
  },

  /**
   * Récupère tous les élèves d'une classe donnée.
   * @param {number} idClasse
   * @returns {Promise<Array>}
   */
  findByClasse: async (idClasse) => {
    // TODO : SELECT * FROM eleve WHERE id_classe = ?
    throw new Error("Non implémenté");
  },

  /**
   * Crée un nouvel élève.
   * @param {Object} data - { nom, prenoms, numero_pere, email_pere, adress,
   *                          date_naissance, lieu_naissance, sexe, id_classe }
   * @returns {Promise<Object>}
   */
  create: async (data) => {
    // TODO : Déstructurer data
    // TODO : date_creation = NOW()
    // TODO : INSERT INTO eleve (...)
    throw new Error("Non implémenté");
  },

  /**
   * Met à jour les informations d'un élève.
   * @param {number} id
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  update: async (id, data) => {
    // TODO : UPDATE eleve SET ... WHERE id = ?
    throw new Error("Non implémenté");
  },

  /**
   * Supprime un élève.
   * @param {number} id
   * @returns {Promise<Object>}
   */
  delete: async (id) => {
    // TODO : DELETE FROM eleve WHERE id = ?
    throw new Error("Non implémenté");
  },
};

module.exports = EleveModel;
