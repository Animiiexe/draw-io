"use client";
import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Star, 
  Palette, 
  Users, 
  Shield, 
  Zap, 
  Crown, 
  Sparkles,
  ArrowRight,
  X,
  Menu,
  Image as ImageIcon
} from 'lucide-react';
import Link from "next/link";

const Page: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const plans = [
    {
      id: 'free',
      name: 'Free Forever',
      description: 'Perfect for casual creators and personal projects',
      price: { monthly: 0, yearly: 0 },
      badge: null,
      color: 'from-gray-500 to-gray-600',
      features: [
        'Up to 5 collaborative canvases',
        'Basic drawing tools (brush, pencil, eraser)',
        '16 color palette',
        'Real-time collaboration with 3 users',
        'Export to PNG/JPG',
        'Community support',
        '100MB storage',
        'Basic templates'
      ],
      limitations: [
        'Limited canvas size',
        'No custom brushes',
        'Basic export options'
      ]
    },
    {
      id: 'pro',
      name: 'Pro Creator',
      description: 'Advanced tools for professional creators and teams',
      price: { monthly: 12, yearly: 120 },
      badge: 'Most Popular',
      color: 'from-indigo-600 to-purple-600',
      features: [
        'Unlimited collaborative canvases',
        'Professional drawing tools & custom brushes',
        '256 color palette + custom colors',
        'Real-time collaboration with 25 users',
        'Export to PNG, JPG, SVG, PDF',
        'Priority support',
        '10GB storage',
        'Premium templates & assets',
        'Version history & auto-save',
        'Advanced layer management',
        'Team workspace',
        'Analytics & usage insights'
      ],
      limitations: []
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Complete solution for large teams and organizations',
      price: { monthly: 39, yearly: 390 },
      badge: 'Best Value',
      color: 'from-purple-600 to-teal-600',
      features: [
        'Everything in Pro Creator',
        'Unlimited users & canvases',
        'Advanced security & compliance',
        'Custom branding & white-labeling',
        'API access & integrations',
        'Dedicated account manager',
        'Unlimited storage',
        'Custom templates & brand assets',
        'Advanced admin controls',
        'Single Sign-On (SSO)',
        '99.9% uptime SLA',
        'Custom training & onboarding'
      ],
      limitations: []
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    console.log(`Selected plan: ${planId} with ${billingCycle} billing`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrollY > 50
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700'
          : 'bg-transparent'
        }`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
             <Link href="/" className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Draw.io
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
              Features
            </Link>
            <Link href="/#how-it-works" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
              How It Works
            </Link>
            <Link href="/price" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
              Pricing
            </Link>
            <Link
              href="/draw"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Start Drawing
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700">
            <div className="px-4 py-6 space-y-4">
              <Link href="#features" className="block py-2 hover:text-indigo-600 transition-colors font-medium">
                Features
              </Link>
              <Link href="#how-it-works" className="block py-2 hover:text-indigo-600 transition-colors font-medium">
                How It Works
              </Link>
              <Link href="#pricing" className="block py-2 hover:text-indigo-600 transition-colors font-medium">
                Pricing
              </Link>
              <Link
                href="/draw"
                className="block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl text-center font-semibold"
              >
                Start Drawing
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pt-24">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-indigo-200 dark:border-indigo-800">
            <Crown className="w-4 h-4 mr-2" />
            Choose your perfect plan
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              Simple Pricing
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">
              For Every Creator
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
            Start free and upgrade as you grow. All plans include our core collaborative drawing features.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white dark:bg-gray-800 p-1 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                billingCycle === 'monthly'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 relative ${
                billingCycle === 'yearly'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${
                plan.id === 'pro' 
                  ? 'border-indigo-300 dark:border-indigo-600 scale-105' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600'
              } ${selectedPlan === plan.id ? 'ring-4 ring-indigo-200 dark:ring-indigo-800' : ''}`}
            >
              {plan.badge && (
                <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r ${plan.color} text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg`}>
                  {plan.badge}
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {plan.description}
                  </p>
                  
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-gray-900 dark:text-white">
                      ${plan.price[billingCycle]}
                    </span>
                    {plan.price.monthly > 0 && (
                      <span className="text-gray-600 dark:text-gray-300 ml-2">
                        /{billingCycle === 'monthly' ? 'month' : 'year'}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center group ${
                      plan.id === 'free'
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                        : `bg-gradient-to-r ${plan.color} text-white hover:shadow-xl transform hover:-translate-y-1`
                    }`}
                  >
                    {plan.id === 'free' ? 'Get Started Free' : 'Start Free Trial'}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Features List */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white flex items-center">
                    <Sparkles className="w-5 h-5 text-green-500 mr-2" />
                    What's Included:
                  </h4>
                  
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300 text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {plan.limitations.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="font-semibold text-gray-600 dark:text-gray-400 flex items-center mb-3">
                        <X className="w-4 h-4 mr-2" />
                        Limitations:
                      </h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <X className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-500 dark:text-gray-400 text-sm">
                              {limitation}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "Can I change my plan anytime?",
                answer: "Yes! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect immediately for upgrades or at the next billing cycle for downgrades."
              },
              {
                question: "Is there a free trial for paid plans?",
                answer: "Absolutely! All paid plans come with a 14-day free trial. No credit card required to start your trial."
              },
              {
                question: "What happens to my data if I downgrade?",
                answer: "Your data is always safe. If you downgrade, you'll still have access to all your existing work, but new creations will be limited by your plan's features."
              },
              {
                question: "Do you offer refunds?",
                answer: "Yes, we offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, we'll provide a full refund."
              },
              {
                question: "Can I collaborate with users on different plans?",
                answer: "Yes! Free users can collaborate on canvases created by paid users, but collaboration limits apply based on the canvas owner's plan."
              },
              {
                question: "Is my data secure?",
                answer: "Absolutely. We use enterprise-grade encryption, regular backups, and follow industry-standard security practices to keep your creative work safe."
              }
            ].map((faq, index) => (
              <div key={index} className="space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {faq.question}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center pb-16">
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <Shield className="w-5 h-5" />
              <span className="font-medium">30-day money back</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <Zap className="w-5 h-5" />
              <span className="font-medium">Instant activation</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <Users className="w-5 h-5" />
              <span className="font-medium">50,000+ happy creators</span>
            </div>
          </div>
          
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            All plans include 24/7 support and regular feature updates
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;