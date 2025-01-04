import React from 'react'
import { getInitials } from '../../utils/helper'

const ProfileInfo = ({userInfo,onLogout}) => {

  return (
    <div className='flex items-center gap-3'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full text-sm text-slate-950 bg-slate-100 font-medium'>{getInitials(`${userInfo?.fullName}`)}</div>
        <div>
            <p>{userInfo?.fullName}</p>
            <button className='text-sm underline text-slate-700' onClick={onLogout}>Logout</button>
        </div>
    </div>
  )
}

export default ProfileInfo