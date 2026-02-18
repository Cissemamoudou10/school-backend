// ============================================
//  ROUTES : CLASSE
//  Fichier : src/routes/classe.routes.js
// ============================================

const express = require("express");
const router  = express.Router();
const ClasseController = require("../controllers/classe.controller");
// const { verifyToken } = require("../middlewares/auth.middleware");

/**
 * @route   GET /api/classes
 * @desc    Lister toutes les classes
 * @access  Public
 */
router.get("/", ClasseController.getAllClasses);

/**
 * @route   GET /api/classes/:id
 * @desc    Obtenir une classe par son id
 * @access  Public
 */
router.get("/:id", ClasseController.getClasseById);

/**
 * @route   POST /api/classes
 * @desc    Créer une nouvelle classe
 * @access  Privé (Admin) — décommenter verifyToken quand implémenté
 */
router.post("/", /* verifyToken, */ ClasseController.createClasse);

/**
 * @route   PUT /api/classes/:id
 * @desc    Modifier une classe
 * @access  Privé (Admin)
 */
router.put("/:id", /* verifyToken, */ ClasseController.updateClasse);

/**
 * @route   DELETE /api/classes/:id
 * @desc    Supprimer une classe
 * @access  Privé (Admin)
 */
router.delete("/:id", /* verifyToken, */ ClasseController.deleteClasse);

module.exports = router;
