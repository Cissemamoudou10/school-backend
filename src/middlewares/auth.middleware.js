const jwt = require("jsonwebtoken");

/**
 * Middleware qui vérifie la présence et la validité du token JWT
 */
const verifyToken = (req, res, next) => {
  // 1. Récupérer le header Authorization
  const authHeader = req.headers["authorization"];

  // 2. Vérifier que le header existe
  if (!authHeader) {
    return res.status(401).json({ 
      success: false, 
      message: "Accès refusé. Aucun token fourni." 
    });
  }

  // 3. Extraire le token (format : "Bearer <token>")
  // On vérifie aussi que le format commence bien par "Bearer"
  const parts = authHeader.split(" ");
  
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ 
      success: false, 
      message: "Format du token invalide (attendu: 'Bearer <token>')" 
    });
  }

  const token = parts[1];

  try {
    // 4. Vérifier le token avec la clé secrète
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Attacher le payload décodé (ex: id, role) à req.user
    req.user = decoded;

    // 6. Continuer vers le prochain middleware ou controller
    next();
  } catch (err) {
    // En cas d'erreur (token expiré, modifié, etc.)
    return res.status(401).json({ 
      success: false, 
      message: "Token invalide ou expiré." 
    });
  }
};

module.exports = { verifyToken };