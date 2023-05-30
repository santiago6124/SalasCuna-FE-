import React from 'react'

export function añadirChicoPage() {
  return (
    <div className="App">
      <header>
        <div>
          <Menu />
        </div>
      </header>
      <body className='body'>
        <div>
            <AñadirChico />
            <AñadirTutor />
            <AñadirDomicilio />
            <div className='contenedor-boton mb-5'>
              <Button as="input" type="submit" value="Cargar" size='lg' />
            </div>
        </div>
      </body>
    </div>
  )
}

