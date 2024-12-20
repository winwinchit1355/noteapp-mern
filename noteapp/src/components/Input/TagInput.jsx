import { RxCross2 } from "react-icons/rx"; 
import { RxCross1 } from "react-icons/rx"; 
import { AiFillMinusCircle } from "react-icons/ai"; 
import { AiFillPlusCircle } from "react-icons/ai"; 
import React, { useState } from 'react'

const TagInput = ({tags,setTags}) => {
  const [inputValue,setInputValue] = useState("");
  const handleInputChange = (e) =>{
    setInputValue(e.target.value);
  }
  const addNewTag = () =>{
    if(inputValue.trim() !== "")
    {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
    
  }
  const handleKeyDown = (e) =>{
    if(e.key === "Enter")
    {
      addNewTag();
    }
  }
  const handleRemoveTag = (removeTag) =>{
    setTags(tags.filter(tag => tag !== removeTag))
  }
  return (
    <div>
      {tags?.length > 0 && 
        <div className="flex items-center gap-2 flex-wrap mt-2">
        {tags.map((tag,index)=>(
          <span className="flex items-center gap-2 bg-slate-50 text-sm text-slate-800 px-3 py-1 rounded" 
            key={index}>#{tag}
            <button> <RxCross2 onClick={() => {handleRemoveTag(tag)}} className=" hover:text-slate-400" /></button>
          </span>
        ))}
      </div>}
      <div className="flex 
      items-center  
      ">
        <input type="text" className='w-2/3 bg-slate-200 p-2 mr-3 my-2 rounded outline-none' placeholder='Tag..'
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        value={inputValue} />
        <button 
        onClick={() => {
          addNewTag();
        }}
        
        > <AiFillPlusCircle className="text-success hover:text-slate-400" size={20}  /></button>
      </div>
      {/* <div className="flex 
      items-center  
      ">
        <input type="text" className='w-2/3 bg-slate-200 p-2 mr-3 my-2 rounded outline-none' placeholder='Tag..' />
        <button> <AiFillMinusCircle className="text-danger hover:text-slate-400" size={20}  /></button>
      </div> */}
    </div>
  )
}

export default TagInput