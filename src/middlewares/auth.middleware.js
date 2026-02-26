// ============================================
//  MIDDLEWARE : AUTHENTIFICATION JWT
//  Fichier : src/middlewares/auth.middleware.js
// ============================================

const jwt = require("jsonwebtoken");

/**
 * Middleware qui vérifie la présence et la validité du token JWT
 * dans le header Authorization de la requête.
 *
 * Usage dans une route :
 *   router.post("/", verifyToken, MonController.maFonction);
 *
 * Le token doit être envoyé ainsi :
 *   Authorization: Bearer <token>
 *
 * @param {Object} req  - La requête HTTP
 * @param {Object} res  - La réponse HTTP
 * @param {Function} next - Passe au middleware suivant
 */
const verifyToken = (req, res, next) => {
  try {
    // Récupérer le header Authorization
    const authHeader = req.headers["authorization"];

    // Vérifier que le header existe
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Token manquant",
      });
    }

    // Extraire le token (format : "Bearer <token>")
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token manquant",
      });
    }

    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attacher le payload décodé à req.user pour les controllers suivants
    req.user = decoded;

    // Passer au middleware suivant
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Token invalide ou expiré",
    });
  }
};

module.exports = { verifyToken };