"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, ImageIcon, CheckCircle, AlertCircle } from "lucide-react"

export default function ImageUploadInterface() {
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }, [])

  const handleChange = useCallback((e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }, [])

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList).map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      preview: URL.createObjectURL(file),
      status: "ready",
    }))
    setFiles((prev) => [...prev, ...newFiles])
  }

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((file) => file.id !== id))
  }

  const uploadFiles = async () => {
    setUploading(true)
    // Simulate upload process
    for (let i = 0; i < files.length; i++) {
      setFiles((prev) => prev.map((file) => (file.id === files[i].id ? { ...file, status: "uploading" } : file)))
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setFiles((prev) => prev.map((file) => (file.id === files[i].id ? { ...file, status: "completed" } : file)))
    }
    setUploading(false)
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
      <div className="mb-8">
        <h2 className="font-playfair text-3xl font-light text-black mb-2">Upload Your Room</h2>
        <p className="text-gray-600 font-inter">Upload photos of your space to get started with AI-powered redesign</p>
      </div>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
          dragActive ? "border-black bg-gray-50" : "border-gray-300 hover:border-gray-400 hover:bg-gray-50/50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Upload className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="font-playfair text-xl font-light text-black mb-2">
            Drop your images here, or <span className="text-black font-medium underline">browse</span>
          </h3>
          <p className="text-gray-500 text-sm mb-4">Supports JPG, PNG, WEBP up to 10MB each</p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span>• Multiple angles recommended</span>
            <span>• Good lighting preferred</span>
            <span>• High resolution for best results</span>
          </div>
        </div>
      </div>

      {/* File Preview */}
      {files.length > 0 && (
        <div className="mt-8">
          <h3 className="font-playfair text-lg font-light text-black mb-4">Uploaded Images ({files.length})</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {files.map((file) => (
              <div key={file.id} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                  <img
                    src={file.preview || "/placeholder.svg"}
                    alt="Room preview"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Status Indicator */}
                <div className="absolute top-2 right-2">
                  {file.status === "ready" && (
                    <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
                      <ImageIcon className="w-3 h-3 text-white" />
                    </div>
                  )}
                  {file.status === "uploading" && (
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center animate-spin">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                  {file.status === "completed" && (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFile(file.id)}
                  className="absolute top-2 left-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3 text-white" />
                </button>

                {/* File Info */}
                <div className="mt-2">
                  <p className="text-xs text-gray-600 truncate font-inter">{file.file.name}</p>
                  <p className="text-xs text-gray-400">{(file.file.size / 1024 / 1024).toFixed(1)} MB</p>
                </div>
              </div>
            ))}
          </div>

          {/* Upload Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <AlertCircle className="w-4 h-4" />
              <span>Ready to process {files.filter((f) => f.status === "ready").length} images</span>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setFiles([])}
                className="border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                Clear All
              </Button>
              <Button
                onClick={uploadFiles}
                disabled={uploading || files.length === 0}
                className="bg-black text-white hover:bg-gray-800 px-8"
              >
                {uploading ? "Processing..." : "Start AI Design"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
