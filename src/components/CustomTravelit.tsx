import { INFINITE_SCROLL_PAGINATION_RESULTS } from "../config"
import { getAuthSession } from "../lib/auth"
import { db } from "../lib/db"
import GeneralTravelit from "./GeneralTravelit"

import PostTravel from "./PostTravel"

const CustomTravelit =async () => {
    const session = await getAuthSession()
    const followedComunities = await db.subscription.findMany({
        where: {
            userId: session?.user.id
        },
        include: {
            subreddit: true,
        },
    })
      
    const posts = await db.post.findMany({
        where: {
            subreddit: {
                name: {
                    in: followedComunities.map(({subreddit}) => subreddit.id),
                },
            },
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            votes: true,
            author: true,
            comments: true,
            subreddit: true,
        },
        take: INFINITE_SCROLL_PAGINATION_RESULTS,

    }) 
       
      
        return(<PostTravel initialPosts={posts}/>)
    }
       
export default CustomTravelit