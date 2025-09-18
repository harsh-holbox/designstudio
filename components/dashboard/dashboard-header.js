export default function DashboardHeader() {
  const navItems = [
    { name: "Home", active: false },
    { name: "Data", active: true },
    { name: "Protocol", active: false },
    { name: "Concierge", active: false },
    { name: "Services", active: false },
  ]

  return (
    <div className="flex items-center justify-between mb-10">
      <h1 className="text-3xl font-bold tracking-tight">superpower</h1>

      <nav className="flex items-center space-x-1 bg-gray-800/50 backdrop-blur-sm rounded-full px-2 py-2 border border-gray-700">
        {navItems.map((item) => (
          <a
            key={item.name}
            href="#"
            className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
              item.active ? "bg-white text-black shadow-lg" : "text-gray-300 hover:text-white hover:bg-gray-700/50"
            }`}
          >
            {item.name}
          </a>
        ))}
      </nav>

      <div className="flex items-center space-x-6">
        <button className="text-gray-300 hover:text-white text-sm font-medium transition-colors duration-200">
          Invite Friend
        </button>
        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-lg"></div>
      </div>
    </div>
  )
}
