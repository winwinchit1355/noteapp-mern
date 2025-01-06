import { MdCreate } from "react-icons/md"; 
import { MdDelete } from "react-icons/md"; 
import { AiTwotonePushpin } from "react-icons/ai"; 
import React from 'react';
import moment from 'moment';

const NoteCard = ({title,date,content,tags,isPinned,onEdit,onDelete,onPinNote}) => {
  return (
    <div className="flex flex-col justify-between h-full p-4 bg-white hover:shadow-xl transition-all ease-in-out">
        <div className="flex items-center justify-between">
            <div>
                <h6 className="text-sm font-medium">{title}</h6>
                <span className="text-xs text-slate-500">{moment(date).format('MMMM Do YYYY')}</span>
            </div>
            <AiTwotonePushpin onClick={onPinNote} className={`icon-pin ${isPinned ?'text-primary':'text-slate-300'}`} />
        </div>
        <p className="text-xs text-slate-600 mt-2">{content?.slice(0,160)}</p>
        <div className="flex items-center justify-between mt-2">
            <div className="text-sm text-slate-500">{tags.map((item)=> `#${item} `)}</div>
            <div className="flex items-center gap-2">
                <MdCreate className="icon-btn hover:text-green-600" onClick={onEdit} />
                <MdDelete className="icon-btn hover:text-red-600" onClick={onDelete} />
            </div>
        </div>
       
    </div>
  )
}

export default NoteCard