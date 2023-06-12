import React from 'react'
import Avatar from '@mui/material/Avatar';
import Profileposts from '../../components/Profileposts';
import Box from "@mui/material/Box";
const Profile = () => {
  return (
    <div className='h-max flex justify-center'>
      <div className='w-[70%] h-screen pt-10 h-max'>
      <div className='flex justify-evenly items-center'>
      <div>
      <Avatar
        alt="Remy Sharp"
        src="/"
        sx={{ width: 100, height: 100 }}
      />
      </div>
      <div className='flex flex-col justify-around w-[60%] h-[150px]'>
      <div className='flex justify-start gap-12'>
        <h6 className='text-2xl'>Sumeria_</h6>
        <button>Edit Profile</button>
      </div>
      <div className='flex justify-around'>
        <h4>164 <span className='font-bold'>posts</span></h4>
        <h4>188 <span className='font-bold'>followers</span></h4>
        <h4>206 <span className='font-bold'>following</span></h4>
        <Box className="absolute top-5 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 "></Box>
      </div>
      <div>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur placeat quod beatae iure eius</p>
      </div>
      </div>
      </div>
      <div className='mt-12'>
        <div className='flex flex-wrap gap-3'>
        <Profileposts/>
        <Profileposts/>
        <Profileposts/>
        <Profileposts/>
        <Profileposts/>
        <Profileposts/>
        <Profileposts/>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Profile
