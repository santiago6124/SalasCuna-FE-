import React from 'react';

const Layout = (props) => (
    <div>
        <Navbar/>
        {props.children}
    </div>
);

export default Layout;