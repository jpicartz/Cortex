/**
 * The eyebrow every section wears.
 *
 * This exists because the markup was previously copy-pasted into five places,
 * and predictably drifted: the mechanism heading got an accent rule and wider
 * tracking while `feel`, `fix` and `sources` stayed on the old grey caps. The
 * result was one section that looked current sitting beside three that looked
 * like the previous design — which read, accurately, as those sections being
 * unfinished.
 *
 * Matching the colours by hand would have fixed the symptom and reset the clock.
 * One component is the actual fix.
 */
export function SectionHeading({
  children,
  as: Tag = 'h2',
}: {
  children: React.ReactNode;
  /**
   * `h2` for page sections; `h3` where the section already sits under one.
   *
   * `p` for a KICKER — the eyebrow that labels an `h1` rather than opening a
   * section of its own. The atlas used the default here and so rendered an
   * `h2` above its `h1`, which is a heading-order defect of exactly the kind
   * this project already fixed once. A kicker is not a heading; it just looks
   * like one.
   */
  as?: 'h2' | 'h3' | 'p';
}) {
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden="true" className="h-px w-6 shrink-0 bg-accent" />
      <Tag className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-ink">
        {children}
      </Tag>
    </div>
  );
}
