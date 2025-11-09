# Epi Music

# Documentation Utilisateur -  E-commerce Epi Music

## Table des matières

1. [Introduction](#introduction)
2. [Prérequis](#prérequis)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Utilisation](#utilisation)
6. [Fonctionnalités](#fonctionnalités)
7. [Dépannage](#dépannage)

---

## Introduction

Ce projet à été réalisé comme projet de fin de première année à la web@cadémie. Le but était de réaliser une plateforme e-commerce du thème de notre choix.

Pour la réalisation, nous avons utiliser la méthode agile par sprints de 3 jours avec au bout des trois jours, une soutenance client ou une soutenance Product Owner.

Cette plateforme e-commerce est une solution complète pour la vente en ligne d'instruments de musique, de vinyles et de goodies, développée avec React et Tailwind CSS pour le frontend, et Symfony pour le backend.

### Technologies utilisées

- **Frontend** : React 18+, Tailwind CSS
- **Backend** : Symfony 6+
- **Base de données** : MySQL/PostgreSQL
- **API** : RESTful API

---

## Prérequis

Avant d'installer la plateforme, assurez-vous d'avoir :

### Pour le Backend (Symfony)
- PHP 8.1 ou supérieur
- Composer
- MySQL 5.7+ ou PostgreSQL 12+
- Extensions PHP : pdo, pdo_mysql, intl, ctype, iconv, json

### Pour le Frontend (React)
- Node.js 16+ et npm/yarn
- Navigateur moderne (Chrome, Firefox, Safari, Edge)

---

## Installation

### 1. Installation du Backend

```bash
# Cloner le repository
git clone git@github.com:Emilie20000/epi-music.git
cd backend

# Installer les dépendances
composer install

# Créer le fichier .env.local
cp .env .env.local

# Créer la base de données
php bin/console doctrine:database:create

# Exécuter les migrations
php bin/console doctrine:migrations:migrate

# Charger les données de test (optionnel)
php bin/console doctrine:fixtures:load

# Démarrer le serveur
symfony server:start
```

### 2. Installation du Frontend

```bash
# Aller dans le dossier frontend
cd frontend

# Installer les dépendances
npm install
# ou
yarn install

# Démarrer le serveur de développement
npm run dev
# ou
yarn dev
```

---

## Configuration

### Configuration Backend

Éditez le fichier `.env.local` :

```env
# Base de données
DATABASE_URL="mysql://user:password@127.0.0.1:3306/ecommerce"

# CORS
CORS_ALLOW_ORIGIN='^https?://(localhost|127\.0\.0\.1)(:[0-9]+)?$'

# Mailer
MAILER_DSN=smtp://localhost:1025
```
---

## Utilisation

### Accès à l'application

- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:8000/api
- **Admin Symfony** : http://localhost:8000/admin

### Comptes par défaut

Après le chargement des fixtures :

**Administrateur**
- Email : admin@example.com
- Mot de passe : admin123

**Client**
- Email : user@example.com
- Mot de passe : user123

---

## Fonctionnalités

### Pour les visiteurs

#### Navigation et recherche
- Parcourir le catalogue de produits
- Filtrer par catégorie, prix, marque
- Rechercher des produits
- Voir les détails d'un produit
- Consulter les avis clients

#### Panier
- Ajouter des produits au panier
- Modifier les quantités
- Supprimer des articles
- Voir le total et les frais de livraison

### Pour les clients connectés

#### Gestion du compte
- Créer un compte
- Se connecter / Se déconnecter
- Modifier ses informations personnelles
- Changer son mot de passe
- Gérer les adresses de livraison

#### Commandes
- Passer une commande
- Choisir l'adresse de livraison
- Sélectionner le mode de paiement
- Suivre l'état des commandes
- Consulter l'historique des commandes
- Télécharger les factures


### Pour les administrateurs

#### Gestion des produits
- Créer, modifier, supprimer des produits
- Gérer les catégories
- Gérer les stocks
- Importer des produits en masse
- Gérer les images produits

#### Gestion des commandes
- Consulter toutes les commandes
- Modifier le statut des commandes
- Gérer les retours et remboursements
- Générer des rapports de ventes

#### Gestion des clients
- Consulter la liste des clients
- Voir les détails des comptes

#### Gestion du contenu
- Gérer les bannières promotionnelles
- Configurer les modes de livraison
- Gérer les méthodes de paiement

#### Statistiques et rapports
- Tableau de bord des ventes
- Produits les plus vendus


---

## Guide d'utilisation détaillé

### Passer une commande

1. **Parcourir les produits**
    - Utilisez la barre de recherche ou naviguez par catégories
    - Cliquez sur un produit pour voir ses détails

2. **Ajouter au panier**
    - Sélectionnez la quantité souhaitée
    - Choisissez les options (taille, couleur, etc.)
    - Cliquez sur "Ajouter au panier"

3. **Valider le panier**
    - Cliquez sur l'icône panier en haut à droite
    - Vérifiez les articles et quantités
    - Cliquez sur "Passer la commande"

4. **Connexion ou inscription**
    - Connectez-vous si vous avez déjà un compte
    - Ou créez un nouveau compte

5. **Adresse de livraison**
    - Sélectionnez une adresse existante
    - Ou ajoutez une nouvelle adresse

6. **Mode de livraison**
    - Choisissez parmi les options disponibles
    - Comparez les délais et tarifs

7. **Paiement**
    - Sélectionnez votre mode de paiement
    - Entrez les informations nécessaires
    - Confirmez la commande

8. **Confirmation**
    - Vous recevrez un email de confirmation
    - Accédez à votre espace client pour suivre la commande

### Gérer son compte

#### Modifier ses informations
1. Connectez-vous à votre compte
2. Accédez à "Mon profil"
3. Modifiez les champs souhaités
4. Enregistrez les modifications

#### Ajouter une adresse
1. Allez dans "Mes adresses"
2. Cliquez sur "Ajouter une adresse"
3. Remplissez le formulaire
4. Définissez comme adresse par défaut (optionnel)
5. Enregistrez

### Suivre une commande

1. Connectez-vous à votre compte
2. Accédez à "Mes commandes"
3. Cliquez sur la commande à consulter
4. Consultez le statut et le suivi de livraison

### Administration - Ajouter un produit

1. Connectez-vous à l'interface d'administration
2. Accédez à "Produits" > "Ajouter un produit"
3. Remplissez les informations :
    - Nom du produit
    - Description
    - Prix
    - Catégorie
    - Stock disponible
4. Ajoutez des images
5. Définissez les options (tailles, couleurs)
6. Publiez le produit

---

## Dépannage

### Problèmes courants

#### Le frontend ne se connecte pas au backend

**Solution** :
- Vérifiez que le backend est démarré
- Vérifiez l'URL de l'API dans `.env`
- Vérifiez la configuration CORS dans Symfony


#### Les images ne s'affichent pas

**Solution** :
- Vérifiez les permissions du dossier `public/uploads`
- Vérifiez la configuration de `nelmio_cors_bundle`

#### Erreur de base de données

**Solution** :
```bash
# Réinitialisez la base de données
php bin/console doctrine:database:drop --force
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
```

### Logs et debugging

#### Backend (Symfony)
```bash
# Logs d'erreur
tail -f var/log/dev.log

# Mode debug
APP_ENV=dev php bin/console cache:clear
```

#### Frontend (React)
- Ouvrez la console du navigateur (F12)
- Vérifiez l'onglet "Network" pour les requêtes API
- Utilisez React DevTools pour inspecter les composants

---

## API Documentation

### Endpoints principaux


#### Authentification
- `POST /api/register` - Inscription
- `POST /api/login` - Connexion
- `POST /api/logout` - Déconnexion

#### Utilisateurs
- `GET /api/users` - Liste des utilisateurs

#### Adresses
- `GET /api/user/{userId}/addresses` - Liste des adresses d'un utilisateur
- `POST /api/user/{userId}/addresses` - Créer une adresse
- `GET /api/user/{userId}/addresses/{id}` - Détails d'une adresse
- `PUT /api/user/{userId}/addresses/{id}` - Modifier une adresse
- `DELETE /api/user/{userId}/addresses/{id}` - Supprimer une adresse
- `PATCH /api/user/{userId}/addresses/{id}/set-primary` - Définir comme adresse principale

#### Produits
- `GET /api/products` - Liste des produits
- `GET /api/products/{id}` - Détails d'un produit
- `GET /api/products/category/{categoryId}` - Produits par catégorie

#### Produits (Admin)
- `GET /api/admin/products` - Liste des produits (admin)
- `POST /api/admin/products` - Créer un produit
- `GET /api/admin/products/{id}` - Détails d'un produit (admin)
- `PUT /api/admin/products/{id}` - Modifier un produit
- `DELETE /api/admin/products/{id}` - Supprimer un produit
- `POST /api/admin/products/replenish` - Réapprovisionner des produits
- `POST /api/admin/addModel` - Ajouter un nouveau modèle de produit
- `GET /api/admin/model/{id}` - Détails d'un modèle
- `PUT /api/admin/model/{id}` - Modifier un modèle

#### Panier
- `GET /api/cart/` - Voir le panier
- `POST /api/cart/add/{productId}` - Ajouter un produit au panier
- `PATCH /api/cart/item/{itemId}` - Modifier la quantité d'un article
- `DELETE /api/cart/item/delete/{itemId}` - Retirer un article du panier
- `PATCH /api/cart/item/gift/{itemId}` - Marquer un article comme cadeau
- `DELETE /api/cart/` - Vider le panier
- `GET /api/cart/items/count` - Nombre d'articles dans le panier

#### Commandes
- `POST /api/order/` - Créer une commande
- `GET /api/order/{orderId}` - Détails d'une commande
- `POST /api/order/{orderId}/address` - Enregistrer l'adresse de commande
- `PATCH /api/order/validate/{orderId}` - Valider une commande
- `GET /api/order/{userId}/orders` - Liste des commandes d'un utilisateur
- `GET /api/order/{orderId}/details` - Détails complets d'une commande

#### Commandes (Admin)
- `GET /api/admin/orders/track-all` - Suivre toutes les commandes
- `GET /api/admin/replenish-orders` - Commandes de réapprovisionnement

#### Catégories (Admin)
- `GET /api/admin/categories` - Liste des catégories
- `POST /api/admin/categories` - Créer une catégorie
- `GET /api/admin/categories/{id}` - Détails d'une catégorie
- `PUT /api/admin/categories/{id}` - Modifier une catégorie
- `DELETE /api/admin/categories/{id}` - Supprimer une catégorie
- `GET /api/admin/get/catergoryId` - Obtenir l'ID d'une catégorie par nom

#### Couleurs et Tailles (Admin)
- `GET /api/admin/colors` - Liste des couleurs disponibles
- `GET /api/admin/sizes` - Liste des tailles disponibles
- `GET /api/admin/sizes/category/{id}` - Tailles par catégorie

#### Avis produits
- `POST /api/product/add/review` - Ajouter un avis
- `PATCH /api/review/update/{id}` - Modifier un avis
- `DELETE /api/review/delete/{id}` - Supprimer un avis

#### Paiement
- `POST /api/payment/create-intent` - Créer une intention de paiement (Stripe)

#### Livraison
- `GET /api/shipping/cost` - Calculer les frais de livraison

#### Promotions
- `GET /promotion/{id}` - Détails d'une promotion
- `POST /promotion` - Créer une promotion

#### Fournisseurs (Admin)
- `GET /api/providers` - Liste des fournisseurs
- `GET /api/provider/{id}` - Détails d'un fournisseur
- `POST /api/provider` - Créer un fournisseur
- `DELETE /api/provider/{id}` - Supprimer un fournisseur
- `GET /api/provider/{id}/products` - Produits d'un fournisseur

#### Musicoins (Système de fidélité)
- `GET /api/musicoin/` - Informations sur les musicoins
- `GET /api/musicoin/user/{id}` - Musicoins d'un utilisateur
- `PATCH /api/musicoin/update-date/user/{id}` - Mettre à jour la date des musicoins
- `POST /api/musicoin/add` - Ajouter des musicoins
- `POST /api/musicoin/deduct` - Déduire des musicoins

#### Utilitaires
- `POST /upload` - Upload de fichier
- `POST /rename-upload` - Renommer un fichier uploadé
- `GET /api/doc.json` - Documentation Swagger de l'API
- `GET /api/random-track` - Piste aléatoire (musique)

---

## Maintenance

### Sauvegardes

#### Base de données
```bash
# Backup
mysqldump -u user -p ecommerce > backup.sql

# Restauration
mysql -u user -p ecommerce < backup.sql
```

#### Fichiers
```bash
# Backup des uploads
tar -czf uploads_backup.tar.gz public/uploads/
```

### Mise à jour

#### Backend
```bash
composer update
php bin/console doctrine:migrations:migrate
php bin/console cache:clear
```

#### Frontend
```bash
npm update
npm run build
```


### Ressources

- **Documentation Symfony** : https://symfony.com/doc
- **Documentation React** : https://react.dev
- **Documentation Tailwind CSS** : https://tailwindcss.com/docs

---

**Version** : 1.0.0  
**Dernière mise à jour** : Septembre 2024