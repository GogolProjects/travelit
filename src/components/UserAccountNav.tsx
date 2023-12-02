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

      <DropdownMenuContent className='bg-lime-600 border-black' align='end'>
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-1 leading-none'>
            {user.name && <p className='font-bold text-slate-800'>{user.name}</p>}
            {user.email && <p className='-w-[200px] truncate font-bold text-sm text-slate-800'>{user.email}</p>}

          </div>
        </div>

        <DropdownMenuSeparator className='bg-black' />
            <DropdownMenuItem asChild className='font-bold'>
              <Link href='/'>Home</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className='font-bold'>
              <Link href='/r/create'>Create community</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className='font-bold'>
              <Link href='/settings'>Settings</Link>
            </DropdownMenuItem>
        <DropdownMenuSeparator className='bg-black'/>
        <DropdownMenuItem onSelect= {(event) =>{
          event.preventDefault()
          signOut({
            callbackUrl: `${window.location.origin}/sign-in`,
          })
        }}
        className='cursor-pointer font-bold'>
          Sign out
          </DropdownMenuItem>
      </DropdownMenuContent>
   </DropdownMenu>
    )
}


export default UserAccountNav;