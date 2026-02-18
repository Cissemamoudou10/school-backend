// ============================================
//  ROUTES : ELEVE
//  Fichier : src/routes/eleve.routes.js
// ============================================

const express = require("express");
const router  = express.Router();
const EleveController = require("../controllers/eleve.controller");

/**
 * @route   GET /api/eleves
 * @desc    Lister tous les élèves
 */
router.get("/", EleveController.getAllEleves);

/**
 * @route   GET /api/eleves/classe/:idClasse
 * @desc    Lister les élèves d'une classe
 * IMPORTANT : Avant /:id pour éviter les conflits de routes
 */
router.get("/classe/:idClasse", EleveController.getElevesByClasse);

/**
 * @route   GET /api/eleves/:id
 * @desc    Obtenir un élève par son id
 */
router.get("/:id", EleveController.getEleveById);

/**
 * @route   POST /api/eleves
 * @desc    Inscrire un élève
 */
router.post("/", EleveController.createEleve);

/**
 * @route   PUT /api/eleves/:id
 * @desc    Modifier un élève
 */
router.put("/:id", EleveController.updateEleve);

/**
 * @route   DELETE /api/eleves/:id
 * @desc    Supprimer un élève
 */
router.delete("/:id", EleveController.deleteEleve);

module.exports = router;
