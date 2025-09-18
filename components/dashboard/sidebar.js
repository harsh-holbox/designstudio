export default function Sidebar() {
  const healthCategories = [
    { name: "All data", icon: "📊", status: null },
    { name: "Longevity Markers", status: "success" },
    { name: "Heart Health", status: "success" },
    { name: "Thyroid Health", status: "warning" },
    { name: "Immune Regulation", status: "warning" },
    { name: "Hormone Health", status: "success" },
    { name: "Metabolic Health", status: "success" },
    { name: "Nutrients", status: "error" },
    { name: "Liver Health", status: "success" },
    { name: "Kidney Health", status: "warning" },
    { name: "Heavy Metals & Electrolytes", status: "success" },
    { name: "Inflammation", status: "warning" },
    { name: "Blood", status: "success" },
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
        return (
          <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-xs font-bold">✓</span>
          </div>
        )
      case "warning":
        return (
          <div className="w-5 h-5 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-xs font-bold">!</span>
          </div>
        )
      case "error":
        return (
          <div className="w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-xs font-bold">!</span>
          </div>
        )
      default:
        return <span className="text-xl">{status}</span>
    }
  }

  return (
    <div className="space-y-2">
      <h3 className="text-xl font-bold mb-6 text-gray-100">Data Records</h3>
      <div className="space-y-3">
        {healthCategories.map((category, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-800/50 transition-all duration-200 cursor-pointer group"
          >
            {category.icon ? <span className="text-lg">{category.icon}</span> : getStatusIcon(category.status)}
            <span
              className={`text-sm font-medium ${
                category.icon ? "text-gray-400" : "text-gray-200 group-hover:text-white"
              } transition-colors duration-200`}
            >
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
