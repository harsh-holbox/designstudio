"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function PricingPage() {
  const [animatedElements, setAnimatedElements] = useState(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimatedElements((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const pricingPlans = [
    {
      id: "basic",
      name: "Basic",
      price: "$10",
      period: "one-time",
      description: "Perfect for trying out our AI design service",
      images: "50 images",
      features: [
        "50 AI-generated design images",
        "Basic room transformations",
        "Standard resolution (1080p)",
        "Email support",
        "7-day access to designs",
      ],
      popular: false,
    },
    {
      id: "professional",
      name: "Professional",
      price: "$25",
      period: "one-time",
      description: "Ideal for serious design projects",
      images: "150 images",
      features: [
        "150 AI-generated design images",
        "Advanced room transformations",
        "High resolution (4K)",
        "Priority email support",
        "30-day access to designs",
        "Multiple design styles",
        "Before/after comparisons",
      ],
      popular: true,
    },
    {
      id: "premium",
      name: "Premium",
      price: "$50",
      period: "one-time",
      description: "Complete design solution for professionals",
      images: "500 images",
      features: [
        "500 AI-generated design images",
        "Premium room transformations",
        "Ultra-high resolution (8K)",
        "24/7 priority support",
        "Unlimited access to designs",
        "All design styles included",
        "3D visualization previews",
        "Custom design requests",
        "Commercial usage rights",
      ],
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #000 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <Header />

      <main className="relative z-10 px-4 sm:px-8 lg:px-16 py-16">
        {/* Hero Section */}
        <div
          id="hero"
          data-animate
          className={`text-center mb-20 transition-all duration-1000 ${
            animatedElements.has("hero") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-light text-black mb-6 tracking-tight">
            Choose Your Package
          </h1>
          <p className="font-inter text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Transform your space with AI-powered interior design. Select the perfect package for your needs.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {pricingPlans.map((plan, index) => (
              <div
                key={plan.id}
                id={`plan-${plan.id}`}
                data-animate
                className={`relative bg-white rounded-2xl border-2 transition-all duration-1000 hover:shadow-2xl hover:scale-105 group ${
                  plan.popular ? "border-black shadow-xl" : "border-gray-200 hover:border-gray-300"
                } ${
                  animatedElements.has(`plan-${plan.id}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium">Most Popular</div>
                  </div>
                )}

                <div className="p-8 lg:p-10">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <h3 className="font-playfair text-2xl lg:text-3xl font-light text-black mb-2">{plan.name}</h3>
                    <p className="text-gray-600 text-sm mb-6">{plan.description}</p>

                    {/* Price */}
                    <div className="mb-4">
                      <span className="font-inter text-4xl lg:text-5xl font-bold text-black">{plan.price}</span>
                      <span className="text-gray-500 text-lg ml-2">{plan.period}</span>
                    </div>

                    {/* Images Count */}
                    <div className="bg-gray-50 rounded-lg py-3 px-4 mb-6">
                      <span className="font-inter text-lg font-semibold text-black">{plan.images}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <ul className="space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check className="w-5 h-5 text-black mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <Button
                    className={`w-full py-4 rounded-xl font-medium text-base transition-all duration-300 ${
                      plan.popular
                        ? "bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl"
                        : "bg-white text-black border-2 border-black hover:bg-black hover:text-white"
                    }`}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div
          id="faq"
          data-animate
          className={`mt-24 text-center transition-all duration-1000 ${
            animatedElements.has("faq") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-playfair text-3xl lg:text-4xl font-light text-black mb-8">Questions?</h2>
          <p className="font-inter text-gray-600 mb-8 max-w-2xl mx-auto">
            Need help choosing the right package? Our team is here to assist you with any questions about our AI
            interior design service.
          </p>
          <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105">
            Contact Support
          </Button>
        </div>
      </main>

      <Footer />
      
            <style jsx>{`
              @keyframes slideInUp {
                from {
                  opacity: 0;
                  transform: translateY(30px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>
    </div>
  )
}
