-- ============================================
--  SCRIPT SQL - ÉCOLE PRIMAIRE
--  Fichier : database.sql
--  Description : Création de la base de données
--                et de toutes les tables
-- ============================================

CREATE DATABASE IF NOT EXISTS ecole_primaire
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE ecole_primaire;

-- ── Table : classe ──────────────────────────
CREATE TABLE IF NOT EXISTS classe (
  id      INT AUTO_INCREMENT PRIMARY KEY,
  libelle VARCHAR(50) NOT NULL
);

-- ── Table : admin ───────────────────────────
CREATE TABLE IF NOT EXISTS admin (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  nom            VARCHAR(100) NOT NULL,
  prenoms        VARCHAR(150) NOT NULL,
  numero         VARCHAR(20),
  email          VARCHAR(100) NOT NULL UNIQUE,
  adress         VARCHAR(255),
  date_creation  DATETIME DEFAULT NOW()
);

-- ── Table : prof ────────────────────────────
CREATE TABLE IF NOT EXISTS prof (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  nom            VARCHAR(100) NOT NULL,
  prenoms        VARCHAR(150) NOT NULL,
  numero         VARCHAR(20),
  email          VARCHAR(100) NOT NULL UNIQUE,
  adress         VARCHAR(255),
  date_creation  DATETIME DEFAULT NOW(),
  id_classe      INT,
  FOREIGN KEY (id_classe) REFERENCES classe(id) ON DELETE SET NULL
);

-- ── Table : eleve ───────────────────────────
CREATE TABLE IF NOT EXISTS eleve (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  nom             VARCHAR(100) NOT NULL,
  prenoms         VARCHAR(150) NOT NULL,
  numero_pere     VARCHAR(20),
  email_pere      VARCHAR(100),
  adress          VARCHAR(255),
  date_naissance  DATE NOT NULL,
  lieu_naissance  VARCHAR(150),
  date_creation   DATETIME DEFAULT NOW(),
  sexe            ENUM('M', 'F') NOT NULL,
  id_classe       INT,
  FOREIGN KEY (id_classe) REFERENCES classe(id) ON DELETE SET NULL
);

-- ── Table : matiere ─────────────────────────
CREATE TABLE IF NOT EXISTS matiere (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  nom       VARCHAR(100) NOT NULL,
  id_classe INT,
  FOREIGN KEY (id_classe) REFERENCES classe(id) ON DELETE SET NULL
);

-- ── Table : note ────────────────────────────
CREATE TABLE IF NOT EXISTS note (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  valeur     DECIMAL(5, 2) NOT NULL CHECK (valeur >= 0 AND valeur <= 20),
  id_eleve   INT NOT NULL,
  id_matiere INT NOT NULL,
  FOREIGN KEY (id_eleve)   REFERENCES eleve(id)   ON DELETE CASCADE,
  FOREIGN KEY (id_matiere) REFERENCES matiere(id)  ON DELETE CASCADE
);

-- ============================================
--  DONNÉES DE TEST (optionnel)
-- ============================================

INSERT INTO classe (libelle) VALUES
  ('CP'), ('CE1'), ('CE2'), ('CM1'), ('CM2');

INSERT INTO admin (nom, prenoms, email, numero, adress) VALUES
  ('Dupont', 'Marie Claire', 'admin@ecole.ci', '+225 07 00 00 00', 'Abidjan Plateau');

INSERT INTO prof (nom, prenoms, email, numero, id_classe) VALUES
  ('Kouassi', 'Jean Paul', 'jkouassi@ecole.ci', '+225 05 11 22 33', 1),
  ('Bamba', 'Aminata', 'abamba@ecole.ci',   '+225 05 44 55 66', 2);

INSERT INTO eleve (nom, prenoms, numero_pere, email_pere, date_naissance, lieu_naissance, sexe, id_classe) VALUES
  ('Koné', 'Ibrahim', '+225 07 99 88 77', 'pere.kone@gmail.com', '2015-03-12', 'Abidjan', 'M', 1),
  ('Traoré', 'Fatou',  '+225 07 11 22 33', 'pere.traore@gmail.com', '2014-07-25', 'Bouaké', 'F', 2);

INSERT INTO matiere (nom, id_classe) VALUES
  ('Mathématiques', 1), ('Français', 1),
  ('Mathématiques', 2), ('Sciences', 2);

INSERT INTO note (valeur, id_eleve, id_matiere) VALUES
  (15.5, 1, 1), (12.0, 1, 2),
  (17.0, 2, 3), (14.5, 2, 4);
