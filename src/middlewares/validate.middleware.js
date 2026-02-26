const { validationResult } = require("express-validator");

/**
 * Middleware générique qui vérifie les résultats de validation
 */
const validate = (req, res, next) => {
  // 1. Récupérer les erreurs de validation détectées par express-validator
  const errors = validationResult(req);

  // 2. Si des erreurs existent (le tableau n'est pas vide)
  if (!errors.isEmpty()) {
    // On renvoie un code 422 (Unprocessable Entity)
    // C'est le code standard pour les erreurs de validation de formulaire
    return res.status(422).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.path, // Le nom du champ qui pose problème
        message: err.msg // Le message d'erreur défini dans la route
      }))
    });
  }

  // 3. Si tout est correct, on passe au middleware ou contrôleur suivant
  next();
};

module.exports = { validate };