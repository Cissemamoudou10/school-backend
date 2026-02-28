const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const ClasseController = require("../controllers/classe.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");
// const { authorize } = require("../middlewares/role.middleware"); // Si vous avez créé le middleware de rôle

/**
 * 🔓 ROUTES PUBLIQUES
 * Tout le monde peut voir la liste des classes (utile pour l'affichage général)
 */
router.get("/", ClasseController.getAllClasses);
router.get("/:id", ClasseController.getClasseById);

/**
 * 🔐 ROUTES PRIVÉES (Admin uniquement)
 * On applique verifyToken sur toutes les routes suivantes
 */
router.use(verifyToken);

/**
 * @route   POST /api/classes
 * @desc    Créer une nouvelle classe
 */
router.post(
  "/",
  [
    body("libelle")
      .trim()
      .notEmpty()
      .withMessage("Le libellé de la classe est obligatoire")
      .isLength({ min: 2, max: 50 })
      .withMessage("Le libellé doit faire entre 2 et 50 caractères"),
    validate,
  ],
  ClasseController.createClasse,
);

/**
 * @route   PUT /api/classes/:id
 */
router.put(
  "/:id",
  [
    body("libelle")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Le libellé ne peut pas être vide"),
    validate,
  ],
  ClasseController.updateClasse,
);

/**
 * @route   DELETE /api/classes/:id
 */
router.delete("/:id", ClasseController.deleteClasse);

module.exports = router;
