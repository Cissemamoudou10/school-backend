// ============================================
//  CONTRÔLEUR : NOTE
//  Fichier : src/controllers/note.controller.js
// ============================================

const NoteModel = require("../models/note.model");
const UtilisateurModel = require("../models/utilisateur.model");
const MatiereModel = require("../models/matiere.model");

const NoteController = {
  // GET /api/notes
  getAllNotes: async (req, res) => {
    try {
      const notes = await NoteModel.findAll();
      return res.status(200).json({ success: true, data: notes });
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Erreur serveur",
          error: error.message,
        });
    }
  },

  // GET /api/notes/:id
  getNoteById: async (req, res) => {
    try {
      const { id } = req.params;
      const note = await NoteModel.findById(id);
      if (!note) {
        return res
          .status(404)
          .json({ success: false, message: `Note #${id} introuvable` });
      }
      return res
        .status(200)
        .json({
          success: true,
          data: note,
          message: `Note #${id} trouvée avec succès`,
        });
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Erreur serveur",
          error: error.message,
        });
    }
  },

  // GET /api/notes/eleve/:idEleve
  getNotesByEleve: async (req, res) => {
    try {
      const { idEleve } = req.params;
      // vérifier l'existence de l'élève dans la table utilisateur
      const eleve = await UtilisateurModel.findById(idEleve);
      if (!eleve || eleve.role !== "eleve") {
        return res
          .status(404)
          .json({ success: false, message: `Élève #${idEleve} introuvable` });
      }
      const notes = await NoteModel.findByEleve(idEleve);
      return res.status(200).json({ success: true, data: notes });
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Erreur serveur",
          error: error.message,
        });
    }
  },

  // GET /api/notes/matiere/:idMatiere
  getNotesByMatiere: async (req, res) => {
    try {
      const { idMatiere } = req.params;
      const matiere = await MatiereModel.findById(idMatiere);
      if (!matiere) {
        return res
          .status(404)
          .json({
            success: false,
            message: `Matière #${idMatiere} introuvable`,
          });
      }
      const notes = await NoteModel.findByMatiere(idMatiere);
      return res.status(200).json({ success: true, data: notes });
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Erreur serveur",
          error: error.message,
        });
    }
  },

  // GET /api/notes/bulletin/:idEleve
  getBulletinEleve: async (req, res) => {
    try {
      const { idEleve } = req.params;
      const eleve = await UtilisateurModel.findById(idEleve);
      if (!eleve || eleve.role !== "eleve") {
        return res
          .status(404)
          .json({ success: false, message: `Élève #${idEleve} introuvable` });
      }
      const { notes, moyenne_generale } =
        await NoteModel.getBulletinByEleve(idEleve);
      return res.status(200).json({
        success: true,
        data: { eleve, notes, moyenne_generale },
      });
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Erreur serveur",
          error: error.message,
        });
    }
  },

  // POST /api/notes
  createNote: async (req, res) => {
    try {
      const { valeur, id_eleve, id_matiere } = req.body;

      if (
        valeur === undefined ||
        id_eleve === undefined ||
        id_matiere === undefined
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Les champs valeur, id_eleve et id_matiere sont obligatoires",
        });
      }

      const valeurNum = parseFloat(valeur);
      if (isNaN(valeurNum) || valeurNum < 0 || valeurNum > 20) {
        return res.status(400).json({
          success: false,
          message: "La valeur de la note doit être comprise entre 0 et 20",
        });
      }

      const eleve = await UtilisateurModel.findById(id_eleve);
      if (!eleve || eleve.role !== "eleve") {
        return res
          .status(404)
          .json({ success: false, message: `Élève #${id_eleve} introuvable` });
      }

      const matiere = await MatiereModel.findById(id_matiere);
      if (!matiere) {
        return res
          .status(404)
          .json({
            success: false,
            message: `Matière #${id_matiere} introuvable`,
          });
      }

      const note = await NoteModel.create({
        valeur: valeurNum,
        id_eleve,
        id_matiere,
      });
      return res.status(201).json({ success: true, data: note });
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Erreur serveur",
          error: error.message,
        });
    }
  },

  // PUT /api/notes/:id
  updateNote: async (req, res) => {
    try {
      const { id } = req.params;
      const { valeur } = req.body;

      if (valeur === undefined) {
        return res
          .status(400)
          .json({ success: false, message: "Le champ valeur est obligatoire" });
      }

      const valeurNum = parseFloat(valeur);
      if (isNaN(valeurNum) || valeurNum < 0 || valeurNum > 20) {
        return res.status(400).json({
          success: false,
          message: "La valeur de la note doit être comprise entre 0 et 20",
        });
      }

      const existing = await NoteModel.findById(id);
      if (!existing) {
        return res
          .status(404)
          .json({ success: false, message: `Note #${id} introuvable` });
      }

      const note = await NoteModel.update(id, { valeur: valeurNum });
      return res.status(200).json({ success: true, data: note });
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Erreur serveur",
          error: error.message,
        });
    }
  },

  // DELETE /api/notes/:id
  deleteNote: async (req, res) => {
    try {
      const { id } = req.params;
      const existing = await NoteModel.findById(id);
      if (!existing) {
        return res
          .status(404)
          .json({ success: false, message: `Note #${id} introuvable` });
      }
      await NoteModel.delete(id);
      return res
        .status(200)
        .json({ success: true, message: `Note #${id} supprimée avec succès` });
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Erreur serveur",
          error: error.message,
        });
    }
  },
};

module.exports = NoteController;
