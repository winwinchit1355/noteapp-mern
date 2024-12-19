import { IoMdAdd } from "react-icons/io";
import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import AddEditNote from "./AddEditNotes";
import Modal from 'react-modal';

const Home = () => {
  const [openEditModal, setOpenEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  const handleOnClose = () => {
    setOpenEditModal({
      isShown: false,
      type: "add",
      data: null,
    });
  }
  return (
    <>
      <Navbar />
      <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-2 xl:p-5'>
        <div className="relative bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transform transition duration-500 hover:scale-105">
          <NoteCard
            title="Internal Meeting for Project A"
            date="12/12/2024"
            content={content}
            tags="#meeting"
            isPinned={true}
            onEdit={() => { }}
            onDelete={() => { }}
            onPinNote={() => { }}
          />
        </div>
        <div className="relative bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transform transition duration-500 hover:scale-105">
          <NoteCard
            title="Internal Meeting for Project A"
            date="12/12/2024"
            content={content}
            tags="#meeting"
            isPinned={true}
            onEdit={() => { }}
            onDelete={() => { }}
            onPinNote={() => { }}
          />
        </div>
        <div className="flex items-center justify-center relative bg-slate-200 hover:cursor-pointer border rounded-lg shadow-md  transform transition duration-500 hover:scale-105">
          <button className="" onClick={() => { }}>
            <IoMdAdd size={22} />
          </button>
        </div>
      </div>
      <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-700 absolute right-5 bottom-5" onClick={() => { 
        setOpenEditModal({
          isShown: true,
          type: "add",
          date: null,
        });
      }}>
        <IoMdAdd size={30} className="text-white" />
      </button>
      
      <Modal
        isOpen={openEditModal.isShown}
        ariaHideApp={false}
        onAfterOpen={()=>{}}
        onRequestClose={() => {}}
        style={{overlay:{
          backgroundColor: 'rgba(0, 0, 0, 0.2)'
        }}}
        contentLabel="Example Modal"
        className="w-96 md:w-[40%] max-h-3/4 overflow-auto bg-white rounded-md mx-auto mt-14 p-5 "
      >
        <AddEditNote
        onClose={handleOnClose}
        type={openEditModal.type}
        noteData={openEditModal.data}
        />
       
      </Modal>
    </>
  )
}

export default Home