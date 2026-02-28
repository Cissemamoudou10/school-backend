const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UtilisateurModel = require("../models/utilisateur.model");

const AuthController = {
  login: async (req, res) => {
    try {
      const { identifier, password } = req.body;
      // identifier peut être email OU numeroTel
      if (!identifier || !password) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Identifiant et mot de passe requis",
          });
      }

      // chercher l'utilisateur par email ou téléphone
      let utilisateur = null;
      if (identifier.includes("@")) {
        utilisateur = await UtilisateurModel.findByEmail(identifier);
      }
      if (!utilisateur) {
        utilisateur = await UtilisateurModel.findByTel(identifier);
      }

      if (!utilisateur) {
        return res
          .status(401)
          .json({ success: false, message: "Utilisateur introuvable" });
      }

      const valid = await bcrypt.compare(password, utilisateur.password);
      if (!valid) {
        return res
          .status(401)
          .json({ success: false, message: "Mot de passe invalide" });
      }

      const payload = {
        id: utilisateur.id,
        role: utilisateur.role,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "24h",
      });

      return res
        .status(200)
        .json({
          success: true,
          token,
          user: {
            id: utilisateur.id,
            nom: utilisateur.nom,
            prenoms: utilisateur.prenoms,
            role: utilisateur.role,
          },
        });
    } catch (err) {
      console.error("[login]", err);
      return res
        .status(500)
        .json({ success: false, message: "Erreur serveur" });
    }
  },
};

module.exports = AuthController;
