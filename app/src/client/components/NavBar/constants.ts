import { routes } from "wasp/client/router";
import { BlogUrl, DocsUrl } from "../../../shared/common";
import type { NavigationItem } from "./NavBar";

const staticNavigationItems: NavigationItem[] = [
  { name: "Documentation", to: DocsUrl },
  { name: "Blog", to: BlogUrl },
];

export const marketingNavigationItems: NavigationItem[] = [
  { name: "Fonctionnalités", to: "/#features" },
  { name: "Tarifs", to: routes.PricingPageRoute.to },
  ...staticNavigationItems,
] as const;

export const demoNavigationitems: NavigationItem[] = [
  { name: "Mes projets", to: routes.ProofWorkRoute.to },
  ...staticNavigationItems,
] as const;