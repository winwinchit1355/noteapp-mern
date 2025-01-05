import { IoMdAdd } from "react-icons/io";
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/Cards/NoteCard';
import AddEditNote from "./AddEditNotes";
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
import axiosIntance from "../../utils/axiosInstance";

const Home = () => {
  const [openEditModal, setOpenEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [userInfo,setUserInfo] = useState(null);
  const [notes,setNotes] = useState([]);
  const navigate = useNavigate();

  //get user info api
  const getUserInfo = async () => { 
    try{
      const response = await axiosIntance.get('/user');
      if(response.data && response.data.user)
      {
          setUserInfo(response.data.user);
      }
    }catch(e){
      if(e.response.status === 401){
          localStorage.clear();
          navigate('/login');
      }
    }
  }
  //get all notes
  const getNotes = async () => {
    try {
      const response = await axiosIntance.get('/get-notes');
      if(response.data && response.data.notes)
      {
          setNotes(response.data.notes);
      }
    } catch (e) {
      if(e.response && e.response.data && e.response.data.message){
          setError({message:e.response.data.message});
      }else{
          setError({message:"Something went wrong. Please try again later."});
      }
    }
  }

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(!token){
      navigate('/login');
    }
    //api call to get user
    getUserInfo();
    getNotes();
  },[]);

  const handleOnClose = () => {
    setOpenEditModal({
      isShown: false,
      type: "add",
      data: null,
    });
  }
  const handleEdit = (noteDetails) =>{
    setOpenEditModal({
      isShown: true,
      data: noteDetails,
      type: "edit"
    });
  }
  return (
    <>
      <Navbar userInfo={userInfo} />
      <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-2 xl:p-5'>
        {notes?.map((note,index) => (
          <div key={note._id} className="relative bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transform transition duration-500 hover:scale-105">
            <NoteCard
              title={note.title}
              date={note.createdOn}
              content={note.content}
              tags={note.tags}
              isPinned={note.isPinned}
              onEdit={() => {handleEdit(note)}}
              onDelete={() => { }}
              onPinNote={() => { }}
            />
          </div>
        ))}
        {/* <div className="flex items-center justify-center relative bg-slate-200 hover:cursor-pointer border rounded-lg shadow-md  transform transition duration-500 hover:scale-105">
          <button className="" onClick={() => { }}>
            <IoMdAdd size={22} />
          </button>
        </div> */}
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
        getNotes = {getNotes}
        />
       
      </Modal>
    </>
  )
}

export default Home