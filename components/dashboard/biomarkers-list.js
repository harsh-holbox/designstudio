export default function BiomarkersList() {
  const biomarkers = [
    {
      name: "LDL Cholesterol",
      category: "Heart Health",
      status: "Out of Range",
      value: "103 mg/dL",
      statusColor: "red",
      position: "right",
    },
    {
      name: "Apolipoprotein B (ApoB)",
      category: "Heart Health",
      status: "Optimal",
      value: "42 mg/dL",
      statusColor: "green",
      position: "left",
    },
    {
      name: "Vitamin D",
      category: "Nutrients",
      status: "Normal",
      value: "42.3 ng/dL",
      statusColor: "yellow",
      position: "center",
    },
    {
      name: "Ferritin",
      category: "",
      status: "Optimal",
      value: "88 ng/dL",
      statusColor: "green",
      position: "left-third",
    },
  ]

  const getStatusColor = (color) => {
    switch (color) {
      case "green":
        return "text-green-400"
      case "yellow":
        return "text-yellow-400"
      case "red":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getIndicatorColor = (color) => {
    switch (color) {
      case "green":
        return "bg-gradient-to-t from-green-500 to-green-400"
      case "yellow":
        return "bg-gradient-to-t from-yellow-500 to-yellow-400"
      case "red":
        return "bg-gradient-to-t from-red-500 to-red-400"
      default:
        return "bg-gray-500"
    }
  }

  const getIndicatorPosition = (position) => {
    switch (position) {
      case "left":
        return "left-2"
      case "center":
        return "left-1/2 transform -translate-x-1/2"
      case "right":
        return "right-2"
      case "left-third":
        return "left-1/3"
      default:
        return "left-2"
    }
  }

  return (
    <div className="space-y-1">
      {biomarkers.map((biomarker, index) => (
        <div
          key={index}
          className="flex items-center justify-between py-6 px-4 border-b border-gray-700/50 hover:bg-gray-800/30 rounded-xl transition-all duration-200"
        >
          <div className="flex-1">
            <h4 className="font-semibold text-white text-lg mb-1">{biomarker.name}</h4>
            {biomarker.category && <p className="text-gray-400 text-sm font-medium">{biomarker.category}</p>}
          </div>
          <div className="flex items-center space-x-6">
            <span className={`text-sm font-semibold ${getStatusColor(biomarker.statusColor)}`}>{biomarker.status}</span>
            <span className="font-bold text-white text-lg">{biomarker.value}</span>
            <div className="w-20 h-10 bg-gray-800 rounded-lg relative border border-gray-700">
              <div
                className={`absolute top-1 w-3 h-8 ${getIndicatorColor(biomarker.statusColor)} rounded-sm shadow-lg ${getIndicatorPosition(biomarker.position)}`}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
