import { AiOutlineCloseCircle } from "react-icons/ai"; 
import { AiOutlineCheckCircle } from "react-icons/ai"; 
import React, { useEffect } from 'react';

const Toast = ({isShown,message,type,onClose}) => {
  useEffect(() => {
    if(isShown){
      const timeoutId = setTimeout(()=>{
        onClose(message,type);
      },3000);
      return () => {
        clearTimeout(timeoutId);
      }
    }
    
  },[isShown,onClose]);

  return (
    <div className={`absolute top-20 right-6 transation-all duration-400
    ${ isShown === true? "opacity-100 translate-x-0":"opacity-0 translate-x-10"}`} 
    style={{
      transition: "opacity 0.4s ease, transform 0.4s ease",
      pointerEvents: isShown ? "auto" : "none",
    }}
    >
      <div className={`min-w-52 bg-white border shadow-2xl rounded-md after:w-[5px] after:h-full
        ${ type === 'delete'? "after:bg-red-500":"after:bg-green-500"}
        after:absolute after:left-0 after:top-0 after:rounded-l-lg`}>
        <div className="flex items-center gap-3 py-2 px-4">
          <div className={`w-10 h-10 flex items-center justify-center rounded-full
            ${ type === 'delete'? "bg-red-50":"bg-green-50"}`}>
            {type === 'delete' ? <AiOutlineCloseCircle className="text-xl text-red-500" />:<AiOutlineCheckCircle className="text-xl text-green-500" />}
            
            
          </div>
          <p className="text-sm text-slate-800">{message}</p>
        </div>
      </div>
    </div>
  )
}

export default Toast