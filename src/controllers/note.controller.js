// ============================================
//  CONTRÔLEUR : NOTE
//  Fichier : src/controllers/note.controller.js
// ============================================

const NoteModel    = require("../models/note.model");
const EleveModel   = require("../models/eleve.model");
const MatiereModel = require("../models/matiere.model");

const NoteController = {

  /**
   * GET /api/notes
   * Retourne toutes les notes.
   */
  getAllNotes: async (req, res) => {
    try {
      const notes = await NoteModel.findAll();
      return res.status(200).json({ success: true, data: notes });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Erreur serveur", error: error.message });
    }
  },

  /**
   * GET /api/notes/:id
   * Retourne une note par son id.
   */
  getNoteById: async (req, res) => {
    try {
      const { id } = req.params;
      const note = await NoteModel.findById(id);

      if (!note) {
        return res.status(404).json({ success: false, message: `Note #${id} introuvable` });
      }

      return res.status(200).json({ success: true, data: note });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Erreur serveur", error: error.message });
    }
  },

  /**
   * GET /api/notes/eleve/:idEleve
   * Retourne toutes les notes d'un élève.
   */
  getNotesByEleve: async (req, res) => {
    try {
      const { idEleve } = req.params;

      // Vérifier que l'élève existe
      const eleve = await EleveModel.findById(idEleve);
      if (!eleve) {
        return res.status(404).json({ success: false, message: `Élève #${idEleve} introuvable` });
      }

      const notes = await NoteModel.findByEleve(idEleve);
      return res.status(200).json({ success: true, data: notes });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Erreur serveur", error: error.message });
    }
  },

  /**
   * GET /api/notes/matiere/:idMatiere
   * Retourne toutes les notes d'une matière.
   */
  getNotesByMatiere: async (req, res) => {
    try {
      const { idMatiere } = req.params;

      // Vérifier que la matière existe
      const matiere = await MatiereModel.findById(idMatiere);
      if (!matiere) {
        return res.status(404).json({ success: false, message: `Matière #${idMatiere} introuvable` });
      }

      const notes = await NoteModel.findByMatiere(idMatiere);
      return res.status(200).json({ success: true, data: notes });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Erreur serveur", error: error.message });
    }
  },

  /**
   * GET /api/notes/bulletin/:idEleve
   * Retourne le bulletin complet d'un élève :
   * ses notes par matière + sa moyenne générale.
   */
  getBulletinEleve: async (req, res) => {
    try {
      const { idEleve } = req.params;

      // Vérifier que l'élève existe
      const eleve = await EleveModel.findById(idEleve);
      if (!eleve) {
        return res.status(404).json({ success: false, message: `Élève #${idEleve} introuvable` });
      }

      const { notes, moyenne_generale } = await NoteModel.getBulletinByEleve(idEleve);

      return res.status(200).json({
        success: true,
        data: {
          eleve,
          notes,
          moyenne_generale,
        },
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Erreur serveur", error: error.message });
    }
  },

  /**
   * POST /api/notes
   * Crée une nouvelle note.
   * Body attendu : { valeur, id_eleve, id_matiere }
   */
  createNote: async (req, res) => {
    try {
      const { valeur, id_eleve, id_matiere } = req.body;

      // Validation des champs obligatoires
      if (valeur === undefined || id_eleve === undefined || id_matiere === undefined) {
        return res.status(400).json({
          success: false,
          message: "Les champs valeur, id_eleve et id_matiere sont obligatoires",
        });
      }

      // Validation de la valeur (0 à 20, cohérent avec la contrainte CHECK de la BDD)
      const valeurNum = parseFloat(valeur);
      if (isNaN(valeurNum) || valeurNum < 0 || valeurNum > 20) {
        return res.status(400).json({
          success: false,
          message: "La valeur de la note doit être comprise entre 0 et 20",
        });
      }

      // Vérifier que l'élève existe
      const eleve = await EleveModel.findById(id_eleve);
      if (!eleve) {
        return res.status(404).json({ success: false, message: `Élève #${id_eleve} introuvable` });
      }

      // Vérifier que la matière existe
      const matiere = await MatiereModel.findById(id_matiere);
      if (!matiere) {
        return res.status(404).json({ success: false, message: `Matière #${id_matiere} introuvable` });
      }

      const note = await NoteModel.create({ valeur: valeurNum, id_eleve, id_matiere });
      return res.status(201).json({ success: true, data: note });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Erreur serveur", error: error.message });
    }
  },

  /**
   * PUT /api/notes/:id
   * Met à jour une note.
   * Body attendu : { valeur }
   */
  updateNote: async (req, res) => {
    try {
      const { id } = req.params;
      const { valeur } = req.body;

      // Validation de la valeur
      if (valeur === undefined) {
        return res.status(400).json({ success: false, message: "Le champ valeur est obligatoire" });
      }

      const valeurNum = parseFloat(valeur);
      if (isNaN(valeurNum) || valeurNum < 0 || valeurNum > 20) {
        return res.status(400).json({
          success: false,
          message: "La valeur de la note doit être comprise entre 0 et 20",
        });
      }

      // Vérifier que la note existe
      const existing = await NoteModel.findById(id);
      if (!existing) {
        return res.status(404).json({ success: false, message: `Note #${id} introuvable` });
      }

      const note = await NoteModel.update(id, { valeur: valeurNum });
      return res.status(200).json({ success: true, data: note });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Erreur serveur", error: error.message });
    }
  },

  /**
   * DELETE /api/notes/:id
   * Supprime une note.
   */
  deleteNote: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifier que la note existe
      const existing = await NoteModel.findById(id);
      if (!existing) {
        return res.status(404).json({ success: false, message: `Note #${id} introuvable` });
      }

      await NoteModel.delete(id);
      return res.status(200).json({ success: true, message: `Note #${id} supprimée avec succès` });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Erreur serveur", error: error.message });
    }
  },
};

module.exports = NoteController;