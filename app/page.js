import HeroSection from "@/components/hero-section"
import DesignToolsSection from "@/components/design-tools-section"
import ImageUploadInterface from "@/components/image-upload-interface"
import AIRedesignFeatures from "@/components/ai-redesign-features"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection />
      {/* <div className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <ImageUploadInterface />
        </div>
      </div> */}
      <DesignToolsSection />
      <AIRedesignFeatures />
      <Footer />
    </div>
  )
}
