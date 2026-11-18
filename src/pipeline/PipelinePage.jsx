import { useEffect, useState } from 'react';
import Board from './Board.jsx';
import { store } from './store/index.js';
import { inputClass, labelClass, primaryButton } from './components/Dialog.jsx';

function LoginScreen({ onLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      onLoggedIn(await store.login(email, password));
    } catch (err) {
      setError(err.message || 'Could not log in.');
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-kb-canvas px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-xl border border-kb-line bg-kb-surface p-6 shadow-sm">
        <img src="/kitebaze-icon-black.png" alt="Kitebaze" className="mb-4 h-9 w-9" />
        <h1 className="text-lg font-semibold text-kb-ink">Log in to the pipeline</h1>
        <div className="mt-4 grid gap-3">
          <div>
            <label className={labelClass} htmlFor="login-email">Email</label>
            <input id="login-email" type="email" autoComplete="email" required className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className={labelClass} htmlFor="login-password">Password</label>
            <input id="login-password" type="password" autoComplete="current-password" required className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          <button type="submit" className={primaryButton} disabled={busy}>{busy ? 'Logging in…' : 'Log in'}</button>
        </div>
      </form>
    </div>
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

  if (user === undefined) return <p className="p-6 text-sm text-kb-ink-soft">Loading…</p>;
  if (!user) return <LoginScreen onLoggedIn={setUser} />;
  return (
    <Board
      user={user}
      onLogout={async () => {
        await store.logout().catch(() => {});
        setUser(null);
      }}
    />
  );
}
