"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, Palette, Sparkles, Eye, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function DesignStudio() {
  const [activeStyle, setActiveStyle] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const heroRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const designStyles = [
    {
      id: "modern",
      name: "Modern Minimalist",
      description: "Clean lines, neutral colors, and functional beauty",
      image: "/modern-luxury-living-room-with-contemporary-furnit.jpg",
      color: "from-gray-100 to-gray-200",
      features: ["Clean Lines", "Neutral Palette", "Functional Design", "Open Spaces"],
      rooms: 847,
      popularity: 95,
    },
    {
      id: "luxury",
      name: "Luxury Contemporary",
      description: "Sophisticated elegance with premium materials",
      image: "/luxury-interior-design-studio-with-modern-furnitur.jpg",
      color: "from-amber-50 to-amber-100",
      features: ["Premium Materials", "Rich Textures", "Statement Pieces", "Elegant Details"],
      rooms: 623,
      popularity: 88,
    },
    {
      id: "scandinavian",
      name: "Scandinavian Hygge",
      description: "Cozy comfort with natural elements and light woods",
      image: "/serene-modern-bedroom-with-minimalist-design.jpg",
      color: "from-blue-50 to-blue-100",
      features: ["Natural Woods", "Cozy Textiles", "Light Colors", "Functional Beauty"],
      rooms: 934,
      popularity: 92,
    },
    {
      id: "industrial",
      name: "Industrial Chic",
      description: "Raw materials meet refined design",
      image: "/modern-kitchen-with-sleek-design-and-island.jpg",
      color: "from-stone-100 to-stone-200",
      features: ["Exposed Elements", "Metal Accents", "Raw Materials", "Urban Aesthetic"],
      rooms: 456,
      popularity: 78,
    },
    {
      id: "bohemian",
      name: "Bohemian Eclectic",
      description: "Artistic expression with vibrant patterns and textures",
      image: "/cluttered-bedroom-with-mismatched-furniture.jpg",
      color: "from-rose-50 to-rose-100",
      features: ["Rich Patterns", "Vibrant Colors", "Eclectic Mix", "Artistic Flair"],
      rooms: 312,
      popularity: 71,
    },
    {
      id: "transitional",
      name: "Transitional Blend",
      description: "Perfect balance of traditional and contemporary",
      image: "/outdated-living-room-with-old-furniture.jpg",
      color: "from-green-50 to-green-100",
      features: ["Balanced Design", "Timeless Appeal", "Versatile Style", "Classic Elements"],
      rooms: 589,
      popularity: 85,
    },
  ]

  const transformationSteps = [
    {
      title: "Style Analysis",
      description: "AI analyzes your space and preferences",
      icon: Eye,
      progress: 100,
    },
    {
      title: "Design Generation",
      description: "Creates multiple style variations",
      icon: Sparkles,
      progress: 75,
    },
    {
      title: "Material Selection",
      description: "Chooses perfect colors and textures",
      icon: Palette,
      progress: 50,
    },
  ]

  // Auto-rotate styles
  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setActiveStyle((prev) => (prev + 1) % designStyles.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isPlaying, designStyles.length])

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        })
      }
    }

    const heroElement = heroRef.current
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove)
      return () => heroElement.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0) translateX(0)"
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    const animateElements = document.querySelectorAll(".animate-on-scroll")
    animateElements.forEach((el, index) => {
      el.style.transitionDelay = `${index * 100}ms`
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Smooth transition for active style changes
  const handleStyleChange = (index) => {
    setActiveStyle(index)
    setIsPlaying(false)
    setTimeout(() => setIsPlaying(true), 2000)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % designStyles.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + designStyles.length) % designStyles.length)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section with Dynamic Background */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic Background Layers */}
        <div className="absolute inset-0">
          {designStyles.map((style, index) => (
            <div
              key={style.id}
              className={`absolute inset-0 transition-all duration-[1500ms] ease-in-out ${
                index === activeStyle ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
              style={{
                transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
                transitionProperty: "opacity, transform, scale",
              }}
            >
              <img src={style.image || "/placeholder.svg"} alt={style.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 transition-opacity duration-1000"></div>
            </div>
          ))}
        </div>

        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full transition-all duration-1000 ease-out"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
                animation: `pulse 2s infinite ${i * 0.5}s`,
                transform: `translate(${mousePosition.x * (i + 1) * 5}px, ${mousePosition.y * (i + 1) * 5}px)`,
              }}
            ></div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="font-playfair text-5xl md:text-7xl font-light mb-6 opacity-0 translate-y-8 animate-[slideInUp_1000ms_ease-out_200ms_forwards]">
            Design Studio
          </h1>
          <p className="font-inter text-xl md:text-2xl font-light mb-8 text-white/90 opacity-0 translate-y-8 animate-[slideInUp_1000ms_ease-out_400ms_forwards]">
            Explore infinite possibilities with AI-powered interior design
          </p>

          {/* Style Indicator */}
          <div className="mb-8 opacity-0 translate-y-8 animate-[slideInUp_1000ms_ease-out_600ms_forwards]">
            <div className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 transition-all duration-300 hover:bg-white/20">
              <span className="text-sm font-light">Currently Showcasing:</span>
              <span className="font-medium transition-all duration-500">{designStyles[activeStyle].name}</span>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 opacity-0 translate-y-8 animate-[slideInUp_1000ms_ease-out_800ms_forwards]">
            <Button className="bg-white text-black hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-light transition-all duration-300 hover:scale-105 hover:shadow-2xl transform">
              Start Designing
              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              className="border-white/40 text-white hover:bg-white hover:text-black px-8 py-4 rounded-full text-lg font-light transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-transparent"
            >
              Explore Styles
            </Button>
          </div>
        </div>

        {/* Style Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {designStyles.map((_, index) => (
            <button
              key={index}
              onClick={() => handleStyleChange(index)}
              className={`w-3 h-3 rounded-full transition-all duration-500 hover:scale-125 ${
                index === activeStyle ? "bg-white scale-125 shadow-lg" : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Interactive Style Gallery */}
      <section className="py-20 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            <h2 className="font-playfair text-4xl md:text-5xl font-light mb-6 text-gray-900">
              Design Styles Collection
            </h2>
            <p className="font-inter text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our curated collection of design styles, each crafted to transform your space into something
              extraordinary
            </p>
          </div>

          {/* Style Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {designStyles.map((style, index) => (
              <div
                key={style.id}
                className="group animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 ease-out hover:scale-105 hover:-translate-y-2"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={style.image || "/placeholder.svg"}
                      alt={style.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${style.color} opacity-0 group-hover:opacity-90 transition-all duration-500 ease-out`}
                    ></div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-playfair text-xl font-medium text-gray-900 transition-colors duration-300 group-hover:text-gray-700">
                        {style.name}
                      </h3>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <span>{style.popularity}%</span>
                        <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gray-900 transition-all duration-1000 ease-out"
                            style={{ width: `${style.popularity}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <p className="font-inter text-gray-600 mb-4 transition-colors duration-300 group-hover:text-gray-700">
                      {style.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {style.features.map((feature, featureIndex) => (
                        <span
                          key={feature}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-light transition-all duration-300 hover:bg-gray-200 group-hover:scale-105"
                          style={{ transitionDelay: `${featureIndex * 50}ms` }}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 transition-colors duration-300 group-hover:text-gray-600">
                        {style.rooms} rooms designed
                      </span>
                      <Button
                        variant="ghost"
                        className="text-gray-900 hover:bg-gray-100 p-2 rounded-full transition-all duration-300 hover:scale-110"
                      >
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Transformation Showcase */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            <h2 className="font-playfair text-4xl md:text-5xl font-light mb-6 text-gray-900">See the Magic Happen</h2>
            <p className="font-inter text-xl text-gray-600 max-w-3xl mx-auto">
              Watch as our AI transforms ordinary spaces into extraordinary designs in real-time
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Transformation Slider */}
            <div className="animate-on-scroll opacity-0 translate-x-8 transition-all duration-1000 ease-out">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <div className="aspect-[4/3] relative">
                  <img
                    src={designStyles[currentSlide].image || "/placeholder.svg"}
                    alt={designStyles[currentSlide].name}
                    className="w-full h-full object-cover transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-500"></div>

                  {/* Slide Controls */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>

                  {/* Style Info Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 transition-all duration-500 ease-out">
                    <h3 className="font-playfair text-2xl font-light text-white mb-2 transition-all duration-500">
                      {designStyles[currentSlide].name}
                    </h3>
                    <p className="font-inter text-white/90 transition-all duration-500">
                      {designStyles[currentSlide].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Process Steps */}
            <div className="animate-on-scroll opacity-0 translate-x-8 transition-all duration-1000 ease-out">
              <h3 className="font-playfair text-3xl font-light mb-8 text-gray-900">AI Design Process</h3>

              <div className="space-y-6">
                {transformationSteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-1"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-inter text-lg font-medium text-gray-900 mb-2 transition-colors duration-300">
                        {step.title}
                      </h4>
                      <p className="font-inter text-gray-600 mb-3 transition-colors duration-300">{step.description}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gray-900 transition-all duration-1500 ease-out"
                          style={{ width: `${step.progress}%`, transitionDelay: `${index * 200}ms` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-4 rounded-full text-lg font-light transition-all duration-300 hover:scale-105 hover:shadow-xl transform">
                  Try AI Design Now
                  <Sparkles className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-8 lg:px-16">
          <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            <h2 className="font-playfair text-4xl md:text-5xl font-light mb-6">Ready to Transform Your Space?</h2>
            <p className="font-inter text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of homeowners who have discovered the power of AI-driven interior design
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-light transition-all duration-300 hover:scale-105 hover:shadow-2xl transform">
                Start Your Design Journey
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                className="border-white/40 text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full text-lg font-light transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-transparent"
              >
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>

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
