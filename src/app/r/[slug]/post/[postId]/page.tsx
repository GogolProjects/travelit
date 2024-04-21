
import CommentSection from '@/src/components/CommentSection'
import EditorOutput from '@/src/components/EditorOutput'
import PostVoteServer from '@/src/components/post-vote/PostVoteServer'
import { buttonVariants } from '@/src/components/ui/Button'
import { db } from '@/src/lib/db'
import { redis } from '@/src/lib/redits'
import { formatTimeToNow } from '@/src/lib/utils'
import { CachedPost } from '@/src/types/redis'
import { Post, User, Vote } from '@prisma/client'
import { ArrowBigDown, ArrowBigUp, Loader2 } from 'lucide-react'
import { notFound } from 'next/navigation'
import  { Suspense } from 'react'

interface PageProps{
    params: {
        postId: string
    }
}

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

const TravelitPostPage = async ({params}: PageProps) => {

    const cachedPost = (await redis.hgetall(`post:${params.postId}`)) as CachedPost

    let post: (Post & {votes: Vote[]; author: User}) | null = null
    if(!cachedPost){
        post = await db.post.findFirst({
            where: {
                id: params.postId,
            },
            include: {
                votes: true,
                author: true,
            },
        })
    }
    if(!post && !cachedPost) return notFound()

  return (
    <div>
        <div className='h-full flex flex-row  items-center sm:items-start justify-between'>
            <Suspense fallback={<PostVoteShell />}>
                <PostVoteServer 
                postId={post?.id ?? cachedPost.id}
                getData={async () => {
                    return await db.post.findUnique({
                        where: {
                            id: params.postId
                        },
                        include: {
                            votes: true
                        },
                    })
                }}/>
            </Suspense>
            <div className='sm:w-0 w-full flex-1 bg-slate-100 p-4 rounded-sm'>
                <p className='max-h-40 mt-1 truncate text-xs text-slate-500'>
                    Postet by r/{post?.author.username ?? cachedPost.authorUsername}{' '}
                    {formatTimeToNow(new Date(post?.createdAt ?? cachedPost.createdAt))}
                </p>
                <h1 className='text-xl font-semibold py-2 leading-6 text-slate-950'>
                    {post?.title ?? cachedPost.title}
                </h1>
                <EditorOutput content={post?.content ?? cachedPost.content}/>

                <Suspense 
                fallback={
                    <Loader2 className='h-5 w-5 animate-spin text-slate-600'/>}>
                    <CommentSection postId={post?.id ?? cachedPost.id} />
                </Suspense>
            </div>
        </div>
    </div>
  )
}
function PostVoteShell(){
    return (
    <div className='flex items-center flex-col pr-6 w-20'>
        {/*upvote*/}

        <div className={buttonVariants({variant: 'ghost'})}>
            <ArrowBigUp className='h-5 w-5 text-slate-800' />
        </div>
        {/*score*/}
        <div className='text-center py-2 font-medium text-sm text-slate-950'>
            <Loader2 className='h-3 w-3 animate-spin' />
        </div>

         {/*downvote*/}

         <div className={buttonVariants({variant: 'ghost'})}>
            <ArrowBigDown className='h-5 w-5 text-slate-800' />
        </div>
    </div>
    )
}

export default TravelitPostPage