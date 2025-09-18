import { Button } from "@/components/ui/button"
import { Upload, Palette, Sparkles, Download, Eye, Wand2 } from "lucide-react"

export default function DesignToolsSection() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white text-black min-h-screen">
      {/* Top section with design focus */}
      <div className="text-center py-12 bg-gradient-to-b from-white to-gray-50">
        <p className="text-gray-500 mb-4 text-lg font-light">Transform any room with AI-powered design</p>
        <button className="text-black font-semibold flex items-center mx-auto hover:text-gray-600 transition-colors duration-200 text-lg group">
          Explore design styles
          <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">→</span>
        </button>
      </div>

      {/* Main Design Tools Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-white shadow-2xl border border-gray-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-gray-800 gap-4 sm:gap-0">
            <div>
              <h1 className="font-playfair text-2xl sm:text-3xl font-light mb-2">Design Studio</h1>
              <p className="text-gray-400 font-inter text-sm sm:text-base">
                Upload, transform, and download your redesigned spaces
              </p>
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Button className="bg-white text-black hover:bg-gray-100 px-4 sm:px-6 py-2 rounded-full font-medium text-sm sm:text-base flex-1 sm:flex-none">
                <Upload className="w-4 h-4 mr-2" />
                Upload Room
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Upload Section */}
            <div className="lg:col-span-1">
              <h2 className="font-playfair text-lg sm:text-xl font-light mb-4 sm:mb-6 text-white">Upload & Analyze</h2>

              <div className="space-y-4">
                <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <Upload className="w-5 h-5 text-white" />
                    <span className="font-inter font-medium">Room Photos</span>
                  </div>
                  <p className="text-gray-400 text-sm">Upload multiple angles of your room for best results</p>
                </div>

                <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <Eye className="w-5 h-5 text-white" />
                    <span className="font-inter font-medium">AI Analysis</span>
                  </div>
                  <p className="text-gray-400 text-sm">Our AI identifies furniture, layout, and style opportunities</p>
                </div>

                <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <Palette className="w-5 h-5 text-white" />
                    <span className="font-inter font-medium">Style Selection</span>
                  </div>
                  <p className="text-gray-400 text-sm">Choose from modern, minimalist, luxury, and more</p>
                </div>
              </div>
            </div>

            {/* Main Design Area */}
            <div className="lg:col-span-2">
              <h2 className="font-playfair text-lg sm:text-xl font-light mb-4 sm:mb-6 text-white">Design Preview</h2>

              {/* Design Canvas */}
              <div className="bg-gray-800/30 rounded-2xl p-4 sm:p-8 border border-gray-700 mb-4 sm:mb-6 min-h-[300px] sm:min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 sm:w-24 h-16 sm:h-24 bg-gray-700 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Wand2 className="w-8 sm:w-12 h-8 sm:h-12 text-gray-400" />
                  </div>
                  <h3 className="font-playfair text-xl sm:text-2xl font-light mb-2">Ready to Transform</h3>
                  <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
                    Upload a room photo to see AI-powered design suggestions
                  </p>
                  <Button className="bg-white text-black hover:bg-gray-100 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base">
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Photo
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer">
                  <div className="w-full h-16 sm:h-20 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg mb-2 sm:mb-3"></div>
                  <p className="text-xs sm:text-sm font-medium">Modern</p>
                  <p className="text-xs text-gray-400">Clean & minimal</p>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer">
                  <div className="w-full h-16 sm:h-20 bg-gradient-to-br from-amber-600 to-orange-700 rounded-lg mb-2 sm:mb-3"></div>
                  <p className="text-xs sm:text-sm font-medium">Luxury</p>
                  <p className="text-xs text-gray-400">Premium finishes</p>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer">
                  <div className="w-full h-16 sm:h-20 bg-gradient-to-br from-green-600 to-emerald-700 rounded-lg mb-2 sm:mb-3"></div>
                  <p className="text-xs sm:text-sm font-medium">Scandinavian</p>
                  <p className="text-xs text-gray-400">Light & natural</p>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer">
                  <div className="w-full h-16 sm:h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg mb-2 sm:mb-3"></div>
                  <p className="text-xs sm:text-sm font-medium">Industrial</p>
                  <p className="text-xs text-gray-400">Raw & edgy</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-800 gap-4 sm:gap-0">
            <div className="flex items-center gap-3 sm:gap-4">
              <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
              <span className="text-gray-400 font-inter text-sm sm:text-base">
                AI-powered transformations ready in seconds
              </span>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-800 bg-transparent flex-1 sm:flex-none text-sm sm:text-base"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button className="bg-white text-black hover:bg-gray-100 flex-1 sm:flex-none text-sm sm:text-base">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
