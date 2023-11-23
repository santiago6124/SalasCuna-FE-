import React from 'react'

import Menu from '../components/Menu/Menu';
import TechnicalReport from '../components/TechnicalReport/TechnicalReport';

export default function TechnicalReportPage() {
    return (
        <div className="App">
            <header style={{ marginTop: 100 }}>
                <div>
                    <Menu />
                </div>
            </header>
            <body className='mt-3'>
            <div>
                <TechnicalReport/>
            </div>
            </body>
        </div>
    )
}
