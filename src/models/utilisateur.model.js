const { pool } = require("../config/db");
const bcrypt = require("bcryptjs");

const UtilisateurModel = {
  findAll: async (role) => {
    let sql = "SELECT * FROM utilisateur";
    const params = [];
    if (role) {
      sql += " WHERE role = ?";
      params.push(role);
    }
    const [rows] = await pool.query(sql, params);
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query("SELECT * FROM utilisateur WHERE id = ?", [
      id,
    ]);
    return rows[0] || null;
  },

  findByEmail: async (email) => {
    const [rows] = await pool.query(
      "SELECT * FROM utilisateur WHERE email = ?",
      [email],
    );
    return rows[0] || null;
  },

  findByTel: async (numeroTel) => {
    const [rows] = await pool.query(
      "SELECT * FROM utilisateur WHERE numeroTel = ?",
      [numeroTel],
    );
    return rows[0] || null;
  },

  create: async (data) => {
    const {
      nom,
      prenoms,
      numeroTel,
      password,
      role,
      email,
      adress,
      id_classe,
      date_naissance,
      sexe,
    } = data;

    const hashed = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      `INSERT INTO utilisateur
       (nom, prenoms, numeroTel, password, role, email, adress, id_classe, date_naissance, sexe, date_creation)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        nom,
        prenoms,
        numeroTel,
        hashed,
        role,
        email || null,
        adress || null,
        id_classe || null,
        date_naissance || null,
        sexe || null,
      ],
    );
    return await UtilisateurModel.findById(result.insertId);
  },

  update: async (id, data) => {
    const fields = [];
    const values = [];

    for (const [key, value] of Object.entries(data)) {
      if (key === "password") {
        fields.push("password = ?");
        values.push(await bcrypt.hash(value, 10));
      } else {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }

    if (fields.length === 0) return { id, ...data };

    const sql = `UPDATE utilisateur SET ${fields.join(", ")} WHERE id = ?`;
    await pool.query(sql, [...values, id]);
    return await UtilisateurModel.findById(id);
  },

  delete: async (id) => {
    const [result] = await pool.query("DELETE FROM utilisateur WHERE id = ?", [
      id,
    ]);
    return result.affectedRows > 0;
  },
};

module.exports = UtilisateurModel;
