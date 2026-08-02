'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useTransition } from 'react';

/**
 * A <Link> that runs the navigation inside a View Transition, so the card's
 * icon morphs into the detail header.
 *
 * Why not Next's `experimental.viewTransition` flag: it switches the app onto
 * React's experimental runtime. That is too much stability risk to take for one
 * animation, so this does the same job with stable APIs only.
 *
 * The mechanism: `document.startViewTransition` holds the "before" snapshot
 * until the callback's promise resolves. App Router navigation is async, so we
 * resolve when React's transition finishes — with a timeout so a slow or failed
 * navigation can never leave the page frozen under a stale snapshot.
 */
const TRANSITION_TIMEOUT_MS = 800;

type Props = React.ComponentProps<typeof Link>;

export function TransitionLink({ href, onClick, ...rest }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const resolveRef = useRef<(() => void) | null>(null);

  // Release the snapshot once the navigation's React transition settles.
  useEffect(() => {
    if (!isPending && resolveRef.current) {
      resolveRef.current();
      resolveRef.current = null;
    }
  }, [isPending]);

  // Never leave a pending resolver dangling if this unmounts mid-navigation.
  useEffect(() => {
    return () => {
      resolveRef.current?.();
      resolveRef.current = null;
    };
  }, []);

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;

    // Let the browser handle new-tab / new-window / middle clicks normally.
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    // No support, or the user asked for less motion: plain navigation.
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!document.startViewTransition || prefersReducedMotion) return;

    event.preventDefault();

    document.startViewTransition(
      () =>
        new Promise<void>((resolve) => {
          let settled = false;
          const done = () => {
            if (settled) return;
            settled = true;
            resolve();
          };

          resolveRef.current = done;
          setTimeout(done, TRANSITION_TIMEOUT_MS);
          startTransition(() => router.push(String(href)));
        }),
    );
  }

  return <Link href={href} onClick={handleClick} {...rest} />;
}
