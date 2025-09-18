import ScoreCards from "./score-cards"
import BiomarkersSummary from "./biomarkers-summary"
import BiomarkersList from "./biomarkers-list"

export default function MainContent() {
  return (
    <div>
      {/* User Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-3 text-gray-100">Max Marchione</h2>
        <p className="text-gray-400 text-base font-medium">Last tested: Apr 28th, 2025</p>
      </div>

      <ScoreCards />
      <BiomarkersSummary />
      <BiomarkersList />
    </div>
  )
}
