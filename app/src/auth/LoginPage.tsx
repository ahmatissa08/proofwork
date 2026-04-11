import { LoginForm } from "wasp/client/auth";
import { Link as WaspRouterLink, routes } from "wasp/client/router";
import { AuthPageLayout } from "./AuthPageLayout";
import { useRedirectIfLoggedIn } from "./hooks/useRedirectIfLoggedIn";

export default function Login() {
  useRedirectIfLoggedIn();

  return (
    <AuthPageLayout>
      <div className="mb-8">
        <h1 className="text-slate-900 text-2xl font-bold tracking-tight">Connexion</h1>
        <p className="text-slate-500 text-sm mt-1.5 font-medium">
          Ravi de vous revoir sur ProofWork.
        </p>
      </div>

      <style>{`
        /* Personnalisation du formulaire Wasp pour le mode clair */
        .wasp-auth-form form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .wasp-auth-form label {
          color: #475569 !important; /* slate-600 */
          font-weight: 600 !important;
          font-size: 0.875rem !important;
          margin-bottom: 0.5rem !important;
        }
        .wasp-auth-form input {
          background-color: #f8fafc !important; /* slate-50 */
          border: 1px solid #e2e8f0 !important; /* slate-200 */
          color: #0f172a !important; /* slate-900 */
          border-radius: 12px !important;
          padding: 12px 16px !important;
          font-size: 0.95rem !important;
          transition: all 0.2s ease !important;
        }
        .wasp-auth-form input:focus {
          background-color: #ffffff !important;
          border-color: #4f46e5 !important; /* indigo-600 */
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1) !important;
          outline: none !important;
        }
        .wasp-auth-form button[type="submit"] {
          background-color: #4f46e5 !important; /* indigo-600 */
          color: #ffffff !important;
          font-weight: 600 !important;
          border-radius: 12px !important;
          padding: 12px !important;
          border: none !important;
          cursor: pointer !important;
          font-size: 1rem !important;
          transition: all 0.2s ease !important;
          margin-top: 0.5rem !important;
        }
        .wasp-auth-form button[type="submit"]:hover {
          background-color: #4338ca !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2) !important;
        }
        .wasp-auth-form .social-button {
          background: #ffffff !important;
          border: 1px solid #e2e8f0 !important;
          color: #475569 !important;
          border-radius: 12px !important;
          font-weight: 500 !important;
          transition: all 0.2s !important;
        }
        .wasp-auth-form .social-button:hover {
          background: #f1f5f9 !important;
          border-color: #cbd5e1 !important;
        }
        .wasp-auth-form .divider {
          color: #94a3b8 !important; /* slate-400 */
          font-size: 0.8rem !important;
        }
      `}</style>

      <div className="wasp-auth-form">
        <LoginForm />
      </div>

      <div className="mt-10 flex flex-col gap-4 text-center border-t border-slate-100 pt-6">
        <p className="text-sm text-slate-500 font-medium">
          Pas encore de compte ?{" "}
          <WaspRouterLink 
            to={routes.SignupRoute.to} 
            className="text-indigo-600 hover:text-indigo-700 font-bold transition-colors"
          >
            S'inscrire gratuitement
          </WaspRouterLink>
        </p>
        <WaspRouterLink 
          to={routes.RequestPasswordResetRoute.to} 
          className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
        >
          Mot de passe oublié ?
        </WaspRouterLink>
      </div>
    </AuthPageLayout>
  );
}