import React from 'react'

import {Menu} from '../components/Menu/Menu';
import {EditRoom} from '../components/EditRoom/EditRoom';

export function AddChildrenPage() {
    return (
        <div className="App">
            <header>
                <div>
                    <Menu/>
                </div>
            </header>
            <body className='body'>
            <div>
                <EditRoom/>
            </div>
            </body>
        </div>
    )
}
