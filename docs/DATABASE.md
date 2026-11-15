# LocalBoost — Schéma de Base de Données & Relations

## 1. Principes et Conventions

- **Moteur** : PostgreSQL 15+ sous Supabase.
- **Identifiants** : Clés primaires `UUID` (`gen_random_uuid()`).
- **Dates & Horodatage** : `timestamptz` avec valeur par défaut `NOW()`. Colonnes `created_at` et `updated_at` sur toutes les tables de données.
- **Règles de rattachement** :
  - Toute table d'organisation contient `organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE`.
  - Toute table d'établissement contient `establishment_id UUID NOT NULL REFERENCES establishments(id) ON DELETE CASCADE` et `organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE`.
- **Politiques RLS** : Activées obligatoirement (`ALTER TABLE ... ENABLE ROW LEVEL SECURITY;`).

---

## 2. Dictionnaire des Tables par Domaine

### A. Comptes, Organisations et Rôles
1. `profiles` : Profil utilisateur étendant `auth.users` (id, email, full_name, avatar_url, phone, is_super_admin).
2. `organizations` : Entreprise cliente (id, name, slug, billing_email, stripe_customer_id, created_at, updated_at).
3. `organization_members` : Rattachement profil <-> organisation avec rôle (id, organization_id, user_id, role, created_at).
4. `establishments` : Point de vente physique (id, organization_id, name, slug, category_id, address, city, postal_code, latitude, longitude, phone, email, website_url, active).
5. `establishment_members` : Affectation spécifique des membres à un établissement (id, establishment_id, user_id, role).
6. `invitations` : Invitations en attente d'acceptation (id, organization_id, establishment_id, email, role, token, expires_at, accepted_at).
7. `roles` & `permissions` : Référentiel des rôles et des autorisations fines RBAC.

### B. Configuration Métier & Secteurs
8. `business_categories` : Référentiel des 10 secteurs d'activité (id, code, name, icon, description, default_modules, settings_schema).
9. `business_profiles` : Profil sectoriel détaillé de l'établissement (id, establishment_id, sector_code, target_audience, average_basket).
10. `business_settings` : Paramètres d'activation des modules par établissement (id, establishment_id, module_key, is_enabled, config_json).
11. `business_products` : Produits référencés (id, establishment_id, name, description, price, category, is_active).
12. `business_services` : Prestations et services proposés (id, establishment_id, name, duration_minutes, price, is_active).
13. `business_hours` : Horaires d'ouverture réguliers et fermetures exceptionnelles (id, establishment_id, day_of_week, open_time, close_time, is_closed).

### C. CRM & Conformité RGPD
14. `customers` : Clients finaux du commerce (id, establishment_id, first_name, last_name, email, phone, birth_date, notes, created_at).
15. `customer_consents` : Traçabilité légale stricte (id, customer_id, consent_type, is_granted, consent_date, source, legal_text_version, ip_hash).
16. `customer_preferences` : Préférences de communication (id, customer_id, allow_email, allow_sms, opt_out_date).
17. `customer_segments` : Définition déterministe des segments (id, establishment_id, name, filter_rules_json).
18. `customer_tags` : Tags manuels ou automatiques appliqués aux clients.

### D. Fidélité Anti-Fraude
19. `loyalty_programs` : Configuration du programme (id, establishment_id, name, accumulation_mode ['spend', 'visit'], points_per_euro, points_per_visit, is_active).
20. `loyalty_rules` : Paliers et conditions d'attribution des points (id, loyalty_program_id, min_points, reward_type, description).
21. `loyalty_rewards` : Catalogue des récompenses disponibles (id, loyalty_program_id, title, cost_points, description, valid_days, is_active).
22. `loyalty_transactions` : Historique immuable des points attribués (id, establishment_id, customer_id, staff_id, amount_cents, points_earned, operation_type, idempotency_token, created_at).
23. `loyalty_redemptions` : Consommation de récompenses (id, establishment_id, customer_id, reward_id, points_spent, staff_id, validated_at).

