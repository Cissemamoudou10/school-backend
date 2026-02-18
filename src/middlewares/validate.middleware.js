// ============================================
//  MIDDLEWARE : VALIDATION DES DONNÉES
//  Fichier : src/middlewares/validate.middleware.js
// ============================================

const { validationResult } = require("express-validator");

/**
 * Middleware générique qui vérifie les résultats de validation
 * produits par express-validator.
 *
 * S'utilise APRÈS les règles de validation dans une route :
 *   router.post("/", [
 *     body("nom").notEmpty().withMessage("Le nom est obligatoire"),
 *     validate,
 *     MonController.create
 *   ]);
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const validate = (req, res, next) => {
  // TODO : Appeler validationResult(req) pour récupérer les erreurs
  // TODO : Si des erreurs existent (!errors.isEmpty())
  //        → Répondre 422 avec res.status(422).json({ errors: errors.array() })
  // TODO : Sinon → appeler next()
  throw new Error("Non implémenté");
};

module.exports = { validate };
