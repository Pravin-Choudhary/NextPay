import AppSidebar from "@/components/app-sidebar"
import Navbar from "@/components/navbar"
import { Separator } from "@workspace/ui/components/separator"
import {SidebarProvider} from  "@workspace/ui/components/sidebar"

export default function Layout({ children }: { children: React.ReactNode }){
    return (
        <SidebarProvider>
            <AppSidebar/>
            <main className="w-full">
                <Navbar/>
                <Separator className="my-1" />
                <div className="px-4">{children}</div>
            </main>
        </SidebarProvider>
    )
}