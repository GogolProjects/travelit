"use client"

import { useCustomToast } from '@/src/hooks/use-custom-toast'
import { usePrevious } from '@mantine/hooks'
import { CommentVote, VoteType } from '@prisma/client'
import  {  useState } from 'react'
import { Button } from './ui/Button'
import { ArrowBigDown, ArrowBigUp } from 'lucide-react'
import { cn } from '@/src/lib/utils'
import { useMutation } from '@tanstack/react-query'
import {CommentVoteRequest} from '@/src/lib/validators/vote'
import axios, { AxiosError } from 'axios'
import { toast } from '@/src/hooks/use-toast'

type PartialVote = Pick <CommentVote, 'type'>
interface CommentVoteProps {
    commentId: string
    initialVotesAmt: number
    initialVote?: PartialVote
}

const CommentVotes = ({
    commentId,
    initialVotesAmt,
    initialVote,

}: CommentVoteProps) => {

    const {loginToast} = useCustomToast()
    const [votesAmt, setVotesAmt] = useState<number>(initialVotesAmt)
    const [currentVote, setCurrentVote] = useState(initialVote)
    const prevVote = usePrevious(currentVote)
        
        const {mutate: vote} = useMutation({
            mutationFn: async (voteType: VoteType) =>{
                const payload: CommentVoteRequest ={
                    commentId,
                    voteType,
                }

                await axios.patch('/api/subreddit/post/comment/vote', payload)
            },
            onError: (err, voteType) => {
                if(voteType === 'UP') setVotesAmt((prev) => prev - 1)
                else setVotesAmt((prev) => prev + 1)


                //reset current vote
                setCurrentVote(prevVote)

                if(err instanceof AxiosError){
                    if(err.response?.status === 401){
                        return loginToast()
                    }
                }

                return toast({
                    title: 'Something went wrong',
                    description: 'Your vote was not registered, please try again later',
                    variant: 'destructive'
                })
            },
            onMutate: (type) => {
                if(currentVote?.type === type){
                    setCurrentVote(undefined)
                    if(type === 'UP') setVotesAmt((prev) => prev - 1)
                    else if(type === 'DOWN') setVotesAmt((prev) => prev + 1)
                } else {
                    setCurrentVote({type})
                    if(type === 'UP') setVotesAmt((prev) => prev + (currentVote ? 2 : 1))
                    else if(type === 'DOWN') setVotesAmt((prev) => prev - (currentVote ? 2 : 1))

                }
            },
        })
  
        return (
            <div className='flex gap-1'>
                <Button 
                    onClick={() => vote('UP')}
                    size='sm' 
                    variant='ghost' 
                    aria-label='upvote'> 
                    <ArrowBigUp 
                    className={cn('h-5 w-5 text-slate-800',{
                        'text-emerald-700 fill-emerald-700': currentVote?.type === 'UP',
                    })}
                    />
                </Button>

                <p className='text-center py-2 font-medium text-sm text-slate-900'>
                    {votesAmt}
                </p>

                <Button 
                     onClick={() => vote('DOWN')}
                    size='sm' 
                    variant='ghost' 
                    aria-label='downvote'> 
                    <ArrowBigDown 
                    className={cn('h-5 w-5 text-slate-800',{
                        'text-red-700 fill-red-700': currentVote?.type === 'DOWN',
                    })}
                    />
                </Button>

            </div>
         )
}

export default CommentVotes