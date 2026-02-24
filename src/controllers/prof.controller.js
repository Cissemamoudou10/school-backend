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
    try {
      const profs = await ProfModel.findAll();
      return res.status(200).json({
        success: true,
        data: profs,
      });
    } catch (error) {
      console.error("[getAllProfs]", error);
      return res.status(500).json({
        success: false,
        message: "Erreur serveur lors de la récupération des professeurs.",
      });
    }
  },

  /**
   * GET /api/profs/:id
   * Retourne un professeur par son id.
   */
  getProfById: async (req, res) => {
    try {
      const { id } = req.params;

      const prof = await ProfModel.findById(id);
      if (!prof) {
        return res.status(404).json({
          success: false,
          message: `Aucun professeur trouvé avec l'id ${id}.`,
        });
      }

      return res.status(200).json({
        success: true,
        data: prof,
      });
    } catch (error) {
      console.error("[getProfById]", error);
      return res.status(500).json({
        success: false,
        message: "Erreur serveur lors de la récupération du professeur.",
      });
    }
  },

  /**
   * GET /api/profs/classe/:idClasse
   * Retourne tous les profs d'une classe.
   */
  getProfsByClasse: async (req, res) => {
    try {
      const { idClasse } = req.params;

      // Vérifier que la classe existe
      const classe = await ClasseModel.findById(idClasse);
      if (!classe) {
        return res.status(404).json({
          success: false,
          message: `Aucune classe trouvée avec l'id ${idClasse}.`,
        });
      }

      const profs = await ProfModel.findByClasse(idClasse);
      return res.status(200).json({
        success: true,
        data: profs,
      });
    } catch (error) {
      console.error("[getProfsByClasse]", error);
      return res.status(500).json({
        success: false,
        message: "Erreur serveur lors de la récupération des professeurs de la classe.",
      });
    }
  },

  /**
   * POST /api/profs
   * Crée un nouveau professeur.
   * Body attendu : { nom, prenoms, numero, email, adress, id_classe }
   */
  createProf: async (req, res) => {
    try {
      const { nom, prenoms, numero, email, adress, id_classe } = req.body;

      // Validation des champs obligatoires
      if (!nom || !prenoms || !email) {
        return res.status(400).json({
          success: false,
          message: "Les champs nom, prenoms et email sont obligatoires.",
        });
      }

      // Vérifier si l'email est déjà utilisé
      const existingProf = await ProfModel.findByEmail(email);
      if (existingProf) {
        return res.status(409).json({
          success: false,
          message: `Un professeur avec l'email "${email}" existe déjà.`,
        });
      }

      // Vérifier que la classe existe si id_classe est fourni
      if (id_classe) {
        const classe = await ClasseModel.findById(id_classe);
        if (!classe) {
          return res.status(404).json({
            success: false,
            message: `Aucune classe trouvée avec l'id ${id_classe}.`,
          });
        }
      }

      const newProf = await ProfModel.create({ nom, prenoms, numero, email, adress, id_classe });
      return res.status(201).json({
        success: true,
        message: "Professeur créé avec succès.",
        data: newProf,
      });
    } catch (error) {
      console.error("[createProf]", error);
      return res.status(500).json({
        success: false,
        message: "Erreur serveur lors de la création du professeur.",
      });
    }
  },

  /**
   * PUT /api/profs/:id
   * Met à jour un professeur.
   */
  updateProf: async (req, res) => {
    try {
      const { id } = req.params;
      const { nom, prenoms, numero, email, adress, id_classe } = req.body;

      // Vérifier que le prof existe
      const prof = await ProfModel.findById(id);
      if (!prof) {
        return res.status(404).json({
          success: false,
          message: `Aucun professeur trouvé avec l'id ${id}.`,
        });
      }

      // Validation des champs obligatoires
      if (!nom || !prenoms || !email) {
        return res.status(400).json({
          success: false,
          message: "Les champs nom, prenoms et email sont obligatoires.",
        });
      }

      // Vérifier si le nouvel email appartient déjà à un autre prof
      if (email !== prof.email) {
        const existingProf = await ProfModel.findByEmail(email);
        if (existingProf) {
          return res.status(409).json({
            success: false,
            message: `Un professeur avec l'email "${email}" existe déjà.`,
          });
        }
      }

      // Vérifier que la nouvelle classe existe si id_classe est fourni
      if (id_classe) {
        const classe = await ClasseModel.findById(id_classe);
        if (!classe) {
          return res.status(404).json({
            success: false,
            message: `Aucune classe trouvée avec l'id ${id_classe}.`,
          });
        }
      }

      const updatedProf = await ProfModel.update(id, { nom, prenoms, numero, email, adress, id_classe });
      return res.status(200).json({
        success: true,
        message: "Professeur mis à jour avec succès.",
        data: updatedProf,
      });
    } catch (error) {
      console.error("[updateProf]", error);
      return res.status(500).json({
        success: false,
        message: "Erreur serveur lors de la mise à jour du professeur.",
      });
    }
  },

  /**
   * DELETE /api/profs/:id
   * Supprime un professeur.
   */
  deleteProf: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifier que le prof existe
      const prof = await ProfModel.findById(id);
      if (!prof) {
        return res.status(404).json({
          success: false,
          message: `Aucun professeur trouvé avec l'id ${id}.`,
        });
      }

      await ProfModel.delete(id);
      return res.status(200).json({
        success: true,
        message: `Professeur "${prof.nom} ${prof.prenoms}" supprimé avec succès.`,
      });
    } catch (error) {
      console.error("[deleteProf]", error);
      return res.status(500).json({
        success: false,
        message: "Erreur serveur lors de la suppression du professeur.",
      });
    }
  },
};

module.exports = ProfController;