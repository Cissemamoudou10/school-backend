# 🏫 École Primaire — Backend API

Backend RESTful de gestion d'une école primaire, développé avec **Node.js / Express** et **MySQL**.

---

## 📁 Structure du projet

```
school-backend/
├── src/
│   ├── app.js                    # Point d'entrée
│   ├── config/
│   │   └── db.js                 # Connexion MySQL
│   ├── models/                   # Requêtes SQL
│   │   ├── admin.model.js
│   │   ├── eleve.model.js
│   │   ├── prof.model.js
│   │   ├── classe.model.js
│   │   ├── matiere.model.js
│   │   └── note.model.js
│   ├── controllers/              # Logique métier
│   │   ├── admin.controller.js
│   │   ├── eleve.controller.js
│   │   ├── prof.controller.js
│   │   ├── classe.controller.js
│   │   ├── matiere.controller.js
│   │   └── note.controller.js
│   ├── routes/                   # Définition des routes HTTP
│   │   ├── admin.routes.js
│   │   ├── eleve.routes.js
│   │   ├── prof.routes.js
│   │   ├── classe.routes.js
│   │   ├── matiere.routes.js
│   │   └── note.routes.js
│   └── middlewares/              # Fonctions intermédiaires
│       ├── auth.middleware.js    # Vérification JWT
│       ├── validate.middleware.js# Validation des données
│       └── error.middleware.js   # Gestion des erreurs globales
├── .env.example                  # Modèle de variables d'environnement
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Installation

### 1. Cloner le projet

```bash
git clone https://github.com/<votre-org>/school-backend.git
cd school-backend
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

```bash
cp .env.example .env
# Remplir les valeurs dans .env
```

### 4. Créer la base de données

Exécuter le fichier `database.sql` dans votre client MySQL :

```bash
mysql -u root -p < database.sql
```

### 5. Lancer le serveur

```bash
# Mode développement (avec rechargement automatique)
npm run dev

# Mode production
npm start
```

Le serveur démarre sur `http://localhost:3000`

---

## 🗄️ Schéma de la base de données

| Table     | Champs principaux                                                              |
|-----------|--------------------------------------------------------------------------------|
| `classe`  | id, libelle                                                                    |
| `admin`   | id, nom, prenoms, numero, email, adress, date_creation                         |
| `prof`    | id, nom, prenoms, numero, email, adress, date_creation, id_classe              |
| `eleve`   | id, nom, prenoms, numero_pere, email_pere, adress, date_naissance, lieu_naissance, date_creation, sexe, id_classe |
| `matiere` | id, nom, id_classe                                                             |
| `note`    | id, valeur, id_eleve, id_matiere                                               |

---

## 🔌 Endpoints de l'API

### Classes `/api/classes`
| Méthode | Route            | Description               |
|---------|------------------|---------------------------|
| GET     | `/`              | Toutes les classes        |
| GET     | `/:id`           | Une classe par id         |
| POST    | `/`              | Créer une classe          |
| PUT     | `/:id`           | Modifier une classe       |
| DELETE  | `/:id`           | Supprimer une classe      |

### Matières `/api/matieres`
| Méthode | Route                  | Description                      |
|---------|------------------------|----------------------------------|
| GET     | `/`                    | Toutes les matières              |
| GET     | `/:id`                 | Une matière par id               |
| GET     | `/classe/:idClasse`    | Matières d'une classe            |
| POST    | `/`                    | Créer une matière                |
| PUT     | `/:id`                 | Modifier une matière             |
| DELETE  | `/:id`                 | Supprimer une matière            |

### Admins `/api/admins`
| Méthode | Route  | Description           |
|---------|--------|-----------------------|
| GET     | `/`    | Tous les admins       |
| GET     | `/:id` | Un admin par id       |
| POST    | `/`    | Créer un admin        |
| PUT     | `/:id` | Modifier un admin     |
| DELETE  | `/:id` | Supprimer un admin    |

### Élèves `/api/eleves`
| Méthode | Route                  | Description               |
|---------|------------------------|---------------------------|
| GET     | `/`                    | Tous les élèves           |
| GET     | `/:id`                 | Un élève par id           |
| GET     | `/classe/:idClasse`    | Élèves d'une classe       |
| POST    | `/`                    | Inscrire un élève         |
| PUT     | `/:id`                 | Modifier un élève         |
| DELETE  | `/:id`                 | Supprimer un élève        |

### Professeurs `/api/profs`
| Méthode | Route                  | Description               |
|---------|------------------------|---------------------------|
| GET     | `/`                    | Tous les profs            |
| GET     | `/:id`                 | Un prof par id            |
| GET     | `/classe/:idClasse`    | Profs d'une classe        |
| POST    | `/`                    | Créer un prof             |
| PUT     | `/:id`                 | Modifier un prof          |
| DELETE  | `/:id`                 | Supprimer un prof         |

### Notes `/api/notes`
| Méthode | Route                     | Description                           |
|---------|---------------------------|---------------------------------------|
| GET     | `/`                       | Toutes les notes                      |
| GET     | `/:id`                    | Une note par id                       |
| GET     | `/eleve/:idEleve`         | Notes d'un élève                      |
| GET     | `/matiere/:idMatiere`     | Notes d'une matière                   |
| GET     | `/bulletin/:idEleve`      | Bulletin complet + moyenne générale   |
| POST    | `/`                       | Ajouter une note                      |
| PUT     | `/:id`                    | Modifier une note                     |
| DELETE  | `/:id`                    | Supprimer une note                    |

---

## 📦 Format des réponses

### Succès
```json
{
  "success": true,
  "data": { ... }
}
```

### Erreur
```json
{
  "success": false,
  "message": "Description de l'erreur"
}
```

---

## 🌿 Branches Git

| Branche              | Responsable    | Contenu                           |
|----------------------|----------------|-----------------------------------|
| `main`               | Professeur     | Code de référence final           |
| `develop`            | Chef de projet | Branche d'intégration             |
| `feature/classe-matiere` | Élève 1/2  | Modules Classe & Matière          |
| `feature/admin`      | Élève 3        | Module Admin                      |
| `feature/eleve`      | Élève 4        | Module Élève                      |
| `feature/prof`       | Élève 5        | Module Professeur                 |
| `feature/note`       | Élève 6        | Module Note & Bulletin            |
| `feature/middlewares`| Élève 7        | Auth, Validate, Error middlewares |

---

## 👥 Répartition des tâches

Voir le fichier `GIT_TASKS.md` pour le détail des tâches par élève.

---

## 🛠️ Technologies

- **Runtime** : Node.js
- **Framework** : Express.js
- **Base de données** : MySQL
- **Driver DB** : mysql2
- **Auth** : JSON Web Tokens (jsonwebtoken)
- **Validation** : express-validator
- **Variables d'env** : dotenv
