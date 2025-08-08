"use client"

import { Button } from "@workspace/ui/components/button";
import { signOut, useSession } from "next-auth/react"

export function UserDashboardPage(){
    const user = useSession();
    return(
        <>
            {JSON.stringify(user)}
            <Button variant={"destructive"} onClick={() => signOut()}>
                LogOut
            </Button>
        </>
    )
}