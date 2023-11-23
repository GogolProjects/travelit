import Link from "next/link";
import { Icons } from "./Icons";
import { buttonVariants } from "./Button";
const Nav =  ()=>{
    return (
    <div className='fixed top-0 inset-x-0 h-fit bg-sky-200 border-b- border-slate-300 z-[10] py-2'>
        <div className='continer max-w-7xl h-full mx-auto flex items-center justify-between gap-2'> 
        {/*logo*/}

        <Link href='/' className='flex gap-5 items-center'>
            <Icons.logo className='h-18 w-18 sm:h-12 sm:w-12' />
            <p className='hidden text-cyan-900 text-3xl font-bold md:block'>
                Travelit
            </p>
            </Link>

            {/*search bar */}

            <Link href='/sign-in' className={buttonVariants()}>Sign In</Link>
        </div>
    </div>
    )
}

export default Nav;