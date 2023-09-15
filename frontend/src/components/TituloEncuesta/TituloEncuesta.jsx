import React from 'react';
import './TituloEncuesta.css';

function TituloEncuesta(props) {
    return (
      <div className='container-titulo-encuesta'>
        <h1>{props.titulo}</h1>
      </div>
    );
  }

export default TituloEncuesta