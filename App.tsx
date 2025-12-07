import React, { useState, useEffect } from 'react';

// Asegúrate de que importas todos tus componentes aquí (p. ej., Header, Footer, Seccion1, etc.)
// import { Header } from './components/Header'; 
// import { Footer } from './components/Footer'; 
// import Seccion1 from './components/Seccion1'; 

const CLAVE_SECRETA = "arte2025";

function App() {
  // Estado para saber si el usuario ha introducido la clave correcta
  const [accesoPermitido, setAccesoPermitido] = useState(false);
  // Estado para indicar que la aplicación está cargando (mientras pide la clave)
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Esta función se ejecuta solo una vez al inicio para pedir la clave
    const verificarClave = () => {
      const claveIngresada = prompt("Página en construcción. Por favor, introduce la clave de acceso para continuar:");

      if (claveIngresada === CLAVE_SECRETA) {
        setAccesoPermitido(true);
      } else {
        // Si la clave es incorrecta, el acceso permitido sigue en false
        setAccesoPermitido(false);
      }
      setCargando(false); // Termina de cargar, ya sea que se haya dado acceso o no
    };

    verificarClave();
  }, []); // El array vacío [] asegura que solo se ejecute al montar el componente

  // ----------------------------------------------------
  // Lógica de Renderizado (Qué mostrar al usuario)
  // ----------------------------------------------------

  if (cargando) {
    // Muestra una pantalla de carga muy simple mientras se ejecuta el prompt
    return <div style={{ textAlign: 'center', padding: '50px' }}>Cargando...</div>;
  }

  if (!accesoPermitido) {
    // Si la clave fue incorrecta, muestra el mensaje al público
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '100px', 
        fontFamily: 'Playfair Display, serif',
        color: '#444'
      }}>
        <h1>Página en Construcción</h1>
        <p style={{ fontSize: '1.2em' }}>Vuelve pronto para ver la nueva web de Myriam Alcaraz.</p>
        <p style={{ marginTop: '30px', fontSize: '0.9em' }}>
            Si eres Myriam, simplemente recarga la página para volver a intentar ingresar la clave.
        </p>
      </div>
    );
  }

  // SI LLEGA AQUÍ, EL ACCESO FUE CORRECTO.
  // Ahora, devuelve TODO EL CÓDIGO JSX de tu página.
  // Sustituye el texto [AQUÍ VA EL CONTENIDO...] por la estructura JSX de tu web.
  return (
    <div>
        {/*
          IMPORTANTE:
          Reemplaza esta línea de abajo con todo el código de tu página web (Header, secciones, etc.)
          que tenías previamente en App.tsx. Si solo tenías los imports, debes añadir el código.
        */}
        <h1>[AQUÍ VA EL CONTENIDO ACTUAL DE TU WEB]</h1>
        {/* <Header /> */}
        {/* <Seccion1 /> */}
    </div>
  );
}

export default App;