const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");

const ProfController = require("../controllers/prof.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");

/**
 * 🔓 CONSULTATION
 * Les élèves et parents peuvent parfois avoir besoin de voir la liste des profs.
 */
router.get("/", ProfController.getAllProfs);

router.get(
  "/classe/:idClasse",
  [
    param("idClasse")
      .isInt()
      .withMessage("L'ID de la classe doit être un nombre"),
    validate,
  ],
  ProfController.getProfsByClasse,
);

router.get("/:id", ProfController.getProfById);

/**
 * 🔐 GESTION (Accès restreint)
 */
router.use(verifyToken);

/**
 * @route   POST /api/profs
 */
router.post(
  "/",
  [
    body("nom").trim().notEmpty().withMessage("Le nom est obligatoire"),
    body("prenom").trim().notEmpty().withMessage("Le prénom est obligatoire"),
    body("email").isEmail().withMessage("Email académique invalide"),
    body("matiere_id").optional().isInt().withMessage("ID matière invalide"),
    validate,
  ],
  ProfController.createProf,
);

/**
 * @route   PUT /api/profs/:id
 */
router.put(
  "/:id",
  [
    body("email").optional().isEmail().withMessage("Format email incorrect"),
    validate,
  ],
  ProfController.updateProf,
);

/**
 * @route   DELETE /api/profs/:id
 */
router.delete("/:id", ProfController.deleteProf);

module.exports = router;
