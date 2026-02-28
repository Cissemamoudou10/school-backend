const express = require("express");
const router = express.Router();
const { body, param, query } = require("express-validator");
const UtilisateurController = require("../controllers/utilisateur.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");

// Toutes les routes nécessitent un token
router.use(verifyToken);

router.get(
  "/",
  [
    query("role")
      .optional()
      .isIn(["admin", "prof", "eleve"])
      .withMessage("Role invalide"),
  ],
  validate,
  UtilisateurController.getAll,
);

router.get(
  "/role/:role",
  [param("role").isIn(["admin", "prof", "eleve"]).withMessage("Role invalide")],
  validate,
  UtilisateurController.getByRole,
);

router.get(
  "/role/:role/classe/:idClasse",
  [
    param("role")
      .isIn(["prof", "eleve"])
      .withMessage("Role doit être prof ou eleve"),
    param("idClasse").isInt().withMessage("ID classe invalide"),
    validate,
  ],
  UtilisateurController.getByClasse,
);

router.get("/:id", [param("id").isInt().withMessage("ID invalide")], validate, UtilisateurController.getById);

router.post(
  "/",
  [
    body("role").isIn(["admin", "prof", "eleve"]).withMessage("Role invalide"),
    body("nom").trim().notEmpty().withMessage("Nom requis"),
    body("prenoms").trim().notEmpty().withMessage("Prénoms requis"),
    body("numeroTel").trim().notEmpty().withMessage("Numéro requis"),
    body("password").isLength({ min: 6 }).withMessage("Mot de passe requis"),
    body("email").optional().isEmail().withMessage("Email invalide"),
    body("adress").optional().trim(),
    body("id_classe").optional().isInt(),
    body("date_naissance").optional().isDate(),
    body("sexe").optional().isIn(["M", "F"]).withMessage("Sexe invalide"),
    validate,
  ],
  UtilisateurController.create,
);

router.put(
  "/:id",
  [
    body("nom").optional().trim().notEmpty(),
    body("prenoms").optional().trim().notEmpty(),
    body("numeroTel").optional().trim().notEmpty(),
    body("password").optional().isLength({ min: 6 }),
    body("email").optional().isEmail().withMessage("Email invalide"),
    body("adress").optional().trim(),
    body("id_classe").optional().isInt(),
    body("date_naissance").optional().isDate(),
    body("sexe").optional().isIn(["M", "F"]).withMessage("Sexe invalide"),
    validate,
  ],
  UtilisateurController.update,
);

router.delete("/:id", UtilisateurController.delete);

module.exports = router;
