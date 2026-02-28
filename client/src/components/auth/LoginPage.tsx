import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { login, clearError } from '../../features/authSlice';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = await dispatch(login({ username, password }));
    if (login.fulfilled.match(result)) {
      navigate('/');
    }
  }

  return (
    <div className="min-h-screen bg-bg-root flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-heading font-bold text-center mb-8">
          <span style={{ color: 'var(--accent)' }}>Code</span>Forge
        </h1>

        <form onSubmit={handleSubmit} className="bg-bg-surface border border-border rounded-lg p-6">
          <h2 className="text-lg font-heading font-semibold mb-4 text-text-primary">Sign In</h2>

          {error && (
            <div className="mb-4 p-3 bg-error/10 border border-error/30 rounded text-error text-sm">
              {error}
              <button
                type="button"
                onClick={() => dispatch(clearError())}
                className="ml-2 text-error/70 hover:text-error"
              >
                Dismiss
              </button>
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="username" className="block text-sm text-text-secondary mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 bg-bg-raised border border-border-strong rounded text-text-primary focus:border-accent focus:outline-none"
              autoFocus
              autoComplete="username"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm text-text-secondary mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-bg-raised border border-border-strong rounded text-text-primary focus:border-accent focus:outline-none"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !username || !password}
            className="w-full py-2 bg-accent hover:bg-accent-hover text-white font-semibold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
