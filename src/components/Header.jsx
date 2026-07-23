import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ cantidad }) => {
  return (
    <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      <div className="header-logo">
        <Link to="/" className="text-xl font-bold text-emerald-800 cursor-pointer">
          Raiz Oxapampina
        </Link>
      </div>

      <nav className="flex items-center gap-6">
        <Link to="/login" className="text-sm font-semibold text-gray-700 hover:text-emerald-800 transition-colors">
          Mi Cuenta
        </Link>

        <div className="relative cursor-pointer flex items-center gap-1 text-gray-700">
          <span className="text-sm font-medium">🛒 Carrito:</span>
          <span className="bg-emerald-800 text-white text-xs px-2 py-0.5 rounded-full font-bold">
            {cantidad}
          </span>
        </div>
      </nav>
    </header>
  )
}

export default Header