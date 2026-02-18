// ============================================
//  MODÈLE : NOTE
//  Fichier : src/models/note.model.js
//  Table   : note(id, valeur, id_eleve, id_matiere)
// ============================================

const { pool } = require("../config/db");

const NoteModel = {

  /**
   * Récupère toutes les notes avec le nom de l'élève et de la matière.
   * @returns {Promise<Array>}
   * @example
   * SELECT n.*, e.nom AS eleve, m.nom AS matiere
   * FROM note n
   * JOIN eleve e ON n.id_eleve = e.id
   * JOIN matiere m ON n.id_matiere = m.id
   */
  findAll: async () => {
    // TODO : Requête avec double JOIN (eleve + matiere)
    throw new Error("Non implémenté");
  },

  /**
   * Récupère une note par son identifiant.
   * @param {number} id
   * @returns {Promise<Object|null>}
   */
  findById: async (id) => {
    // TODO : SELECT avec JOIN WHERE n.id = ?
    throw new Error("Non implémenté");
  },

  /**
   * Récupère toutes les notes d'un élève.
   * @param {number} idEleve
   * @returns {Promise<Array>}
   */
  findByEleve: async (idEleve) => {
    // TODO : SELECT n.*, m.nom AS matiere FROM note n
    //        JOIN matiere m ON n.id_matiere = m.id
    //        WHERE n.id_eleve = ?
    throw new Error("Non implémenté");
  },

  /**
   * Récupère toutes les notes d'une matière.
   * @param {number} idMatiere
   * @returns {Promise<Array>}
   */
  findByMatiere: async (idMatiere) => {
    // TODO : Filtrer par id_matiere avec JOIN sur eleve
    throw new Error("Non implémenté");
  },

  /**
   * Calcule la moyenne de toutes les notes d'un élève (bulletin).
   * Retourne les notes groupées par matière + la moyenne générale.
   * @param {number} idEleve
   * @returns {Promise<Object>} - { eleve, notes: [{matiere, valeur}], moyenne_generale }
   */
  getBulletinByEleve: async (idEleve) => {
    // TODO : Récupérer toutes les notes de l'élève (findByEleve)
    // TODO : Calculer la somme des valeurs
    // TODO : Diviser par le nombre de notes pour obtenir la moyenne
    // TODO : Retourner un objet structuré { notes, moyenne_generale }
    // ASTUCE : Vous pouvez utiliser AVG() directement en SQL ou calculer en JS
    throw new Error("Non implémenté");
  },

  /**
   * Crée une nouvelle note.
   * @param {Object} data - { valeur, id_eleve, id_matiere }
   * @returns {Promise<Object>}
   */
  create: async (data) => {
    // TODO : INSERT INTO note (valeur, id_eleve, id_matiere) VALUES (?, ?, ?)
    throw new Error("Non implémenté");
  },

  /**
   * Met à jour une note.
   * @param {number} id
   * @param {Object} data - { valeur }
   * @returns {Promise<Object>}
   */
  update: async (id, data) => {
    // TODO : UPDATE note SET valeur = ? WHERE id = ?
    throw new Error("Non implémenté");
  },

  /**
   * Supprime une note.
   * @param {number} id
   * @returns {Promise<Object>}
   */
  delete: async (id) => {
    // TODO : DELETE FROM note WHERE id = ?
    throw new Error("Non implémenté");
  },
};

module.exports = NoteModel;
