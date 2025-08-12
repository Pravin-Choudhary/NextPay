
import Home from "@/pages/Home"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./lib/auth";

export default async function Page() {
   const session = await getServerSession(authOptions);
     console.log("session root page : ", session  );
 
     if(session?.user){
         redirect('/user-dashboard');
     }else{
         return <Home/>
     }
}
