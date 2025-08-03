import prisma from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"

export const authOptions = {
    providers : [
        CredentialsProvider({
            name : 'Credentails',
            credentials : {
                phone : { label: "Phone Number" , type: "text" , placeholder : "+91 1212121212" , required : true},
                password: { label: "Password", type: "password", required: true }
            },
            // TODO: User credentials type from next-aut
            async authorize(credentials: any) {
                // Do zod validation, OTP validation here
                const hashedPassword = await bcrypt.hash(credentials.password , 10);
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

                try {
                    const user = await prisma.user.create({
                        data : {
                            number : credentials.number,
                            password : hashedPassword
                        }
                    });

                    return {
                        id : user.id.toString(),
                        name : user.name,
                        email : user.email
                    }
                } catch (error) {
                    console.error(error);
                }

                return null
            },
        })
    ],
    secret : process.env.JWT_SECRET || "secret",
    callbacks : {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
    }
}
