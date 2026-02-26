const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");

const MatiereController = require("../controllers/matiere.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");

/**
 * 🔓 ROUTES PUBLIQUES (ou accessibles à tous les connectés)
 * Élèves, Profs et Admins doivent pouvoir consulter les matières.
 */
router.get("/", MatiereController.getAllMatieres);

router.get("/classe/:idClasse", [
    param("idClasse").isInt().withMessage("L'ID de la classe doit être un nombre"),
    validate
], MatiereController.getMatieresByClasse);

router.get("/:id", MatiereController.getMatiereById);

/**
 * 🔐 ROUTES PRIVÉES (Admin uniquement)
 * La création et la modification du programme scolaire sont réservées aux admins.
 */
router.use(verifyToken);
// Idéalement ici : router.use(authorize(["admin"]));

/**
 * @route   POST /api/matieres
 */
router.post("/", [
    body("nom")
        .trim()
        .notEmpty().withMessage("Le nom de la matière est requis")
        .isLength({ min: 2 }).withMessage("Le nom doit être explicite (ex: Mathématiques)"),
    body("coefficient")
        .optional()
        .isFloat({ min: 1, max: 10 }).withMessage("Le coefficient doit être compris entre 1 et 10"),
    validate
], MatiereController.createMatiere);

/*
 * @route   PUT /api/matieres/:id
 */
router.put("/:id", [
    body("nom").optional().trim().notEmpty(),
    validate
], MatiereController.updateMatiere);

/**
 * @route   DELETE /api/matieres/:id
 */
router.delete("/:id", MatiereController.deleteMatiere);

module.exports = router;