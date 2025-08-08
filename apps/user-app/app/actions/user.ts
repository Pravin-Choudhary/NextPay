"use server"

import prisma from "@repo/db/client"
import {number, z} from "zod"
import bcrypt from "bcrypt"


const SignupValidation = z.object({
    name : z.string().optional(),
    email : z.string().email().optional(),
    number : z.string(),
    password : z.string().min(8)
}); 

export async function signup(name : string, email : string , number : string , password : string) {
    try {
        const hashedPassword = await bcrypt.hash(password,10)

        const userExist = await prisma.user.findFirst({
            where : {
                number : number
            }
        });

        if(userExist){
            return {
                res : "exist",
                login : false
            }
        }

        const userDataValidation = SignupValidation.safeParse({
            name,
            email,
            number,
            password
        });

        if(!userDataValidation.success)
        {
            return {
                login : false
            }
        }

        const newUser = await prisma.user.create({
            data : {
                name : name,
                email : email,
                number : number,
                password : hashedPassword
            }
        });

        return {
            login : true
        }
    } catch (error) {
        console.log("Error while Signing Up : " ,error);
        return {
            login : null
        };
    }
}