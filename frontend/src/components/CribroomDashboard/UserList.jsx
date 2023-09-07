//CSS, other Components and Aesthetic
import Menu from "../Menu/Menu";
import SearchBar from "../SearchBar/SearchBar";
import "./CribroomDashboard.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import UpdateUser from "../UserManagement/EditUserModal";
import DeleteUser from "../UserManagement/DeleteUserModal";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Col from "react-bootstrap/Col/";
import Row from "react-bootstrap/Row/";

//React  and React Functions Import
import React, { useEffect, useState } from "react";

import { getAllGroup, getAllUsers, handlePermissions } from "../../api/salasCuna.api";

//DataGrid Import
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [userName, setUsername] = useState("");
  const [modalEditShow, setModalEditShow] = useState(false);
  const [modalDeleteShow, setModalDeleteShow] = useState(false);

  useEffect(() => {
    listUsers();
  }, []);

  async function listUsers() {
    try {
      const responseUsers = await getAllUsers();
      setUsers(responseUsers.data);
      const userData = responseUsers.data;
      const responseGroup = await getAllGroup();
      const GroupData = responseGroup.data;
      const displayUsers = await userData.map((user) => {
        const matchingGroup = GroupData.find((group) => group.id === user.groups[0]);
        if (matchingGroup) {
          return {
            ...user,
            group: matchingGroup.name,
            is_active: user.is_active ? "Activo" : "Inactivo",
          };
        } else {
          return {
            ...user,
            group: "Sin Rol",
            is_active: user.is_active ? "Activo" : "Inactivo",
          };
        }
      });
      setUsers(displayUsers);
      setFilteredUsers(displayUsers);
    } catch (error) {
      console.log("Error fetching users", error);
      handlePermissions(error.response.status);
    }
  }

  function handleDeleteClick(rowId, CRName) {
    setSelectedUser(rowId);
    setUsername(users.first_name);
    setModalDeleteShow(true);
    console.log("Edit clicked for row with id:", rowId);
  }

  function handleEditClick(rowId) {
    setSelectedUser(rowId);
    setModalEditShow(true);
    console.log("Edit clicked for row with id:", rowId);
  }

  // SEARCH FUNCTION (Update to function on user list)
  function updateKeyword(keyword) {
    const filtered = users.filter((user) => {
      return `${user.first_name.toLowerCase()}`.includes(keyword.toLowerCase());
    });
    setKeyword(keyword);
    setFilteredUsers(filtered);
  }

  return (
    <>
      <body>
        <div className="cribroom-dashboard">
          <header className="header">
            <Menu />
          </header>

          <>
            {selectedUser && (
              <UpdateUser
                id={selectedUser}
                show={modalEditShow}
                onHide={() => {
                  setModalEditShow(false);
                  setSelectedUser("");
                  /* window.location.reload(); */
                }}
              />
            )}
            {selectedUser && (
              <DeleteUser
                id={selectedUser}
                show={modalDeleteShow}
                onHide={() => {
                  setModalDeleteShow(false);
                  setSelectedUser("");
                  /* window.location.reload(); */
                }}
              />
            )}

            <>
              <h1 className="titulo-cb">Usuarios</h1>
              <div className="contenedor-linea-cb">
                <hr className="linea-cb"></hr>
              </div>
              <Row>
                <Col className="col-md-2">
                  <SearchBar
                    keyword={keyword}
                    onChange={updateKeyword}
                    placeholder={"Buscar Usuario"}
                  />
                </Col>
                <Col>
                  <div className="add-payout-button mb-3">
                    <Link to={"/signup"}>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        className="add-payout-button mb-3"
                      >
                        Agregar Usuario
                      </Button>
                    </Link>
                  </div>
                </Col>
              </Row>
              <div className="DataGrid-Wrapper">
                <DataGrid
                  style={{ borderRadius: "15px", margin: "20px" }}
                  rows={filteredUsers}
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
                    { field: "group", headerName: "Rol", width: 150 },
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
                            label="Delete"
                            onClick={() =>
                              handleDeleteClick(params.row.id, params.row.name)
                            }
                          />
                          <GridActionsCellItem
                            variant="primary"
                            icon={<EditIcon />}
                            onClick={() => handleEditClick(params.row.id)}
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
