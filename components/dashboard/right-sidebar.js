export default function RightSidebar() {
  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <div className="p-6 bg-gray-800/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
        <h3 className="font-bold text-xl mb-3 text-white">Hi Max,</h3>
        <p className="text-gray-300 text-sm mb-6 leading-relaxed">
          Your results are ready! They show your current health status and provide insights to help you optimize your
          health.
        </p>
        <p className="text-gray-400 text-sm mb-3">Your results are pending</p>
        <p className="text-3xl font-bold text-white">
          7-10 <span className="text-lg font-normal text-gray-400">days</span>
        </p>
      </div>

      {/* Upload Health Records */}
      <div>
        <h4 className="font-semibold mb-4 text-white text-lg">Upload existing health records</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800/50 hover:bg-gray-800/70 rounded-xl p-4 text-center cursor-pointer transition-all duration-200 border border-gray-700/50 hover:border-gray-600">
            <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <span className="text-white text-lg">📁</span>
            </div>
            <p className="text-xs text-gray-300 font-medium">Upload</p>
          </div>
          <div className="bg-gray-800/50 hover:bg-gray-800/70 rounded-xl p-4 text-center cursor-pointer transition-all duration-200 border border-gray-700/50 hover:border-gray-600">
            <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <span className="text-white text-lg">🔗</span>
            </div>
            <p className="text-xs text-gray-300 font-medium">Connect</p>
          </div>
        </div>
      </div>

      {/* Health Trackers */}
      <div>
        <h4 className="font-semibold mb-4 text-white text-lg">Connect your health trackers</h4>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-gray-800/50 hover:bg-gray-800/70 rounded-xl p-4 cursor-pointer transition-all duration-200 border border-gray-700/50 hover:border-gray-600"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-5 text-center cursor-pointer hover:scale-105 transition-all duration-200 shadow-lg">
            <div className="text-3xl mb-3">🧪</div>
            <p className="text-sm font-semibold text-white mb-1">Ring Package</p>
            <p className="text-sm font-bold text-white">$42</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50">
            <div className="text-sm text-gray-400 mb-2">Waiting list</div>
            <p className="text-sm font-bold text-white">$42</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50">
            <div className="text-sm text-gray-400 mb-2">Gym Box Kit</div>
            <p className="text-sm font-bold text-white">$97</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50">
            <div className="text-sm text-gray-400 mb-2">Waiting list</div>
            <p className="text-sm font-bold text-white">$97</p>
          </div>
        </div>
      </div>
    </div>
  )
}
