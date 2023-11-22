import Link from "next/link";
import { Icons } from "./Icons";
const Nav =  ()=>{
    return <div className="fixed top-0 inset-x-0 h-fit bg-sky-200 border-b- border-slate-300 z-[10] py-2">
        <div className="continer max-w-7x1 h-full mx-auto felx items-center justify-between gap-2 "> {/*logo*/}
        <Link href='/' className="flex gap-2 items-center">
            <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6" />
            <p className="hidden text-zinc-700 text-sm font-bold md:block">Travelit</p>
            </Link>
        </div>
    </div>
}

export default Nav;