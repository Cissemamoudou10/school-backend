const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");

const EleveController = require("../controllers/eleve.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");

// On protège l'accès aux données des élèves (Admin et Profs uniquement en général)
router.use(verifyToken);

/**
 * @route   GET /api/eleves
 */
router.get("/", EleveController.getAllEleves);

/**
 * @route   GET /api/eleves/classe/:idClasse
 */
router.get("/classe/:idClasse", [
    param("idClasse").isInt().withMessage("L'identifiant de la classe doit être un nombre"),
    validate
], EleveController.getElevesByClasse);

/**
 * @route   GET /api/eleves/:id
 */
router.get("/:id", EleveController.getEleveById);

/**
 * @route   POST /api/eleves
 */
router.post("/", [
    body("nom").trim().notEmpty().withMessage("Le nom est obligatoire"),
    body("prenom").trim().notEmpty().withMessage("Le prénom est obligatoire"),
    body("date_naissance").isDate().withMessage("La date de naissance doit être valide (YYYY-MM-DD)"),
    body("classe_id").isInt().withMessage("Une classe valide doit être assignée"),
    validate
], EleveController.createEleve);

/**
 * @route   PUT /api/eleves/:id
 */
router.put("/:id", [
    body("email").optional().isEmail().withMessage("Format email invalide"),
    validate
], EleveController.updateEleve);

/**
 * @route   DELETE /api/eleves/:id
 */
router.delete("/:id", EleveController.deleteEleve);

module.exports = router;