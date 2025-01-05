import { CgClose } from "react-icons/cg"; 
import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput'
import axiosIntance from "../../utils/axiosInstance";

const AddEditNote = ({noteData,type,onClose,getNotes}) => {
  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');
  const [tags,setTags] = useState([]);
  const [errors,setErrors] = useState([]);

  const addNote = async() =>{
    try {
      const response = await axiosIntance.post('/create-note',{
        title,
        content,
        tags
      });
      if(response.data && response.data.error)
        {
          setErrors({message:response.data.message});
          return;
        }
        if(response.data && response.data.note)
        {
          getNotes();
          onClose();
        }
    } catch (e) {
        if(e.response && e.response.data && e.response.data.message){
          setErrors({message:e.response.data.message});
        }else{
          setErrors({message:"Something went wrong. Please try again later."});
        }
    }
  }

  const editNote = async() =>{

  }

  const handleAddNote = (e) =>{
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!content.trim()) {
      newErrors.content = "Content is required";
    }

    setErrors(newErrors);

    if(type === 'edit')
      {
        editNote();
      }
      else
      {
        addNote();
      } 
    
  }

  return (
    <div>
      <div className="flex items-center justify-center relative">
        <h3 className='text-center text-lg py-3 text-slate-700 '>ADD SOME NOTE</h3>
        <button className='w-10 h-10 rounded-full flex items-center justify-center absolute top-0 right-0' onClick={onClose}>
          <CgClose className="text-xl text-slate-400 hover:text-slate-700" />
        </button>
      </div>
      <div className='flex flex-col gap-2'>
        <label className='input-label'>TITLE</label>
        <input type="text" className='outline-none text-medium bg-slate-200 text-slate-900 p-2 rounded' placeholder='Go to gym at 5pm'
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        />
        {errors.title && (
          <span className="text-danger text-xs">{errors.title}</span>
        )}
      </div>
      
      <div className='flex flex-col gap-2 mt-6'>
        <label className='input-label'>CONTENT</label>
        <textarea 
        type="text"
        className='text-sm text-slate-950 outline-none bg-slate-200 p-2 rounded'
        placeholder='Content here...'
        rows={10}
        value={content}
        onChange={(e)=>setContent(e.target.value)}
        />
        {errors.content && (
          <span className="text-danger text-xs">{errors.content}</span>
        )}
      </div>
      <div>
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      {errors.message && <p className='text-danger text-xs pb-1'>{errors.message}</p>}
      <button className='btn-primary font-medium mt-5 p-3' onClick={handleAddNote}>ADD</button>
    </div>
  )
}

export default AddEditNote