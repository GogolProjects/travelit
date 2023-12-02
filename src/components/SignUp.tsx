
import Link from 'next/link';
import { Icons } from './Icons';
import UserAuthForm from './UserAuthForm';

const SignUp = () => {
    return (
    <div className='container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]'>
         <div className='flex flex-col space-y-2 text-center'>
            <Icons.logo className='mx-auto h-6 w-6'/>
            <h1 className='text 3xl font-bold tracking-tight'>Sign Up</h1>
            <p className='text-sm font-semibold max-w-xs mx-auto'>
                By continuing, You are setting up a Travelit account and agree to our User Agreement and Privacy Policy.
            </p>
            {/* sign in form*/}
            <UserAuthForm />

            <p className='px-8 font-semibold text-center text-sm text-zinc-600'>
               Already a Traveler? {' '}
                <Link href='/sign-in' className='hover:text-zinc-900 text-sm font-bold underline underline-offset-4'>
                    Sign In
                </Link>

            </p>
        </div>
    </div>
    )
}

export default SignUp;