/** Lien d'évitement : invisible tant qu'il n'a pas le focus clavier (RGAA 12.7 / WCAG 2.4.1). */
export function SkipLink({ href = "#contenu" }: { href?: string }) {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:shadow-raised focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      Aller au contenu principal
    </a>
  );
}
