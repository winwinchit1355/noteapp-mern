import { MdCreate } from "react-icons/md"; 
import { MdDelete } from "react-icons/md"; 
import { AiTwotonePushpin } from "react-icons/ai"; 
import React from 'react'

const NoteCard = ({title,date,content,tags,isPinned,onEdit,onDelete,onPinNote}) => {
  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
        <div className="flex items-center justify-between">
            <div>
                <h6 className="text-sm font-medium">{title}</h6>
                <span className="text-xs text-slate-500">{date}</span>
            </div>
            <AiTwotonePushpin className={`icon-pin ${isPinned ?'text-primary':'text-slate-300'}`} />
        </div>
        <p className="text-xs text-slate-600 mt-2">{content?.slice(0,60)}</p>
        <div className="flex items-center justify-between mt-2">
            <div className="text-sm text-slate-500">{tags}</div>
            <div className="flex items-center gap-2">
                <MdCreate className="icon-btn hover:text-green-600" onClick={onEdit} />
                <MdDelete className="icon-btn hover:text-red-600" onClick={onDelete} />
            </div>
        </div>
       
    </div>
  )
}

export default NoteCard