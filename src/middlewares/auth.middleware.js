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
  // TODO : Récupérer le header Authorization depuis req.headers["authorization"]
  // TODO : Vérifier que le header existe → sinon 401 "Token manquant"
  // TODO : Extraire le token (format : "Bearer <token>") → split(" ")[1]
  // TODO : Vérifier le token avec jwt.verify(token, process.env.JWT_SECRET)
  //        → En cas d'erreur → 401 "Token invalide ou expiré"
  // TODO : Attacher le payload décodé à req.user pour les controllers suivants
  // TODO : Appeler next() pour continuer
  throw new Error("Non implémenté");
};

module.exports = { verifyToken };
