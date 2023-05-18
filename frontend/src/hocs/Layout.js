import React from 'react';
import Navbar from '???';

const Layout = (props) => (
    <div>
        <Navbar/>
        {props.children}
    </div>
);

export default Layout;