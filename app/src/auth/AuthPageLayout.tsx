import { ReactNode } from "react";
import { Link as WaspRouterLink, routes } from "wasp/client/router";

export function AuthPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Background Decoratif (Optionnel) */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-100 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-emerald-100 blur-[120px]" />
      </div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-6">
          <WaspRouterLink to={routes.LandingPageRoute.to} className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 transition-transform group-hover:scale-105">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-slate-900 font-extrabold text-2xl tracking-tight">ProofWork</span>
          </WaspRouterLink>
        </div>

        {/* Card responsive */}
        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/60 border border-slate-100 sm:rounded-2xl sm:px-10">
          {children}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-slate-400 text-xs font-medium uppercase tracking-widest">
          &copy; {new Date().getFullYear()} ProofWork &middot; Sécurisé par SSL
        </div>
      </div>
    </div>
  );
}