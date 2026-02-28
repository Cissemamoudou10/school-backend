// ============================================
//  MODÈLE : NOTE
//  Fichier : src/models/note.model.js
//  Table   : note(id, valeur, id_eleve, id_matiere)
// ============================================

const { pool } = require("../config/db");

const NoteModel = {
  // Toutes les notes avec nom élève et matière
  findAll: async () => {
    const [rows] = await pool.query(`
      SELECT n.id, n.valeur,
             n.id_eleve, CONCAT(u.nom, ' ', u.prenoms) AS eleve,
             n.id_matiere, m.nom AS matiere
      FROM note n
      JOIN utilisateur u ON n.id_eleve   = u.id AND u.role = 'eleve'
      JOIN matiere m ON n.id_matiere = m.id
      ORDER BY n.id
    `);
    return rows;
  },

  // Une note par ID
  findById: async (id) => {
    const [rows] = await pool.query(
      `
      SELECT n.id, n.valeur,
             n.id_eleve, CONCAT(u.nom, ' ', u.prenoms) AS eleve,
             n.id_matiere, m.nom AS matiere
      FROM note n
      JOIN utilisateur u ON n.id_eleve   = u.id AND u.role = 'eleve'
      JOIN matiere m ON n.id_matiere = m.id
      WHERE n.id = ?
    `,
      [id],
    );
    return rows[0] ?? null;
  },

  // Notes d'un élève
  findByEleve: async (idEleve) => {
    const [rows] = await pool.query(
      `
      SELECT n.id, n.valeur,
             n.id_matiere, m.nom AS matiere
      FROM note n
      JOIN matiere m ON n.id_matiere = m.id
      WHERE n.id_eleve = ?
      ORDER BY m.nom
    `,
      [idEleve],
    );
    return rows;
  },

  // Notes d'une matière
  findByMatiere: async (idMatiere) => {
    const [rows] = await pool.query(
      `
      SELECT n.id, n.valeur,
             n.id_eleve, CONCAT(e.nom, ' ', e.prenoms) AS eleve
      FROM note n
      JOIN eleve e ON n.id_eleve = e.id
      WHERE n.id_matiere = ?
      ORDER BY e.nom, e.prenoms
    `,
      [idMatiere],
    );
    return rows;
  },

  // Bulletin d'un élève avec moyenne générale
  getBulletinByEleve: async (idEleve) => {
    const notes = await NoteModel.findByEleve(idEleve);
    let moyenne_generale = null;
    if (notes.length > 0) {
      const somme = notes.reduce((acc, n) => acc + parseFloat(n.valeur), 0);
      moyenne_generale = parseFloat((somme / notes.length).toFixed(2));
    }
    return { notes, moyenne_generale };
  },

  // Créer une note
  create: async (data) => {
    const { valeur, id_eleve, id_matiere } = data;
    const [result] = await pool.query(
      `INSERT INTO note (valeur, id_eleve, id_matiere) VALUES (?, ?, ?)`,
      [valeur, id_eleve, id_matiere],
    );
    return await NoteModel.findById(result.insertId);
  },

  // Mettre à jour une note
  update: async (id, data) => {
    const { valeur } = data;
    await pool.query(`UPDATE note SET valeur = ? WHERE id = ?`, [valeur, id]);
    return await NoteModel.findById(id);
  },

  // Supprimer une note
  delete: async (id) => {
    const note = await NoteModel.findById(id);
    await pool.query(`DELETE FROM note WHERE id = ?`, [id]);
    return note;
  },
};

module.exports = NoteModel;
