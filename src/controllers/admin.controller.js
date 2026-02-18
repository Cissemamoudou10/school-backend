// ============================================
//  CONTRÔLEUR : ADMIN
//  Fichier : src/controllers/admin.controller.js
// ============================================

const AdminModel = require("../models/admin.model");

const AdminController = {

  /**
   * GET /api/admins
   * Retourne la liste de tous les administrateurs.
   */
  getAllAdmins: async (req, res) => {
    // TODO : Appeler AdminModel.findAll()
    // TODO : Répondre 200 avec la liste
    throw new Error("Non implémenté");
  },

  /**
   * GET /api/admins/:id
   * Retourne un admin par son id.
   */
  getAdminById: async (req, res) => {
    // TODO : Extraire id de req.params
    // TODO : Appeler AdminModel.findById(id)
    // TODO : 404 si non trouvé
    throw new Error("Non implémenté");
  },

  /**
   * POST /api/admins
   * Crée un nouvel administrateur.
   * Body attendu : { nom, prenoms, numero, email, adress }
   */
  createAdmin: async (req, res) => {
    // TODO : Extraire et valider les champs de req.body
    // TODO : Vérifier si l'email existe déjà (AdminModel.findByEmail) → 409 si oui
    // TODO : Appeler AdminModel.create(data)
    // TODO : Répondre 201
    throw new Error("Non implémenté");
  },

  /**
   * PUT /api/admins/:id
   * Met à jour un administrateur.
   * Body attendu : { nom, prenoms, numero, email, adress }
   */
  updateAdmin: async (req, res) => {
    // TODO : Extraire id et body
    // TODO : Vérifier existence → 404
    // TODO : Appeler AdminModel.update(id, data)
    // TODO : Répondre 200
    throw new Error("Non implémenté");
  },

  /**
   * DELETE /api/admins/:id
   * Supprime un administrateur.
   */
  deleteAdmin: async (req, res) => {
    // TODO : Extraire id
    // TODO : Vérifier existence → 404
    // TODO : Appeler AdminModel.delete(id)
    // TODO : Répondre 200 avec message de confirmation
    throw new Error("Non implémenté");
  },
};

module.exports = AdminController;
