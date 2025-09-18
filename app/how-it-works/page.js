"use client"

import { useState, useEffect, useRef } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Upload, Sparkles, Eye, Download, ArrowRight, Play, Pause, RotateCcw } from "lucide-react"

export default function HowItWorksPage() {
  const [scrollY, setScrollY] = useState(0)
  const [visibleSections, setVisibleSections] = useState(new Set())
  const [activeTransformation, setActiveTransformation] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const transformationRef = useRef(null)
  const heroRef = useRef(null)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      })
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleSections((prev) => new Set([...prev, entry.target.id]))
            }, 100)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    const sections = document.querySelectorAll("[data-animate]")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setActiveTransformation((prev) => (prev + 1) % transformations.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const transformations = [
    {
      id: "living-room",
      before: "/outdated-living-room-with-old-furniture.jpg",
      after: "/modern-luxury-living-room-with-contemporary-furnit.jpg",
      title: "Living Room Transformation",
      description: "From outdated to contemporary luxury",
      color: "#6B7280",
    },
    {
      id: "bedroom",
      before: "/cluttered-bedroom-with-mismatched-furniture.jpg",
      after: "/serene-modern-bedroom-with-minimalist-design.jpg",
      title: "Bedroom Makeover",
      description: "Creating a serene sanctuary",
      color: "#6B7280",
    },
    {
      id: "kitchen",
      before: "/old-kitchen-with-dated-cabinets.jpg",
      after: "/modern-kitchen-with-sleek-design-and-island.jpg",
      title: "Kitchen Revolution",
      description: "Culinary space reimagined",
      color: "#6B7280",
    },
  ]

  const processSteps = [
    {
      id: "capture",
      icon: Upload,
      image: "/outdated-living-room-with-old-furniture.jpg",
      title: "Capture Your Vision",
      subtitle: "Upload & Analyze",
      description:
        "Our advanced AI instantly analyzes your space's dimensions, lighting conditions, and architectural features to understand your unique environment with precision.",
      features: ["3D Space Mapping", "Light Analysis", "Style Recognition", "Room Classification"],
      gradient: "from-gray-600 to-gray-700",
      delay: 0,
    },
    {
      id: "generate",
      icon: Sparkles,
      image: "/modern-luxury-living-room-with-contemporary-furnit.jpg",
      title: "AI Magic Happens",
      subtitle: "Design & Create",
      description:
        "Sophisticated algorithms generate multiple design concepts perfectly tailored to your preferences, budget constraints, and lifestyle requirements.",
      features: ["Style Matching", "Budget Optimization", "Trend Integration", "Personal Curation"],
      gradient: "from-gray-600 to-gray-700",
      delay: 200,
    },
    {
      id: "visualize",
      icon: Eye,
      image: "/--step-visual-.jpg",
      title: "See the Future",
      subtitle: "Preview & Refine",
      description:
        "Experience stunning photorealistic renderings of your transformed space with real-time customization capabilities and immersive visualization.",
      features: ["4K Rendering", "Virtual Walkthrough", "Real-time Edits", "Multiple Angles"],
      gradient: "from-gray-600 to-gray-700",
      delay: 400,
    },
    {
      id: "implement",
      icon: Download,
      image: "/luxury-interior-design-studio-with-modern-furnitur.jpg",
      title: "Make It Real",
      subtitle: "Execute & Enjoy",
      description:
        "Receive comprehensive implementation guides, detailed shopping lists, and professional support to seamlessly bring your vision to life.",
      features: ["Detailed Plans", "Shopping Lists", "Timeline Guide", "Expert Support"],
      gradient: "from-gray-600 to-gray-700",
      delay: 600,
    },
  ]

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <div ref={heroRef} className="relative min-h-screen flex flex-col">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-br from-gray-500 via-white to-gray-10 transition-all duration-1000 ease-out"
            style={{
              transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0003})`,
            }}
          />

          <div
            className="absolute inset-0 opacity-10 transition-all duration-1000 ease-out"
            style={{
              backgroundImage: `url('${transformations[activeTransformation].after}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: `translateY(${scrollY * 0.3}px) scale(${1 + scrollY * 0.0002}) translateX(${mousePosition.x * 10}px)`,
              filter: `blur(${Math.min(scrollY * 0.008, 6)}px) brightness(${1 + mousePosition.y * 0.1})`,
            }}
          />

          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-gray-400 rounded-full animate-pulse"
                style={{
                  left: `${15 + i * 8}%`,
                  top: `${20 + (i % 3) * 30}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${2 + i * 0.2}s`,
                  transform: `translateY(${scrollY * (0.1 + i * 0.02)}px) translateX(${mousePosition.x * (i * 2)}px)`,
                  opacity: Math.max(0.1, 1 - scrollY / 800),
                }}
              />
            ))}
          </div>

          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/40"
            style={{
              opacity: Math.min(1, scrollY / 400),
            }}
          />
        </div>

        <Header />

        <div className="flex-1 flex items-center justify-center px-4 sm:px-8 lg:px-16 relative z-10">
          <div
            className="text-center max-w-6xl mx-auto"
            style={{
              transform: `translateY(${scrollY * 0.1}px) translateX(${mousePosition.x * 5}px)`,
              opacity: Math.max(0, 1 - scrollY / 600),
            }}
          >
            <div className="mb-8 lg:mb-12">
              <span className="inline-block px-8 py-3 bg-gray-100 backdrop-blur-md rounded-full text-gray-700 text-sm lg:text-base font-light tracking-[0.2em] uppercase mb-6 border border-gray-200 transition-all duration-700 hover:bg-gray-200 hover:scale-105">
                The Future of Interior Design
              </span>
            </div>

            <h1 className="font-playfair text-5xl sm:text-7xl lg:text-9xl font-light text-gray-900 mb-8 lg:mb-12 leading-[0.85] tracking-tight">
              <span className="inline-block transition-all duration-1000 ease-out" style={{ transitionDelay: "0ms" }}>
                How
              </span>{" "}
              <span className="inline-block transition-all duration-1000 ease-out" style={{ transitionDelay: "200ms" }}>
                It
              </span>
              <span
                className="block bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent transition-all duration-1000 ease-out"
                style={{ transitionDelay: "400ms" }}
              >
                Works
              </span>
            </h1>

            <p className="font-inter text-xl sm:text-2xl lg:text-3xl text-gray-600 font-light leading-relaxed max-w-5xl mx-auto mb-12 lg:mb-16">
              Experience the revolutionary process that transforms ordinary spaces into extraordinary environments
              through AI-powered design
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button className="group bg-gray-900 text-white hover:bg-gray-800 px-12 lg:px-20 py-5 lg:py-7 rounded-full text-lg lg:text-xl font-light shadow-2xl transition-all duration-700 hover:scale-110 hover:shadow-gray-900/30 relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Begin Transformation
                  <ArrowRight className="ml-3 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </Button>

              <Button
                variant="outline"
                className="group border-gray-300 text-gray-700 hover:bg-gray-50 px-10 lg:px-16 py-5 lg:py-7 rounded-full text-lg lg:text-xl font-light backdrop-blur-md transition-all duration-700 bg-transparent hover:border-gray-400"
              >
                <span className="flex items-center">
                  Watch Demo
                  <Play className="ml-3 w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                </span>
              </Button>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-500 transition-all duration-500"
          style={{ opacity: Math.max(0, 1 - scrollY / 300) }}
        >
          <div className="flex flex-col items-center space-y-3 animate-bounce">
            <span className="text-sm font-light tracking-[0.15em] uppercase">Scroll to Explore</span>
            <div className="w-px h-12 bg-gradient-to-b from-gray-400 to-transparent" />
          </div>
        </div>
      </div>
      <div
        className="py-24 lg:py-40 px-4 sm:px-8 lg:px-16 bg-gradient-to-b from-white via-gray-50 to-white relative"
        id="showcase"
        data-animate
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gray-300 rounded-full filter blur-3xl animate-pulse" />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-gray-400 rounded-full filter blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 lg:mb-32">
            <div
              className={`transition-all duration-1200 ease-out ${
                visibleSections.has("showcase") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="font-playfair text-4xl sm:text-6xl lg:text-8xl font-light text-gray-900 mb-8 tracking-tight">
                Witness the
                <span className="block bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent">
                  Transformation
                </span>
              </h2>
              <p className="font-inter text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                See real spaces transformed by our advanced AI technology with photorealistic precision
              </p>
            </div>
          </div>

          <div className="relative" ref={transformationRef}>
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-white border border-gray-200">
              {transformations.map((transformation, index) => (
                <div
                  key={transformation.id}
                  className={`absolute inset-0 transition-all duration-1500 ease-in-out ${
                    index === activeTransformation ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0"
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                    <div className="relative overflow-hidden group">
                      <img
                        src={transformation.before || "/placeholder.svg"}
                        alt="Before transformation"
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-transparent" />
                      <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full border border-gray-200">
                        <span className="text-gray-700 text-sm font-light tracking-wide">Before</span>
                      </div>
                    </div>

                    <div className="relative overflow-hidden group">
                      <img
                        src={transformation.after || "/placeholder.svg"}
                        alt="After transformation"
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/10 to-transparent" />
                      <div className="absolute top-6 right-6 bg-gray-900 backdrop-blur-md px-6 py-3 rounded-full border border-gray-700">
                        <span className="text-white text-sm font-light tracking-wide">After</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl p-4 flex items-center space-x-3 border border-gray-200">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-3 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:scale-110"
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5 text-gray-700" />
                        ) : (
                          <Play className="w-5 h-5 text-gray-700" />
                        )}
                      </button>
                      <button
                        onClick={() => setActiveTransformation(0)}
                        className="p-3 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:scale-110"
                      >
                        <RotateCcw className="w-5 h-5 text-gray-700" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8 space-x-3">
              {transformations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTransformation(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    index === activeTransformation
                      ? "bg-gray-900 scale-125 shadow-lg"
                      : "bg-gray-300 hover:bg-gray-400 hover:scale-110"
                  }`}
                />
              ))}
            </div>

            <div className="text-center mt-12">
              <div
                className={`transition-all duration-700 ease-out ${
                  visibleSections.has("showcase") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <h3 className="font-playfair text-2xl lg:text-4xl font-light text-gray-900 mb-3">
                  {transformations[activeTransformation].title}
                </h3>
                <p className="font-inter text-lg text-gray-600">{transformations[activeTransformation].description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-24 lg:py-40 px-4 sm:px-8 lg:px-16 bg-gradient-to-b from-white to-gray-50 relative">
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 gap-4 h-full">
            {[...Array(48)].map((_, i) => (
              <div key={i} className="border-l border-gray-200" />
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24 lg:mb-40">
            <div
              className={`transition-all duration-1200 ease-out ${
                visibleSections.has("showcase") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="font-playfair text-4xl sm:text-6xl lg:text-8xl font-light text-gray-900 mb-8 tracking-tight">
                The Journey
                <span className="block bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent">
                  Unfolds
                </span>
              </h2>
              <p className="font-inter text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Four revolutionary steps to transform your space with unprecedented precision and style
              </p>
            </div>
          </div>

          <div className="space-y-32 lg:space-y-56">
            {processSteps.map((step, index) => {
              const isVisible = visibleSections.has(step.id)
              const isEven = index % 2 === 0

              return (
                <div key={step.id} id={step.id} data-animate className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -top-20 z-30">
                    <div
                      className={`w-20 h-20 lg:w-28 lg:h-28 rounded-full bg-gradient-to-r ${step.gradient} flex items-center justify-center shadow-2xl transition-all duration-1500 ease-out ${
                        isVisible ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-180 opacity-0"
                      }`}
                      style={{ transitionDelay: `${step.delay}ms` }}
                    >
                      <span className="font-playfair text-2xl lg:text-4xl font-light text-white">{index + 1}</span>
                    </div>
                  </div>

                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center ${
                      isEven ? "" : "lg:grid-flow-col-dense"
                    }`}
                  >
                    <div className={`space-y-8 lg:space-y-12 ${isEven ? "" : "lg:col-start-2"}`}>
                      <div
                        className={`transition-all duration-1500 ease-out ${
                          isVisible
                            ? "opacity-100 translate-x-0"
                            : `opacity-0 ${isEven ? "translate-x-[-80px]" : "translate-x-[80px]"}`
                        }`}
                        style={{ transitionDelay: `${step.delay + 200}ms` }}
                      >
                        <div className="flex items-center space-x-6 mb-8">
                          <div
                            className={`w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r ${step.gradient} rounded-2xl flex items-center justify-center shadow-xl`}
                          >
                            <step.icon className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                          </div>
                          <div>
                            <span className="font-inter text-sm lg:text-base text-gray-500 font-medium tracking-[0.2em] uppercase block mb-2">
                              {step.subtitle}
                            </span>
                            <h3 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 leading-tight">
                              {step.title}
                            </h3>
                          </div>
                        </div>

                        <p className="font-inter text-lg lg:text-xl text-gray-600 leading-relaxed mb-10">
                          {step.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                          {step.features.map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className={`group flex items-center space-x-4 p-5 bg-gray-50 backdrop-blur-sm rounded-xl border border-gray-200 transition-all duration-700 ease-out hover:bg-gray-100 hover:border-gray-300 hover:scale-105 ${
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                              }`}
                              style={{ transitionDelay: `${step.delay + 400 + featureIndex * 100}ms` }}
                            >
                              <div
                                className={`w-3 h-3 bg-gradient-to-r ${step.gradient} rounded-full flex-shrink-0 group-hover:scale-125 transition-transform duration-300`}
                              />
                              <span className="font-inter text-sm lg:text-base text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className={`${isEven ? "" : "lg:col-start-1"}`}>
                      <div
                        className={`transition-all duration-1500 ease-out ${
                          isVisible
                            ? "opacity-100 translate-y-0 scale-100 rotate-0"
                            : "opacity-0 translate-y-12 scale-95 rotate-2"
                        }`}
                        style={{ transitionDelay: `${step.delay + 600}ms` }}
                      >
                        <div className="relative group">
                          <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 via-gray-50 to-white rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-700 group-hover:scale-105 group-hover:shadow-3xl border border-gray-200">
                            <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-10`} />

                            <div className="absolute inset-0 opacity-20">
                              <div className="grid grid-cols-8 grid-rows-6 gap-2 p-8 h-full">
                                {[...Array(48)].map((_, i) => (
                                  <div
                                    key={i}
                                    className={`bg-gradient-to-br ${step.gradient} rounded-sm opacity-30 transition-all duration-500 group-hover:opacity-60`}
                                    style={{
                                      animationDelay: `${i * 50}ms`,
                                      transform: `scale(${0.8 + (i % 3) * 0.1})`,
                                    }}
                                  />
                                ))}
                              </div>
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="relative w-full h-full">
                                <img
                                  src={step.image || "/placeholder.svg"}
                                  alt={step.title}
                                  className="w-full h-full object-cover rounded-3xl"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-transparent rounded-3xl" />
                              </div>
                            </div>

                            <div
                              className={`absolute top-6 right-6 w-4 h-4 bg-gradient-to-r ${step.gradient} rounded-full opacity-60 animate-pulse`}
                            />
                            <div
                              className={`absolute bottom-8 left-8 w-6 h-6 bg-gradient-to-r ${step.gradient} rounded-full opacity-40 animate-pulse`}
                              style={{ animationDelay: "1s" }}
                            />
                          </div>

                          <div
                            className={`absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r ${step.gradient} rounded-full opacity-20 animate-pulse group-hover:scale-125 transition-transform duration-500`}
                          />
                          <div
                            className={`absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r ${step.gradient} rounded-full opacity-30 animate-pulse group-hover:scale-125 transition-transform duration-500`}
                            style={{ animationDelay: "0.5s" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="relative py-32 lg:py-48 px-4 sm:px-8 lg:px-16 overflow-hidden" id="cta" data-animate>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-white" />
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full bg-gradient-to-br from-gray-900/20 to-transparent transition-all duration-1000"
            style={{
              backgroundImage: "url('/luxury-interior-design-studio-with-modern-furnitur.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: `scale(${1 + scrollY * 0.0001}) translateX(${mousePosition.x * 5}px)`,
            }}
          />
        </div>

        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gray-400 rounded-full animate-pulse"
              style={{
                left: `${5 + i * 6}%`,
                top: `${10 + (i % 4) * 25}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${2 + i * 0.2}s`,
                opacity: 0.1 + (i % 3) * 0.1,
                transform: `translateY(${Math.sin(i) * 20}px) scale(${0.5 + (i % 3) * 0.5})`,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div
            className={`transition-all duration-1500 ease-out ${
              visibleSections.has("cta") ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-16 scale-95"
            }`}
          >
            <h2 className="font-playfair text-4xl sm:text-6xl lg:text-9xl font-light text-gray-900 mb-8 lg:mb-16 leading-[0.85] tracking-tight">
              <span className="inline-block transition-all duration-1000 ease-out" style={{ transitionDelay: "200ms" }}>
                Ready
              </span>
              <span className="block transition-all duration-1000 ease-out" style={{ transitionDelay: "400ms" }}>
                to Transform?
              </span>
            </h2>

            <p
              className="font-inter text-xl lg:text-3xl text-gray-600 mb-16 lg:mb-20 leading-relaxed max-w-4xl mx-auto transition-all duration-1000 ease-out"
              style={{ transitionDelay: "600ms" }}
            >
              Join thousands of satisfied clients who have revolutionized their spaces with our AI-powered design
              technology
            </p>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Button
                className="group bg-gray-900 text-white hover:bg-gray-800 px-16 lg:px-24 py-6 lg:py-8 rounded-full text-xl lg:text-2xl font-light shadow-2xl transition-all duration-700 hover:scale-110 hover:shadow-gray-900/40 relative overflow-hidden"
                style={{ transitionDelay: "800ms" }}
              >
                <span className="relative z-10 flex items-center">
                  Start Your Journey
                  <ArrowRight className="ml-4 w-7 h-7 transition-transform duration-300 group-hover:translate-x-2" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </Button>

              <Button
                variant="outline"
                className="group border-gray-300 text-gray-700 hover:bg-gray-50 px-12 lg:px-20 py-6 lg:py-8 rounded-full text-xl lg:text-2xl font-light backdrop-blur-md transition-all duration-700 bg-transparent hover:border-gray-400 hover:scale-105"
                style={{ transitionDelay: "1000ms" }}
              >
                <span className="flex items-center">
                  Explore Gallery
                  <Eye className="ml-4 w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                </span>
              </Button>
            </div>

            <div className="mt-20 lg:mt-24 flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-12 text-gray-500 text-sm lg:text-base font-light">
              <div className="flex items-center space-x-3 transition-all duration-500 hover:text-gray-700">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>10,000+ Transformations</span>
              </div>
              <div className="flex items-center space-x-3 transition-all duration-500 hover:text-gray-700">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span>98% Satisfaction Rate</span>
              </div>
              <div className="flex items-center space-x-3 transition-all duration-500 hover:text-gray-700">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                <span>24/7 AI Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
