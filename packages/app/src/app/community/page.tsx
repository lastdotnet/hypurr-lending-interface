'use client'
import { ArrowRight, Gem, Coins, Users } from 'lucide-react'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-6 font-bold text-5xl">Say Hy to HyFi</h1>
          <p className="mb-8 text-slate-300 text-xl">Join the community for High Yield Financial Instruments</p>
          <div className="flex justify-center gap-4">
            <a
              href="https://hypurr.fi"
              className="flex items-center rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
            >
              Launch App <ArrowRight className="ml-2" />
            </a>
            <a
              href="https://t.me/hypurrfi"
              className="rounded-lg bg-slate-700 px-6 py-3 font-semibold hover:bg-slate-600"
            >
              Join Telegram
            </a>
            <a
              href="https://x.com/hypurrfi"
              className="rounded-lg bg-slate-700 px-6 py-3 font-semibold hover:bg-slate-600"
            >
              Follow on X
            </a>
          </div>
        </div>

        {/* Value Propositions */}
        <div className="mb-16 grid gap-8 md:grid-cols-3">
          <div className="rounded-xl bg-slate-800 p-8 transition-colors hover:bg-slate-800/80">
            <Gem className="mb-4 h-12 w-12 text-blue-400" />
            <h3 className="mb-3 font-semibold text-xl">Governance & Strategy Network</h3>
            <p className="mb-4 text-slate-300">
              Shape the future of HypurrFi lending with HYFI token staking and governance.
            </p>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start">
                <ArrowRight className="mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                <span>Win together.</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                <span>Access comprehensive documentation and guides</span>
              </li>
            </ul>

            <div className="mt-6 border-slate-700 border-t pt-4">
              <button
                onClick={() => document.getElementById('governance-docs')?.classList.toggle('hidden')}
                className="mb-4 flex w-full items-center justify-between text-slate-300 hover:text-white"
              >
                <span className="font-semibold">Learn About Staking, Points, and Governance</span>
                <ArrowRight className="transform transition-transform duration-200" />
              </button>

              <div id="governance-docs" className="hidden space-y-4">
                <div className="rounded-lg bg-slate-700/50 p-4">
                  <div className="space-y-3">
                    <a
                      href="https://docs.hypurr.fi/governance/staking"
                      className="flex items-center justify-between rounded bg-slate-600/50 p-2 hover:bg-slate-600"
                    >
                      <div>
                        <span className="block font-medium">Staking Guide</span>
                        <span className="text-slate-400 text-sm">Learn about HYFI staking mechanics and rewards</span>
                      </div>
                      <ArrowRight className="h-4 w-4" />
                    </a>

                    <a
                      href="https://docs.hypurr.fi/governance/points"
                      className="flex items-center justify-between rounded bg-slate-600/50 p-2 hover:bg-slate-600"
                    >
                      <div>
                        <span className="block font-medium">Points System</span>
                        <span className="text-slate-400 text-sm">Understand how to earn and use governance points</span>
                      </div>
                      <ArrowRight className="h-4 w-4" />
                    </a>

                    <a
                      href="https://docs.hypurr.fi/governance/voting"
                      className="flex items-center justify-between rounded bg-slate-600/50 p-2 hover:bg-slate-600"
                    >
                      <div>
                        <span className="block font-medium">Governance Process</span>
                        <span className="text-slate-400 text-sm">Participate in protocol decisions and proposals</span>
                      </div>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>

                  <div className="mt-4 border-slate-600 border-t pt-3">
                    <a
                      href="https://docs.hypurr.fi/governance"
                      className="flex items-center text-blue-400 text-sm hover:text-blue-300"
                    >
                      View complete governance documentation
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-slate-800 p-8 transition-colors hover:bg-slate-800/80">
            <Coins className="mb-4 h-12 w-12 text-purple-400" />
            <h3 className="mb-3 font-semibold text-xl">High Yield Financial Instruments</h3>
            <p className="mb-4 text-slate-300">
              Co-create and discover profitable yield strategies optimized for HNW traders and PE.
            </p>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start">
                <ArrowRight className="mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                <span>Apply cutting-edge DeFi strategies that span Hyperliquid and beyond.</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                <span>Earn rewards for providing deep liquidity.</span>
              </li>
            </ul>

            <div className="mt-6 border-slate-700 border-t pt-4">
              <button
                onClick={() => document.getElementById('vault-options')?.classList.toggle('hidden')}
                className="mb-4 flex w-full items-center justify-between text-slate-300 hover:text-white"
              >
                <span className="font-semibold">Deposit Now</span>
                <ArrowRight className="transform transition-transform duration-200" />
              </button>

              <div id="vault-options" className="hidden space-y-4">
                <div className="rounded-lg bg-slate-700/50 p-4">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">Early Deposit Vault</h4>
                      <p className="text-slate-400 text-sm">Lock HYPE for boosted rewards</p>
                    </div>
                    <span className="rounded bg-blue-500 px-2 py-1 text-xs">Active</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-slate-300 text-sm">
                      <div>APR: Up to 25%</div>
                      <div>TVL Cap: $10M</div>
                    </div>
                    <a
                      href="https://hypurr.fi/vaults/early-deposit"
                      className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-sm hover:bg-blue-700"
                    >
                      Deposit
                    </a>
                  </div>
                </div>

                <div className="rounded-lg bg-slate-700/50 p-4">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">Partner Strategies</h4>
                      <p className="text-slate-400 text-sm">Ecosystem yield opportunities</p>
                    </div>
                  </div>
                  <div className="mt-3 space-y-3">
                    <a
                      href="#strategy1"
                      className="flex items-center justify-between rounded bg-slate-600/50 p-2 hover:bg-slate-600"
                    >
                      <span className="text-sm">Hyperliquid Perpetuals</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href="#strategy2"
                      className="flex items-center justify-between rounded bg-slate-600/50 p-2 hover:bg-slate-600"
                    >
                      <span className="text-sm">HypurrFi Lending</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href="#strategy3"
                      className="flex items-center justify-between rounded bg-slate-600/50 p-2 hover:bg-slate-600"
                    >
                      <span className="text-sm">Automated Vaults</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-slate-800 p-8 transition-colors hover:bg-slate-800/80">
            <Users className="mb-4 h-12 w-12 text-green-400" />
            <h3 className="mb-3 font-semibold text-xl">Global Events & Networking</h3>
            <p className="mb-4 text-slate-300">
              Connect with the HyFi community at major crypto events worldwide and exclusive meetups.
            </p>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start">
                <ArrowRight className="mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                <span>Regular presence at premier crypto conferences</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                <span>Exclusive networking events with ecosystem leaders</span>
              </li>
            </ul>

            <div className="mt-6 border-slate-700 border-t pt-4">
              <button
                onClick={() => document.getElementById('events-calendar')?.classList.toggle('hidden')}
                className="flex w-full items-center justify-between text-slate-300 hover:text-white"
              >
                <span className="font-semibold">Meet us at Upcoming Events</span>
                <ArrowRight className="transform transition-transform duration-200" />
              </button>

              <div id="events-calendar" className="mt-4 hidden space-y-4">
                <div className="rounded-lg bg-slate-700/50 p-4">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">ETH Denver</h4>
                      <p className="text-slate-400 text-sm">Feb 23-Mar 3, 2024</p>
                    </div>
                    <span className="rounded bg-slate-600 px-2 py-1 text-xs">Denver, CO</span>
                  </div>
                  <p className="text-slate-300 text-sm">
                    Meet our team at the HyFi booth and join our yield strategy workshop.
                  </p>
                </div>

                <div className="rounded-lg bg-slate-700/50 p-4">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">Token2049</h4>
                      <p className="text-slate-400 text-sm">Apr 18-19, 2024</p>
                    </div>
                    <span className="rounded bg-slate-600 px-2 py-1 text-xs">Dubai, UAE</span>
                  </div>
                  <p className="text-slate-300 text-sm">
                    Private networking dinner for HYFI holders and strategic partners.
                  </p>
                </div>

                <div className="rounded-lg bg-slate-700/50 p-4">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">Hyperliquid Summit</h4>
                      <p className="text-slate-400 text-sm">May 2024</p>
                    </div>
                    <span className="rounded bg-slate-600 px-2 py-1 text-xs">Singapore</span>
                  </div>
                  <p className="text-slate-300 text-sm">Keynote presentation on advanced yield strategies.</p>
                </div>

                <a href="https://t.me/hypurrfi" className="mt-4 block text-blue-400 text-sm hover:text-blue-300">
                  Follow our Telegram for more event updates →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Partners Section */}
        <div id="strategic-partners" className="mb-16 rounded-xl bg-slate-800 p-8">
          <h2 className="mb-8 text-center font-bold text-3xl">Strategic Partnerships</h2>
          <div className="mx-auto max-w-2xl">
            <form className="space-y-6">
              <div>
                <label className="mb-2 block font-medium text-sm">Organization Type</label>
                <select
                  className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2"
                  onChange={(e) => {
                    const aumField = document.getElementById('aum-field')
                    const otherField = document.getElementById('other-field')
                    if (e.target.value === 'other') {
                      aumField?.classList.add('hidden')
                      otherField?.classList.remove('hidden')
                    } else if (e.target.value !== '') {
                      aumField?.classList.remove('hidden')
                      otherField?.classList.add('hidden')
                    } else {
                      aumField?.classList.add('hidden')
                      otherField?.classList.add('hidden')
                    }
                  }}
                >
                  <option value="">Select...</option>
                  <option value="fund">Investment Fund</option>
                  <option value="family">Family Office</option>
                  <option value="institution">Financial Institution</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div id="aum-field" className="hidden">
                <label className="mb-2 block font-medium text-sm">Assets Under Management</label>
                <select className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2">
                  <option value="">Select...</option>
                  <option value="tier1">$10M - $50M</option>
                  <option value="tier2">$50M - $250M</option>
                  <option value="tier3">$250M+</option>
                </select>
              </div>

              <div id="other-field" className="hidden">
                <label className="mb-2 block font-medium text-sm">Please specify your organization</label>
                <input
                  type="text"
                  placeholder="Enter organization type"
                  className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-sm">Primary Interest</label>
                <select className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2">
                  <option value="">Select...</option>
                  <option value="governance">Protocol Governance</option>
                  <option value="yield">Yield Strategies</option>
                  <option value="partnership">Strategic Partnership</option>
                  <option value="investment">Investment Opportunities</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block font-medium text-sm">Contact Information</label>
                <input
                  type="email"
                  placeholder="Work Email"
                  className="mb-4 w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2"
                />
                <input
                  type="text"
                  placeholder="Telegram Handle (optional)"
                  className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2"
                />
              </div>

              <button type="submit" className="w-full rounded-lg bg-blue-600 py-3 font-semibold hover:bg-blue-700">
                Request Partnership Discussion
              </button>

              <div className="mt-8 border-slate-700 border-t pt-6">
                <button
                  onClick={() => document.getElementById('privacy-content')?.classList.toggle('hidden')}
                  className="flex w-full items-center justify-between"
                >
                  <h3 className="font-semibold text-lg">Privacy Commitment</h3>
                  <ArrowRight className="transform transition-transform duration-200" />
                </button>
                <div id="privacy-content" className="mt-4 hidden space-y-3 text-slate-300 text-sm">
                  <p>
                    <strong>Data Usage:</strong> All information submitted through this form is exclusively handled by
                    the HypurrFi Foundation and is used solely for evaluating and facilitating potential strategic
                    partnerships.
                  </p>
                  <p>
                    <strong>Data Protection:</strong> Your information is encrypted and stored using enterprise-grade
                    security protocols. We never share, sell, or distribute your data to any third parties under any
                    circumstances.
                  </p>
                  <p>
                    <strong>Data Retention:</strong> You may request the deletion of your information at any time by
                    contacting our privacy team. All partnership inquiry data is automatically purged after 180 days if
                    no active engagement is established.
                  </p>
                  <p>
                    <strong>Communication:</strong> By submitting this form, you'll only receive communications directly
                    related to your partnership inquiry from authorized HypurrFi Foundation team members.
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Call to Action */}
        <div className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center">
          <h2 className="mb-4 font-bold text-3xl">Join the HyFi Community</h2>
          <p className="mb-6 text-xl">Start your journey to DeFi mastery today</p>
          <div className="flex flex-col justify-center gap-4 md:flex-row">
            <a
              href="https://docs.hypurr.fi/introduction/hypurrfi"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 hover:bg-slate-100"
            >
              Read the Docs
            </a>
            <a href="https://hypurr.fi" className="rounded-lg bg-slate-800 px-6 py-3 font-semibold hover:bg-slate-700">
              Launch App
            </a>
            <a
              href="https://t.me/hypurrfi"
              className="rounded-lg bg-slate-800 px-6 py-3 font-semibold hover:bg-slate-700"
            >
              Join Telegram
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
