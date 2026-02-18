// ============================================
//  ROUTES : ADMIN
//  Fichier : src/routes/admin.routes.js
// ============================================

const express = require("express");
const router  = express.Router();
const AdminController = require("../controllers/admin.controller");

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
 * @desc    Créer un admin
 */
router.post("/", AdminController.createAdmin);

/**
 * @route   PUT /api/admins/:id
 * @desc    Modifier un admin
 */
router.put("/:id", AdminController.updateAdmin);

/**
 * @route   DELETE /api/admins/:id
 * @desc    Supprimer un admin
 */
router.delete("/:id", AdminController.deleteAdmin);

module.exports = router;
