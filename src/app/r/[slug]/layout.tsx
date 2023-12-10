import SubscribeLeaveToggle from "@/src/components/SubscribeLeaveToggle"
import { buttonVariants } from "@/src/components/ui/Button"
import { getAuthSession } from "@/src/lib/auth"
import { db } from "@/src/lib/db"
import { format } from "date-fns"
import Link from "next/link"
import { notFound } from "next/navigation"

export const metadata = {
    title: 'Travelit',
    description: 'A forum where we share our trip expiriance and hacks',
  }
  
const Layout = async ({
    children, 
    params: {slug},

    }: {children: React.ReactNode
        params: {slug: string}
    }) => {

        const session = await getAuthSession()

        const subreddit = await db.subreddit.findFirst({
            where: {name: slug},
            include: {
                posts: {
                    include: {
                        author: true,
                        votes: true,
                    },
                },
            },
        })

        const subscription = !session?.user ? undefined 
        : await db.subscription.findFirst({
            where: {
                subreddit: {
                    name: slug,
                },
                user: {
                    id: session.user.id
                },
            },
        })

        const isSubscribed = !!subscription

        if(!subreddit) return notFound()
        const memberCount = await db.subscription.count({
            where: {
                subreddit: {
                    name: slug,
                },
            },
        })
    return (
        <div className="sm:container max-w-7xl mx-auto h-full pt-12">
            <div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
                    <div className="flex flex-col col-span-2 space-y-6">
                    {children}
                    </div>
                    <div className="hidden md:block overflow-hidden h-fit rounded-lg border border-slate-400 order-first md:order-last bg-lime-800">
                        <div className="px-6 py-4">
                            <p className="font-semibold py-3 text-slate-50 text-lg">About t/{subreddit.name}
                            </p>
                        </div>
                         <dl className="divide-y divide-slate-100 px-6 py-4 text-sm leading-6 bg-slate-50">
                            <div className="flex justify-between gap-x-4 py-3">
                                <dt className="text-slate-600"> Created</dt>
                                <dd className="text-slate-800">
                                     <time dateTime={subreddit.createdAt.toDateString()}>
                                        {format(subreddit.createdAt, 'MMMM d, yyyy')}
                                     </time>
                                 </dd>
                            </div>

                            <div className="flex justify-between gap-x-4 py-3">
                            <dt className="text-slate-600"> Members</dt>
                                <dd className="text-slate-800">
                                    <div className="text-slate-900">{memberCount}
                                    </div>
                                 </dd>
                            </div>
                            {subreddit.creatorId === session?.user.id ? (
                                <div className="flex justify-between gap-x-4 py-3">
                                    <p className="text-slate-700">You created this community
                                    </p>
                                </div>
                            ): null}
                            {subreddit.creatorId !== session?.user.id ? (
                                <SubscribeLeaveToggle
                                isSubscribed={isSubscribed}
                                subredditId={subreddit.id} 
                                subredditName={subreddit.name}
                                />
                            ) : null}

                            <Link className={buttonVariants({
                                variant: 'outline',
                                className: 'w-full mb-6',

                                })}
                            
                                href={`${slug}/submit`}>
                                Create post
                            </Link>
                      </dl>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout