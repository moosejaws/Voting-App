import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {

  const { logout } = props
  return (
    <div className="navbar">
      
      <ul className="navbar-ul">
      <li> <Link to="/profile">PROFILE</Link></li>
      <li><Link to="/public">PUBLIC</Link></li>


      <li><Link to="/" onClick={logout}  class="text-muted">LOGOUT</Link></li>

      </ul>
    </div>
  )
}