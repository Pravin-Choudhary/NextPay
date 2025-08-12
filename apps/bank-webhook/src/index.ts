import express from "express"
import prisma from  "@repo/db/client"

const app = express();

app.post('/hdfcWebhook' , async (req , res) => {
    //TODO: Add zod validation here?
    const paymentInformation = {
        token : req.body.token,
        userId : req.body.user_identifier,
        amount : req.body.amount
    }
    // Update balace in db, add txn  
    
    try {
         await prisma.$transaction([
            prisma.balance.update({
            where  : {
                userId : paymentInformation.userId
            },
            data : {
                amount : {
                    increment : paymentInformation.amount
                }
            }
        }),
            prisma.onRampTransaction.update({
            where : {
                token : paymentInformation.token
            },
            data : {
                status : "Success"
            }
        })
    ]);

    res.json({
            message: "Captured"
    });

    } catch (e) {
        console.log(e);
        res.status(411).json({
            message: "Error while processing webhook"
        });
    }
});