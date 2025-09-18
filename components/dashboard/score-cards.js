export default function ScoreCards() {
  return (
    <div className="grid grid-cols-2 gap-6 mb-10">
      {/* Superpower Score Card */}
      <div className="bg-gradient-to-br from-orange-600 via-red-600 to-red-700 rounded-2xl p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent"></div>
        <div className="relative z-10">
          <p className="text-white/90 text-sm font-medium mb-3 uppercase tracking-wide">superpower score</p>
          <p className="text-5xl font-bold text-white mb-6">70</p>
          <div className="w-full bg-white/20 rounded-full h-3 backdrop-blur-sm">
            <div
              className="bg-gradient-to-r from-white to-white/90 h-3 rounded-full shadow-lg transition-all duration-1000"
              style={{ width: "70%" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Biological Age Card */}
      <div className="bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 rounded-2xl p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent"></div>
        <div className="relative z-10">
          <p className="text-white/90 text-sm font-medium mb-3 uppercase tracking-wide">Biological age</p>
          <p className="text-5xl font-bold text-white mb-2">25</p>
          <p className="text-white/90 text-sm font-medium mb-4">2.5 years younger</p>
          <div className="w-full bg-white/20 rounded-full h-3 backdrop-blur-sm">
            <div
              className="bg-gradient-to-r from-white to-white/90 h-3 rounded-full shadow-lg transition-all duration-1000"
              style={{ width: "85%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
