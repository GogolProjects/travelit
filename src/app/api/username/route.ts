import { getAuthSession } from "@/src/lib/auth";
import { db } from "@/src/lib/db";
import { UserNameValidator } from "@/src/lib/validators/username";
import { z } from "zod";

export async function PATCH(req: Request){
    try {
        const session = await getAuthSession()
        if(!session?.user){
            return new Response('Unauthorized', {status: 401})
        }

        const body = await req.json()

        const {name} = UserNameValidator.parse(body)

        const username = await db.user.findFirst({
            where: {
                username: name,
            },
        })
        if(username){
            return new Response('Username is taken', {status: 409})
        }

        //update username
        await db.user.update({
            where:  {
                id: session.user.id,
            },
            data: {
                username: name
            }
        })

        return new Response ('OK')
    } catch (error){
        (error)
        if(error instanceof z.ZodError){
            return new Response('Invalid request data passed', { status: 422 })
        }

        return new Response('Could not change username, please try again later', {status: 500})
    }
}