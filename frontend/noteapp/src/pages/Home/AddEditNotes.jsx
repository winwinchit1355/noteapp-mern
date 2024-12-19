import React from 'react'

const AddEditNote = () => {
  return (
    <div>
      <div className='flex flex-col gap-2'>
        <label className='input-label'>TITLE</label>
        <input type="text" className='outline-none text-2xl text-slate-900' placeholder='Go to gym at 5pm' />
      </div>
      <div className='flex flex-col gap-2 mt-6'>
        <label className='input-label'>CONTENT</label>
        <textarea 
        type="text"
        className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
        placeholder='Content here...'
        rows={10} />
      </div>
      <div>
        <label className="input-label">TAGS</label>
      </div>
      <button className='btn-primary font-medium mt-5 p-3' onClick={() => {}}>ADD</button>
    </div>
  )
}

export default AddEditNote