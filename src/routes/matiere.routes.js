// ============================================
//  ROUTES : MATIERE
//  Fichier : src/routes/matiere.routes.js
// ============================================

const express = require("express");
const router  = express.Router();
const MatiereController = require("../controllers/matiere.controller");

/**
 * @route   GET /api/matieres
 * @desc    Lister toutes les matières
 */
router.get("/", MatiereController.getAllMatieres);

/**
 * @route   GET /api/matieres/classe/:idClasse
 * @desc    Lister les matières d'une classe
 * IMPORTANT : Cette route doit être déclarée AVANT /:id
 * pour éviter que "classe" soit interprété comme un id.
 */
router.get("/classe/:idClasse", MatiereController.getMatieresByClasse);

/**
 * @route   GET /api/matieres/:id
 * @desc    Obtenir une matière par son id
 */
router.get("/:id", MatiereController.getMatiereById);

/**
 * @route   POST /api/matieres
 * @desc    Créer une matière
 */
router.post("/", MatiereController.createMatiere);

/**
 * @route   PUT /api/matieres/:id
 * @desc    Modifier une matière
 */
router.put("/:id", MatiereController.updateMatiere);

/**
 * @route   DELETE /api/matieres/:id
 * @desc    Supprimer une matière
 */
router.delete("/:id", MatiereController.deleteMatiere);

module.exports = router;
