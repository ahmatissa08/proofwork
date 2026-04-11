import { SignupForm } from "wasp/client/auth";
import { Link as WaspRouterLink, routes } from "wasp/client/router";
import { AuthPageLayout } from "./AuthPageLayout";
import { useRedirectIfLoggedIn } from "./hooks/useRedirectIfLoggedIn";

export function Signup() {
  useRedirectIfLoggedIn();
  return (
    <AuthPageLayout>
      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold">Créer un compte</h1>
        <p className="text-gray-500 text-sm mt-1">Commencez gratuitement — aucune carte bancaire</p>
      </div>

      <style>{`
        .wasp-auth-form input {
          background: #1a1a1a !important;
          border: 1px solid #333 !important;
          color: white !important;
          border-radius: 8px !important;
          padding: 10px 14px !important;
        }
        .wasp-auth-form input:focus {
          border-color: #c8f135 !important;
          outline: none !important;
        }
        .wasp-auth-form label {
          color: #999 !important;
          font-size: 0.85rem !important;
        }
        .wasp-auth-form button[type="submit"] {
          background: #c8f135 !important;
          color: #000 !important;
          font-weight: 700 !important;
          border-radius: 8px !important;
          padding: 10px !important;
          width: 100% !important;
          border: none !important;
          cursor: pointer !important;
          margin-top: 8px !important;
        }
        .wasp-auth-form button[type="submit"]:hover { opacity: 0.9 !important; }
        .wasp-auth-form .social-button {
          background: #1a1a1a !important;
          border: 1px solid #333 !important;
          color: white !important;
          border-radius: 8px !important;
        }
        .wasp-auth-form .social-button:hover { border-color: #c8f135 !important; }
      `}</style>

      <div className="wasp-auth-form">
        <SignupForm />
      </div>

      {/* Garanties */}
      <div className="mt-5 grid grid-cols-3 gap-2">
        {['Gratuit pour démarrer', 'GitHub en 2 min', 'Rapport en 1 jour'].map(text => (
          <div key={text} className="flex flex-col items-center gap-1 text-center">
            <span className="text-[#c8f135] text-xs">✓</span>
            <span className="text-gray-600 text-xs">{text}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 text-center">
        <span className="text-sm text-gray-500">
          Déjà un compte ?{" "}
          <WaspRouterLink to={routes.LoginRoute.to} className="text-[#c8f135] hover:underline font-medium">
            Se connecter
          </WaspRouterLink>
        </span>
      </div>
    </AuthPageLayout>
  );
}