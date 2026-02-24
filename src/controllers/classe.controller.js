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
    try {
      const classes = await ClasseModel.findAll();
      return res.status(200).json({ success: true, data: classes });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Erreur serveur", error: error.message });
    }
  },

  /**
   * GET /api/classes/:id
   * Retourne une classe par son id.
   */
  getClasseById: async (req, res) => {
    try {
      const { id } = req.params;
      const classe = await ClasseModel.findById(id);

      if (!classe) {
        return res.status(404).json({ success: false, message: `Classe #${id} introuvable` });
      }

      return res.status(200).json({ success: true, data: classe });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Erreur serveur", error: error.message });
    }
  },

  /**
   * POST /api/classes
   * Crée une nouvelle classe.
   * Body attendu : { libelle }
   */
  createClasse: async (req, res) => {
    try {
      const { libelle } = req.body;

      // Validation
      if (!libelle || libelle.trim() === "") {
        return res.status(400).json({ success: false, message: "Le champ libelle est obligatoire" });
      }

      const classe = await ClasseModel.create({ libelle: libelle.trim() });
      return res.status(201).json({ success: true, data: classe });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Erreur serveur", error: error.message });
    }
  },

  /**
   * PUT /api/classes/:id
   * Met à jour une classe existante.
   * Body attendu : { libelle }
   */
  updateClasse: async (req, res) => {
    try {
      const { id } = req.params;
      const { libelle } = req.body;

      // Validation
      if (!libelle || libelle.trim() === "") {
        return res.status(400).json({ success: false, message: "Le champ libelle est obligatoire" });
      }

      // Vérifier que la classe existe
      const existing = await ClasseModel.findById(id);
      if (!existing) {
        return res.status(404).json({ success: false, message: `Classe #${id} introuvable` });
      }

      const classe = await ClasseModel.update(id, { libelle: libelle.trim() });
      return res.status(200).json({ success: true, data: classe });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Erreur serveur", error: error.message });
    }
  },

  /**
   * DELETE /api/classes/:id
   * Supprime une classe.
   */
  deleteClasse: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifier que la classe existe
      const existing = await ClasseModel.findById(id);
      if (!existing) {
        return res.status(404).json({ success: false, message: `Classe #${id} introuvable` });
      }

      await ClasseModel.delete(id);
      return res.status(200).json({
        success: true,
        message: `Classe "${existing.libelle}" supprimée avec succès`,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Erreur serveur", error: error.message });
    }
  },
};

module.exports = ClasseController;