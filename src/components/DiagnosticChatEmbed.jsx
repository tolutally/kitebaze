import { useEffect, useRef, useState } from 'react';

const BOTPRESS_INJECT_URL = 'https://cdn.botpress.cloud/webchat/v5.0/inject.js';
const CLIENT_ID = '86f91ef7-25a5-4f1c-81de-a5c65b897846';
const PARKING_ID = 'kb-botpress-parking';

function getBotpressParkingHost() {
  let parkingHost = document.getElementById(PARKING_ID);
  if (parkingHost) return parkingHost;

  parkingHost = document.createElement('div');
  parkingHost.id = PARKING_ID;
  parkingHost.hidden = true;
  document.body.appendChild(parkingHost);
  return parkingHost;
}

function loadBotpress() {
  if (window.botpress) return Promise.resolve();
  if (window.__kitebazeBotpressLoader) return window.__kitebazeBotpressLoader;

  window.__kitebazeBotpressLoader = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${BOTPRESS_INJECT_URL}"]`);
    if (existing) {
      if (existing.dataset.kitebazeLoaded === 'true') {
        if (window.botpress) resolve();
        else reject(new Error('Botpress loaded without creating its browser API.'));
        return;
      }
      existing.addEventListener('load', resolve, { once: true });
      existing.addEventListener('error', reject, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = BOTPRESS_INJECT_URL;
    script.defer = true;
    script.addEventListener('load', () => {
      script.dataset.kitebazeLoaded = 'true';
      resolve();
    }, { once: true });
    script.addEventListener('error', reject, { once: true });
    document.head.appendChild(script);
  });

  return window.__kitebazeBotpressLoader;
}

