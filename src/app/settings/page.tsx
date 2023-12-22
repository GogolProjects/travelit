export const metadata = {
    title: 'Settings',
    description: 'Manage accoun and website settings.',
}

import UserNameForm from '@/src/components/UserNameForm'
import { authOptions, getAuthSession } from '@/src/lib/auth'
import { redirect } from 'next/navigation'
import React, { FC } from 'react'


const page = async ({}) => {
    const session = await getAuthSession()

    if(!session?.user){
        redirect(authOptions.pages?.signIn || '/sign-in')
    }
  return (
    <div className='max-w-4xl mx-auto py-12'>
        <div className='grid items-start gap-8'>
            <h1 className='font-bold text-3xl md:text-4xl pb-2'>Settings
            </h1>
        </div>
        <div className='grid gap-10'>
            <UserNameForm 
            user={{
                id: session.user.id,
                username: session.user.username || '',
            }} />
        </div>
        </div>
  )
}

export default page