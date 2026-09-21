import { AlertCircle, ArrowRight, KeyRound, X } from "lucide-react";
import { useState } from "react";
import { isSupabaseConfigured, signInWithPassword } from "../lib/supabase";

export function AuthPanel({ onClose, onAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await signInWithPassword(email, password);
      setLoading(false);
      onAuthenticated(data.session);
    } catch {
      setLoading(false);
      setError("E-mail ou senha inválidos.");
    }
  };

  return (
    <div
      className="auth-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-title"
    >
      <div className="auth-panel">
        <button
          className="auth-close"
          onClick={onClose}
          aria-label="Fechar login"
        >
          <X size={20} />
        </button>
        <div className="auth-icon">
          <KeyRound size={19} />
        </div>
        <p className="admin-kicker">Área restrita</p>
        <h2 id="auth-title">
          Entrar no <em>admin</em>
        </h2>
        <p className="auth-description">
          Acesse o painel para gerenciar as fotos e informações do catálogo.
        </p>
        {!isSupabaseConfigured ? (
          <div className="auth-setup-message">
            <AlertCircle size={18} />
            <p>
              Configure `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` (ou
              `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`)
              no arquivo `.env` para ativar o login.
            </p>
          </div>
        ) : (
          <form className="auth-form" onSubmit={signIn}>
            <label>
              E-mail
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@marca.com"
                autoComplete="email"
                required
              />
            </label>
            <label>
              Senha
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Sua senha"
                autoComplete="current-password"
                required
              />
            </label>
            {error && (
              <p className="auth-error" role="alert">
                {error}
              </p>
            )}
            <button
              className="admin-primary-button auth-submit"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                "Entrando..."
              ) : (
                <>
                  Entrar <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
