// ============================================
//  CONTRÔLEUR : PROF
//  Fichier : src/controllers/prof.controller.js
// ============================================

const ProfModel   = require("../models/prof.model");
const ClasseModel = require("../models/classe.model");

const ProfController = {

  /**
   * GET /api/profs
   * Retourne tous les professeurs.
   */
  getAllProfs: async (req, res) => {
    // TODO : Appeler ProfModel.findAll()
    // TODO : Répondre 200
    throw new Error("Non implémenté");
  },

  /**
   * GET /api/profs/:id
   * Retourne un professeur par son id.
   */
  getProfById: async (req, res) => {
    // TODO : Extraire id de req.params
    // TODO : Appeler ProfModel.findById(id) → 404 si null
    throw new Error("Non implémenté");
  },

  /**
   * GET /api/profs/classe/:idClasse
   * Retourne tous les profs d'une classe.
   */
  getProfsByClasse: async (req, res) => {
    // TODO : Extraire idClasse
    // TODO : Vérifier existence de la classe → 404
    // TODO : Appeler ProfModel.findByClasse(idClasse)
    throw new Error("Non implémenté");
  },

  /**
   * POST /api/profs
   * Crée un nouveau professeur.
   * Body attendu : { nom, prenoms, numero, email, adress, id_classe }
   */
  createProf: async (req, res) => {
    // TODO : Extraire et valider les champs
    // TODO : Vérifier si l'email existe déjà (ProfModel.findByEmail) → 409 si oui
    // TODO : Vérifier existence de la classe → 404
    // TODO : Appeler ProfModel.create(data)
    // TODO : Répondre 201
    throw new Error("Non implémenté");
  },

  /**
   * PUT /api/profs/:id
   * Met à jour un professeur.
   */
  updateProf: async (req, res) => {
    // TODO : Extraire id et body
    // TODO : Vérifier existence prof → 404
    // TODO : Appeler ProfModel.update(id, data)
    throw new Error("Non implémenté");
  },

  /**
   * DELETE /api/profs/:id
   * Supprime un professeur.
   */
  deleteProf: async (req, res) => {
    // TODO : Extraire id
    // TODO : Vérifier existence → 404
    // TODO : Appeler ProfModel.delete(id)
    throw new Error("Non implémenté");
  },
};

module.exports = ProfController;
