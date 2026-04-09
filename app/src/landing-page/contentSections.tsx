import daBoiAvatar from "../client/static/da-boi.webp";
import kivo from "../client/static/examples/kivo.webp";
import messync from "../client/static/examples/messync.webp";
import microinfluencerClub from "../client/static/examples/microinfluencers.webp";
import promptpanda from "../client/static/examples/promptpanda.webp";
import reviewradar from "../client/static/examples/reviewradar.webp";
import scribeist from "../client/static/examples/scribeist.webp";
import searchcraft from "../client/static/examples/searchcraft.webp";
import { BlogUrl, DocsUrl } from "../shared/common";
import type { GridFeature } from "./components/FeaturesGrid";

export const features: GridFeature[] = [
  {
    name: "GitHub Integration",
    description: "Commits, PRs et code reviews collectés automatiquement. Ce qui a été construit, quand, et par qui.",
    emoji: "⌥",
    href: DocsUrl,
    size: "small",
  },
  {
    name: "Sync des tâches",
    description: "Connecté à Linear, Notion, Jira. Tâches complétées avec timestamps.",
    emoji: "◈",
    href: DocsUrl,
    size: "small",
  },
  {
    name: "Journal des décisions",
    description: "Synchronisé avec Google Calendar. Ce qui a été décidé, reporté, et les actions prises lors de chaque réunion.",
    emoji: "◎",
    href: DocsUrl,
    size: "medium",
  },
  {
    name: "Résumé IA",
    description: "Claude transforme l'activité brute en un récit clair et professionnel pour votre client.",
    emoji: "🤖",
    href: DocsUrl,
    size: "large",
  },
  {
    name: "Lien de partage client",
    description: "Envoyez une URL. Votre client ouvre un rapport professionnel. Aucune connexion requise de leur côté.",
    emoji: "🔗",
    href: DocsUrl,
    size: "large",
  },
  {
    name: "Envoi automatique",
    description: "Les rapports partent chaque vendredi automatiquement. Vous livrez, on gère le reporting.",
    emoji: "📬",
    href: DocsUrl,
    size: "small",
  },
  {
    name: "Données vérifiables",
    description: "Chaque activité est sourcée et horodatée depuis l'outil réel où le travail s'est passé.",
    emoji: "✅",
    href: DocsUrl,
    size: "small",
  },
  {
    name: "Multi-projets",
    description: "Gérez plusieurs clients et projets depuis un seul dashboard. Vue globale ou par client.",
    emoji: "📁",
    href: DocsUrl,
    size: "medium",
  },
  {
    name: "Branding personnalisé",
    description: "Rapports à votre couleur, votre logo. Vos clients voient votre marque, pas la nôtre.",
    emoji: "🎨",
    href: DocsUrl,
    size: "medium",
  },
];

export const testimonials = [
  {
    name: "Karim B.",
    role: "Développeur freelance",
    avatarSrc: daBoiAvatar,
    socialUrl: "#",
    quote: "Avant je passais 3h le vendredi à écrire mes rapports. Maintenant ça se fait tout seul et mes clients me font plus confiance.",
  },
  {
    name: "Sophie M.",
    role: "Fondatrice @ Agence Web",
    avatarSrc: daBoiAvatar,
    socialUrl: "",
    quote: "Un client a failli ne pas nous renouveler le contrat. On lui a envoyé un rapport ProofWork et il a signé pour 6 mois de plus.",
  },
  {
    name: "Alex T.",
    role: "Consultant IT indépendant",
    avatarSrc: daBoiAvatar,
    socialUrl: "#",
    quote: "J'ai augmenté mes tarifs de 20% en montrant à mes clients exactement ce qu'ils payaient. ProofWork a rendu ça possible.",
  },
];

export const faqs = [
  {
    id: 1,
    question: "Est-ce que mes clients doivent créer un compte ?",
    answer: "Non. Vous leur envoyez un simple lien. Ils ouvrent le rapport dans leur navigateur, sans inscription.",
    href: DocsUrl,
  },
  {
    id: 2,
    question: "Quelles intégrations sont disponibles ?",
    answer: "GitHub, Linear, Notion, Jira et Google Calendar sont disponibles au lancement. D'autres arrivent bientôt.",
    href: DocsUrl,
  },
  {
    id: 3,
    question: "Mes données sont-elles sécurisées ?",
    answer: "Oui. Vos données sont chiffrées et ne sont jamais partagées. Seuls vous et vos clients voient vos rapports.",
    href: DocsUrl,
  },
  {
    id: 4,
    question: "Puis-je essayer gratuitement ?",
    answer: "Oui, le plan Free vous permet de gérer 1 projet et 1 client sans carte bancaire.",
    href: DocsUrl,
  },
];

export const footerNavigation = {
  app: [
    { name: "Documentation", href: DocsUrl },
    { name: "Blog", href: BlogUrl },
  ],
  company: [
    { name: "À propos", href: "#" },
    { name: "Confidentialité", href: "#" },
    { name: "Conditions d'utilisation", href: "#" },
  ],
};

export const examples = [
  {
    name: "Rapport hebdomadaire",
    description: "Un résumé clair de tout ce qui a été fait cette semaine, sourcé depuis GitHub et Linear.",
    imageSrc: kivo,
    href: "#",
  },
  {
    name: "Journal des décisions",
    description: "Toutes les décisions prises en réunion, automatiquement capturées depuis votre calendrier.",
    imageSrc: messync,
    href: "#",
  },
  {
    name: "Rapport de livraison",
    description: "Ce qui a été livré, les bugs corrigés, les features lancées. Preuve à l'appui.",
    imageSrc: microinfluencerClub,
    href: "#",
  },
  {
    name: "Vue multi-projets",
    description: "Dashboard global pour suivre l'activité sur tous vos clients en un coup d'œil.",
    imageSrc: promptpanda,
    href: "#",
  },
  {
    name: "Partage client",
    description: "Un lien propre que votre client ouvre sans créer de compte. Professionnel et simple.",
    imageSrc: reviewradar,
    href: "#",
  },
  {
    name: "Résumé IA",
    description: "Claude transforme vos données brutes en un texte clair et convaincant pour votre client.",
    imageSrc: scribeist,
    href: "#",
  },
  {
    name: "Historique du projet",
    description: "Tout l'historique d'un projet depuis le jour 1. Parfait pour les bilans de fin de mission.",
    imageSrc: searchcraft,
    href: "#",
  },
];