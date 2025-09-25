"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Upload,
  Sparkles,
  Download,
  Eye,
  Wand2,
  Loader2,
  LogOut,
  Home,
  ArrowLeft,
  ArrowRight,
  Check,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function PlaygroundPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedElements, setSelectedElements] = useState({})
  const [customizations, setCustomizations] = useState({})
  const [accessories, setAccessories] = useState([])
  const [prompt, setPrompt] = useState("")
  const [uploadedImage, setUploadedImage] = useState(null)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [designTheme, setDesignTheme] = useState("")
  const [roomType, setRoomType] = useState("")
  const [generatedImage, setGeneratedImage] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)
  const router = useRouter()

  const categories = [
    { id: "interior", name: "Interior Design", image: "/modern-living-room.png" },
    { id: "exterior", name: "Exterior Design", image: "/modern-house-exterior.png" },
    { id: "terrace", name: "Terrace", image: "/beautiful-terrace-design.jpg" },
    { id: "garden", name: "Lawn & Garden", image: "/landscaped-garden.png" },
    { id: "balcony", name: "Balcony", image: "/modern-balcony-design.jpg" },
    { id: "office", name: "Office/Workspace", image: "/modern-office.png" },
  ]

  const elements = {
    ceiling: [
      { id: "modern", name: "Modern", image: "/modern-ceiling-design.jpg" },
      { id: "rustic", name: "Rustic", image: "/rustic-wooden-ceiling.jpg" },
      { id: "false", name: "False Ceiling", image: "/false-ceiling-design.jpg" },
      { id: "chandelier", name: "Chandelier Ready", image: "/ceiling-with-chandelier.jpg" },
    ],
    flooring: [
      { id: "wood", name: "Wood", image: "/wooden-flooring.jpg" },
      { id: "marble", name: "Marble", image: "/marble-flooring.png" },
      { id: "tile", name: "Tile", image: "/ceramic-tile-flooring.jpg" },
      { id: "carpet", name: "Carpet", image: "/luxury-carpet-flooring.jpg" },
    ],
    furniture: [
      { id: "minimalist", name: "Minimalist", image: "/minimalist-furniture.png" },
      { id: "luxury", name: "Luxury", image: "/luxury-furniture.png" },
      { id: "modular", name: "Modular", image: "/modular-furniture.png" },
      { id: "vintage", name: "Vintage", image: "/vintage-furniture-collection.png" },
    ],
    walls: [
      { id: "paint", name: "Paint", image: "/painted-walls.png" },
      { id: "wallpaper", name: "Wallpaper", image: "/placeholder-ilh9b.png" },
      { id: "texture", name: "Texture", image: "/textured-wall.jpg" },
      { id: "stone", name: "Stone", image: "/stone-wall.jpg" },
    ],
  }

  const accessoryCategories = [
    { id: "lighting", name: "Lighting", items: ["Pendant Lights", "Floor Lamps", "Table Lamps", "Chandeliers"] },
    { id: "rugs", name: "Rugs", items: ["Persian Rugs", "Modern Rugs", "Vintage Rugs", "Geometric Rugs"] },
    {
      id: "curtains",
      name: "Curtains",
      items: ["Sheer Curtains", "Blackout Curtains", "Linen Curtains", "Velvet Curtains"],
    },
    { id: "art", name: "Wall Art", items: ["Abstract Art", "Photography", "Paintings", "Sculptures"] },
    { id: "plants", name: "Plants", items: ["Indoor Plants", "Succulents", "Large Plants", "Hanging Plants"] },
    { id: "decor", name: "Décor Items", items: ["Vases", "Candles", "Books", "Decorative Objects"] },
  ]

  const designThemes = [
    { value: "modern", label: "Modern" },
    { value: "rustic", label: "Rustic" },
    { value: "minimalist", label: "Minimalist" },
    { value: "coastal", label: "Coastal" },
    { value: "industrial", label: "Industrial" },
  ]

  const roomTypes = [
    { value: "living room", label: "Living Room" },
    { value: "bedroom", label: "Bedroom" },
    { value: "kitchen", label: "Kitchen" },
    { value: "bathroom", label: "Bathroom" },
    { value: "office", label: "Office" },
  ]

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => setUploadedImage(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleLogout = () => {
    router.push("/")
  }

  const handleGenerate = async () => {
    if (!uploadedFile) {
      setError("Please upload an image first")
      return
    }

    if (!roomType) {
      setError("Please select a room type")
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("room_image", uploadedFile)
      formData.append("room_type", roomType)

      if (designTheme) {
        formData.append("design_theme", designTheme)
      } else if (prompt.trim()) {
        formData.append("design_theme", prompt.trim())
      }

      const response = await fetch("http://34.239.218.9:8000/api/demo_backend_v2/generate_interior_design", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const blob = await response.blob()
      const imageUrl = URL.createObjectURL(blob)
      setGeneratedImage(imageUrl)
    } catch (error) {
      setError(`Failed to generate design: ${error.message}`)
    } finally {
      setIsGenerating(false)
    }
  }

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const selectCategory = (categoryId) => {
    setSelectedCategory(categoryId)
    nextStep()
  }

  const selectElement = (type, elementId) => {
    setSelectedElements((prev) => ({ ...prev, [type]: elementId }))
  }

  const toggleAccessory = (accessory) => {
    setAccessories((prev) =>
      prev.includes(accessory) ? prev.filter((item) => item !== accessory) : [...prev, accessory],
    )
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {[1, 2, 3, 4, 5].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
              step === currentStep
                ? "bg-white text-black border-white"
                : step < currentStep
                  ? "bg-white/20 text-white border-white/40"
                  : "bg-transparent text-gray-400 border-gray-600"
            }`}
          >
            {step < currentStep ? <Check className="w-5 h-5" /> : step}
          </div>
          {step < 5 && (
            <div
              className={`w-12 h-0.5 mx-2 transition-all duration-300 ${
                step < currentStep ? "bg-white/40" : "bg-gray-600"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )

  const renderStep1 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Choose Your Design Space</h2>
        <p className="text-gray-400 text-lg">Select the area you want to transform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => selectCategory(category.id)}
            className="group relative overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <Button className="bg-white text-black hover:bg-gray-100 rounded-xl">Select</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Select Design Elements</h2>
        <p className="text-gray-400 text-lg">Choose the key elements for your space</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          {Object.entries(elements).map(([type, items]) => (
            <div key={type} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white mb-4 capitalize">{type}</h3>
              <div className="grid grid-cols-2 gap-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => selectElement(type, item.id)}
                    className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 ${
                      selectedElements[type] === item.id ? "ring-2 ring-white shadow-lg" : "hover:scale-105"
                    }`}
                  >
                    <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-24 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white text-sm font-medium">{item.name}</p>
                    </div>
                    {selectedElements[type] === item.id && (
                      <div className="absolute top-2 right-2">
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-black" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
          <h3 className="text-xl font-semibold text-white mb-4">Live Preview</h3>
          <div className="bg-white/5 rounded-xl h-96 flex items-center justify-center border-2 border-dashed border-white/20">
            <div className="text-center">
              <Eye className="w-12 h-12 text-white/40 mx-auto mb-4" />
              <p className="text-gray-400">Preview will update as you select elements</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          onClick={prevStep}
          variant="outline"
          className="rounded-xl bg-white/5 border-white/20 text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={nextStep} className="bg-white text-black hover:bg-gray-100 rounded-xl">
          Next Step
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Customize Details</h2>
        <p className="text-gray-400 text-lg">Fine-tune your design preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
            <h3 className="text-lg font-semibold text-white mb-4">Design Theme</h3>
            <Select value={designTheme} onValueChange={setDesignTheme}>
              <SelectTrigger className="bg-white/5 border-white/20 rounded-xl text-white">
                <SelectValue placeholder="Select design theme" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/20 rounded-xl">
                {designThemes.map((theme) => (
                  <SelectItem key={theme.value} value={theme.value} className="text-white hover:bg-white/10">
                    {theme.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
            <h3 className="text-lg font-semibold text-white mb-4">Room Type</h3>
            <Select value={roomType} onValueChange={setRoomType}>
              <SelectTrigger className="bg-white/5 border-white/20 rounded-xl text-white">
                <SelectValue placeholder="Select room type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/20 rounded-xl">
                {roomTypes.map((room) => (
                  <SelectItem key={room.value} value={room.value} className="text-white hover:bg-white/10">
                    {room.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
            <h3 className="text-lg font-semibold text-white mb-4">Custom Prompt</h3>
            <Textarea
              placeholder="Describe additional preferences..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="bg-white/5 border-white/20 rounded-xl text-white placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
          <h3 className="text-lg font-semibold text-white mb-4">Upload Room Image</h3>
          <div
            className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer hover:border-white/40 transition-all duration-300"
            onClick={() => fileInputRef.current?.click()}
          >
            {uploadedImage ? (
              <div className="space-y-3">
                <img
                  src={uploadedImage || "/placeholder.svg"}
                  alt="Uploaded"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p className="text-sm text-gray-400">Click to change image</p>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-12 h-12 text-white/40 mx-auto" />
                <div>
                  <p className="text-white font-medium">Upload room image</p>
                  <p className="text-gray-400 text-sm">PNG, JPG up to 10MB</p>
                </div>
              </div>
            )}
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          onClick={prevStep}
          variant="outline"
          className="rounded-xl bg-white/5 border-white/20 text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={nextStep} className="bg-white text-black hover:bg-gray-100 rounded-xl">
          Next Step
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Add Accessories & Décor</h2>
        <p className="text-gray-400 text-lg">Personalize your space with finishing touches</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accessoryCategories.map((category) => (
          <div key={category.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
            <h3 className="text-lg font-semibold text-white mb-4">{category.name}</h3>
            <div className="space-y-2">
              {category.items.map((item) => (
                <div
                  key={item}
                  onClick={() => toggleAccessory(item)}
                  className={`p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                    accessories.includes(item)
                      ? "bg-white/20 border border-white/30"
                      : "bg-white/5 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">{item}</span>
                    {accessories.includes(item) && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button
          onClick={prevStep}
          variant="outline"
          className="rounded-xl bg-white/5 border-white/20 text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={nextStep} className="bg-white text-black hover:bg-gray-100 rounded-xl">
          Final Preview
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )

  const renderStep5 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Final Preview & Generate</h2>
        <p className="text-gray-400 text-lg">Review your selections and generate your design</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
          <h3 className="text-lg font-semibold text-white mb-4">Design Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Category:</span>
              <span className="text-white capitalize">{selectedCategory}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Room Type:</span>
              <span className="text-white">{roomType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Design Theme:</span>
              <span className="text-white">{designTheme}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Elements:</span>
              <span className="text-white">{Object.keys(selectedElements).length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Accessories:</span>
              <span className="text-white">{accessories.length}</span>
            </div>
          </div>

          {error && (
            <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-xl p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !uploadedFile || !roomType}
            className="w-full mt-6 h-12 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300"
          >
            {isGenerating ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Wand2 className="w-4 h-4" />
                <span>Generate Design</span>
              </div>
            )}
          </Button>
        </div>

        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Design Preview</h3>
            {generatedImage && (
              <Button variant="outline" className="rounded-xl bg-white/5 border-white/20 text-white hover:bg-white/10">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            )}
          </div>

          <div className="bg-white/5 rounded-xl p-8 min-h-[400px] flex items-center justify-center border-2 border-dashed border-white/20">
            {isGenerating ? (
              <div className="text-center space-y-4">
                <Wand2 className="w-16 h-16 text-white animate-spin mx-auto" />
                <div>
                  <h4 className="text-2xl font-semibold text-white mb-2">Creating Your Design</h4>
                  <p className="text-gray-400">AI is generating your perfect interior...</p>
                </div>
              </div>
            ) : generatedImage ? (
              <div className="w-full">
                <img
                  src={generatedImage || "/placeholder.svg"}
                  alt="Generated Design"
                  className="w-full h-96 object-cover rounded-xl"
                />
                <div className="mt-4 text-center">
                  <h4 className="text-xl font-semibold text-white">Your AI-Generated Design</h4>
                  <p className="text-gray-400">Created with your specifications</p>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <Sparkles className="w-20 h-20 text-white/40 mx-auto" />
                <div>
                  <h4 className="text-2xl font-semibold text-white mb-2">Ready to Generate</h4>
                  <p className="text-gray-400">Click generate to create your perfect design</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          onClick={prevStep}
          variant="outline"
          className="rounded-xl bg-white/5 border-white/20 text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex space-x-3">
          <Button
            onClick={() => setCurrentStep(1)}
            variant="outline"
            className="rounded-xl bg-white/5 border-white/20 text-white hover:bg-white/10"
          >
            Start Over
          </Button>
        </div>
      </div>
    </div>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1()
      case 2:
        return renderStep2()
      case 3:
        return renderStep3()
      case 4:
        return renderStep4()
      case 5:
        return renderStep5()
      default:
        return renderStep1()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="border-b border-white/10 bg-black/30 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                <Wand2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">AI Design Studio</h1>
                <p className="text-sm text-gray-400">Step-by-Step Design Experience</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="rounded-xl bg-white/5 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="rounded-xl bg-white/5 border-white/20 text-white hover:bg-red-500/20 hover:border-red-500/30 backdrop-blur-sm transition-all duration-300"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        {renderStepIndicator()}

        {renderCurrentStep()}
      </div>
    </div>
  )
}
