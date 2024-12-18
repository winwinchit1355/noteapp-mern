import { AiOutlineSearch } from "react-icons/ai"; 
import { IoMdClose } from "react-icons/io"; 
import React from 'react'
import { FaRegEye } from 'react-icons/fa'

const SearchBar = ({value,onChange,handleSearch,onClearSearch}) => {
  return (
    <div className='w-80 flex items-center bg-slate-100 px-4 rounded'>
        <input
            value={value}
            onChange={onChange}
            type="text"
            placeholder="Search notes"
            className='w-full text-xs bg-transparent py-[11px] outline-none'
        />
         {value && <IoMdClose
           size={22}
           onClick={onClearSearch}
           className="text-slate-500 cursor-pointer hover:text-black mr-3"
         />}
        <AiOutlineSearch
         size={22}
         onClick={handleSearch}
         className="text-slate-400 cursor-pointer hover:text-black"
        />
    </div>
  )
}

export default SearchBar