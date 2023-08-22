//CSS, other Components and Aesthetic
import Menu from "../Menu/Menu";
import SearchBar from "../SearchBar/SearchBar";
import "./CribroomDashboard.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

//React  and React Functions Import
import React, { useEffect, useState } from "react";

import { getAllUsers } from "../../api/salasCuna.api";

//DataGrid Import
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

export default function UserList() {
  const [user, setUser] = useState("");

  useEffect(() => {
    listUser();
  }, []);

  const listUser = async () => {
    //list user function
  };

  // SEARCH FUNCTION (Update to function on user list)

  /*   const updateKeyword = (keyword) => {
    const filtered = cribrooms.filter((cribroom) => {
      return `${cribroom.name.toLowerCase()}`.includes(keyword.toLowerCase());
    });
    setKeyword(keyword);
    setFilteredCribroom(filtered);
    console.log(filteredCribroom);
  }; */

  return (
    <>
      <body>
        <div className="cribroom-dashboard">
          <header className="header">
            <Menu />
          </header>

          <>
            <>
              <h1 className="titulo-cb">Usuarios</h1>
              <div className="contenedor-linea-cb">
                <hr className="linea-cb"></hr>
              </div>
              <div>
                <SearchBar
                  /*                   keyword={keyword}
                  onChange={updateKeyword} */
                  placeholder={"Buscar Usuario"}
                />
              </div>
              <div className="DataGrid-Wrapper">
                <DataGrid
                  style={{ borderRadius: "15px", margin: "20px" }}
                  rows={[...usersData]}
                  columns={[
                    { field: "first_name", headerName: "Nombre", width: 200 },
                    { field: "last_name", headerName: "Apellido", width: 200 },
                    { field: "email", headerName: "E-Mail", width: 150 },
                    { field: "dni", headerName: "dni", width: 150 },
                    { field: "address", headerName: "Direccion", width: 150 },
                    {
                      field: "phone_number",
                      headerName: "Numero Tel.",
                      width: 150,
                    },
                    { field: "role", headerName: "Rol", width: 150 },
                    { field: "is_active", headerName: "Estado", width: 150 },
                    {
                      field: "actions",
                      type: "actions",
                      headerName: "Acciones",
                      width: 80,
                      getActions: (params) => [
                        <>
                          <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label="Eliminar"
                          />
                          <GridActionsCellItem
                            icon={<EditIcon />}
                            label="Editar"
                          />
                        </>,
                      ],
                    },
                  ]}
                  autoHeight
                  autoWidth
                  pageSize={5}
                />
              </div>
            </>
          </>
        </div>
      </body>
    </>
  );
}
