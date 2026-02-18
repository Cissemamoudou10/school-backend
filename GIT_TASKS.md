# 🌿 Répartition des tâches Git — École Primaire Backend

## 🔁 Workflow Git à suivre

```
main ← develop ← feature/xxx
```

1. Chaque élève travaille sur sa propre branche `feature/xxx`
2. Quand une tâche est terminée → **Pull Request** vers `develop`
3. Le professeur valide et fusionne dans `main`

---

## 🛠️ Commandes Git à connaître

```bash
# Cloner le projet
git clone https://github.com/<org>/school-backend.git

# Créer et basculer sur sa branche
git checkout -b feature/ma-branche

# Sauvegarder son travail
git add .
git commit -m "feat: description claire de ce que j'ai fait"

# Envoyer sur GitHub
git push origin feature/ma-branche

# Récupérer les dernières mises à jour de develop
git pull origin develop
```

---

## 👤 ÉLÈVE 1 — Module : Classe & Matière (partie 1)
**Branche :** `feature/classe-matiere`

### Fichiers à modifier
- `src/models/classe.model.js`
- `src/controllers/classe.controller.js`

### Tâches
- [ ] Implémenter `ClasseModel.findAll()`
- [ ] Implémenter `ClasseModel.findById(id)`
- [ ] Implémenter `ClasseModel.create(data)`
- [ ] Implémenter `ClasseModel.update(id, data)`
- [ ] Implémenter `ClasseModel.delete(id)`
- [ ] Implémenter `ClasseController.getAllClasses()`
- [ ] Implémenter `ClasseController.getClasseById()`
- [ ] Implémenter `ClasseController.createClasse()`
- [ ] Implémenter `ClasseController.updateClasse()`
- [ ] Implémenter `ClasseController.deleteClasse()`

### ✅ Critères de validation
- Toutes les routes `/api/classes` répondent correctement
- Un code 404 est retourné si la classe n'existe pas
- Les données sont bien insérées/modifiées/supprimées en base

---

