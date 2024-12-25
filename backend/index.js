require('dotenv').config();
const config = require('./config.json');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

mongoose.connect(config.connectionString);

const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors({
    origin: '*'
}));

const User = require('./models/user.model');
const Note = require('./models/note.model');
const { authenticateToken } = require('./utilities');

const server = app.listen(8000,() =>{
    console.log('Api started at port 8000');
});

app.get('/',(req,res) =>{
    res.json({msg:"hello world api"});
});

app.post('/login',async (req,res) =>{
    const {email,password} = req.body;
    if(!email){
        return res.status(400).json({error:true,message:"Email is required"});
    }
    if(!password){
        return res.status(400).json({error:true,message:"Password is required"});
    }
    const user = await User.findOne({email:email});
    if(!user){
        return res.status(400).json({error:true,message:"User not existed"});
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect){
        return res.status(400).json({error:true,message:"Password is incorrect"});
    }
    if(user.email == email && isPasswordCorrect){
        const accessToken = jwt.sign({user},process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '8h'
        });
        return res.status(200).json({
            error:false,
            user,
            accessToken,
            message:"Login successfully"
    
        });
    }else{
        return res.status(400).json({error:true,message:"Invalid credentials"})
    }
});

app.post('/create-account',async (req,res) =>{
    const {fullName,password,email,createdOn} = req.body;
    if(!fullName){
        return res.status(400).json({error:true,message:"Fullname is required"});
    }
    if(!email){
        return res.status(400).json({error:true,message:"Email is required"});
    }
    if(!password){
        return res.status(400).json({error:true,message:"Password is required"});
    }
    const isUser = await User.findOne({email:email});
    if(isUser){
        return res.status(400).json({error:true,message:"User already existed"});
    }
    const user = new User({
        fullName,
        email,
        password: await bcrypt.hash(password,10)
    });
    await user.save();
    const accessToken = jwt.sign({user},process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: '8h'
    });
    return res.status(200).json({
        error:false,
        user,
        accessToken,
        message:"Register successfully"

    });
});

app.get('/get-notes',authenticateToken,async (req,res) =>{
    const {user} = req.user;
    
    try{
        const notes = await Note
            .find({userId:user._id})
            .sort({
                isPinned:-1,
            });
        return res.status(200).json({
            error:false,
            notes,
            message: "Notes fetched successfully"
        });
    }catch(err){
        return res.status(500).json({
            error:true,
            message:err.message
        });
    }
});

app.post('/create-note',authenticateToken,async (req,res) =>{
    const {title,content,tags} = req.body;
    const {user} = req.user;
    if(!title){
        return res.status(400).json({error:true,message:"Title is required"});
    }

    if(!content){
        return res.status(400).json({error:true,message:"Content is required"});
    }   

    try{
        const note = new Note({
            title,
            content,
            tags : tags || [],
            userId : user._id
        });
        await note.save();
        return res.status(200).json({
            error:false,
            note,
            message:"Note created successfully"
        });
    }catch(err){
        return res.status(500).json({
            error:true,
            message:err.message
        });
    }
});

app.put('/edit-note/:noteId',authenticateToken,async (req,res) =>{
    const noteId = req.params.noteId;
    const {title,content,tags,isPinned} = req.body;
    const {user} = req.user;
    if(!title && !content && !tags)
    {
        return res.status(400).json({error:true,message:"No changes provided"});
    }
    try{
        const note = await Note.findOne({_id:noteId,userId:user._id});
        if(!note){
            return res.status(404).json({error:true,message:"Note not found"});
        }
        title && (note.title = title);
        content && (note.content = content);
        tags && (note.tags = tags);
        isPinned && (note.isPinned = isPinned);
        await note.save();
        return res.status(200).json({
            error:false,
            note,
            message:"Note updated successfully"
        });
    }catch(err){
        return res.status(500).json({
            error:true,
            message:err.message
        });
    }
});

app.delete('/delete-note/:noteId',authenticateToken,async (req,res) =>{
    const noteId = req.params.noteId;
    const {user} = req.user;
    try{
        const note = await Note.findOne({
            _id:noteId,
            userId:user._id
        });
        if(!note){
            return res.status(404).json({
                error:true,
                message:"Note not found"
            });
        }
        await note.deleteOne();
        return res.status(200).json({
            error:false,
            message:"Note deleted successfully" 
        });
    }catch(err){
        return res.status(500).json({
            error:true,
            message:err.message
        });
    }
});

module.exports = app;
