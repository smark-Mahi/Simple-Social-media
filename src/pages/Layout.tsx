import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

const Layout = () => {
  return (
    <div className='flex'>
     <div className='basis-1/6'><Sidebar/></div>
      <div className='basis-11/12 h-screen'><Outlet/></div>
    </div>
  )
}

export default Layout