## 👤 ÉLÈVE 2 — Module : Matière (partie 2)
**Branche :** `feature/classe-matiere`  *(même branche qu'Élève 1, travail coordonné)*

### Fichiers à modifier
- `src/models/matiere.model.js`
- `src/controllers/matiere.controller.js`

### Tâches
- [ ] Implémenter `MatiereModel.findAll()`
- [ ] Implémenter `MatiereModel.findById(id)`
- [ ] Implémenter `MatiereModel.findByClasse(idClasse)`
- [ ] Implémenter `MatiereModel.create(data)`
- [ ] Implémenter `MatiereModel.update(id, data)`
- [ ] Implémenter `MatiereModel.delete(id)`
- [ ] Implémenter `MatiereController.getAllMatieres()`
- [ ] Implémenter `MatiereController.getMatiereById()`
- [ ] Implémenter `MatiereController.getMatieresByClasse()`
- [ ] Implémenter `MatiereController.createMatiere()`
- [ ] Implémenter `MatiereController.updateMatiere()`
- [ ] Implémenter `MatiereController.deleteMatiere()`

### ✅ Critères de validation
- La route `/api/matieres/classe/:idClasse` filtre bien par classe
- Un 404 est retourné si la classe n'existe pas

---

## 👤 ÉLÈVE 3 — Module : Admin
**Branche :** `feature/admin`

### Fichiers à modifier
- `src/models/admin.model.js`
- `src/controllers/admin.controller.js`

### Tâches
- [ ] Implémenter `AdminModel.findAll()`
- [ ] Implémenter `AdminModel.findById(id)`
- [ ] Implémenter `AdminModel.findByEmail(email)`
- [ ] Implémenter `AdminModel.create(data)`
- [ ] Implémenter `AdminModel.update(id, data)`
- [ ] Implémenter `AdminModel.delete(id)`
- [ ] Implémenter `AdminController.getAllAdmins()`
- [ ] Implémenter `AdminController.getAdminById()`
- [ ] Implémenter `AdminController.createAdmin()` (vérifier email unique → 409)
- [ ] Implémenter `AdminController.updateAdmin()`
- [ ] Implémenter `AdminController.deleteAdmin()`

### ✅ Critères de validation
- Impossible de créer deux admins avec le même email
- Code 409 si email déjà utilisé

---

## 👤 ÉLÈVE 4 — Module : Élève
**Branche :** `feature/eleve`

### Fichiers à modifier
- `src/models/eleve.model.js`
- `src/controllers/eleve.controller.js`

### Tâches
- [ ] Implémenter `EleveModel.findAll()` (avec JOIN sur classe)
- [ ] Implémenter `EleveModel.findById(id)`
- [ ] Implémenter `EleveModel.findByClasse(idClasse)`
- [ ] Implémenter `EleveModel.create(data)`
- [ ] Implémenter `EleveModel.update(id, data)`
- [ ] Implémenter `EleveModel.delete(id)`
- [ ] Implémenter `EleveController.getAllEleves()`
- [ ] Implémenter `EleveController.getEleveById()`
- [ ] Implémenter `EleveController.getElevesByClasse()`
- [ ] Implémenter `EleveController.createEleve()` (valider sexe = M ou F)
- [ ] Implémenter `EleveController.updateEleve()`
- [ ] Implémenter `EleveController.deleteEleve()`

### ✅ Critères de validation
- Le champ `sexe` accepte uniquement 'M' ou 'F' → 400 sinon
- Le champ `id_classe` est vérifié (la classe doit exister)

---

## 👤 ÉLÈVE 5 — Module : Professeur
**Branche :** `feature/prof`

### Fichiers à modifier
- `src/models/prof.model.js`
- `src/controllers/prof.controller.js`

### Tâches
- [ ] Implémenter `ProfModel.findAll()` (avec JOIN sur classe)
- [ ] Implémenter `ProfModel.findById(id)`
- [ ] Implémenter `ProfModel.findByClasse(idClasse)`
- [ ] Implémenter `ProfModel.findByEmail(email)`
- [ ] Implémenter `ProfModel.create(data)`
- [ ] Implémenter `ProfModel.update(id, data)`
- [ ] Implémenter `ProfModel.delete(id)`
- [ ] Implémenter tous les controllers correspondants
- [ ] Vérifier email unique à la création → 409

### ✅ Critères de validation
- Impossible de créer deux profs avec le même email
- Jointure classe visible dans la réponse

---

## 👤 ÉLÈVE 6 — Module : Note & Bulletin
**Branche :** `feature/note`

### Fichiers à modifier
- `src/models/note.model.js`
- `src/controllers/note.controller.js`

### Tâches
- [ ] Implémenter `NoteModel.findAll()` (double JOIN eleve + matiere)
- [ ] Implémenter `NoteModel.findById(id)`
- [ ] Implémenter `NoteModel.findByEleve(idEleve)`
- [ ] Implémenter `NoteModel.findByMatiere(idMatiere)`
- [ ] Implémenter `NoteModel.getBulletinByEleve(idEleve)` ⭐ (calcul de moyenne)
- [ ] Implémenter `NoteModel.create(data)`
- [ ] Implémenter `NoteModel.update(id, data)`
- [ ] Implémenter `NoteModel.delete(id)`
- [ ] Implémenter tous les controllers correspondants
- [ ] Valider que `valeur` est entre 0 et 20

### ✅ Critères de validation
- La route `/api/notes/bulletin/:idEleve` retourne les notes par matière ET la moyenne générale
- Les valeurs hors de [0, 20] sont refusées avec un code 400

---

## 👤 ÉLÈVE 7 — Middlewares
**Branche :** `feature/middlewares`

### Fichiers à modifier
- `src/middlewares/auth.middleware.js`
- `src/middlewares/validate.middleware.js`
- `src/middlewares/error.middleware.js`

### Tâches
- [ ] Implémenter `verifyToken` dans `auth.middleware.js`
  - Extraire le token depuis le header Authorization
  - Vérifier avec `jwt.verify()`
  - Attacher `req.user` avec le payload
- [ ] Implémenter `validate` dans `validate.middleware.js`
  - Lire les erreurs de `express-validator`
  - Retourner 422 si erreurs présentes
- [ ] Implémenter `errorHandler` dans `error.middleware.js`
  - Logger l'erreur
  - Répondre avec le bon status code et message
- [ ] **Bonus** : Brancher `verifyToken` sur les routes POST/PUT/DELETE des autres modules (décommenter les lignes commentées dans les routes)

### ✅ Critères de validation
- Une requête sans token sur une route protégée retourne 401
- Un token expiré ou invalide retourne 401
- Les erreurs non gérées retournent 500 avec un message clair

---

## 📋 Tableau récapitulatif

| Élève  | Branche                  | Module              | Fichiers                                 |
|--------|--------------------------|---------------------|------------------------------------------|
| Élève 1 | `feature/classe-matiere` | Classe              | classe.model.js, classe.controller.js    |
| Élève 2 | `feature/classe-matiere` | Matière             | matiere.model.js, matiere.controller.js  |
| Élève 3 | `feature/admin`          | Admin               | admin.model.js, admin.controller.js      |
| Élève 4 | `feature/eleve`          | Élève               | eleve.model.js, eleve.controller.js      |
| Élève 5 | `feature/prof`           | Professeur          | prof.model.js, prof.controller.js        |
| Élève 6 | `feature/note`           | Note & Bulletin     | note.model.js, note.controller.js        |
| Élève 7 | `feature/middlewares`    | Auth & Sécurité     | auth/validate/error middleware           |
