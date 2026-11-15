import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  QrCode,
  CalendarDays,
  Target,
  Megaphone,
  Activity,
  Star,
  CheckCircle2,
  Clock,
  Layers,
  HeartHandshake,
  TrendingUp,
  Eye,
  ShieldCheck,
  ChevronRight,
  HelpCircle,
  Store,
  Utensils,
  Scissors,
  Croissant,
  ShoppingBag,
  Dumbbell,
  Flower2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage() {
  const problems = [
    {
      icon: Clock,
      title: "Manque de temps chronique",
      desc: "Entre le service, la gestion des stocks et l'accueil des clients, le marketing passe toujours au second plan.",
    },
    {
      icon: Layers,
      title: "Trop d'outils dispersés",
      desc: "Un outil pour vos avis, un autre pour vos emails, Meta Business Suite complexe... Rien n'est synchronisé.",
    },
    {
      icon: HeartHandshake,
      title: "Clients volatils difficiles à fidéliser",
      desc: "Les cartes de fidélité papier sont perdues ou oubliées, et vous n'avez aucun moyen de relancer un client inactif.",
    },
    {
      icon: Eye,
      title: "Visibilité locale insuffisante",
      desc: "Des fiches Google incomplètes, des réseaux sociaux désertés et une concurrence agressive dans votre quartier.",
    },
    {
      icon: TrendingUp,
      title: "Impossible de mesurer l'impact",
      desc: "Vous dépensez du temps et parfois de l'argent sans savoir quelle action génère réellement du passage en caisse.",
    },
  ];

  const modules = [
    {
      icon: CalendarDays,
      badge: "Module 1 & 2",
      title: "Contenus & Calendrier Marketing",
      desc: "Centralisez vos publications, planifiez vos visuels et organisez vos temps forts sur un calendrier éditorial simple.",
    },
    {
      icon: QrCode,
      badge: "Module 3",
      title: "Fidélité QR Code Anti-Fraude",
      desc: "Un programme moderne utilisable en 3 secondes par smartphone, sans application à installer, sécurisé contre la fraude.",
    },
    {
      icon: Target,
      badge: "Module 4",
      title: "Plan d'Actions Déterministe",
      desc: "Un copilote logique qui croise météo, calendrier scolaire et fréquentation pour vous suggérer l'action rentable au bon moment.",
    },
    {
      icon: Megaphone,
      badge: "Module 5 & 6",
      title: "Campagnes & Relances Automatiques",
      desc: "Activez vos clients inactifs et offrez des avantages ciblés avec des emails conformes au RGPD envoyés via Brevo.",
    },
    {
      icon: Activity,
      badge: "Module 7 & 8",
      title: "Diagnostic Local & Analytics Réels",
      desc: "Évaluez votre présence sur 100 points réels et suivez votre retour sur investissement sans chiffres inventés.",
    },
    {
      icon: Star,
      badge: "Module 9 & 11",
      title: "E-Réputation & Surveillance Concurrence",
      desc: "Surveillez vos avis Google, répondez avec des modèles éprouvés et comparez votre dynamique à vos concurrents locaux.",
    },
  ];

  const sectors = [
    { name: "Restaurants & Snacks", icon: Utensils, tag: "Plats du jour & Météo" },
    { name: "Cafés & Bars", icon: Store, tag: "Happy hours & Événements" },
    { name: "Boulangeries & Pâtisseries", icon: Croissant, tag: "Fidélité passage rapide" },
    { name: "Coiffeurs & Barbiers", icon: Scissors, tag: "Relance à 35 jours" },
    { name: "Instituts & Salons de bien-être", icon: Sparkles, tag: "Cures & Anniversaires" },
    { name: "Salles de sport & Studios", icon: Dumbbell, tag: "Abonnements & Séances" },
    { name: "Boutiques de mode", icon: ShoppingBag, tag: "Soldes & Offres VIP" },
    { name: "Commerces alimentaires", icon: Store, tag: "Arrivages & Fraîcheur" },
    { name: "Fleuristes de proximité", icon: Flower2, tag: "Événements calendaires" },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "49€",
      period: "/mois par établissement",
      desc: "Idéal pour structurer ses publications et lancer un premier programme de fidélité moderne.",
      features: [
        "1 établissement inclus",
        "Gestion des publications & médias",
        "Calendrier éditorial interactif",
        "Programme de fidélité QR Code",
        "Interface scan employé illimitée",
        "Statistiques de fréquentation basiques",
        "Support par email",
      ],
      highlighted: false,
      cta: "Commencer avec Starter",
      href: "/register?plan=starter",
    },
    {
      name: "Pro",
      price: "89€",
      period: "/mois par établissement",
      desc: "Pour les commerces qui souhaitent fidéliser activement et optimiser leur réputation locale.",
      features: [
        "Tout ce qui est dans Starter, plus :",
        "Moteur de plan d'actions déterministe",
        "Campagnes commerciales ciblées",
        "Relances automatiques clients inactifs",
        "Diagnostic de présence noté sur 100",
        "Gestion des avis Google & réponses types",
        "Intégration Brevo (emails transactionnels)",
        "Support prioritaire sous 24h",
      ],
      highlighted: true,
      badge: "Le plus choisi",
      cta: "Essai gratuit 14 jours",
      href: "/register?plan=pro",
    },
    {
      name: "Business",
      price: "159€",
      period: "/mois",
      desc: "Conçu pour les commerces multi-établissements, franchises et groupes régionaux.",
      features: [
        "Jusqu'à 3 établissements inclus (puis +39€/est)",
        "Gestion multi-établissements centralisée",
        "Attribution fine des rôles (Managers & Employés)",
        "Surveillance comparative des concurrents",
        "Rapports mensuels PDF consolidés",
        "Module Site Vitrine optimisé SEO local",
        "Accompagnement d'onboarding dédié",
      ],
      highlighted: false,
      cta: "Choisir l'offre Business",
      href: "/register?plan=business",
    },
  ];

  const faqs = [
    {
      q: "Mes clients doivent-ils télécharger une application mobile ?",
      a: "Non. LocalBoost fonctionne via une Progressive Web App accessible par simple scan d'un QR code sur smartphone. Le client accède instantanément à son solde et à ses récompenses sans rien installer sur son téléphone.",
    },
    {
      q: "Comment est protégée l'attribution des points contre la fraude ?",
      a: "Un client ne peut jamais s'auto-attribuer de points. L'opération nécessite la validation par un membre authentifié de votre personnel via un jeton sécurisé à usage unique généré lors du scan en caisse.",
    },
    {
      q: "LocalBoost utilise-t-il de l'intelligence artificielle pour inventer des textes ?",
      a: "Non, absolument aucune IA générative ni chatbot n'est utilisé dans l'application. Nos moteurs de recommandation et de relance reposent sur des règles mathématiques strictes, des données concrètes (météo, vacances scolaires, fréquence d'achat) et des modèles professionnels rédigés manuellement.",
    },
    {
      q: "Est-ce conforme au RGPD pour mes envois d'emails ?",
      a: "Totalement. Nous séparons strictement le compte de fidélité du consentement marketing. Seuls les clients ayant explicitement donné leur accord reçoivent vos campagnes, et chaque email intègre un lien de désinscription immédiat.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-surface-bg pt-16 pb-20 md:pt-24 md:pb-32 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50/80 px-3.5 py-1 text-xs font-semibold text-brand-700 shadow-sm mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Copilote marketing opérationnel pour commerces locaux</span>
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-[1.15]">
            Développez votre commerce.{" "}
            <span className="text-brand-600 block sm:inline">Simplifiez votre marketing.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
            Toutes vos actions marketing, vos clients et vos performances réunis dans une seule
            plateforme. Sans compétences techniques et sans perte de temps.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto gap-2 text-base px-8 shadow-md">
                Essayer gratuitement 14 jours
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#demonstration">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-6">
                Voir l&apos;application en action
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Sans engagement
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Conformité RGPD garantie
            </span>
            <span className="flex items-center gap-1.5">
              <Store className="h-4 w-4 text-emerald-600" />
              Multi-secteurs
            </span>
          </div>
        </div>
      </section>

      {/* 2. PROBLÈME */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-3">
              Le Constat
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Gérer le marketing de son commerce ne devrait pas être un second métier
            </h2>
            <p className="mt-4 text-slate-600">
              Chaque semaine, les commerçants de proximité font face aux mêmes difficultés pour
              attirer et conserver leurs clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {problems.map((prob, i) => {
              const Icon = prob.icon;
              return (
                <Card key={i} className="border-slate-200 shadow-none hover:border-slate-300 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600 mb-4">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-slate-900 text-sm mb-2">{prob.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{prob.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. LE CYCLE MARKETING & MODULES */}
      <section id="modules" className="py-20 bg-surface-bg border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="default" className="mb-3">
              Solution Intégrée
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Votre cycle marketing maîtrisé de bout en bout
            </h2>
            <p className="mt-4 text-slate-600">
              LocalBoost accompagne votre point de vente à chaque étape :{" "}
              <strong className="text-slate-900 font-medium">
                Organiser → Attirer → Convertir → Fidéliser → Mesurer.
              </strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((mod, i) => {
              const Icon = mod.icon;
              return (
                <Card key={i} className="border-slate-200 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                        <Icon className="h-6 w-6" />
                      </div>
                      <Badge variant="secondary" className="text-[11px]">
                        {mod.badge}
                      </Badge>
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 mb-2">{mod.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{mod.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. SECTEURS D'ACTIVITÉ */}
      <section id="secteurs" className="py-20 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-3">
              Adaptabilité Métier
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Conçu pour votre secteur, configuré en quelques clics
            </h2>
            <p className="mt-4 text-slate-600">
              Un restaurant n&apos;a pas les mêmes besoins qu&apos;un barbier ou une salle de sport.
              LocalBoost adapte automatiquement ses règles et ses modèles à votre activité.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sectors.map((sec, i) => {
              const Icon = sec.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 hover:border-brand-200 hover:bg-brand-50/30 transition-all"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">{sec.name}</h4>
                    <span className="text-xs text-brand-600 font-medium">{sec.tag}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. DÉMONSTRATION INTERACTIVE / PREVIEW */}
      <section id="demonstration" className="py-20 bg-surface-bg border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="default" className="mb-3">
              Interface Intuitive
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              L&apos;expérience d&apos;un logiciel conçu pour les professionnels
            </h2>
            <p className="mt-4 text-slate-600">
              Un design sobre et efficace inspiré des meilleurs standards SaaS (Linear, Stripe).
              Zéro superflu, zéro bouton décoratif.
            </p>
          </div>

          {/* Interactive UI Mockup Container */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-3 text-xs font-medium text-slate-400">
                  app.localboost.fr/dashboard — Boulangerie & Pâtisserie du Marché
                </span>
              </div>
              <Badge variant="success" className="text-xs">
                Commerce Connecté
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                <p className="text-xs text-slate-500 font-medium">Clients fidélisés</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">482</p>
                <p className="text-xs text-emerald-600 font-medium mt-1">+14% ce mois-ci</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                <p className="text-xs text-slate-500 font-medium">Points distribués</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">5 840</p>
                <p className="text-xs text-slate-500 mt-1">112 récompenses utilisées</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                <p className="text-xs text-slate-500 font-medium">Note Google Moyenne</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">4.8 / 5</p>
                <p className="text-xs text-emerald-600 font-medium mt-1">98% de réponses aux avis</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                <p className="text-xs text-slate-500 font-medium">Diagnostic de présence</p>
                <p className="text-2xl font-bold text-brand-600 mt-1">84 / 100</p>
                <p className="text-xs text-slate-500 mt-1">Niveau d&apos;optimisation élevé</p>
              </div>
            </div>

            {/* Simulated Action Card */}
            <div className="rounded-xl border border-brand-200/60 bg-brand-50/40 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600 text-white shrink-0">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">
                    Action Déterministe Suggérée : Relance de rentrée
                  </h4>
                  <p className="text-xs text-slate-600">
                    Détecté : 42 clients réguliers n&apos;ont pas scanné leur QR code depuis 30 jours.
                  </p>
                </div>
              </div>
              <Link href="/register">
                <Button size="sm" className="whitespace-nowrap shadow-sm">
                  Lancer la relance par email
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TARIFICATION */}
      <section id="tarifs" className="py-20 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-3">
              Tarification Transparente
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Des tarifs clairs, adaptés à la taille de votre commerce
            </h2>
            <p className="mt-4 text-slate-600">
              Tous nos forfaits incluent 14 jours d&apos;essai gratuit sans engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, i) => (
              <Card
                key={i}
                className={`relative flex flex-col justify-between ${
                  plan.highlighted
                    ? "border-brand-600 shadow-lg ring-1 ring-brand-600"
                    : "border-slate-200 shadow-sm"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="default" className="shadow-sm">
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                <CardContent className="pt-8">
                  <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 min-h-[36px]">{plan.desc}</p>

                  <div className="mt-6 flex items-baseline">
                    <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                    <span className="text-xs text-slate-500 ml-2">{plan.period}</span>
                  </div>

                  <div className="mt-6 border-t border-slate-100 pt-6">
                    <p className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">
                      Fonctionnalités incluses :
                    </p>
                    <ul className="space-y-3">
                      {plan.features.map((feat, fi) => (
                        <li key={fi} className="flex items-start gap-2.5 text-xs text-slate-600">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>

                <div className="p-6 pt-0">
                  <Link href={plan.href} className="w-full block">
                    <Button
                      variant={plan.highlighted ? "default" : "outline"}
                      className="w-full"
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section id="faq" className="py-20 bg-surface-bg border-b border-slate-200/80">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-3">
              Questions Fréquentes
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Tout ce que vous devez savoir avant de commencer
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm mb-2">{faq.q}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA FINAL */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-2xl bg-brand-600 p-8 sm:p-12 text-white shadow-xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Prêt à reprendre le contrôle de votre marketing local ?
            </h2>
            <p className="mt-4 text-brand-100 max-w-2xl mx-auto text-sm sm:text-base">
              Rejoignez les commerçants indépendants qui gagnent du temps et fidélisent leur clientèle
              au quotidien.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="bg-white text-brand-700 hover:bg-slate-100 shadow-md">
                  Créer un compte commerçant
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
            <p className="text-xs text-brand-200 mt-4">
              Essai gratuit de 14 jours — Pas de carte bancaire requise
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
