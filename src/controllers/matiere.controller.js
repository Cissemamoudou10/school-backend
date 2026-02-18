// ============================================
//  CONTRÔLEUR : MATIERE
//  Fichier : src/controllers/matiere.controller.js
// ============================================

const MatiereModel = require("../models/matiere.model");
const ClasseModel  = require("../models/classe.model");

const MatiereController = {

  /**
   * GET /api/matieres
   * Retourne toutes les matières.
   */
  getAllMatieres: async (req, res) => {
    // TODO : Appeler MatiereModel.findAll()
    // TODO : Répondre 200 avec la liste
    throw new Error("Non implémenté");
  },

  /**
   * GET /api/matieres/:id
   * Retourne une matière par son id.
   */
  getMatiereById: async (req, res) => {
    // TODO : Extraire id de req.params
    // TODO : Appeler MatiereModel.findById(id)
    // TODO : 404 si non trouvée
    throw new Error("Non implémenté");
  },

  /**
   * GET /api/matieres/classe/:idClasse
   * Retourne toutes les matières d'une classe donnée.
   */
  getMatieresByClasse: async (req, res) => {
    // TODO : Extraire idClasse de req.params
    // TODO : Vérifier que la classe existe (ClasseModel.findById) → 404 si non
    // TODO : Appeler MatiereModel.findByClasse(idClasse)
    // TODO : Répondre 200 avec la liste
    throw new Error("Non implémenté");
  },

  /**
   * POST /api/matieres
   * Crée une nouvelle matière.
   * Body attendu : { nom, id_classe }
   */
  createMatiere: async (req, res) => {
    // TODO : Extraire et valider nom et id_classe depuis req.body
    // TODO : Vérifier que la classe existe (ClasseModel.findById)
    // TODO : Appeler MatiereModel.create(data)
    // TODO : Répondre 201
    throw new Error("Non implémenté");
  },

  /**
   * PUT /api/matieres/:id
   * Met à jour une matière.
   * Body attendu : { nom, id_classe }
   */
  updateMatiere: async (req, res) => {
    // TODO : Extraire id et data
    // TODO : Vérifier existence matière → 404 si non
    // TODO : Appeler MatiereModel.update(id, data)
    throw new Error("Non implémenté");
  },

  /**
   * DELETE /api/matieres/:id
   * Supprime une matière.
   */
  deleteMatiere: async (req, res) => {
    // TODO : Extraire id
    // TODO : Vérifier existence → 404
    // TODO : Appeler MatiereModel.delete(id)
    throw new Error("Non implémenté");
  },
};

module.exports = MatiereController;
