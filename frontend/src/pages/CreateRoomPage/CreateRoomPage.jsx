import React from "react";

import Menu from "../../components/Menu/Menu";
import { CreateRoom } from "../../components/CribroomDashboard/CreateRoom/CreateRoom";

export default function CreateRoomPage() {
  return (
    <body>
      <header>
        <div>
          <Menu />
        </div>
      </header>
      <div>
        <CreateRoom />
      </div>
    </body>
  );
}
