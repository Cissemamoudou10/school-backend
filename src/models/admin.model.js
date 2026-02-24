const { pool } = require("../config/db");

const AdminModel = {
  findAll: async () => {
    const [rows] = await pool.query("SELECT * FROM admin ORDER BY date_creation DESC");
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query("SELECT * FROM admin WHERE id = ?", [id]);
    return rows[0] || null;
  },

  findByEmail: async (email) => {
    const [rows] = await pool.query("SELECT * FROM admin WHERE email = ?", [email]);
    return rows[0] || null;
  },

  create: async (data) => {
    const { nom, prenoms, numero, email, adress } = data;
    const [result] = await pool.query(
      "INSERT INTO admin (nom, prenoms, numero, email, adress, date_creation) VALUES (?, ?, ?, ?, ?, NOW())",
      [nom, prenoms, numero, email, adress]
    );
    return { id: result.insertId, ...data };
  },

  update: async (id, data) => {
    const { nom, prenoms, numero, email, adress } = data;
    await pool.query(
      "UPDATE admin SET nom=?, prenoms=?, numero=?, email=?, adress=? WHERE id=?",
      [nom, prenoms, numero, email, adress, id]
    );
    return { id, ...data };
  },

  delete: async (id) => {
    const [result] = await pool.query("DELETE FROM admin WHERE id = ?", [id]);
    return result.affectedRows > 0;
  },
};

module.exports = AdminModel;