import DashboardHeader from "./dashboard/dashboard-header"
import DashboardContent from "./dashboard/dashboard-content"

export default function DashboardSection() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white text-black min-h-screen">
      {/* Top section with enhanced styling */}
      <div className="text-center py-12 bg-gradient-to-b from-white to-gray-50">
        <p className="text-gray-500 mb-4 text-lg font-light">early signs of over 1,000 conditions</p>
        <button className="text-black font-semibold flex items-center mx-auto hover:text-orange-600 transition-colors duration-200 text-lg group">
          Explore all biomarkers
          <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">→</span>
        </button>
      </div>

      {/* Main Dashboard Container with premium styling */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl p-8 text-white shadow-2xl border border-gray-800">
          <DashboardHeader />
          <DashboardContent />
        </div>
      </div>
    </div>
  )
}
