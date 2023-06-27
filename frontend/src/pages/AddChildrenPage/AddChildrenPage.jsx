import React from 'react'
import {AddChildren} from '../../components/AddChildren/AddChildren.jsx'
import {AddTutor} from '../../components/AddTutor/AddTutor'
import {AddResidence} from '../../components/AddResidence/AddResidence'
import {Button} from 'react-bootstrap'


export default function añadirChicoPage() {
    return (
        <div className="App">
            <body className='body'>
            <div>
                <AddChildren/>
                <AddTutor/>
                <AddResidence/>
                <div className='contenedor-boton mb-5'>
                    <Button as="input" type="submit" value="Cargar" size='lg'/>
                </div>
            </div>
            </body>
        </div>
    )
};

