import type { Lang } from '@/content/schema';
import { UI } from '@/lib/ui';
import { CRISIS_RESOURCES } from '@/lib/resources';

/**
 * Shown instead of an AI response when the input suggests someone is in
 * crisis. Intentionally plain: no accent colour, no animation, nothing
 * competing with the phone numbers.
 */
export function CrisisCard({ lang, onBack }: { lang: Lang; onBack?: () => void }) {
  return (
    <div
      role="alert"
      className="rounded-card border-2 border-fg-mute/40 bg-card p-5 sm:p-6"
    >
      <h3 className="font-display text-xl leading-snug tracking-tight text-fg">
        {UI.crisisHeading[lang]}
      </h3>
      <p className="mt-3 text-[1.0625rem] leading-relaxed text-fg-soft">
        {UI.crisisBody[lang]}
      </p>

      <ul className="mt-5 space-y-px overflow-hidden rounded-card border border-edge bg-edge">
        {CRISIS_RESOURCES.map((resource) => (
          <li key={resource.name} className="bg-raised p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-fg-mute">
              {resource.region[lang]}
            </p>
            <a
              href={resource.href}
              target={resource.href.startsWith('http') ? '_blank' : undefined}
              rel={resource.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="mt-1 block font-display text-lg font-semibold text-fg underline decoration-fg-mute/50 underline-offset-4 hover:decoration-fg"
            >
              {resource.contact}
            </a>
            <p className="mt-0.5 text-sm text-fg-soft">{resource.name}</p>
            <p className="mt-1 text-sm leading-relaxed text-fg-mute">{resource.note[lang]}</p>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-sm font-medium leading-relaxed text-fg-soft">
        {UI.crisisEmergency[lang]}
      </p>

      {onBack && (
        <button type="button" onClick={onBack} className="btn-quiet mt-5">
          {UI.crisisBack[lang]}
        </button>
      )}
    </div>
  );
}
