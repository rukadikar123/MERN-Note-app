import React from 'react'
import { getInitials } from '../utils/helper'

function ProfileInfo({onLogout}) {
  return (
    <div className='flex gap-4 items-center'> 
      <h1 className='text-xl text-slate-700 bg-slate-200 font-medium rounded-full px-2 py-1'>{getInitials("siddharth rukadikar")}</h1>
      <div className='flex gap-2 items-center'>
        <p className='text-lg text-slate-700 font-medium'>Siddharth</p>
        <button onClick={onLogout} className='text-md text-white/80 bg-red-500 rounded-sm px-2 py-1 font-medium cursor-pointer'>Logout</button>
      </div>
    </div>
  )
}

export default ProfileInfo