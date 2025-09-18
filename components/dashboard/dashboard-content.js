import Sidebar from "./sidebar"
import MainContent from "./main-content"
import RightSidebar from "./right-sidebar"

export default function DashboardContent() {
  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-3">
        <Sidebar />
      </div>
      <div className="col-span-6">
        <MainContent />
      </div>
      <div className="col-span-3">
        <RightSidebar />
      </div>
    </div>
  )
}
