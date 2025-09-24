import { Button } from "@/components/ui/button"
import Header from "./header"

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/luxury-modern-living-room-interior-design-dark-moo.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
      </div>

      <Header />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 sm:px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white mb-8 sm:mb-12 leading-[0.9] tracking-tight">
            Transform your space with an
            <br />
            <span className="font-medium italic bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              AI-powered design
            </span>
          </h2>

          <p className="font-inter text-base sm:text-lg md:text-xl text-white/80 mb-12 sm:mb-16 leading-relaxed font-light max-w-2xl mx-auto tracking-wide">
            Upload your room photos and watch our advanced AI models create
            <span className="hidden sm:inline">
              <br />
            </span>
            <span className="sm:hidden"> </span>
            stunning interior designs. Professional results in
            <span className="font-medium text-white"> minutes</span>.
          </p>

          <Button className="bg-white text-black hover:bg-gray-100 px-8 sm:px-12 lg:px-16 py-4 sm:py-6 rounded-full text-base sm:text-lg font-medium mb-12 sm:mb-16 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-white/20 border-0">
            Start Designing
          </Button>

          <p className="font-inter text-xs text-white/40 font-light tracking-widest uppercase">
            © AI-Powered Interior Design
          </p>
        </div>
      </div>
    </div>
  )
}
