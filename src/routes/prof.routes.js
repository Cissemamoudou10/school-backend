// ============================================
//  ROUTES : PROF
//  Fichier : src/routes/prof.routes.js
// ============================================

const express = require("express");
const router  = express.Router();
const ProfController = require("../controllers/prof.controller");

/**
 * @route   GET /api/profs
 * @desc    Lister tous les professeurs
 */
router.get("/", ProfController.getAllProfs);

/**
 * @route   GET /api/profs/classe/:idClasse
 * @desc    Lister les profs d'une classe
 */
router.get("/classe/:idClasse", ProfController.getProfsByClasse);

/**
 * @route   GET /api/profs/:id
 * @desc    Obtenir un prof par son id
 */
router.get("/:id", ProfController.getProfById);

/**
 * @route   POST /api/profs
 * @desc    Créer un prof
 */
router.post("/", ProfController.createProf);

/**
 * @route   PUT /api/profs/:id
 * @desc    Modifier un prof
 */
router.put("/:id", ProfController.updateProf);

/**
 * @route   DELETE /api/profs/:id
 * @desc    Supprimer un prof
 */
router.delete("/:id", ProfController.deleteProf);

module.exports = router;
