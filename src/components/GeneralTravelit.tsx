import { INFINITE_SCROLL_PAGINATION_RESULTS } from "../config"
import { db } from "../lib/db"
import PostTravel from "./PostTravel"

const GeneralTravelit =async () => {
    const posts = await db.post.findMany({
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

    return <PostTravel initialPosts={posts}/>
  
}
export default GeneralTravelit