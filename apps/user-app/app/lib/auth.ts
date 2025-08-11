import prisma from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import {z} from "zod";
 
const credentialsValidator = z.object({
    number : z.string().regex(/^\d{10}$/).min(10).max(10),
    password : z.string().min(8)
})

export const authOptions = {
    providers : [
        CredentialsProvider({
            name : 'Credentails',
            credentials : {
                number : { label: "Phone Number" , type: "text" , placeholder : "+91 1212121212" , required : true},
                password: { label: "Password", type: "password", required: true }
            },
            // TODO: User credentials type from next-auth
            async authorize(credentials: any) {
                // Do zod validation, OTP validation here
                const credentialsValidate = credentialsValidator.safeParse({
                    number : credentials.number,
                    password : credentials.password
                });

                if(!credentialsValidate.success){
                    return null;
                }

                const existingUser = await prisma.user.findFirst({
                    where : {
                        number : credentials.number
                    }
                });

                if(existingUser){
                    const passwordValidation = await bcrypt.compare(credentials.password , existingUser.password);
                    if(passwordValidation){
                        return {
                            id : existingUser.id.toString(),
                            name : existingUser.name,
                            email : existingUser.email
                        }
                    }

                    return null;
                }

                return null
            },
        }),
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "" 
  })
],
    secret : process.env.JWT_SECRET || "secret",
    callbacks : {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: any) {
            session.user.id = token.sub
            console.log("session" , session);
            return session
        }
    },
    pages : {
        signIn : '/signin',
    }
}
