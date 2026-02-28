const express = require("express");
const { body } = require("express-validator");
const AuthController = require("../controllers/auth.controller");
const { validate } = require("../middlewares/validate.middleware");

const router = express.Router();

/**
 * POST /api/auth/login
 * Body: { identifier, password }
 */
router.post(
  "/login",
  [
    body("identifier").notEmpty().withMessage("Email ou numéro requis"),
    body("password").notEmpty().withMessage("Mot de passe requis"),
    validate,
  ],
  AuthController.login,
);

module.exports = router;
