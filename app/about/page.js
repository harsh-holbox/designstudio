"use client"

import { useState, useEffect, useRef } from "react"
import Header from "../../components/header"
import Footer from "../../components/footer"

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState(0)
  const [isVisible, setIsVisible] = useState({})
  const observerRef = useRef()

  // Portfolio projects data
  const projects = [
    {
      id: 1,
      title: "Modern Minimalist Living",
      category: "Residential",
      client: "The Johnson Family",
      year: "2024",
      description:
        "A complete transformation of a traditional living space into a modern minimalist haven with clean lines and natural materials.",
      image: "/modern-luxury-living-room-with-contemporary-furnit.jpg",
      beforeImage: "/outdated-living-room-with-old-furniture.jpg",
      tags: ["Minimalist", "Modern", "Living Room"],
      details: {
        area: "1,200 sq ft",
        duration: "6 weeks",
        budget: "$45,000",
      },
    },
    {
      id: 2,
      title: "Luxury Master Suite",
      category: "Bedroom",
      client: "Private Residence",
      year: "2024",
      description:
        "An elegant master bedroom design featuring premium materials, custom furniture, and sophisticated lighting solutions.",
      image: "/serene-modern-bedroom-with-minimalist-design.jpg",
      beforeImage: "/cluttered-bedroom-with-mismatched-furniture.jpg",
      tags: ["Luxury", "Bedroom", "Custom"],
      details: {
        area: "800 sq ft",
        duration: "4 weeks",
        budget: "$32,000",
      },
    },
    {
      id: 3,
      title: "Contemporary Kitchen",
      category: "Kitchen",
      client: "Urban Apartment",
      year: "2024",
      description:
        "A sleek kitchen renovation with state-of-the-art appliances, custom cabinetry, and innovative storage solutions.",
      image: "/modern-kitchen-with-sleek-design-and-island.jpg",
      beforeImage: "/old-kitchen-with-dated-cabinets.jpg",
      tags: ["Contemporary", "Kitchen", "Smart Home"],
      details: {
        area: "400 sq ft",
        duration: "8 weeks",
        budget: "$55,000",
      },
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      content:
        "The AI-powered design suggestions were incredible. Our living room transformation exceeded all expectations!",
      rating: 5,
      image: "/professional-woman-smiling.png",
    },
    {
      name: "Michael Chen",
      role: "Property Developer",
      content: "Working with this platform saved us months of design iterations. The results speak for themselves.",
      rating: 5,
      image: "/professional-man-suit.png",
    },
    {
      name: "Emma Rodriguez",
      role: "Interior Designer",
      content: "As a professional designer, I'm impressed by the quality and creativity of the AI suggestions.",
      rating: 5,
      image: "/creative-woman-designer.png",
    },
  ]

  // Intersection Observer for animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.dataset.animate]: true,
            }))
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    const elements = document.querySelectorAll("[data-animate]")
    elements.forEach((el) => observerRef.current.observe(el))

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  // Auto-rotate featured projects
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % projects.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [projects.length])

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Simple company introduction section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 text-balance">
              Transforming Spaces with AI Innovation
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              We are a pioneering interior design company that combines artificial intelligence with creative expertise
              to deliver exceptional transformations. Our mission is to make beautiful, functional design accessible to
              everyone through cutting-edge technology and personalized service.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <span>Founded in 2020</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <span>AI-Powered Design</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <span>Global Reach</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Featured Project Carousel */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16" data-animate="featured-title">
            <h2
              className={`text-5xl font-bold text-black mb-6 transition-all duration-1000 ${isVisible["featured-title"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our most innovative and transformative design projects
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Main Project Display */}
            <div className="relative h-96 md:h-[600px] rounded-[3rem] overflow-hidden bg-white shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10"></div>
              <img
                src={projects[activeProject].image || "/placeholder.svg"}
                alt={projects[activeProject].title}
                className="w-full h-full object-cover transition-all duration-1000"
              />

              {/* Project Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20 text-white">
                <div className="max-w-2xl">
                  <div className="text-gray-300 font-semibold mb-2">{projects[activeProject].category}</div>
                  <h3 className="text-3xl md:text-5xl font-bold mb-4">{projects[activeProject].title}</h3>
                  <p className="text-lg md:text-xl mb-6 opacity-90">{projects[activeProject].description}</p>

                  <div className="flex flex-wrap gap-4 mb-6">
                    {projects[activeProject].tags.map((tag, index) => (
                      <span key={index} className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105">
                    View Project Details
                  </button>
                </div>
              </div>
            </div>

            {/* Project Navigation */}
            <div className="flex justify-center mt-8 space-x-4">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveProject(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === activeProject ? "bg-black scale-125" : "bg-gray-300 hover:bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16" data-animate="grid-title">
            <h2
              className={`text-5xl font-bold text-black mb-6 transition-all duration-1000 ${isVisible["grid-title"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              All Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={project.id} className="group cursor-pointer" data-animate={`project-${index}`}>
                <div
                  className={`bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 hover:scale-105 border border-gray-200 ${isVisible[`project-${index}`] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  {/* Before/After Images */}
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 flex">
                      <div className="w-1/2 relative overflow-hidden">
                        <img
                          src={project.beforeImage || "/placeholder.svg"}
                          alt="Before"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Before
                        </div>
                      </div>
                      <div className="w-1/2 relative overflow-hidden">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt="After"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          After
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-2xl font-bold mb-2">{project.title}</div>
                        <div className="text-sm opacity-90">
                          {project.category} • {project.year}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <div className="text-gray-800 text-sm font-semibold mb-2">{project.category}</div>
                    <h3 className="text-xl font-bold text-black mb-3">{project.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        {project.details.area} • {project.details.duration}
                      </div>
                      <div className="text-black font-semibold">View Details →</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials with Curvy Design */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-gray-900 to-black"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 80% 80%, 20% 80%, 0 100%)",
          }}
        ></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16" data-animate="testimonials-title">
            <h2
              className={`text-5xl font-bold text-black mb-6 transition-all duration-1000 ${isVisible["testimonials-title"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real stories from satisfied clients who transformed their spaces with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group" data-animate={`testimonial-${index}`}>
                <div
                  className={`bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-700 hover:scale-105 border border-gray-200 ${isVisible[`testimonial-${index}`] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  style={{ transitionDelay: `${index * 0.2}s` }}
                >
                  {/* Rating Stars */}
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-gray-600 mb-6 italic leading-relaxed">"{testimonial.content}"</p>

                  <div className="flex items-center">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <div className="font-semibold text-black">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-r from-black to-gray-900"
          style={{
            clipPath: "polygon(0 0, 20% 20%, 80% 20%, 100% 0, 100% 100%, 0 100%)",
          }}
        ></div>
      </section>

      <section className="py-24 bg-gradient-to-r from-gray-900 to-black text-white relative overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/5 animate-morph"></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto" data-animate="cta-content">
            <h2
              className={`text-5xl md:text-6xl font-bold mb-8 transition-all duration-1000 ${isVisible["cta-content"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl md:text-2xl mb-12 opacity-90 leading-relaxed">
              Join hundreds of satisfied clients and experience the future of interior design
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
                Start Your Project
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300 hover:scale-105">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
