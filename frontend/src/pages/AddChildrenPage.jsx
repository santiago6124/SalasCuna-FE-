import React from 'react'
import { AddChildren } from '../components/AddChildren/AddChildren'
import { AddTutor } from '../components/AddTutor/AddTutor'
import { AddResidence } from '../components/AddResidence/AddResidence'

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
            <AddChildren />
            <AddTutor />
            <AddResidence />
            <div className='contenedor-boton mb-5'>
              <Button as="input" type="submit" value="Cargar" size='lg' />
            </div>
        </div>
      </body>
    </div>
  )
}

