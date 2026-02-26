const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");

const NoteController = require("../controllers/note.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");

// 🛡️ Protection : Il faut être connecté pour voir ou modifier des notes
router.use(verifyToken);

/**
 * 📊 CONSULTATION
 */
router.get("/", NoteController.getAllNotes);

router.get("/eleve/:idEleve", [
    param("idEleve").isInt().withMessage("ID élève invalide"),
    validate
], NoteController.getNotesByEleve);

router.get("/matiere/:idMatiere", [
    param("idMatiere").isInt().withMessage("ID matière invalide"),
    validate
], NoteController.getNotesByMatiere);

router.get("/bulletin/:idEleve", NoteController.getBulletinEleve);

router.get("/:id", NoteController.getNoteById);

/**
 * ✍️ ACTIONS (Généralement réservées aux Profs et Admins)
 */

/**
 * @route   POST /api/notes
 */
router.post("/", [
    body("valeur")
        .isFloat({ min: 0, max: 20 })
        .withMessage("La note doit être comprise entre 0 et 20"),
    body("eleve_id").isInt().withMessage("Un élève valide est requis"),
    body("matiere_id").isInt().withMessage("Une matière valide est requise"),
    body("date_note").optional().isDate().withMessage("Format de date invalide"),
    validate
], NoteController.createNote);

/**
 * @route   PUT /api/notes/:id
 */
router.put("/:id", [
    body("valeur").optional().isFloat({ min: 0, max: 20 }),
    validate
], NoteController.updateNote);

/**
 * @route   DELETE /api/notes/:id
 */
router.delete("/:id", NoteController.deleteNote);

module.exports = router;