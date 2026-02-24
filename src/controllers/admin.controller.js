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
      const { nom, prenoms, email } = req.body;

      // Validation minimale
      if (!nom || !prenoms || !email) {
        return res.status(400).json({ message: "Nom, prénoms et email sont obligatoires" });
      }

      // Vérification unicité email
      const existing = await AdminModel.findByEmail(email);
      if (existing) return res.status(409).json({ message: "Cet email est déjà utilisé" });

      const newAdmin = await AdminModel.create(req.body);
      res.status(201).json(newAdmin);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la création", error: error.message });
    }
  },

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