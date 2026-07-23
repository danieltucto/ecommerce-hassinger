import React, { useState, useEffect } from 'react'
import Card from '../components/Card'

import cabana1 from "../assets/CABAÑA1.avif";
import cabana2 from "../assets/CABAÑA2.webp";
import cabana3 from "../assets/CABAÑA3.webp";
import cabana4 from "../assets/CABAÑA4.avif";

const imagenesLocales = {
  1: cabana1,
  2: cabana2,
  3: cabana3,
  4: cabana4
};

const Home = ({ setCantidad }) => {
  const [productos, setProductos] = useState([])
  const [terminoBusqueda, setTerminoBusqueda] = useState('')
  const [cargando, setCargando] = useState(true)
  const [errorNet, setErrorNet] = useState(null)
  
  // Estados para los formularios locales de la barra lateral y boletín
  const [usuarioReg, setusuarioReg] = useState('')
  const [claveReg, setClaveReg] = useState('')
  const [correoBoletin, setCorreoBoletin] = useState('')

  useEffect(() => {
    const obtenerProductosServidor = async () => {
      try {
        setCargando(true)
        setErrorNet(null)

        const urlApi = "https://firestore.googleapis.com/v1/projects/sistema-alquiler-oxa/databases/(default)/documents/productos"
        const respuesta = await fetch(urlApi)

        if (!respuesta.ok) {
          throw new Error("No se pudo conectar con Firebase.")
        }

        const datosRaw = await respuesta.json()
        
        if (datosRaw.documents) {
          const productosLimpios = datosRaw.documents.map((doc) => {
            const campos = doc.fields || {};
            const idFirebase = campos.id 
              ? Number(campos.id.integerValue || campos.id.doubleValue || campos.id.stringValue) 
              : 0;
            
            const imagenFirebase = campos.imagen ? campos.imagen.stringValue : "";
            const esLinkDeInternet = imagenFirebase.startsWith("http://") || imagenFirebase.startsWith("https://");

            return {
              id: idFirebase,
              nombre: campos.nombre ? campos.nombre.stringValue : "Producto sin nombre",
              precio: campos.precio ? Number(campos.precio.doubleValue || campos.precio.integerValue || campos.precio.stringValue) : 0,
              precioAntiguo: campos.precioAntiguo ? Number(campos.precioAntiguo.doubleValue || campos.precioAntiguo.integerValue || campos.precioAntiguo.stringValue) : 0,
              descuento: campos.descuento ? campos.descuento.stringValue : "",
              imagen: esLinkDeInternet ? imagenFirebase : (imagenesLocales[idFirebase] || cabana1),
              ubicacion: campos.ubicacion ? campos.ubicacion.stringValue : "Oxapampa",
              servicios: campos.servicios ? campos.servicios.stringValue : "Servicios básicos",
              disponible: campos.disponible ? campos.disponible.booleanValue : true
            }
          })
          setProductos(productosLimpios)
        } else {
          setProductos([])
        }
      } catch (err) {
        setErrorNet(err.message)
      } finally {
        setCargando(false)
      }
    }

    obtenerProductosServidor()
  }, [])

  // Manejadores para los formularios agregados
  const manejarRegistroLocal = (e) => {
    e.preventDefault()
    alert(`¡Cuenta creada con éxito!\nBienvenido: ${usuarioReg}`)
    setusuarioReg('')
    setClaveReg('')
  }

  const manejarBoletinLocal = (e) => {
    e.preventDefault()
    alert(`¡Suscripción exitosa! Enviaremos ofertas a: ${correoBoletin}`)
    setCorreoBoletin('')
  }

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre?.toLowerCase().includes(terminoBusqueda.toLowerCase())
  )

  return (
    <div>
      <div className="mb-6 text-left">
        <input
          type="text"
          placeholder="Buscar productos (ej. cabaña, hotel)..."
          value={terminoBusqueda}
          onChange={(e) => setTerminoBusqueda(e.target.value)}
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-emerald-800 shadow-sm"
          disabled={cargando}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start mb-12">
        <section className="text-left lg:col-span-3">
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-lg font-bold text-gray-800">catalogos</h3>
            {!cargando && <span className="text-xs text-gray-500">{productosFiltrados.length} resultados</span>}
          </div>

          {cargando && (
            <div className="text-center py-12 text-gray-500 animate-pulse">
              <p className="text-base font-semibold">Conectando con la base de datos...</p>
            </div>
          )}

          {errorNet && !cargando && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm mb-4">
              <p>{errorNet}</p>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
            {!cargando && !errorNet && (
              productosFiltrados.length === 0 ? (
                <p className="col-span-full text-gray-500 text-sm py-8">No se encontraron productos.</p>
              ) : (
                productosFiltrados.map((item) => (
                  <Card
                    key={item.id}
                    producto={item}
                    alAgregar={() => setCantidad(prev => prev + 1)}
                  />
                ))
              )
            )}
          </div>
        </section>

        {/* BARRA LATERAL CON EL RESUMEN Y EL REGISTRO DE CUENTA */}
        <aside className="flex flex-col gap-6">
          <section className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm text-left">
            <h3 className="font-bold text-gray-800 text-base mb-2">Resumen de Compras</h3>
            <div className="flex justify-between border-b pb-2 mb-2 text-sm">
              <span>Total de Items:</span>
              <span className="font-bold text-emerald-800">Sincronizado</span>
            </div>
            <button className="w-full mt-2 bg-emerald-800 text-white text-xs font-semibold py-2.5 rounded-md shadow-sm">
              Ir a Pagar
            </button>
          </section>

          <section className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm text-left">
            <h3 className="font-bold text-gray-800 text-base mb-1">Crear Cuenta Rapida</h3>
            <p className="text-xs text-gray-500 mb-4">Únete para comprar rápido y seguro.</p>
            
            <form onSubmit={manejarRegistroLocal} className="flex flex-col gap-3">
              <div>
                <label className="text-[11px] font-semibold text-gray-700 block mb-1">Usuario / Correo</label>
                <input
                  type="text"
                  placeholder="ejemplo@correo.com"
                  value={usuarioReg}
                  onChange={(e) => setusuarioReg(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-xs outline-none focus:border-emerald-800 bg-gray-50"
                  required
                />
              </div>
              
              <div>
                <label className="text-[11px] font-semibold text-gray-700 block mb-1">Contraseña</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={claveReg}
                  onChange={(e) => setClaveReg(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-xs outline-none focus:border-emerald-800 bg-gray-50"
                  required
                />
              </div>

              <button type="submit" className="w-full mt-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 rounded-md transition-colors shadow-sm">
                Registrarme
              </button>
            </form>
          </section>
        </aside>
      </div>

      {/* BOLETÍN DEL VIAJERO AL FINAL DE LA VISTA HOME */}
      <section className="bg-emerald-50 p-6 rounded-lg max-w-md mx-auto border border-emerald-100 mb-8 shadow-sm">
        <h3 className="text-center font-bold text-emerald-900 mb-1 text-base">Boletín del Viajero</h3>
        <p className="text-center text-xs text-emerald-700 mb-4">Ingresa tu correo para enterarte de ofertas y descuentos exclusivos.</p>
        
        <form onSubmit={manejarBoletinLocal} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Ingresa tu correo para novedades..."
            value={correoBoletin}
            onChange={(e) => setCorreoBoletin(e.target.value)}
            className="p-2.5 border border-emerald-200 rounded-md text-sm outline-none focus:border-emerald-800 bg-white"
            required
          />
          <button type="submit" className="bg-emerald-800 text-white text-sm font-semibold py-2 rounded-md hover:bg-emerald-900 transition-colors shadow-sm">
            Suscribirme
          </button>
        </form>
      </section>
    </div>
  )
}

export default Home