### E. Gestion des Contenus & Calendrier
24. `content_posts` : Publications marketing (id, establishment_id, campaign_id, title, content, target_platforms, scheduled_for, status, internal_notes).
25. `content_media` : Médias associés aux posts (id, post_id, file_url, media_type, file_size_bytes, aspect_ratio).
26. `content_status_history` : Journal d'audit de cycle de vie (id, post_id, previous_status, new_status, changed_by, reason, created_at).
27. `marketing_campaigns` : Campagnes commerciales multi-secteurs (id, establishment_id, name, template_code, start_date, end_date, segment_id, status).
28. `campaign_templates` : Modèles de campagnes prédéfinis par secteur (id, sector_code, title, default_text, goal, suggested_duration_days).
29. `campaign_recipients` : Destinataires d'une campagne avec statut d'envoi Brevo (id, campaign_id, customer_id, brevo_message_id, delivery_status).
30. `campaign_events` : Événements Brevo enregistrés (id, campaign_id, event_type ['sent', 'delivered', 'opened', 'clicked', 'bounced'], event_time).
31. `weekly_actions` : Actions recommandées par le moteur déterministe (id, establishment_id, rule_code, title, description, reason, priority, status ['suggested', 'accepted', 'dismissed', 'completed'], target_date).
32. `business_rules` : Référentiel des règles déclencheuses du moteur déterministe.

### F. Diagnostic, Avis et Concurrence
33. `marketing_diagnostics` : Historique des diagnostics notés sur 100 (id, establishment_id, overall_score, gbp_score, web_score, social_score, metrics_snapshot, created_at).
34. `diagnostic_criteria` : Grille d'évaluation et pondérations des critères.
35. `competitor_profiles` : Concurrents locaux suivis (id, establishment_id, google_place_id, name, address, latitude, longitude, instagram_handle).
36. `competitor_snapshots` : Relevés périodiques comparatifs (id, competitor_id, google_rating, google_reviews_count, recorded_at).
37. `reviews` : Avis Google rapatriés (id, establishment_id, google_review_id, author_name, rating, comment, review_date, reply_text, reply_date, status).
38. `analytics_events` : Événements analytiques internes (visites, scans, conversions).
39. `monthly_reports` : Rapports de synthèse mensuels archivés (id, establishment_id, period_month, report_data_json, pdf_url).

### G. Intégrations et Background Jobs
40. `integrations` : Connecteurs par établissement (id, establishment_id, provider ['google', 'meta', 'brevo', 'stripe'], is_connected, settings_json).
41. `integration_tokens` : Clés et jetons chiffrés OAuth (id, integration_id, access_token_enc, refresh_token_enc, expires_at).
42. `integration_logs` : Journal d'appels API externes (id, integration_id, endpoint, status_code, error_message, latency_ms).
43. `scheduled_jobs` : File de traitement asynchrone (id, task_type, payload_json, run_at, attempts, status, last_error).
44. `webhook_events` : Journal d'idempotence des réceptions webhooks (id, provider, event_id, payload_hash, processed_at).

### H. Sites Vitrines Locaux
45. `websites` : Sites créés (id, establishment_id, template_id, subdomain, custom_domain, seo_title, meta_description, is_published).
46. `website_templates` : Modèles de design par secteur (id, code, name, preview_image, layout_config).
47. `website_pages` : Pages du site vitrine (id, website_id, slug, title, sections_json).
48. `website_domains` : Statut DNS et SSL des domaines personnalisés.

### I. Facturation & Abonnements
49. `subscription_plans` : Offres LocalBoost (`starter`, `pro`, `business`) avec quotas et modules inclus.
50. `subscriptions` : Abonnements Stripe actifs (id, organization_id, stripe_subscription_id, plan_id, status, current_period_end, cancel_at_period_end).
51. `subscription_entitlements` : Quotas et droits calculés en temps réel.
52. `billing_events` : Historique des événements de facturation.
53. `invoices` : Factures Stripe synchronisées pour consultation.

### J. Administration & Audit
54. `notifications` : Notifications in-app pour les utilisateurs.
55. `audit_logs` : Traçabilité des actions sensibles (utilisateur, action, ressource, IP, timestamp).
56. `feature_flags` : Déploiement progressif de fonctionnalités.
57. `support_tickets` : Gestion des demandes d'assistance.
