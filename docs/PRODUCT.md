# LocalBoost — Vision Produit & Spécifications Fonctionnelles

## 1. Vision et Proposition de Valeur

LocalBoost est une plateforme SaaS B2B destinée aux commerces et services de proximité (restaurants, boulangeries, coiffeurs, instituts, boutiques, salles de sport, etc.).

**Proposition de valeur** :
> « Votre marketing local, centralisé et piloté depuis une seule application. »

L'outil se positionne comme un **copilote marketing opérationnel**, structurant les actions du commerçant selon un cycle vertueux en 5 étapes :
1. **Organiser** : Calendrier éditorial, bibliothèque de contenus, cohérence multicanale.
2. **Attirer** : Diagnostic visibilité, optimisation Google/Meta, campagnes ciblées, site vitrine localisé.
3. **Convertir** : Offres promotionnelles déterministes, incitations événementielles, programmes saisonniers.
4. **Fidéliser** : Programme de fidélité QR Code sans friction, récompenses personnalisées, relances automatiques non intrusives.
5. **Mesurer** : Tableau de bord unifié, analyse de la fréquentation, suivi des avis clients et surveillance concurrentielle locale.

---

## 2. Secteurs d'Activité et Modularité

LocalBoost n'est pas une solution générique ni un outil vertical exclusif à un métier. Le système s'articule autour d'un **socle commun multi-tenant** enrichi de **profils sectoriels configurables** :

| Secteur d'Activité | Types d'Unités / Offres | Modules Clés Activés par Défaut |
| :--- | :--- | :--- |
| **Restaurants & Fast-Food** | Menus, formules midi, plats du jour, happy hours | Fidélité visites/montant, Avis Google, Météo-actions |
| **Cafés & Bars** | Cartes boissons, événements, soirées à thème | Calendrier social, Fidélité passages, Avis |
| **Boulangeries & Pâtisseries** | Spécialités artisanales, créneaux du matin, packs | Fidélité tampon/points, Diagnostic géolocalisé |
| **Coiffeurs & Barbiers** | Prestations (coupe, coloration, barbe), forfaits | Relance 30/60 jours, Avis clients, Campagnes SMS/Email |
| **Instituts de Beauté & Salons** | Soins visage/corps, cures, cartes cadeaux | Relances régulières, Offres anniversaire, Fidélité |
| **Salles de Sport & Studios** | Abonnements, séances d'essai, cours collectifs | Relance inactivité, Campagnes de rentrée / résolutions |
| **Boutiques Vêtements & Mode** | Collections saisonnières, soldes, ventes privées | Campagnes VIP, Fidélité par tranches d'achat |
| **Commerces Alimentaires** | Produits de saison, arrivages frais, paniers | Notifications arrivages, Fidélité panier moyen |
| **Fleuristes** | Compositions, événements (fête des mères, St Valentin) | Recommandations calendaires déterministes, Avis |
| **Services de Proximité** | Devis, réparations, services personnalisés | Réputation locale Google, Diagnostic site web |

Chaque établissement peut activer ou désactiver des modules de manière indépendante.

---

## 3. Matrice des 12 Modules Fonctionnels

### Module 1 — Gestion des contenus
- Centralisation des créations de publications (textes rédigés, images, vidéos, tags, dates de publication prévues).
- Statuts stricts : `Brouillon` → `À valider` → `Validé` → `Programmé` → `Publié` / `Échec`.
- Traçabilité et historique complet des changements d'état.

### Module 2 — Calendrier éditorial
- Vues FullCalendar : Mois, Semaine, Jour, Liste.
- Glisser-déposer synchronisé avec la base de données.
- Filtres dynamiques par réseau social (Instagram, Facebook, Google Business) et par campagne.

### Module 3 — Fidélité QR Code Anti-Fraude
- Double mode de cumul paramétrable : cumul au montant dépensé (1€ = 1 pt) ou à la visite (1 passage = X pts).
- **Interface Client Mobile (Web App PWA)** : pas de téléchargement requis, consultation solde, QR code dynamique, consentements RGPD.
- **Interface Employé** : scan ultra-rapide (< 3 secondes), saisie montant, validation sécurisée par jeton à usage unique.
- **Sécurité Anti-fraude** : aucun crédit direct par simple scan d'un QR code public; validation obligatoire par un employé authentifié.

### Module 4 — Plan d'actions marketing déterministe
- Moteur d'inférence basé sur des règles explicites (conditions météo Open-Meteo, vacances scolaires, baisse de fréquentation, jours creux).
- Suggestions concrètes : Titre, justification mathématique/factuelle, niveau de difficulté, date conseillée, action en 1 clic.
- **Aucune IA générative** : règles métier extensibles et auditables.

### Module 5 — Campagnes et offres commerciales
- Modèles préconfigurés : Bienvenue, Anniversaire, Réactivation, Offre saisonnière, Offre flash.
- Moteur de segmentation déterministe : Nouveaux, Actifs, Réguliers, Inactifs (> 30j sans transaction), Proches d'une récompense.

### Module 6 — Relances automatiques
- Détection des clients inactifs avec seuils paramétrables par secteur.
- Envoi d'emails transactionnels et marketing via Brevo API.
- Gestion stricte des consentements, historique des opt-in et liste d'opposition persistante.

### Module 7 — Diagnostic marketing (Score sur 100)
- Évaluation déterministe :
  - Google Business Profile (complétude, horaires, photos, note, taux de réponse aux avis).
  - Site internet (API Google PageSpeed Insights : performance, mobile, SEO technique, accessibilité).
  - Présence sociale (rythme des publications, régularité).
- Recommandations correctives immédiates avec justification chiffrée.

### Module 8 — Tableau de bord analytique & Rapports
- Suivi de la fidélisation : clients uniques, nouveaux clients, taux de récurrence, points distribués, récompenses échangées.
- Performance des campagnes : emails délivrés, taux de clics, codes promotionnels utilisés en caisse.
- Export mensuel consolidé en PDF prêt pour le commerçant.

### Module 9 — Comparaison concurrentielle locale
- Ajout de concurrents locaux géographiques via Google Places API officielle.
- Comparaison des notes moyennes, volume d'avis et dynamique temporelle.
- Zéro scraping non officiel.

### Module 10 — Publications et intégrations sociales
- Connexion OAuth 2.0 officielle : Meta Graph API (Instagram/Facebook), Google Business Profile API.
- Programmation avec file d'attente résiliente, relance exponentielle en cas d'erreur transitoire.
- Mode de repli (export manuel avec notification) en cas d'indisponibilité API.

### Module 11 — Avis clients et e-réputation
- Centralisation des avis Google reçus avec priorisation intelligente (alertes 1 et 2 étoiles, avis non répondus).
- Bibliothèque de réponses types paramétrables par tonalité et secteur.
- Réponse officielle postée via Google Business Profile API.

### Module 12 — Créateur de sites vitrines locaux
- Générateur de sites vitrines ultra-rapides optimisés SEO local (Schema.org LocalBusiness, sitemap, meta tags, balises OpenGraph).
- Modèles sectoriels responsives personnalisables (horaires, coordonnées, carte, prestations).
- Hébergement sur sous-domaine `[commerce].localboost.app` ou domaine personnalisé.
