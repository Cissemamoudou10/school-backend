const UtilisateurModel = require("../models/utilisateur.model");
const ClasseModel = require("../models/classe.model");

const UtilisateurController = {
  // GET /api/utilisateurs?role=xxx
  getAll: async (req, res) => {
    try {
      const { role } = req.query;
      const users = await UtilisateurModel.findAll(role);
      return res.status(200).json({ success: true, data: users });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Erreur serveur",
        error: err.message,
      });
    }
  },

  // GET /api/utilisateurs/role/:role
  getByRole: async (req, res) => {
    try {
      const { role } = req.params;
      const users = await UtilisateurModel.findAll(role);
      return res.status(200).json({ success: true, data: users });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Erreur serveur",
        error: err.message,
      });
    }
  },

  // GET /api/utilisateurs/role/:role/classe/:idClasse
  getByClasse: async (req, res) => {
    try {
      const { role, idClasse } = req.params;
      // vérifier classe
      const classe = await ClasseModel.findById(idClasse);
      if (!classe) {
        return res
          .status(404)
          .json({ success: false, message: `Classe #${idClasse} introuvable` });
      }
      const filteredUsers = await UtilisateurModel.findAll({
        where: {
          role,
          id_classe: idClasse,
        },
      });
      return res.status(200).json({ success: true, data: filteredUsers });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Erreur serveur",
        error: err.message,
      });
    }
  },

  getById: async (req, res) => {
    try {
      const user = await UtilisateurModel.findById(req.params.id);
      if (!user)
        return res
          .status(404)
          .json({ success: false, message: "Utilisateur non trouvé" });
      return res.status(200).json({ success: true, data: user });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Erreur serveur",
        error: err.message,
      });
    }
  },

  create: async (req, res) => {
    try {
      const {
        role,
        nom,
        prenoms,
        numeroTel,
        password,
        email,
        adress,
        id_classe,
        date_naissance,
        sexe,
      } = req.body;
      if (!role || !nom || !prenoms || !numeroTel || !password) {
        return res.status(400).json({
          success: false,
          message: "Role, nom, prenoms, numéro et mot de passe sont requis",
        });
      }
      // rôle valide
      if (!["admin", "prof", "eleve"].includes(role)) {
        return res
          .status(400)
          .json({ success: false, message: "Role invalide" });
      }
      // unicité
      const existentTel = await UtilisateurModel.findByTel(numeroTel);
      if (existentTel)
        return res
          .status(409)
          .json({ success: false, message: "Ce numéro est déjà utilisé" });
      if (email) {
        const existentMail = await UtilisateurModel.findByEmail(email);
        if (existentMail)
          return res
            .status(409)
            .json({ success: false, message: "Cet email est déjà utilisé" });
      }
      // classe existante si fournie
      if (id_classe) {
        const c = await ClasseModel.findById(id_classe);
        if (!c) {
          return res.status(404).json({
            success: false,
            message: `Classe #${id_classe} introuvable`,
          });
        }
      }

      const user = await UtilisateurModel.create(req.body);
      return res.status(201).json({ success: true, data: user });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Erreur serveur",
        error: err.message,
      });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await UtilisateurModel.findById(id);
      if (!user)
        return res
          .status(404)
          .json({ success: false, message: "Utilisateur introuvable" });

      if (req.body.email && req.body.email !== user.email) {
        const other = await UtilisateurModel.findByEmail(req.body.email);
        if (other)
          return res
            .status(409)
            .json({ success: false, message: "Email déjà utilisé" });
      }
      if (req.body.numeroTel && req.body.numeroTel !== user.numeroTel) {
        const other = await UtilisateurModel.findByTel(req.body.numeroTel);
        if (other)
          return res
            .status(409)
            .json({ success: false, message: "Numéro déjà utilisé" });
      }
      if (req.body.id_classe) {
        const c = await ClasseModel.findById(req.body.id_classe);
        if (!c)
          return res.status(404).json({
            success: false,
            message: `Classe #${req.body.id_classe} introuvable`,
          });
      }

      const updated = await UtilisateurModel.update(id, req.body);
      return res.status(200).json({ success: true, data: updated });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Erreur serveur",
        error: err.message,
      });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await UtilisateurModel.findById(id);
      if (!user)
        return res
          .status(404)
          .json({ success: false, message: "Utilisateur introuvable" });
      await UtilisateurModel.delete(id);
      return res
        .status(200)
        .json({ success: true, message: "Utilisateur supprimé" });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Erreur serveur",
        error: err.message,
      });
    }
  },
};

module.exports = UtilisateurController;
