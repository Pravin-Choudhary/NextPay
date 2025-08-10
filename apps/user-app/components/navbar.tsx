import { SidebarTrigger } from "@workspace/ui/components/sidebar";
import { ModeToggle } from "@workspace/ui/components/Toggle-mode";
import NavigationTabs from "@/components/navigation-tabs"

export default function Navbar() {
  return (
    <div className="flex justify-between space-x-4 mt-2">
        <div className="flex flex-col justify-center">
           <SidebarTrigger/>
        </div>
        <div className="flex flex-col justify-center">
                <ModeToggle/>
        </div>
    </div>
    
  )
};

