// ============================================
//  MIDDLEWARE : GESTION GLOBALE DES ERREURS
//  Fichier : src/middlewares/error.middleware.js
// ============================================

/**
 * Middleware de gestion centralisée des erreurs.
 * Express reconnaît ce middleware comme gestionnaire d'erreurs
 * car il a exactement 4 paramètres : (err, req, res, next).
 *
 * Il est branché dans app.js après toutes les routes :
 *   app.use(errorHandler);
 *
 * Pour déclencher ce middleware depuis un controller :
 *   next(new Error("message"))   ou   throw new Error("message")
 *   (avec async/await dans Express 5, ou try/catch + next(err))
 *
 * @param {Error} err
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const errorHandler = (err, req, res, next) => {
  // TODO : Afficher l'erreur dans la console (console.error)
  // TODO : Récupérer le statusCode : err.statusCode || 500
  // TODO : Répondre avec res.status(statusCode).json({
  //          success: false,
  //          message: err.message || "Erreur interne du serveur"
  //        })
  throw new Error("Non implémenté");
};

module.exports = { errorHandler };
