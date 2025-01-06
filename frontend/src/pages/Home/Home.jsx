import { IoMdAdd } from "react-icons/io";
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/Cards/NoteCard';
import AddEditNote from "./AddEditNotes";
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
import axiosIntance from "../../utils/axiosInstance";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import noImageSvg from "../../assets/images/no-image.svg";

const Home = () => {
  const [openEditModal, setOpenEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [showToastMsg,setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add"
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
  const handleDelete = async (noteData) =>{
    try {
      const response = await axiosIntance.delete('/delete-note/'+noteData?._id);
      if(response.data && response.data.error)
        {
          handleShowToast(response.data.message,"delete");
          return;
        }
        if(response.data && !response.data.error)
        {
          handleShowToast("Successfully delete note","delete");
          getNotes();
        }
    } catch (e) {
        if(e.response && e.response.data && e.response.data.message){
          handleShowToast(e.response.data.message,"delete");
        }else{
          handleShowToast("Something went wrong. Please try again later.","delete");
        }
    }
  }
  const handlePinUpdate = async (noteData) =>{
    try {
      const response = await axiosIntance.put('/update-note-pin/'+noteData?._id,{
        isPinned: !noteData.isPinned
      });
      if(response.data && response.data.error)
        {
          handleShowToast(response.data.message,"update");
          return;
        }
        if(response.data && !response.data.error)
        {
          handleShowToast(`Successfully ${noteData.isPinned? "unpin":"pin"} note`,"update");
          getNotes();
        }
    } catch (e) {
        if(e.response && e.response.data && e.response.data.message){
          handleShowToast(e.response.data.message,"update");
        }else{
          handleShowToast("Something went wrong. Please try again later.","update");
        }
    }
  }
  const handleShowToast = (message,type) =>{
    setShowToastMsg({
      isShown: true,
      message,
      type
    });
  }
 const handleCloseToast = (message,type) =>{
  setShowToastMsg({
    isShown: false,
    message,
    type
  });
 }
  return (
    <>
      <Navbar userInfo={userInfo} />
      {notes.length > 0 ? <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-2 xl:p-5'>
         {notes?.map((note,index) => (
          <div key={note._id} className="relative bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transform transition duration-500 hover:scale-105 ">
            <NoteCard
              title={note.title}
              date={note.createdOn}
              content={note.content}
              tags={note.tags}
              isPinned={note.isPinned}
              onEdit={() => {handleEdit(note)}}
              onDelete={() => { handleDelete(note) }}
              onPinNote={() => { handlePinUpdate(note) }}
            />
          </div>
        )) }
        {/* <div className="flex items-center justify-center relative bg-slate-200 hover:cursor-pointer border rounded-lg shadow-md  transform transition duration-500 hover:scale-105">
          <button className="" onClick={() => { }}>
            <IoMdAdd size={22} />
          </button>
        </div> */}
      </div>
      : 
      <EmptyCard imgSrc={noImageSvg} message="No note! Create your thoughts and daily routings by clicking plus button on the right bottom corner!" />
        }
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
        showToastMessage = {handleShowToast}
        />
       
      </Modal>
      <Toast 
      isShown = {showToastMsg.isShown}
      message = {showToastMsg.message}
      type = {showToastMsg.type}
      onClose = {handleCloseToast}
      />
    </>
  )
}

export default Home