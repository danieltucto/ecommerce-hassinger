// 1. Primero importas las imágenes de tu carpeta assets
import cabana1 from '../assets/CABAÑA1.avif';
import cabana2 from '../assets/CABAÑA2.webp';
import cabana3 from '../assets/CABAÑA3.webp';
import cabana4 from '../assets/CABAÑA4.avif';

// 2. Luego las asignas individualmente en la propiedad "imagen"
export const productosBd = [
  {
    id: 1,
    nombre: "Hospedaje Cabaña Tradicional",
    precio: 200.00,
    precioAntiguo: 280.00,
    descuento: "-28%",
    imagen: cabana1 // <-- Aquí usas la primera imagen importada
  },
  {
    id: 2,
    nombre: "Cabaña Alpes",
    precio: 300.00,
    precioAntiguo: 320.00,
    descuento: "-21%",
    imagen: cabana2 // <-- Aquí usas otra diferente
  },
  {
    id: 3,
    nombre: "Cabaña Oxa",
    precio: 250.00,
    precioAntiguo: 300.00,
    descuento: "-25%",
    imagen: cabana3 // <-- Otra diferente
  },
  {
    id: 4,
    nombre: "Cabaña verde",
    precio: 400.00,
    precioAntiguo: 450.00,
    descuento: "-16%",
    imagen: cabana4 // <-- Y la cuarta diferente
  }
]