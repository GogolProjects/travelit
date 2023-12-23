import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../components/ui/Button";
import { getAuthSession } from "../lib/auth";
import GeneralTravelit from "../components/GeneralTravelit";
import CustomTravelit from "../components/CustomTravelit";

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default async function Home(){
   const session = await getAuthSession( )

    return (
        <>
            <h1 className="font-bold text-3xl md:text-4xl">Your Travelit</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
                {session ? <CustomTravelit /> : <GeneralTravelit />}
                
                
                {/*subreddit info*/}
                <div className="overflow-hidden h-fit rounded-lg border border-slate-300 order-first md:order-last">
                    <div className="bg-lime-900 px-6 py-4">
                        <p className="font-semibold text-slate-100 py-3 flex items-center gap-1.5">
                            <HomeIcon className="w-4 h-4"/>
                            Home
                        </p>
                    </div>
                    <div className="-my-3 divide-y bg-lime-100 divide-slate-300 px-6 py-4 text-sm leading-6">
                        <div className="flex justify-between gap-x-4 py-3">
                            <p className="text-slate-800">
                                Your pesonal Travleit homepage. Come here to chceck in with your favourite comunities.
                            </p>
                        </div>
                        <Link 
                        className={buttonVariants({
                            className: 'w-full mt-4 mb-6',
                            })}
                             href='/r/create'>
                            Create community
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}