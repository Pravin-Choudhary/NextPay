import AppSidebar from "@/components/app-sidebar"
import Navbar from "@/components/navbar"
import { Separator } from "@workspace/ui/components/separator"
import {SidebarProvider} from  "@workspace/ui/components/sidebar"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/auth";

export default async function Layout({ children }: { children: React.ReactNode }){
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        redirect('/');
    }
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