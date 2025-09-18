export default function BiomarkersSummary() {
  const biomarkerStats = [
    { value: 106, label: "Total", color: "green", width: "100%" },
    { value: 80, label: "Optimal", color: "green", width: "75%" },
    { value: 21, label: "In range", color: "yellow", width: "20%" },
    { value: 5, label: "Out of range", color: "red", width: "5%" },
  ]

  const getColorClasses = (color) => {
    switch (color) {
      case "green":
        return "bg-gradient-to-r from-green-500 to-green-600"
      case "yellow":
        return "bg-gradient-to-r from-yellow-500 to-yellow-600"
      case "red":
        return "bg-gradient-to-r from-red-500 to-red-600"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="mb-10">
      <h3 className="text-xl font-bold mb-6 text-gray-100">Biomarkers</h3>
      <div className="grid grid-cols-4 gap-6">
        {biomarkerStats.map((stat, index) => (
          <div
            key={index}
            className="text-center p-4 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50"
          >
            <p className="text-4xl font-bold text-white mb-2">{stat.value}</p>
            <p className="text-gray-300 text-sm font-medium mb-4">{stat.label}</p>
            <div className="w-full bg-gray-700/50 rounded-full h-3">
              <div
                className={`${getColorClasses(stat.color)} h-3 rounded-full shadow-lg transition-all duration-1000`}
                style={{ width: stat.width }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
