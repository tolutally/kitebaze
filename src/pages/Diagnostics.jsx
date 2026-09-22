import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import DiagnosticChatEmbed from '../components/DiagnosticChatEmbed.jsx';

export default function Diagnostics() {
  const [searchParams] = useSearchParams();
  const initialMessage = (searchParams.get('message') || '').trim();
  const requestedSession = (searchParams.get('session') || '').trim();
  const fallbackSessionRef = useRef(
    typeof window.crypto?.randomUUID === 'function'
      ? window.crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
  );
  const sessionKey = requestedSession || fallbackSessionRef.current;
  const hasInitialMessage = Boolean(initialMessage);

  return (
    <div className={`relative overflow-hidden bg-kb-canvas ${hasInitialMessage ? 'pt-24 sm:pt-28' : 'pt-32 sm:pt-40'}`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(circle_at_50%_0%,var(--kb-accent-soft),transparent_68%)] opacity-65" />

      <div className={`relative mx-auto max-w-5xl px-5 sm:px-7 ${hasInitialMessage ? 'pb-12' : 'pb-24'}`}>
        {!hasInitialMessage && <header className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-kb-line-strong bg-kb-surface/80 px-3.5 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-kb-ink-muted shadow-sm backdrop-blur-sm sm:text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-kb-accent" />
            Free workflow diagnostic
          </div>

          <h1 className="mt-7 font-space-grotesk text-[clamp(2.4rem,5.5vw,3.5rem)] font-medium leading-[0.98] tracking-[-0.04em] text-kb-ink">
            Tell us what's <em className="font-normal text-kb-accent-ink">slowing you down.</em>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl font-inter text-base leading-7 text-kb-ink-soft sm:text-lg sm:leading-8">
            Describe the task in your own words. Our assistant will ask a few follow-up questions and tell you what could run without you.
          </p>

        </header>}

        <div id="diagnostic-chat" className={hasInitialMessage ? '' : 'mt-12 sm:mt-16'}>
          <DiagnosticChatEmbed initialMessage={initialMessage} sessionKey={sessionKey} />
        </div>
      </div>
    </div>
  );
}
