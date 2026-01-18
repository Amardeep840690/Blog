import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = ()=>{
        authService.logOut()
        .then(()=>{
            dispatch(logout())
        })
        
    }

  return (
    <button 
      className='px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium' 
      onClick={logoutHandler}
    >
      Logout
    </button>
  )
}

export default LogoutBtn
