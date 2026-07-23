import React from 'react'

const Card = ({ producto, alAgregar }) => {
  // Desestructuramos los campos de forma segura
  const { nombre, precio, precioAntiguo, descuento, imagen, ubicacion, capacidad, servicios, disponible } = producto

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 w-full max-w-[280px] flex flex-col justify-between text-left">
      
      {/* Contenedor de Imagen y Descuento */}
      <div className="relative bg-gray-100 h-44 w-full flex items-center justify-center overflow-hidden">
        {descuento && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
            {descuento}
          </span>
        )}
        <img 
          src={imagen} 
          alt={nombre} 
          className="object-cover h-full w-full hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // Imagen de respaldo por si falla el enlace de internet
            e.target.src = "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=500";
          }}
        />
      </div>

      {/* Cuerpo de la Tarjeta */}
      <div className="p-4 flex-grow flex flex-col justify-between gap-2">
        <div>
          <span className="text-[10px] font-semibold tracking-wider text-emerald-700 uppercase block">
             {ubicacion}
          </span>
          <h4 className="font-bold text-gray-800 text-sm mt-0.5 line-clamp-1">
            {nombre}
          </h4>
          
        
         
        </div>

        {/* Sección de Precios y Botón */}
        <div className="mt-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-extrabold text-emerald-800">
              S/ {precio?.toFixed(2)}
            </span>
            {precioAntiguo > 0 && (
              <span className="text-xs text-gray-400 line-through">
                S/ {precioAntiguo?.toFixed(2)}
              </span>
            )}
          </div>

          <button 
            onClick={alAgregar}
            disabled={!disponible}
            className={`w-full py-2 rounded-lg text-xs font-bold transition-colors shadow-sm ${
              disponible 
                ? 'bg-emerald-800 hover:bg-emerald-900 text-white' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {disponible ? 'Reservar Cabaña' : 'No Disponible'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
