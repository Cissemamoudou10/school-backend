const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

// Import des controllers et middlewares
const AdminController = require("../controllers/admin.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");

/**
 * 🛡️ PROTECTION GLOBALE
 * Seuls les admins connectés peuvent gérer d'autres admins.
 */
router.use(verifyToken); 

/**
 * @route   GET /api/admins
 * @desc    Lister tous les admins
 */
router.get("/", AdminController.getAllAdmins);

/**
 * @route   GET /api/admins/:id
 * @desc    Obtenir un admin par son id
 */
router.get("/:id", AdminController.getAdminById);

/**
 * @route   POST /api/admins
 * @desc    Créer un admin (avec validation stricte)
 */
router.post("/", [
    body("nom").notEmpty().withMessage("Le nom est requis"),
    body("email").isEmail().withMessage("Email invalide"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Le mot de passe doit faire au moins 6 caractères"),
    validate // On vérifie les erreurs avant d'appeler le controller
], AdminController.createAdmin);

/**
 * @route   PUT /api/admins/:id
 * @desc    Modifier un admin
 */
router.put("/:id", [
    body("email").optional().isEmail().withMessage("Format email incorrect"),
    validate
], AdminController.updateAdmin);

/**
 * @route   DELETE /api/admins/:id
 * @desc    Supprimer un admin
 */
router.delete("/:id", AdminController.deleteAdmin);

module.exports = router;