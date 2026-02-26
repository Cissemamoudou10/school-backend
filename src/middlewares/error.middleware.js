/**
 * Middleware de gestion centralisée des erreurs.
 */
const errorHandler = (err, req, res, next) => {
  // 1. Afficher l'erreur dans la console pour le développeur
  // On peut ajouter de la couleur ou un logger comme 'winston' ici
  console.error(`[ERROR] ${req.method} ${req.url} :`, err.message);

  // 2. Déterminer le code de statut (par défaut 500)
  const statusCode = err.statusCode || 500;

  // 3. Préparer le message d'erreur
  // En production, on évite de renvoyer err.stack pour des raisons de sécurité
  const response = {
    success: false,
    message: err.message || "Erreur interne du serveur",
  };

  // Optionnel : Ajouter la stack trace uniquement en mode développement
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  // 4. Envoyer la réponse JSON
  res.status(statusCode).json(response);
};

module.exports = { errorHandler };