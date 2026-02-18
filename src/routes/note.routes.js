// ============================================
//  ROUTES : NOTE
//  Fichier : src/routes/note.routes.js
// ============================================

const express = require("express");
const router  = express.Router();
const NoteController = require("../controllers/note.controller");

/**
 * @route   GET /api/notes
 * @desc    Lister toutes les notes
 */
router.get("/", NoteController.getAllNotes);

/**
 * @route   GET /api/notes/eleve/:idEleve
 * @desc    Notes d'un élève spécifique
 * IMPORTANT : Routes spécifiques AVANT /:id
 */
router.get("/eleve/:idEleve", NoteController.getNotesByEleve);

/**
 * @route   GET /api/notes/matiere/:idMatiere
 * @desc    Notes d'une matière spécifique
 */
router.get("/matiere/:idMatiere", NoteController.getNotesByMatiere);

/**
 * @route   GET /api/notes/bulletin/:idEleve
 * @desc    Bulletin complet d'un élève (notes + moyenne générale)
 */
router.get("/bulletin/:idEleve", NoteController.getBulletinEleve);

/**
 * @route   GET /api/notes/:id
 * @desc    Obtenir une note par son id
 */
router.get("/:id", NoteController.getNoteById);

/**
 * @route   POST /api/notes
 * @desc    Ajouter une note
 */
router.post("/", NoteController.createNote);

/**
 * @route   PUT /api/notes/:id
 * @desc    Modifier une note
 */
router.put("/:id", NoteController.updateNote);

/**
 * @route   DELETE /api/notes/:id
 * @desc    Supprimer une note
 */
router.delete("/:id", NoteController.deleteNote);

module.exports = router;
