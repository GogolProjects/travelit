import {FC} from 'react'

interface EditorProps{}
const Editor: FC<EditorProps> = ({}) => {
  return (
    <div className='w-full p-4 bg-slate-50 rounded-lg border border-slate-200'>
        <form id='subreddit-post-form' className='w-full'>

        </form>
        
    </div>
  )
}

export default Editor;