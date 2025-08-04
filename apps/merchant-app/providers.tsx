"use client"
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

export const ProvidersRecoil = ({children}: {children: React.ReactNode}) => {
    return <RecoilRoot>
            <SessionProvider>
                {children}
            </SessionProvider>
        </RecoilRoot>
}