import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast' // Importamos la librería de notificaciones

const Login = () => {
  const [correo, setCorreo] = useState('')
  const [errorValidacion, setErrorValidacion] = useState('') // Estado para mensaje de error visual
  const [procesando, setProcesando] = useState(false) // Estado de carga (Loader)
  const navigate = useNavigate()

  const registrarUsuario = async (e) => {
    e.preventDefault()
    setErrorValidacion('') // Limpiamos errores previos

    // 1. VALIDACIÓN PREVENTIVA (FRONTEND)
    if (!correo.trim()) {
      setErrorValidacion("El campo no puede estar vacío.")
      return // Detiene la función aquí, No llama a Firebase
    }

    // Expresión regular básica para verificar que parezca un correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(correo)) {
      setErrorValidacion("Por favor, ingresa un correo electrónico válido.")
      return // Detiene la función si no pasa el formato de correo
    }

    // 2. INICIO DE ESTADO DE CARGA
    setProcesando(true)

    // URL API oficial apuntando a tu ID de proyecto en Firebase
    const urlApi = "https://firestore.googleapis.com/v1/projects/sistema-alquiler-oxa/databases/(default)/documents/usuarios"

    const payload = {
      fields: {
        correo: { stringValue: correo },
        fecha: { stringValue: new Date().toISOString() }
      }
    }

    // 3. BLOQUE DE SEGURIDAD (TRY / CATCH / FINALLY)
    try {
      const respuesta = await fetch(urlApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (!respuesta.ok) {
        throw new Error("Fallo en el servidor de base de datos")
      }

      // NOTIFICACIÓN TOAST DE ÉXITO
      toast.success("¡Bienvenido a Raiz Oxapampina!")
      navigate("/") // Redirección al Home
    } catch (error) {
      // NOTIFICACIÓN TOAST DE ERROR
      toast.error(error.message)
    } finally {
      // Esto siempre se ejecuta, apagando el botón de carga y limpiando el input
      setProcesando(false)
      setCorreo("")
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg border border-gray-200 shadow-sm mt-10">
      <h2 className="text-xl font-bold text-emerald-800 mb-4 text-center">Registro de Clientes</h2>
      
      <form onSubmit={registrarUsuario} className="flex flex-col gap-4">
        <div>
          <input
            type="text" // Quitamos type="email" y required para probar nuestra propia validación de React
            placeholder="Ingresa tu correo"
            value={correo}
            onChange={(e) => {
              setCorreo(e.target.value)
              setErrorValidacion('') // Limpia el error al escribir
            }}
            disabled={procesando} // Se bloquea el input si está cargando
            className={`w-full p-2 border rounded-md outline-none text-sm transition-colors ${
              errorValidacion 
                ? 'border-red-500 focus:border-red-500 bg-red-50' 
                : 'border-gray-300 focus:border-emerald-800'
            }`}
          />
          
          {/* RENDERIZADO CONDICIONAL DEL ERROR */}
          {errorValidacion && (
            <p className="text-red-500 text-xs mt-1 font-medium text-left">
              ⚠️ {errorValidacion}
            </p>
          )}
        </div>

        {/* BOTÓN CON SPINNER ANIMADO */}
        <button
          type="submit"
          disabled={procesando} // Evita el doble clic y desactiva el botón
          className={`w-full text-white text-sm font-semibold py-2 rounded-md transition-colors flex justify-center items-center gap-2 ${
            procesando 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-emerald-600 hover:bg-emerald-700'
          }`}
        >
          {procesando ? (
            <>
              {/* SPINNER SVG ANIMADO */}
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Conectando...
            </>
          ) : (
            'Crear Cuenta'
          )}
        </button>
      </form>
    </div>
  )
}

export default Login