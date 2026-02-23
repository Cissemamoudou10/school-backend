const { pool } = require("../config/db");

const EleveModel = {
  findAll: async () => {
    const query = `
      SELECT e.*, c.libelle AS classe_nom 
      FROM eleve e 
      LEFT JOIN classe c ON e.id_classe = c.id 
      ORDER BY e.nom ASC`;
    const [rows] = await pool.execute(query);
    return rows;
  },

  findById: async (id) => {
    const query = `
      SELECT e.*, c.libelle AS classe_nom 
      FROM eleve e 
      LEFT JOIN classe c ON e.id_classe = c.id 
      WHERE e.id = ?`;
    const [rows] = await pool.execute(query, [id]);
    return rows[0] || null;
  },

  findByClasse: async (idClasse) => {
    const query = "SELECT * FROM eleve WHERE id_classe = ? ORDER BY nom ASC";
    const [rows] = await pool.execute(query, [idClasse]);
    return rows;
  },

  create: async (data) => {
    const { 
      nom, prenoms, numero_pere, email_pere, adress, 
      date_naissance, lieu_naissance, sexe, id_classe 
    } = data;

    const query = `
      INSERT INTO eleve 
      (nom, prenoms, numero_pere, email_pere, adress, date_naissance, lieu_naissance, sexe, id_classe, date_creation) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`;
    
    const [result] = await pool.execute(query, [
      nom, prenoms, numero_pere, email_pere, adress, 
      date_naissance, lieu_naissance, sexe, id_classe
    ]);

    return { id: result.insertId, ...data };
  },

  update: async (id, data) => {
    // Construction dynamique de la requête pour ne mettre à jour que ce qui est envoyé
    const fields = Object.keys(data);
    const values = Object.values(data);
    
    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const query = `UPDATE eleve SET ${setClause} WHERE id = ?`;
    
    await pool.execute(query, [...values, id]);
    return { id, ...data };
  },

  delete: async (id) => {
    const query = "DELETE FROM eleve WHERE id = ?";
    const [result] = await pool.execute(query, [id]);
    return result.affectedRows > 0;
  },
};

module.exports = EleveModel;