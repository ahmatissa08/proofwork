import { getCustomerPortalUrl, useQuery } from "wasp/client/operations";
import { Link as WaspRouterLink, routes } from "wasp/client/router";
import type { User } from "wasp/entities";
import { PaymentPlanId, SubscriptionStatus, parsePaymentPlanId, prettyPaymentPlanName } from "../payment/plans";

export default function AccountPage({ user }: { user: User }) {
  const { data: customerPortalUrl } = useQuery(getCustomerPortalUrl)

  const isSubscribed = !!user.subscriptionStatus &&
    user.subscriptionStatus !== SubscriptionStatus.Deleted

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-2xl mx-auto px-6 py-12'>

        <div className='mb-8'>
          <h1 className='text-2xl font-semibold text-gray-900 tracking-tight'>Mon compte</h1>
          <p className='text-gray-500 text-sm mt-1'>Gérez vos informations et votre abonnement</p>
        </div>

        {/* Infos compte */}
        <div className='bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-4'>
          <div className='px-5 py-4 border-b border-gray-100'>
            <h2 className='font-medium text-gray-900 text-sm'>Informations du compte</h2>
          </div>
          <div className='divide-y divide-gray-50'>
            {!!user.email && (
              <div className='px-5 py-4 flex items-center justify-between'>
                <span className='text-sm text-gray-500'>Adresse email</span>
                <span className='text-sm text-gray-900 font-medium'>{user.email}</span>
              </div>
            )}
            {!!user.username && (
              <div className='px-5 py-4 flex items-center justify-between'>
                <span className='text-sm text-gray-500'>Nom d'utilisateur</span>
                <span className='text-sm text-gray-900 font-medium'>{user.username}</span>
              </div>
            )}
          </div>
        </div>

        {/* Abonnement */}
        <div className='bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-4'>
          <div className='px-5 py-4 border-b border-gray-100'>
            <h2 className='font-medium text-gray-900 text-sm'>Abonnement</h2>
          </div>
          <div className='divide-y divide-gray-50'>
            <div className='px-5 py-4 flex items-center justify-between'>
              <span className='text-sm text-gray-500'>Plan actuel</span>
              <div className='flex items-center gap-3'>
                <span className='text-sm text-gray-900 font-medium'>
                  {!user.subscriptionPlan ? (
                    <span className='bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full text-xs font-medium'>
                      Plan gratuit
                    </span>
                  ) : (
                    <span className='bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-full text-xs font-medium'>
                      {prettyPaymentPlanName(parsePaymentPlanId(user.subscriptionPlan))}
                    </span>
                  )}
                </span>
                {customerPortalUrl && (
                  <a href={customerPortalUrl} target='_blank' rel='noopener noreferrer'
                    className='text-xs text-gray-500 hover:text-gray-900 border border-gray-200 px-2.5 py-1 rounded-lg transition'>
                    Gérer
                  </a>
                )}
              </div>
            </div>
            <div className='px-5 py-4 flex items-center justify-between'>
              <span className='text-sm text-gray-500'>Crédits disponibles</span>
              <div className='flex items-center gap-3'>
                <span className='text-sm text-gray-900 font-medium'>{user.credits} crédits</span>
                {!isSubscribed && (
                  <WaspRouterLink to={routes.PricingPageRoute.to}
                    className='text-xs text-gray-500 hover:text-gray-900 border border-gray-200 px-2.5 py-1 rounded-lg transition'>
                    Acheter
                  </WaspRouterLink>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Upgrade */}
        {!isSubscribed && (
          <div className='bg-gray-900 rounded-xl p-5 flex items-center justify-between'>
            <div>
              <p className='text-white font-medium text-sm'>Passez au plan Pro</p>
              <p className='text-gray-400 text-xs mt-0.5'>Projets illimités, résumés IA, envoi automatique</p>
            </div>
            <WaspRouterLink to={routes.PricingPageRoute.to}
              className='bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition flex-shrink-0'>
              Voir les tarifs
            </WaspRouterLink>
          </div>
        )}

      </div>
    </div>
  )
}