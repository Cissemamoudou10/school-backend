// ============================================
//  CONTRÔLEUR : CLASSE
//  Fichier : src/controllers/classe.controller.js
// ============================================

const ClasseModel = require("../models/classe.model");

const ClasseController = {

  /**
   * GET /api/classes
   * Retourne la liste de toutes les classes.
   */
  getAllClasses: async (req, res) => {
    // TODO : Appeler ClasseModel.findAll()
    // TODO : Répondre avec res.status(200).json({ success: true, data: ... })
    // TODO : Gérer les erreurs avec try/catch et res.status(500)
    throw new Error("Non implémenté");
  },

  /**
   * GET /api/classes/:id
   * Retourne une classe par son id.
   * Si non trouvée → 404
   */
  getClasseById: async (req, res) => {
    // TODO : Extraire req.params.id
    // TODO : Appeler ClasseModel.findById(id)
    // TODO : Si null → res.status(404).json({ message: "Classe non trouvée" })
    // TODO : Sinon → res.status(200).json({ success: true, data: classe })
    throw new Error("Non implémenté");
  },

  /**
   * POST /api/classes
   * Crée une nouvelle classe.
   * Body attendu : { libelle }
   */
  createClasse: async (req, res) => {
    // TODO : Extraire req.body
    // TODO : Valider que libelle est présent (sinon 400)
    // TODO : Appeler ClasseModel.create(data)
    // TODO : Répondre avec 201 et les données créées
    throw new Error("Non implémenté");
  },

  /**
   * PUT /api/classes/:id
   * Met à jour une classe existante.
   * Body attendu : { libelle }
   */
  updateClasse: async (req, res) => {
    // TODO : Extraire id depuis req.params et data depuis req.body
    // TODO : Vérifier que la classe existe (findById) → 404 si non
    // TODO : Appeler ClasseModel.update(id, data)
    // TODO : Répondre avec 200
    throw new Error("Non implémenté");
  },

  /**
   * DELETE /api/classes/:id
   * Supprime une classe.
   */
  deleteClasse: async (req, res) => {
    // TODO : Extraire id depuis req.params
    // TODO : Vérifier que la classe existe → 404 si non
    // TODO : Appeler ClasseModel.delete(id)
    // TODO : Répondre avec 200 et un message de confirmation
    throw new Error("Non implémenté");
  },
};

module.exports = ClasseController;
