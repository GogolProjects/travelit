import Link from "next/link";
const Nav =  ()=>{
    return <div className="fixed top-0 inset-x-0 h-fit bg-zinc-200 border-b- border-zinc-300 z-[10] py-2">
        <div className="continer max-w-7x1 h-full mx-auto felx items-center justify-between gap-2 "> {/*logo*/}
        <Link href='/' className="flex gap-2 items-center">
            <p className="hidden text-zinc-700 text-sm font-medium md:block">Travelit</p>
            </Link>
        </div>
    </div>
}

export default Nav;