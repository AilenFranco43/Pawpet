import React, { useEffect, useState } from 'react'

export default function Header({ user }) {

  const [active, setActive] = useState(false)

  useEffect(() => {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');
  }, [active])

  const handleMenu = () => {
    setActive(!active)
  }

  return (

    <header>
      <div className="navbar">

        <div className="logo" >
          <img src="Logo.png" alt="Logo" />
        </div>


        <button className="hamburger" onClick={handleMenu}>&#9776;</button>


        <div className="menu">
          {user ?
            (
              <h1>Hola: {user.name}</h1>
            )
            :
            (<>
              <a href="#">Soy dueño</a>
              <a href="#">Soy cuidador</a>
            </>)

          }
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
        </div>
      </div>

    </header>

  )
}
