import React from 'react'
import { FaRegEye } from 'react-icons/fa'

const SearchBar = ({value,onChange,handleSearch,onClearSearch}) => {
  return (
    <div className='flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3'>
        <input
            value={value}
            onChange={onChange}
            type="text"
            placeholder="Search..."
            className='w-full text-sm py-3 rounded mr-3 outline-none'
        />
        <FaRegEye 
                size={22}
                onClick={()=>toggleShowPassword()}
                className="text-primary cursor-pointer"
        />
    </div>
  )
}

export default SearchBar