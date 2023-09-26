import React from "react";
import Payout from "../components/Payout/Payout";
import Menu from "../components/Menu/Menu";

export default function MontoPage() {
  return (
    <div className="App">
      <header>
        <div>
          <Menu className="mb-3"/>
        </div>
      </header>
      <body className="mt-5">
        <div>
          <Payout />
        </div>
      </body>
    </div>
  );
}
