import React from 'react'
import { useParams, Link } from 'react-router-dom'

const DetalleProducto = () => {
  const { id } = useParams()
  return (
    <div className="text-center p-10 bg-white border rounded-lg max-w-lg mx-auto shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Detalle de la Cabaña N° {id}</h2>
      <p className="text-gray-600 mb-6">Próximamente se mostrará la información detallada aquí de forma dinámica.</p>
      <Link to="/" className="text-emerald-700 font-semibold hover:underline">← Volver al Catálogo</Link>
    </div>
  )
}

export default DetalleProducto