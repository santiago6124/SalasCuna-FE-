import React from 'react'
import TituloEncuesta from '../../components/TituloEncuesta/TituloEncuesta'
import Menu from '../../components/Menu/Menu';
import TituloPregunta from '../../components/TituloPregunta/TituloPregunta';
import {Button} from 'react-bootstrap'

function EncuestaSAPage() {
    const opcionesRespuesta = ["Opción 1", "Opción 2", "Opción 3"];

  return (
    <body>
      <header>
        <div>
          <Menu />
        </div>
      </header>
      <div className='container-page'>
        <TituloEncuesta titulo={'Encuesta Socio Ambiental'} />
        <TituloPregunta titulo="¿Cuál es tu respuesta?" opciones={opcionesRespuesta} />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop:'20px' }}>
            <Button variant="primary" type="submit">
                Cargar
            </Button>
        </div>
      </div>
    </body>
  )
}

export default EncuestaSAPage;