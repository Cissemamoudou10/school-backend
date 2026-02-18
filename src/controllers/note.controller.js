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
    // TODO : Appeler NoteModel.findAll()
    // TODO : Répondre 200
    throw new Error("Non implémenté");
  },

  /**
   * GET /api/notes/:id
   * Retourne une note par son id.
   */
  getNoteById: async (req, res) => {
    // TODO : Extraire id
    // TODO : NoteModel.findById(id) → 404 si null
    throw new Error("Non implémenté");
  },

  /**
   * GET /api/notes/eleve/:idEleve
   * Retourne toutes les notes d'un élève.
   */
  getNotesByEleve: async (req, res) => {
    // TODO : Extraire idEleve
    // TODO : Vérifier existence de l'élève (EleveModel.findById) → 404
    // TODO : Appeler NoteModel.findByEleve(idEleve)
    throw new Error("Non implémenté");
  },

  /**
   * GET /api/notes/matiere/:idMatiere
   * Retourne toutes les notes d'une matière.
   */
  getNotesByMatiere: async (req, res) => {
    // TODO : Extraire idMatiere
    // TODO : Vérifier existence matière → 404
    // TODO : Appeler NoteModel.findByMatiere(idMatiere)
    throw new Error("Non implémenté");
  },

  /**
   * GET /api/notes/bulletin/:idEleve
   * Retourne le bulletin complet d'un élève :
   * ses notes par matière + sa moyenne générale.
   */
  getBulletinEleve: async (req, res) => {
    // TODO : Extraire idEleve
    // TODO : Vérifier existence élève → 404
    // TODO : Appeler NoteModel.getBulletinByEleve(idEleve)
    // TODO : Répondre avec { eleve, notes, moyenne_generale }
    throw new Error("Non implémenté");
  },

  /**
   * POST /api/notes
   * Crée une nouvelle note.
   * Body attendu : { valeur, id_eleve, id_matiere }
   */
  createNote: async (req, res) => {
    // TODO : Extraire valeur, id_eleve, id_matiere depuis req.body
    // TODO : Valider que valeur est entre 0 et 20
    // TODO : Vérifier existence élève → 404
    // TODO : Vérifier existence matière → 404
    // TODO : Appeler NoteModel.create(data)
    // TODO : Répondre 201
    throw new Error("Non implémenté");
  },

  /**
   * PUT /api/notes/:id
   * Met à jour une note.
   * Body attendu : { valeur }
   */
  updateNote: async (req, res) => {
    // TODO : Extraire id et valeur
    // TODO : Valider valeur (entre 0 et 20)
    // TODO : Vérifier existence note → 404
    // TODO : Appeler NoteModel.update(id, { valeur })
    throw new Error("Non implémenté");
  },

  /**
   * DELETE /api/notes/:id
   * Supprime une note.
   */
  deleteNote: async (req, res) => {
    // TODO : Extraire id
    // TODO : Vérifier existence → 404
    // TODO : Appeler NoteModel.delete(id)
    throw new Error("Non implémenté");
  },
};

module.exports = NoteController;
