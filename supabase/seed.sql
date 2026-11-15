-- ==============================================================================
-- LOCALBOOST — Données Initiales (Seed)
-- 10 Secteurs d'activité de commerces de proximité
-- ==============================================================================

INSERT INTO public.business_categories (code, name, icon, description, default_modules, settings_schema)
VALUES
  (
    'restaurants',
    'Restaurants & Restauration rapide',
    'Utensils',
    'Établissements de restauration assise, traiteurs, snacks et restauration rapide.',
    ARRAY['content', 'calendar', 'loyalty', 'marketing_actions', 'campaigns', 'reviews', 'diagnostics'],
    '{
      "unit_label": "Table / Couvert",
      "currency_accumulation": "spend",
      "suggested_reward_cost": 100,
      "weather_sensitive": true,
      "lunch_dinner_split": true
    }'::JSONB
  ),
  (
    'cafes_bars',
    'Cafés & Bars',
    'Coffee',
    'Cafés, bistrots, salons de thé, bars à cocktails et brasseries.',
    ARRAY['content', 'calendar', 'loyalty', 'campaigns', 'reviews'],
    '{
      "unit_label": "Consommation",
      "currency_accumulation": "visit",
      "suggested_reward_cost": 10,
      "happy_hour_enabled": true
    }'::JSONB
  ),
  (
    'boulangeries',
    'Boulangeries & Pâtisseries',
    'Croissant',
    'Artisans boulangers, pâtissiers, chocolatiers et glaciers.',
    ARRAY['loyalty', 'content', 'marketing_actions', 'campaigns', 'reviews'],
    '{
      "unit_label": "Passage en boutique",
      "currency_accumulation": "visit",
      "suggested_reward_cost": 10,
      "morning_rush_enabled": true
    }'::JSONB
  ),
  (
    'coiffeurs_barbiers',
    'Coiffeurs & Barbiers',
    'Scissors',
    'Salons de coiffure masculine, féminine, mixte et barbiers traditionnels.',
    ARRAY['loyalty', 'campaigns', 'marketing_actions', 'reviews', 'diagnostics'],
    '{
      "unit_label": "Prestation",
      "currency_accumulation": "spend",
      "retention_cycle_days": 35,
      "requires_appointment": true
    }'::JSONB
  ),
  (
    'instituts_beaute',
    'Instituts de Beauté & Salons de bien-être',
    'Sparkles',
    'Instituts de beauté, ongleries, spas, centres de bien-être et de massage.',
    ARRAY['loyalty', 'campaigns', 'marketing_actions', 'reviews', 'diagnostics'],
    '{
      "unit_label": "Soin / Cure",
      "currency_accumulation": "spend",
      "retention_cycle_days": 45,
      "gift_cards_enabled": true
    }'::JSONB
  ),
  (
    'salles_sport',
    'Salles de Sport & Studios sportifs',
    'Dumbbell',
    'Clubs de remise en forme, studios de yoga, pilates, crossfit et arts martiaux.',
    ARRAY['campaigns', 'loyalty', 'marketing_actions', 'reviews', 'diagnostics'],
    '{
      "unit_label": "Séance / Abonnement",
      "currency_accumulation": "visit",
      "inactivity_threshold_days": 21,
      "trial_sessions_enabled": true
    }'::JSONB
  ),
  (
    'boutiques_mode',
    'Boutiques de Vêtements & Mode',
    'Shirt',
    'Boutiques de prêt-à-porter, maroquinerie, chaussures et accessoires.',
    ARRAY['content', 'calendar', 'loyalty', 'campaigns', 'marketing_actions', 'reviews'],
    '{
      "unit_label": "Article / Panier",
      "currency_accumulation": "spend",
      "vip_tiers_enabled": true,
      "seasonal_sales_enabled": true
    }'::JSONB
  ),
  (
    'commerces_alimentaires',
    'Commerces Alimentaires & Épiceries',
    'ShoppingBag',
    'Épiceries fines, primeurs, boucheries, charcuteries, poissonneries et cavistes.',
    ARRAY['loyalty', 'content', 'marketing_actions', 'campaigns', 'reviews'],
    '{
      "unit_label": "Panier",
      "currency_accumulation": "spend",
      "fresh_arrivals_enabled": true
    }'::JSONB
  ),
  (
    'fleuristes',
    'Fleuristes & Jardineries de proximité',
    'Flower',
    'Artisans fleuristes, créations florales, plantes et décoration végétale.',
    ARRAY['content', 'calendar', 'loyalty', 'campaigns', 'marketing_actions', 'reviews'],
    '{
      "unit_label": "Composition",
      "currency_accumulation": "spend",
      "calendar_events_priority": true
    }'::JSONB
  ),
  (
    'services_proximite',
    'Commerces & Services de proximité',
    'Wrench',
    'Cordonneries, cordonniers, retouches, pressings, réparateurs informatiques/téléphones.',
    ARRAY['loyalty', 'reviews', 'diagnostics', 'campaigns'],
    '{
      "unit_label": "Réparation / Service",
      "currency_accumulation": "spend",
      "tracking_sms_ready": true
    }'::JSONB
  )
ON CONFLICT (code) DO NOTHING;
