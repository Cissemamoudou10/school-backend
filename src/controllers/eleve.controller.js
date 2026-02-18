// ============================================
//  CONTRÔLEUR : ELEVE
//  Fichier : src/controllers/eleve.controller.js
// ============================================

const EleveModel  = require("../models/eleve.model");
const ClasseModel = require("../models/classe.model");

const EleveController = {

  /**
   * GET /api/eleves
   * Retourne tous les élèves.
   */
  getAllEleves: async (req, res) => {
    // TODO : Appeler EleveModel.findAll()
    // TODO : Répondre 200
    throw new Error("Non implémenté");
  },

  /**
   * GET /api/eleves/:id
   * Retourne un élève par son id.
   */
  getEleveById: async (req, res) => {
    // TODO : Extraire id de req.params
    // TODO : Appeler EleveModel.findById(id) → 404 si null
    throw new Error("Non implémenté");
  },

  /**
   * GET /api/eleves/classe/:idClasse
   * Retourne tous les élèves d'une classe.
   */
  getElevesByClasse: async (req, res) => {
    // TODO : Extraire idClasse
    // TODO : Vérifier existence de la classe → 404
    // TODO : Appeler EleveModel.findByClasse(idClasse)
    throw new Error("Non implémenté");
  },

  /**
   * POST /api/eleves
   * Crée un nouvel élève.
   * Body attendu : { nom, prenoms, numero_pere, email_pere, adress,
   *                  date_naissance, lieu_naissance, sexe, id_classe }
   */
  createEleve: async (req, res) => {
    // TODO : Extraire et valider tous les champs
    // TODO : Valider que sexe est "M" ou "F"
    // TODO : Vérifier existence de la classe → 404
    // TODO : Appeler EleveModel.create(data)
    // TODO : Répondre 201
    throw new Error("Non implémenté");
  },

  /**
   * PUT /api/eleves/:id
   * Met à jour un élève.
   */
  updateEleve: async (req, res) => {
    // TODO : Extraire id et body
    // TODO : Vérifier existence élève → 404
    // TODO : Si id_classe fourni, vérifier existence classe
    // TODO : Appeler EleveModel.update(id, data)
    throw new Error("Non implémenté");
  },

  /**
   * DELETE /api/eleves/:id
   * Supprime un élève.
   */
  deleteEleve: async (req, res) => {
    // TODO : Extraire id
    // TODO : Vérifier existence → 404
    // TODO : Appeler EleveModel.delete(id)
    throw new Error("Non implémenté");
  },
};

module.exports = EleveController;
