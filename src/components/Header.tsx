import React from 'react'
import './../assets/styles/header.css'

function Header() {
  return (
    <div>
        <header className="w-full h-20 flex items-center justify-center">
        <a href='/'><h1 className='Header text-2xl'>Bank Appointment</h1></a>
      </header>
    </div>
  )
}

export default Header