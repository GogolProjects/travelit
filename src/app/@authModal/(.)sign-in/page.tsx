import CloseModal from '@/src/components/CloseModal';
import SignIn from '@/src/components/SignIn';

const page = () => {
    return( <div className='fixed inset-0 bg-slate-300/20 z-10'>
        <div className='container flex items-center h-full max-w-lg mx-auto'>
            <div className='relative bg-lime-100 w-full h-fit py-20 px-2 rounded-lg border-2 border-black'>
                <div className='absolute top-4 right-4'>
                    <CloseModal />
                </div>

                <SignIn/>

            </div>

        </div>
    </div> )
}
 
export default page;