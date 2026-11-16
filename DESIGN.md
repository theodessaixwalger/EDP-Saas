---
name: LocalBoost — SaaS premium animé
description: L'espace commerçant au niveau de finition des meilleurs SaaS (Linear, Vercel, Raycast).
colors:
  background: "#EFEFF2"
  card: "#FFFFFF"
  foreground: "#100F14"
  muted-foreground: "#52525B"
  border: "#D6D6DC"
  sidebar: "#E5E5E9"
  primary: "#6D54CF"
  dark-background: "#0C0C0E"
  dark-card: "#121214"
  dark-foreground: "#F3F4F6"
  dark-primary: "#8B71F4"
  dark-border: "#222225"
typography:
  hero:
    fontFamily: "Geist, Inter, system-ui, sans-serif"
    fontSize: "2.375rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  display:
    fontFamily: "Geist, Inter, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.03em"
  metric:
    fontFamily: "Geist, Inter, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.04em"
  card-title:
    fontFamily: "Geist, Inter, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  ui-small:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.25rem
  code:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
  2xl: "16px"
spacing:
  card-x: "20px"
  card-y: "16px"
  section: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.card}"
    rounded: "{rounded.md}"
    height: "32px"
    padding: "0 12px"
  button-outline:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    height: "32px"
  card:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.xl}"
  metric-card:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.xl}"
    padding: "16px 20px"
  nav-item-active:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    height: "32px"
---

# Design System: LocalBoost — SaaS premium animé

## Overview

Le standard des meilleurs SaaS actuels, sans ironie : la précision de **Linear**, la sobriété de **Vercel**, la lumière de **Raycast**. L'utilisateur a demandé ce registre après avoir rejeté un monde métaphorique (le plan de quartier), jugé trop littéral, trop chargé et pas assez moderne. On ne revient donc pas aux métaphores.

Neutres froids et accent violet, **sans aucun dégradé de couleur** (demande explicite de l'utilisateur). Les fonds animés sont monochromes : grille dont des cases s'allument, ondes, orbites, halo gris au survol, faisceau en trait uni. Tout ce qui bouge est une boucle lente et discrète, coupée sous `prefers-reduced-motion`. Les chiffres restent réels : « — » quand la source n'existe pas, et les actions non livrées sont étiquetées par phase.

## Colors

Stratégie « Restrained » : des neutres et un seul accent, toujours en aplat.

### Primary
- **Violet** `#6D54CF` (sombre : `#8B71F4`) : actions principales, état actif, liens, focus.

### Neutral
- Clair : fond `#EFEFF2`, cartes `#FFFFFF`, coque `#E5E5E9`, filet `#D6D6DC`, texte `#100F14`, texte secondaire `#52525B`. Les cartes blanches ressortent nettement du canevas gris.
- Sombre : fond `#0C0C0E`, cartes `#121214`, filet `#222225`, texte `#F3F4F6`, avec un reflet supérieur interne de 4 % sur les surfaces.

### Named Rules
- **La règle de l'aplat** : aucun dégradé de couleur, nulle part (ni fond, ni bordure, ni logo, ni graphique). Seuls les masques de transparence servent à fondre un motif sous le texte.

## Typography

**Geist** pour les titres, les chiffres et l'identité. **Inter** pour le corps et l'interface. **Geist Mono** pour les codes de règle et les raccourcis.

### Hierarchy
- Accueil : Geist 600, 38 px, -0.035em.
- Titre de page : Geist 600, 28 px, -0.03em.
- Chiffre clé : Geist 600, 32 px, -0.04em, chiffres tabulaires.
- Titre de carte : Geist 600, 15 px.
- Corps 14 px · interface 13 px · notes 11 px.

## Layout

Le cadre suit Linear : une **coque** (sidebar et fond), un **canevas** encastré aux coins arrondis (header et contenu défilant), puis les cartes. Le contenu est limité à 76rem, en grilles de 4 indicateurs ou de 2 + 1 colonnes. La vue d'ensemble s'ouvre sur un **accueil** plein largeur, les autres pages sur un en-tête de page en carte.

## Elevation & Depth

Une élévation par surface : la bordure (plus un reflet interne en sombre). Les ombres courtes sont réservées aux contrôles pressables. La vie vient des motifs animés monochromes, pas de la couleur.

### Named Rules
- **La règle d'un seul faisceau** : un seul `BorderBeam` (trait violet uni) par écran, sur l'élément prioritaire (l'action recommandée).
- **Pas de cartes dans des cartes** : à l'intérieur d'une carte, on découpe par des filets ou on utilise des rangées en aplat.

## Shapes

Rayons 6 / 8 / 10 / 14 px ; 16 px pour l'accueil. Les puces et badges sont arrondis en pilule.

## Components

### Buttons
Le bouton principal est violet, avec un reflet supérieur et une ombre courte. Le bouton secondaire est en contour. Les actions non livrées sont désactivées avec leur phase (`PendingAction`).

### Cards / Containers
Bordure fine, rayon 14 px. Les indicateurs sont des **Magic Cards** : la bordure s'éclaire en gris et un halo gris très léger suit le pointeur.

### Navigation
La sidebar est sur la coque, avec des groupes en libellés discrets. L'item actif est surélevé, son icône en violet. En pied, l'état de l'offre en aplat.

### Bascule de thème
Un bouton unique (soleil / lune) dans le header, sans option « Système ». Au premier passage, le thème suit le système ; ensuite le clic décide et le choix est mémorisé. Le nouveau thème se révèle par un **cercle qui part du bouton** et recouvre tout l'écran en 650 ms (View Transitions API). La bascule est instantanée sous `prefers-reduced-motion` ou si le navigateur n'a pas l'API.

### Accueil (composant signature)
Une grille animée dont des cases violettes s'allument en boucle, fondue vers le texte. Il contient la salutation, les actions et la jauge d'installation segmentée : les segments faits se remplissent en violet uni, l'étape suivante pulse.

### États et illustrations
- **États vides** : ondes Ripple concentriques autour de l'icône.
- **Graphiques vides** : grille animée.
- **Connexions** : les intégrations orbitent autour du logo. C'est décoratif ; l'état réel est listé dessous.

## Do's and Don'ts

### Do:
- Garder les effets lents, discrets, et toujours derrière le contenu (`-z-10`, masques de fondu).
- Respecter `prefers-reduced-motion` : toutes les boucles s'arrêtent.
- Afficher « — » et la raison quand une source n'est pas connectée.

### Don't:
- Pas de métaphore visuelle littérale (cartes géographiques, tickets, etc.) : rejetées par l'utilisateur.
- Pas de motifs de fond denses ni de plusieurs faisceaux par écran.
- Pas de sur-titre au-dessus des titres.
- Aucun dégradé de couleur : ni texte, ni fond, ni bordure, ni logo, ni aire de graphique.
