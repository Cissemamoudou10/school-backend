const EleveModel = require("../models/eleve.model");
// Note: Assure-toi que ClasseModel possède une méthode findById ou checkExists
const ClasseModel = require("../models/classe.model"); 

const EleveController = {
  getAllEleves: async (req, res) => {
    try {
      const eleves = await EleveModel.findAll();
      res.status(200).json(eleves);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération", error: error.message });
    }
  },

  getEleveById: async (req, res) => {
    try {
      const eleve = await EleveModel.findById(req.params.id);
      if (!eleve) return res.status(404).json({ message: "Élève non trouvé" });
      res.status(200).json(eleve);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  },

  getElevesByClasse: async (req, res) => {
    try {
      const { idClasse } = req.params;
      const eleves = await EleveModel.findByClasse(idClasse);
      res.status(200).json(eleves);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  },

  createEleve: async (req, res) => {
    try {
      const { nom, prenoms, sexe, id_classe } = req.body;

      // Validation basique
      if (!nom || !prenoms || !sexe) {
        return res.status(400).json({ message: "Nom, prénoms et sexe sont obligatoires" });
      }

      if (!['M', 'F'].includes(sexe)) {
        return res.status(400).json({ message: "Le sexe doit être 'M' ou 'F'" });
      }

      const nouvelEleve = await EleveModel.create(req.body);
      res.status(201).json({ message: "Élève créé avec succès", data: nouvelEleve });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la création", error: error.message });
    }
  },

  updateEleve: async (req, res) => {
    try {
      const { id } = req.params;
      const existant = await EleveModel.findById(id);
      
      if (!existant) {
        return res.status(404).json({ message: "Élève introuvable" });
      }

      const updated = await EleveModel.update(id, req.body);
      res.status(200).json({ message: "Mise à jour réussie", data: updated });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la modification", error: error.message });
    }
  },

  deleteEleve: async (req, res) => {
    try {
      const success = await EleveModel.delete(req.params.id);
      if (!success) return res.status(404).json({ message: "Élève non trouvé" });
      
      res.status(200).json({ message: "Élève supprimé définitivement" });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la suppression", error: error.message });
    }
  },
};

module.exports = EleveController;