import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "wasp/client/auth";
import { generateCheckoutSession, getCustomerPortalUrl, useQuery } from "wasp/client/operations";
import { PaymentPlanId, paymentPlans, prettyPaymentPlanName, SubscriptionStatus } from "./plans";

const plans = [
  {
    id: PaymentPlanId.Hobby,
    name: "Free",
    price: "$0",
    period: "pour toujours",
    description: "Pour démarrer et tester ProofWork",
    features: ["1 projet", "1 client", "Intégration GitHub", "Rapport manuel"],
    cta: "Commencer gratuitement",
    highlighted: false,
  },
  {
    id: PaymentPlanId.Pro,
    name: "Pro",
    price: "$19",
    period: "par mois",
    description: "Pour les freelances actifs",
    features: [
      "Projets illimités",
      "Clients illimités",
      "Toutes les intégrations",
      "Résumés IA automatiques",
      "Envoi hebdomadaire auto",
      "Branding personnalisé",
    ],
    cta: "Démarrer l'essai gratuit",
    highlighted: true,
  },
  {
    id: PaymentPlanId.Credits10,
    name: "Agency",
    price: "$49",
    period: "par mois",
    description: "Pour les agences et équipes",
    features: [
      "Tout ce qu'il y a dans Pro",
      "5 membres d'équipe",
      "Rapports en marque blanche",
      "Support prioritaire",
    ],
    cta: "Nous contacter",
    highlighted: false,
  },
];

const PricingPage = () => {
  const [isPaymentLoading, setIsPaymentLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { data: user } = useAuth()
  const navigate = useNavigate()

  const isUserSubscribed = !!user && !!user.subscriptionStatus &&
    user.subscriptionStatus !== SubscriptionStatus.Deleted

  const { data: customerPortalUrl } = useQuery(getCustomerPortalUrl, { enabled: isUserSubscribed })

  async function handleBuyNowClick(planId: PaymentPlanId) {
    if (!user) { navigate("/login"); return }
    try {
      setIsPaymentLoading(true)
      const result = await generateCheckoutSession(planId)
      if (result?.sessionUrl) window.open(result.sessionUrl, "_self")
      else throw new Error("Erreur lors de la création de la session")
    } catch (error: any) {
      setErrorMessage(error.message || "Erreur de paiement")
      setIsPaymentLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 py-16'>
     <div className='max-w-5xl mx-auto px-6 text-center'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-3xl font-semibold text-gray-900 tracking-tight mb-3'>
            Tarifs simples et transparents
          </h1>
          <p className='text-gray-500 text-base max-w-xl mx-auto'>
            Commencez gratuitement. Passez au Pro quand vous êtes prêt. Aucune surprise.
          </p>
        </div>

        {errorMessage && (
          <div className='bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-8 text-center'>
            {errorMessage}
          </div>
        )}

        {/* Plans */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-4xl mx-auto'>
          {plans.map(plan => (
            <div key={plan.id} className={`bg-white rounded-xl p-6 flex flex-col shadow-sm transition ${
              plan.highlighted
                ? 'border-2 border-gray-900 relative'
                : 'border border-gray-200'
            }`}>
              {plan.highlighted && (
                <div className='absolute -top-3 left-1/2 -translate-x-1/2'>
                  <span className='bg-gray-900 text-white text-xs font-semibold px-3 py-1 rounded-full'>
                    Le plus populaire
                  </span>
                </div>
              )}

              <div className='mb-6'>
                <p className='text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1'>{plan.name}</p>
                <div className='flex items-baseline gap-1 mb-2'>
                  <span className='text-3xl font-bold text-gray-900'>{plan.price}</span>
                  <span className='text-gray-400 text-sm'>{plan.period}</span>
                </div>
                <p className='text-gray-500 text-sm'>{plan.description}</p>
              </div>

              <ul className='flex flex-col gap-2.5 mb-8 flex-1'>
                {plan.features.map(feature => (
                  <li key={feature} className='flex items-start gap-2 text-sm text-gray-600'>
                    <CheckCircle className='w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5' />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleBuyNowClick(plan.id)}
                disabled={isPaymentLoading}
                className={`w-full py-2.5 rounded-lg text-sm font-medium transition disabled:opacity-50 ${
                  plan.highlighted
                    ? 'bg-gray-900 text-white hover:bg-gray-700'
                    : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {isUserSubscribed ? 'Gérer l\'abonnement' : !user ? 'Se connecter' : plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Garantie */}
        <div className='text-center mt-10'>
          <p className='text-gray-400 text-sm'>
            ✓ Aucune carte bancaire pour le plan gratuit &nbsp;·&nbsp;
            ✓ Annulation à tout moment &nbsp;·&nbsp;
            ✓ Support par email inclus
          </p>
        </div>

      </div>
    </div>
  )
}

export default PricingPage