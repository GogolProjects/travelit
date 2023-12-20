import Link from "next/link";
import { Icons } from "./Icons";
import { buttonVariants } from "./ui/Button";
import { getAuthSession } from "../lib/auth";
import UserAccountNav from "./UserAccountNav";
import SearchBar from "./SearchBar";

const Nav = async ()=> {

    const session = await getAuthSession()
    return (
    <div className='fixed top-0 inset-x-0 h-fit bg-green-950 border-b border-slate-300 z-[10] py-2'>
        <div className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'> 
        {/*logo*/}

        <Link href='/' className='flex gap-2 items-center'>
            <Icons.logo className='h-18 w-18 sm:h-12 sm:w-12' />
            <p className='hidden text-stone-200 text-3xl font-bold md:block'>
                Travelit
            </p>
            </Link>

            {/*search bar */}

                <SearchBar />
            {session ?.user ? (
                <UserAccountNav user={session.user}/>
             ) : (
                <Link href='/sign-in' className={buttonVariants()}>
                Sign In
                </Link>
                )
            }
        </div>
    </div>
    )
}

export default Nav;