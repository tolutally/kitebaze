import { useEffect, useState } from 'react';
import Board from './Board.jsx';
import { store } from './store/index.js';
import { inputClass, labelClass, primaryButton, secondaryButton } from './components/Dialog.jsx';

function Shell({ children }) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-kb-canvas px-4">
      <div className="w-full max-w-sm rounded-xl border border-kb-line bg-kb-surface p-6 shadow-sm">
        <img src="/kitebaze-icon-black.png" alt="Kitebaze" className="mb-4 h-9 w-9" />
        {children}
      </div>
    </div>
  );
}

// Two steps: send a one-time code to the email, then exchange the code for a session.
function LoginScreen({ onLoggedIn }) {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const run = async (action) => {
    setBusy(true);
    setError('');
    try {
      await action();
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const sendCode = (event) => {
    event.preventDefault();
    run(async () => setUserId(await store.sendLoginCode(email.trim())));
  };

  const verify = (event) => {
    event.preventDefault();
    run(async () => onLoggedIn(await store.verifyLoginCode(userId, code)));
  };

  return (
    <Shell>
      <h1 className="text-lg font-semibold text-kb-ink">Log in to the pipeline</h1>
      {!userId ? (
        <form onSubmit={sendCode} className="mt-4 grid gap-3">
          <div>
            <label className={labelClass} htmlFor="login-email">Work email</label>
            <input id="login-email" type="email" autoComplete="email" required autoFocus className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          <button type="submit" className={primaryButton} disabled={busy}>{busy ? 'Sending…' : 'Email me a login code'}</button>
        </form>
      ) : (
        <form onSubmit={verify} className="mt-4 grid gap-3">
          <p className="text-sm text-kb-ink-soft">We sent a 6-digit code to <span className="font-medium text-kb-ink">{email}</span>. It expires in 15 minutes.</p>
          <div>
            <label className={labelClass} htmlFor="login-code">Login code</label>
            <input id="login-code" inputMode="numeric" autoComplete="one-time-code" required autoFocus className={`${inputClass} tracking-[0.3em]`} value={code} onChange={(e) => setCode(e.target.value)} />
          </div>
          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          <button type="submit" className={primaryButton} disabled={busy}>{busy ? 'Checking…' : 'Log in'}</button>
          <button type="button" className="text-xs text-kb-ink-soft underline" onClick={() => { setUserId(null); setCode(''); setError(''); }}>Use a different email</button>
        </form>
      )}
    </Shell>
  );
}

function NoAccess({ user, onLogout }) {
  return (
    <Shell>
      <h1 className="text-lg font-semibold text-kb-ink">No access yet</h1>
      <p className="mt-2 text-sm text-kb-ink-soft">
        {user.email} is logged in but isn’t a member of the Pipeline team. Ask an admin to add you, then log in again.
      </p>
      <button type="button" className={`${secondaryButton} mt-4 w-full`} onClick={onLogout}>Log out</button>
    </Shell>
  );
}

export default function PipelinePage() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    document.title = 'Pipeline | Kitebaze';
    let cancelled = false;
    store.getUser().then((u) => !cancelled && setUser(u));
    return () => {
      cancelled = true;
    };
  }, []);

  const logout = async () => {
    await store.logout().catch(() => {});
    setUser(null);
  };

  if (user === undefined) return <p className="p-6 text-sm text-kb-ink-soft">Loading…</p>;
  if (!user) return <LoginScreen onLoggedIn={setUser} />;
  if (!user.hasAccess) return <NoAccess user={user} onLogout={logout} />;
  return <Board user={user} onLogout={logout} />;
}
