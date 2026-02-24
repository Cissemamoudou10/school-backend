const AdminModel = require("../models/admin.model");

const AdminController = {
  getAllAdmins: async (req, res) => {
    try {
      console.log("Récupération de tous les administrateurs..."); 
      const admins = await AdminModel.findAll();
      res.status(200).json(admins);
      console.log("Récupération des administrateurs terminée.", admins);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération", error: error.message });
    }
    
  },

  getAdminById: async (req, res) => {
    try {
      const { id } = req.params;
      const admin = await AdminModel.findById(id);
      if (!admin) return res.status(404).json({ message: "Administrateur non trouvé" });
      res.status(200).json(admin);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  },

  createAdmin: async (req, res) => {
    try {
      const { nom, prenoms, numero, email, adress } = req.body;

      // Validation des champs obligatoires
      if (!nom || !prenoms || !email) {
        return res.status(400).json({
          success: false,
          message: "Les champs nom, prenoms et email sont obligatoires",
        });
      }

      // Vérifier si l'email existe déjà
      const existingAdmin = await AdminModel.findByEmail(email);
      if (existingAdmin) {
        return res.status(409).json({
          success: false,
          message: "Un admin avec cet email existe déjà",
        });
      }

      // Créer l'admin
      const newAdmin = await AdminModel.create({ nom, prenoms, numero, email, adress });

      return res.status(201).json({
        success: true,
        data: newAdmin,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Erreur interne du serveur",
      });
    }
  },

  /**
   * PUT /api/admins/:id
   * Met à jour un administrateur.
   * Body attendu : { nom, prenoms, numero, email, adress }
   */
  updateAdmin: async (req, res) => {
    try {
      const { id } = req.params;
      const adminExists = await AdminModel.findById(id);
      if (!adminExists) return res.status(404).json({ message: "Administrateur introuvable" });

      const updatedAdmin = await AdminModel.update(id, req.body);
      res.status(200).json(updatedAdmin);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la mise à jour", error: error.message });
    }
  },

  deleteAdmin: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await AdminModel.delete(id);
      if (!deleted) return res.status(404).json({ message: "Administrateur introuvable" });
      
      res.status(200).json({ message: `L'administrateur #${id} a été supprimé avec succès` });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la suppression", error: error.message });
    }
  },
};

module.exports = AdminController;