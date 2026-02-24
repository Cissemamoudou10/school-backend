// ============================================
//  MODÈLE : CLASSE
//  Fichier : src/models/classe.model.js
//  Table   : classe(id, libelle)
// ============================================

const { pool } = require("../config/db");

const ClasseModel = {

  findAll: async () => {
    const [rows] = await pool.query(`SELECT * FROM classe ORDER BY id`);
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query(`SELECT * FROM classe WHERE id = ?`, [id]);
    return rows[0] ?? null;
  },

  create: async (data) => {
    const { libelle } = data;
    const [result] = await pool.query(
      `INSERT INTO classe (libelle) VALUES (?)`,
      [libelle]
    );
    return await ClasseModel.findById(result.insertId);
  },

  update: async (id, data) => {
    const { libelle } = data;
    await pool.query(
      `UPDATE classe SET libelle = ? WHERE id = ?`,
      [libelle, id]
    );
    return await ClasseModel.findById(id);
  },

  delete: async (id) => {
    const classe = await ClasseModel.findById(id);
    await pool.query(`DELETE FROM classe WHERE id = ?`, [id]);
    return classe;
  },
};

module.exports = ClasseModel;