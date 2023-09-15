import React from "react";
import './TituloPregunta.css';

function TituloPregunta(props) {
    const { titulo, opciones } = props;
  
    return (
      <div className='container-titulo-pregunta'>
        <h3 className="pregunta">{titulo}</h3>
        <hr className='linea-pregunta' />
        <div className="containerOptions">
            <div className="opciones-container">
            {opciones.map((opcion, index) => (
            <div key={index} className="opcion">
                <label htmlFor={`opcion-${index}`}>{opcion}</label>
                <div className="checkbox-custom"></div>
                <input type="checkbox" id={`opcion-${index}`} name={`opcion-${index}`} />
            </div>
          ))}
            </div>
        </div>
        
      </div>
    );
  }
  
  export default TituloPregunta;