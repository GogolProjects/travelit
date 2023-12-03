"use client"
import { User } from 'next-auth';
import { FC } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger} from './ui/Dropdown-menu';
import UserAvatar from './UserAvatar';
import Link from 'next/link';
import {signOut} from 'next-auth/react'

interface UserAccountNavProps {
    user: Pick<User, 'name' | 'image' | 'email'>
}
const UserAccountNav: FC<UserAccountNavProps> = ({user}) => {
  return (
  <DropdownMenu>
    <DropdownMenuTrigger>
      <UserAvatar
        className='h-8 w-8' 
        user={{
                name: user.name || null,
                image: user.image || null,
          }}
      />
    </DropdownMenuTrigger>

      <DropdownMenuContent className='bg-lime-800 border-slate-800 text-slate-200' align='end'>
        <div className='flex items-center justify-start gap-2 p-3'>
          <div className='flex flex-col space-y-1 leading-none'>
            {user.name && <p className='font-semibold text-slate-200'>{user.name}</p>}
            {user.email && <p className='-w-[200px] truncate font-semibold text-slate-200'>{user.email}</p>}

          </div>
        </div>

        <DropdownMenuSeparator className='bg-black' />
            <DropdownMenuItem asChild>
              <Link href='/'>Home</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href='/r/create'>Create community</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href='/settings'>Settings</Link>
            </DropdownMenuItem>
        <DropdownMenuSeparator className='bg-black'/>
        <DropdownMenuItem onSelect= {(event) =>{
          event.preventDefault()
          signOut({
            callbackUrl: `${window.location.origin}/sign-in`,
          })
        }}
        className='cursor-pointer font-semibold'>
          Sign out
          </DropdownMenuItem>
      </DropdownMenuContent>
   </DropdownMenu>
    )
}


export default UserAccountNav;