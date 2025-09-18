"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Sparkles, Download, Eye, Wand2, ImageIcon, Settings, Play, Loader2, LogOut, Home } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PlaygroundPage() {
  const [prompt, setPrompt] = useState("")
  const [uploadedImage, setUploadedImage] = useState(null)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [designTheme, setDesignTheme] = useState("") // Added design theme state
  const [roomType, setRoomType] = useState("") // Added room type state
  const [generatedImage, setGeneratedImage] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)
  const router = useRouter()

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
      formData.append("room_type", roomType) // Use selected room type

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
                <p className="text-sm text-gray-400">Professional Interior Design Generator</p>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:bg-white/8 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-white">Custom Prompt</h2>
              </div>
              <Textarea
                placeholder="Describe your vision... (optional if design theme is selected)"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px] bg-white/5 border-white/20 rounded-xl resize-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-300 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:bg-white/8 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-white">Design Theme</h2>
              </div>
              <Select value={designTheme} onValueChange={setDesignTheme}>
                <SelectTrigger className="bg-white/5 border-white/20 rounded-xl text-white focus:ring-2 focus:ring-white/30">
                  <SelectValue placeholder="Select design theme (optional)" />
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

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:bg-white/8 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-white">Room Type</h2>
              </div>
              <Select value={roomType} onValueChange={setRoomType}>
                <SelectTrigger className="bg-white/5 border-white/20 rounded-xl text-white focus:ring-2 focus:ring-white/30">
                  <SelectValue placeholder="Select room type *" />
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

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:bg-white/8 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Upload className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-white">Upload Image</h2>
              </div>

              <div
                className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center cursor-pointer hover:border-white/40 transition-all duration-300 hover:bg-white/5"
                onClick={() => fileInputRef.current?.click()}
              >
                {uploadedImage ? (
                  <div className="space-y-3">
                    <img
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Uploaded"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <p className="text-sm text-gray-400">Click to change image</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto">
                      <ImageIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Upload room image *</p>
                      <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !uploadedFile || !roomType}
              className="w-full h-14 bg-white text-black rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <div className="flex items-center space-x-3">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Generating...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Play className="w-5 h-5" />
                  <span>Generate Design</span>
                </div>
              )}
            </Button>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 h-full min-h-[600px] backdrop-blur-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold text-white">Design Preview</h2>
                </div>

                {generatedImage && (
                  <Button
                    variant="outline"
                    className="rounded-xl bg-white/5 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                )}
              </div>

              <div className="bg-white/5 rounded-xl p-8 h-full min-h-[500px] flex items-center justify-center border-2 border-dashed border-white/20">
                {isGenerating ? (
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm">
                      <Wand2 className="w-10 h-10 text-white animate-spin" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-2">Creating Your Design</h3>
                      <p className="text-gray-400">AI is generating your perfect interior...</p>
                    </div>
                  </div>
                ) : generatedImage ? (
                  <div className="w-full space-y-4">
                    <img
                      src={generatedImage || "/placeholder.svg"}
                      alt="Generated Design"
                      className="w-full h-96 object-cover rounded-xl"
                    />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-white">Your AI-Generated Design</h3>
                        <p className="text-sm text-gray-400">Created with your specifications</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm">
                      <Sparkles className="w-12 h-12 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-semibold text-white mb-2">Ready to Create</h3>
                      <p className="text-gray-400 max-w-md mx-auto">
                        Upload an image and select your preferences to generate your perfect interior design
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
