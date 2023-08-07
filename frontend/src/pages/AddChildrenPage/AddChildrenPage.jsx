import React from 'react'
import {AddChildren} from '../../components/AddChildren/AddChildren.jsx'
import {AddTutor} from '../../components/AddTutor/AddTutor'
import {AddResidence} from '../../components/AddResidence/AddResidence'
import {Button} from 'react-bootstrap'
import { FormAddChildren } from '../../components/FormAddChildren/FormAddChildren.jsx'

export default function AñadirChicoPage() {
    return (
        <div className="App">
            <body className='body'>
                <div>
                    <FormAddChildren/>               
                </div>
            </body>
        </div>
    )
};

