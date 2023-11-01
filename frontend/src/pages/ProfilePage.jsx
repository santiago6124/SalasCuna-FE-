import React from "react";
import Account from "../components/Account/Account";
import Menu from "../components/Menu/Menu";

export default function ProfilePage() {
  return (
    <div className="App">
      <header style={{ marginTop: 100 }}>
        <div>
          <Menu />
        </div>
      </header>
      <body className="mt-5">
        <div>
          <Account />
        </div>
      </body>
    </div>
  );
}