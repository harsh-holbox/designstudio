"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, Zap, Brain, Palette, ArrowRight, Play } from "lucide-react"

export default function AIRedesignFeatures() {
  const [activeDemo, setActiveDemo] = useState(null)

  const features = [
    {
      icon: Brain,
      title: "Smart Room Analysis",
      description: "AI identifies furniture, lighting, and spatial relationships to understand your room's potential",
      demo: "analyzing",
    },
    {
      icon: Palette,
      title: "Style Generation",
      description: "Generate multiple design variations based on your preferences and room constraints",
      demo: "generating",
    },
    {
      icon: Zap,
      title: "Instant Rendering",
      description: "See photorealistic results in seconds with our advanced AI rendering technology",
      demo: "rendering",
    },
    {
      icon: Sparkles,
      title: "Smart Suggestions",
      description: "Get personalized furniture and decor recommendations with shopping links",
      demo: "suggesting",
    },
  ]

  const designStyles = [
    { name: "Modern Minimalist", color: "from-gray-400 to-gray-600", popularity: "95%" },
    { name: "Scandinavian", color: "from-blue-400 to-blue-600", popularity: "88%" },
    { name: "Industrial Chic", color: "from-orange-400 to-red-600", popularity: "82%" },
    { name: "Bohemian", color: "from-purple-400 to-pink-600", popularity: "76%" },
    { name: "Art Deco", color: "from-yellow-400 to-orange-600", popularity: "71%" },
    { name: "Mid-Century Modern", color: "from-green-400 to-teal-600", popularity: "69%" },
  ]

  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-5xl md:text-6xl font-light text-black mb-6 leading-tight">
            AI-Powered
            <br />
            <span className="italic bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              Room Transformation
            </span>
          </h2>
          <p className="font-inter text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our advanced AI technology analyzes your space and creates stunning, personalized designs that match your
            style and budget preferences.
          </p>
        </div>

        {/* AI Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              onMouseEnter={() => setActiveDemo(feature.demo)}
              onMouseLeave={() => setActiveDemo(null)}
            >
              <div className="bg-gray-50 rounded-2xl p-8 h-full transition-all duration-500 group-hover:bg-black group-hover:text-white group-hover:scale-[1.02]">
                <div className="w-12 h-12 bg-black group-hover:bg-white rounded-xl flex items-center justify-center mb-6 transition-colors duration-500">
                  <feature.icon className="w-6 h-6 text-white group-hover:text-black transition-colors duration-500" />
                </div>
                <h3 className="font-playfair text-xl font-light mb-4 text-black group-hover:text-white transition-colors duration-500">
                  {feature.title}
                </h3>
                <p className="font-inter text-gray-600 group-hover:text-gray-300 leading-relaxed transition-colors duration-500">
                  {feature.description}
                </p>
                <div className="mt-6 flex items-center text-black group-hover:text-white transition-colors duration-500">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-500 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Design Styles Showcase */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12 mb-20">
          <div className="text-center mb-12">
            <h3 className="font-playfair text-4xl font-light text-black mb-4">Popular Design Styles</h3>
            <p className="font-inter text-gray-600 text-lg">
              Choose from trending styles or let AI suggest the perfect match
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {designStyles.map((style, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
                  <div
                    className={`w-full h-32 bg-gradient-to-br ${style.color} rounded-xl mb-4 relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-xs font-medium text-black">{style.popularity}</span>
                    </div>
                  </div>
                  <h4 className="font-playfair text-lg font-light text-black mb-2">{style.name}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Trending</span>
                    <Button size="sm" variant="ghost" className="text-black hover:bg-gray-100 p-2">
                      <Play className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-black rounded-3xl p-12">
          <h3 className="font-playfair text-4xl font-light text-white mb-6">Ready to Transform Your Space?</h3>
          <p className="font-inter text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of homeowners who have already discovered the power of AI-driven interior design.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-white text-black hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-medium">
              <Sparkles className="w-5 h-5 mr-2" />
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-full text-lg font-medium bg-transparent"
            >
              View Portfolio
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
