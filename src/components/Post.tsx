import { Comment, Post, User, Vote } from '@prisma/client'
import  { FC, useRef } from 'react'
import { formatTimeToNow } from '../lib/utils'
import Link from 'next/link'
import { MessageSquare } from 'lucide-react'
import EditorOutput from './EditorOutput'
import PostVoteClient from './post-vote/PostVoteClient'

type PartialVote = Pick<Vote, 'type'>

interface PostProps {
      subredditName: string
      post: Post & {
        author: User
        votes: Vote[]
    } 
    commentAmt: number
    votesAmt: number
    currentVote?: PartialVote
}
const Post: FC<PostProps> = ({
    subredditName,
     post,
    commentAmt,
    votesAmt: votesAmt,
    currentVote,
    }) => {

    const pRef = useRef<HTMLDivElement>(null)
  return (
    <div className='rounded-md bg-slate-50 shadow'>
        <div className='px-6 py-4 flex justify-between'>
           <PostVoteClient 
           postId={post.id} 
           initialVote={currentVote?.type} 
           initialVotesAmt={votesAmt}
           />

            <div className='w-0 flex-1'>
                <div className='max-h-40 mt-1 text-base text-slate-800'>
                    {subredditName? (
                     <>
                        <a className='underline underline-offset-2 font-semibold' 
                        href={`/r/${subredditName}`}>
                          
                          
                          r/{subredditName}
                        </a>
                          <span className='px-1'>#</span>
                     </>
                    ) : null}
                    <span> Posted by u/{post.author.name}</span>{' '}
                    {formatTimeToNow(new Date(post.createdAt))}
                </div>

                <a href={`/r/${subredditName}/post/${post.id}`}>
                    <h1 className='text-lg font-semibold py-2 leading-6 text-slate-900'>
                        {post.title}
                    </h1>
                </a>
                <div className='relative text-sm max-h-40 w-full overflow-clip' ref={pRef}>

                    <EditorOutput content={post.content}/>
                    {pRef.current?.clientHeight === 160 ? (
                        <div className='absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-slate-50 to-transparent'/>
                    ): null}
                </div>
            </div>
        </div>

                     <div className='bg-lime-800 z-20 text-sm px-4 py-4 sm:px-6'>
                        <a className='text-slate-50 w-fit flex items-center gap-2' href={`/r/${subredditName}/post/${post.id}`}>
                        <MessageSquare className='h-4 w-4'/> {commentAmt} comments
                        </a>
                    </div>
    </div>
  )
}

export default Post