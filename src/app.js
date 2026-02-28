// ============================================
//  POINT D'ENTRÉE DE L'APPLICATION
//  Fichier : src/app.js
// ============================================

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { testConnection } = require("./config/db");

// Import des routes
const authRoutes = require("./routes/auth.routes");
const utilisateurRoutes = require("./routes/utilisateur.routes");
const classeRoutes = require("./routes/classe.routes");
const matiereRoutes = require("./routes/matiere.routes");
const noteRoutes = require("./routes/note.routes");

// Import des middlewares globaux
const { errorHandler } = require("./middlewares/error.middleware");

const app = express();

// ── Middlewares globaux ──────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//http://localhost:3000/api/admins/ -- post
// ── Routes ───────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/utilisateurs", utilisateurRoutes);
app.use("/api/classes", classeRoutes);
app.use("/api/matieres", matiereRoutes);
app.use("/api/notes", noteRoutes);

// ── Route de test (health check) ─────────────
app.get("/", (req, res) => {
  res.json({ message: "🏫 Bienvenue sur l'API de l'école primaire !" });
});

// ── Gestionnaire d'erreurs global ────────────
app.use(errorHandler);

// ── Démarrage du serveur ──────────────────────
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await testConnection();
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});

module.exports = app;