export default function DiagnosticChatEmbed({ initialMessage, sessionKey }) {
  const frameRef = useRef(null);
  const messageStartedRef = useRef(false);
  const chatReadyRef = useRef(false);
  const [chatStatus, setChatStatus] = useState('loading');

  useEffect(() => {
    let disposed = false;
    let chatObserver;
    let revealRequested = false;
    const unsubscribers = [];
    const storageKey = `kitebaze-diagnostic-${sessionKey}`;
    const sentKey = `${storageKey}-message-sent`;

    const embedChatInFrame = () => {
      const frame = document.querySelector('#kb-botpress-frame');
      const chatContainer = document.querySelector('.bpChatContainer');
      if (!frame || !chatContainer) return false;

      if (chatContainer.parentElement !== frame) frame.appendChild(chatContainer);
      chatContainer.style.position = 'absolute';
      chatContainer.style.inset = '0';
      chatContainer.style.width = '100%';
      chatContainer.style.height = '100%';

      const host = chatContainer.firstElementChild;
      if (host) {
        host.style.display = 'block';
        host.style.position = 'relative';
        host.style.width = '100%';
        host.style.height = '100%';

        if (host.shadowRoot && !host.shadowRoot.querySelector('#kitebaze-embedded-chat')) {
          const style = document.createElement('style');
          style.id = 'kitebaze-embedded-chat';
          style.textContent = `
            .bpWebchat,
            .bpWebchat.bpFABWebchat {
              position: absolute !important;
              inset: 0 !important;
              width: 100% !important;
              height: 100% !important;
              max-width: none !important;
              max-height: none !important;
              transform: translateZ(0);
              overflow: hidden;
            }
            .bpFabContainer,
            .bpFabWrapper {
              display: none !important;
            }
            [aria-label="Close Chatbot Button"] {
              display: none !important;
            }
          `;
          host.shadowRoot.appendChild(style);
        }
      }

      return true;
    };

    const showChat = () => {
      if (disposed) return;
      revealRequested = true;
      if (!embedChatInFrame()) return;
      chatReadyRef.current = true;
      setChatStatus('ready');
    };

    const sendInitialMessage = async () => {
      if (disposed || messageStartedRef.current) return;

      if (!initialMessage) {
        showChat();
        return;
      }

      let messageWasSent = false;
      try {
        messageWasSent = window.sessionStorage.getItem(sentKey) === 'true';
      } catch {
        // Continue without browser storage rather than leaving the chat hidden.
      }

      if (messageWasSent) {
        messageStartedRef.current = true;
        showChat();
        return;
      }

      messageStartedRef.current = true;
      setChatStatus('loading');

      try {
        await window.botpress.sendMessage(initialMessage);
        if (disposed) return;
        try {
          window.sessionStorage.setItem(sentKey, 'true');
        } catch {
          // The conversation still works when browser storage is unavailable.
        }
        showChat();
      } catch {
        if (!disposed) setChatStatus('error');
      }
    };

    const initializeChat = async () => {
      try {
        await loadBotpress();
        if (disposed || !window.botpress) return;

        chatObserver = new MutationObserver(() => {
          const embedded = embedChatInFrame();
          if (embedded && revealRequested && !chatReadyRef.current) {
            chatReadyRef.current = true;
            setChatStatus('ready');
          }
        });
        chatObserver.observe(document.body, { childList: true, subtree: true });

        const initializedUnsubscribe = window.botpress.on('webchat:initialized', () => {
          embedChatInFrame();
          window.botpress.open();
        });
        const readyUnsubscribe = window.botpress.on('webchat:ready', sendInitialMessage);
        const openedUnsubscribe = window.botpress.on('webchat:opened', () => {
          embedChatInFrame();
          sendInitialMessage();
        });
        const errorUnsubscribe = window.botpress.on('error', () => {
          if (!disposed && !chatReadyRef.current) setChatStatus('error');
        });

        if (typeof initializedUnsubscribe === 'function') unsubscribers.push(initializedUnsubscribe);
        if (typeof readyUnsubscribe === 'function') unsubscribers.push(readyUnsubscribe);
        if (typeof openedUnsubscribe === 'function') unsubscribers.push(openedUnsubscribe);
        if (typeof errorUnsubscribe === 'function') unsubscribers.push(errorUnsubscribe);

        if (window.botpress.initialized) {
          embedChatInFrame();
          window.botpress.open();
          if (window.botpress.state === 'opened') await sendInitialMessage();
          return;
        }

        await window.botpress.init({
          clientId: CLIENT_ID,
          storageKey,
          configuration: {
            botName: 'Kitebaze',
            botDescription: "You'll get a real answer, not a sales sequence.",
            composerPlaceholder: 'Describe your most manual task',
            variant: 'soft',
            themeMode: 'light',
            fontFamily: 'inter',
            color: '#a06b4a',
            radius: 2,
            storageLocation: 'sessionStorage',
          },
        });

        if (!disposed && window.botpress.initialized) {
          embedChatInFrame();
          window.botpress.open();
        }
      } catch {
        if (!disposed) setChatStatus('error');
      }
    };

    initializeChat();

    return () => {
      disposed = true;
      chatObserver?.disconnect();
      unsubscribers.forEach((unsubscribe) => unsubscribe());

      const frame = document.querySelector('#kb-botpress-frame');
      const chatContainer = document.querySelector('.bpChatContainer');
      if (frame && chatContainer?.parentElement === frame) {
        getBotpressParkingHost().appendChild(chatContainer);
      }
    };
  }, [initialMessage, sessionKey]);

  return (
    <div
      ref={frameRef}
      className="kb-diagnostic-chat relative h-[680px] w-full overflow-hidden rounded-[22px] border border-kb-line-strong bg-kb-surface kb-card-shadow"
      style={{ height: 'clamp(520px, calc(100svh - 7rem), 720px)', minHeight: '520px' }}
    >
      <div id="kb-botpress-frame" className="absolute inset-0" />

      {chatStatus !== 'ready' && (
        <div className="absolute inset-0 z-10 flex flex-col justify-end gap-5 bg-kb-surface p-5 sm:p-7" aria-live="polite">
          {initialMessage && (
            <div className="ml-auto max-w-[82%] rounded-[1.25rem] rounded-br-md bg-kb-accent px-5 py-4 text-kb-on-accent shadow-sm">
              <p className="font-inter text-sm leading-6 sm:text-base">{initialMessage}</p>
            </div>
          )}

          {chatStatus === 'error' ? (
            <div className="rounded-[1.25rem] border border-kb-line bg-kb-canvas p-5">
              <h3 className="font-space-grotesk text-xl font-medium tracking-[-0.02em] text-kb-ink">Chat is temporarily unavailable</h3>
              <p className="mt-2 font-inter text-sm leading-6 text-kb-ink-soft">Your message is still here. Retry the connection and we’ll send it into a fresh conversation.</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-4 rounded-full bg-kb-accent px-5 py-2.5 font-inter text-sm font-medium text-kb-on-accent transition-opacity hover:opacity-90"
              >
                Retry connection
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 font-inter text-sm text-kb-ink-soft">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-kb-line-strong border-t-kb-accent" />
              <span>{initialMessage ? 'Opening a fresh conversation…' : 'Opening Kitebaze…'}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
