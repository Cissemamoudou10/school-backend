-- ============================================
--  SCRIPT SQL MIS À JOUR - ÉCOLE PRIMAIRE
-- ============================================

USE ecole_primaire;

-- 1. Nettoyage (Ordre inversé pour les clés étrangères)
DROP TABLE IF EXISTS note;
DROP TABLE IF EXISTS matiere;
DROP TABLE IF EXISTS eleve;
DROP TABLE IF EXISTS prof;
DROP TABLE IF EXISTS admin;
DROP TABLE IF EXISTS utilisateur;
DROP TABLE IF EXISTS classe;

-- 2. Création de la table classe
CREATE TABLE classe (
  id      INT AUTO_INCREMENT PRIMARY KEY,
  libelle VARCHAR(50) NOT NULL
);

-- 3. Création de la table utilisateur (Admin, Prof, Eleve centralisés)
CREATE TABLE utilisateur (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  nom            VARCHAR(100) NOT NULL,
  prenoms        VARCHAR(150) NOT NULL,
  numeroTel      VARCHAR(20) NOT NULL UNIQUE,
  password       VARCHAR(255) NOT NULL,
  role           ENUM('admin', 'prof', 'eleve') NOT NULL,
  email          VARCHAR(100) UNIQUE,
  adress         VARCHAR(255),
  date_creation  DATETIME DEFAULT NOW(),
  -- Champs spécifiques
  id_classe      INT,
  date_naissance DATE,
  sexe           ENUM('M', 'F'),
  FOREIGN KEY (id_classe) REFERENCES classe(id) ON DELETE SET NULL
);

-- 4. Création de la table matiere
CREATE TABLE matiere (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  nom        VARCHAR(100) NOT NULL,
  id_classe  INT,
  FOREIGN KEY (id_classe) REFERENCES classe(id) ON DELETE SET NULL
);

-- 5. Création de la table note
CREATE TABLE note (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  valeur     DECIMAL(5, 2) NOT NULL CHECK (valeur >= 0 AND valeur <= 20),
  id_eleve   INT NOT NULL,
  id_matiere INT NOT NULL,
  FOREIGN KEY (id_eleve)   REFERENCES utilisateur(id) ON DELETE CASCADE,
  FOREIGN KEY (id_matiere) REFERENCES matiere(id)   ON DELETE CASCADE
);

-- ============================================
--  INSERTION DES DONNÉES DE TEST
-- ============================================

-- Classes
INSERT INTO classe (libelle) VALUES ('CP'), ('CE1'), ('CE2'), ('CM1'), ('CM2');

-- Utilisateurs (Anciens Admins)
INSERT INTO utilisateur (nom, prenoms, email, numeroTel, password, adress, role) VALUES
('Dupont', 'Marie Claire', 'admin@ecole.ci', '+225 07 00 00 00', '123456', 'Abidjan Plateau', 'admin');

-- Utilisateurs (Anciens Profs)
INSERT INTO utilisateur (nom, prenoms, email, numeroTel, password, role, id_classe) VALUES
('Kouassi', 'Jean Paul', 'jkouassi@ecole.ci', '+225 05 11 22 33', '123456', 'prof', 1),
('Bamba', 'Aminata', 'abamba@ecole.ci', '+225 05 44 55 66', '123456', 'prof', 2);

-- Utilisateurs (Anciens Elèves)
-- Note : Les IDs des élèves seront ici 4 et 5 car ils suivent les admins et profs
INSERT INTO utilisateur (nom, prenoms, numeroTel, password, email, date_naissance, sexe, id_classe, role) VALUES
('Koné', 'Ibrahim', '+225 07 99 88 77', '123456', 'pere.kone@gmail.com', '2015-03-12', 'M', 1, 'eleve'),
('Traoré', 'Fatou', '+225 07 11 22 33', '123456', 'pere.traore@gmail.com', '2014-07-25', 'F', 2, 'eleve');

-- Matières
INSERT INTO matiere (nom, id_classe) VALUES
('Mathématiques', 1), ('Français', 1),
('Mathématiques', 2), ('Sciences', 2);

-- Notes (Attention : id_eleve 4 et 5 correspondent aux élèves insérés plus haut)
INSERT INTO note (valeur, id_eleve, id_matiere) VALUES
(15.5, 4, 1), (12.0, 4, 2),
(17.0, 5, 3), (14.5, 5, 4);