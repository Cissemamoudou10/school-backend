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
    try {
      console.log("Recuperation de toutes les matières en cours...");
      const matieres = await MatiereModel.findAll();
      console.log("Matieres récupérées :", matieres);
      return res.status(200).json({
        success: true,
        data: matieres,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération des matières.",
        error: error.message,
      });
    }
  },

  /**
   * GET /api/matieres/:id
   * Retourne une matière par son id.
   */
  getMatiereById: async (req, res) => {
    try {
      const { id } = req.params;

      const matiere = await MatiereModel.findById(id);
      if (!matiere) {
        return res.status(404).json({
          success: false,
          message: `Matière avec l'id ${id} introuvable.`,
        });
      }

      return res.status(200).json({
        success: true,
        data: matiere,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération de la matière.",
        error: error.message,
      });
    }
  },

  /**
   * GET /api/matieres/classe/:idClasse
   * Retourne toutes les matières d'une classe donnée.
   */
  getMatieresByClasse: async (req, res) => {
    try {
      const { idClasse } = req.params;

      // Vérifier que la classe existe
      const classe = await ClasseModel.findById(idClasse);
      if (!classe) {
        return res.status(404).json({
          success: false,
          message: `Classe avec l'id ${idClasse} introuvable.`,
        });
      }

      const matieres = await MatiereModel.findByClasse(idClasse);
      return res.status(200).json({
        success: true,
        data: matieres,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération des matières de la classe.",
        error: error.message,
      });
    }
  },

  /**
   * POST /api/matieres
   * Crée une nouvelle matière.
   * Body attendu : { nom, id_classe }
   */
  createMatiere: async (req, res) => {
    try {
      const { nom, id_classe } = req.body;
     
      // Validation des champs obligatoires
      if (!nom || !id_classe) {
        return res.status(400).json({
          success: false,
          message: "Les champs 'nom' et 'id_classe' sont obligatoires.",
        });
      }

      // Vérifier que la classe existe
      const classe = await ClasseModel.findById(id_classe);

      if (!classe) {
        return res.status(404).json({
          success: false,
          message: `Classe avec l'id ${id_classe} introuvable.`,
        });
      }

      const result = await MatiereModel.create({ nom, id_classe });
      return res.status(201).json({
        success: true,
        message: "Matière créée avec succès.",
        data: { id: result.insertId, nom, id_classe },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la création de la matière.",
        error: error.message,
      });
    }
  },

  /**
   * PUT /api/matieres/:id
   * Met à jour une matière.
   * Body attendu : { nom, id_classe }
   */
  updateMatiere: async (req, res) => {
    try {
      const { id } = req.params;
      const { nom, id_classe } = req.body;

      // Validation des champs obligatoires
      if (!nom || !id_classe) {
        return res.status(400).json({
          success: false,
          message: "Les champs 'nom' et 'id_classe' sont obligatoires.",
        });
      }

      // Vérifier que la matière existe
      const matiere = await MatiereModel.findById(id);
      if (!matiere) {
        return res.status(404).json({
          success: false,
          message: `Matière avec l'id ${id} introuvable.`,
        });
      }

      // Vérifier que la classe existe
      const classe = await ClasseModel.findById(id_classe);
      if (!classe) {
        return res.status(404).json({
          success: false,
          message: `Classe avec l'id ${id_classe} introuvable.`,
        });
      }

      await MatiereModel.update(id, { nom, id_classe });
      return res.status(200).json({
        success: true,
        message: "Matière mise à jour avec succès.",
        data: { id: Number(id), nom, id_classe },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la mise à jour de la matière.",
        error: error.message,
      });
    }
  },

  /**
   * DELETE /api/matieres/:id
   * Supprime une matière (et ses notes en CASCADE).
   */
  deleteMatiere: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifier que la matière existe
      const matiere = await MatiereModel.findById(id);
      if (!matiere) {
        return res.status(404).json({
          success: false,
          message: `Matière avec l'id ${id} introuvable.`,
        });
      }

      await MatiereModel.delete(id);
      return res.status(200).json({
        success: true,
        message: `Matière "${matiere.nom}" supprimée avec succès.`,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la suppression de la matière.",
        error: error.message,
      });
    }
  },
};

module.exports = MatiereController;