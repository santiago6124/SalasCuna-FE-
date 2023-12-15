//CSS, other Components and Aesthetic
import Menu from "../Menu/Menu";
import SearchBar from "../SearchBar/SearchBar";
import "./UserList.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";


import DeleteUser from "../UserManagement/DeleteUserModal";


import Button from "@mui/material/Button";
import Col from "react-bootstrap/Col/";
import Row from "react-bootstrap/Row/";

//React  and React Functions Import
import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { getAllGroup, handlePermissions, user_request } from "../../api/salasCuna.api";

//DataGrid Import
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { toastLoading, toastUpdateError, toastUpdateSuccess } from "../../utils/toastMsgs";
import { ToastContainer } from "react-toastify";

import { UserForm } from "../UserForm/UserForm";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [modalEditShow, setModalEditShow] = useState(false);
  const [modalDeleteShow, setModalDeleteShow] = useState(false);
  const [modalCreateShow, setModalCreateShow] = useState(false);

  const [selectedUserData, setSelectedUserData] = useState(null);

  let {authTokens} = useContext(AuthContext);
  const customId = useRef(null);

  useEffect(() => {
    listUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function listUsers() {
    try {
      toastLoading("Cargando Usuarios", customId);
      const responseUsers = await user_request(authTokens.access);
      console.log(responseUsers);
      setUsers(responseUsers.data);
      const userData = responseUsers.data;
      const responseGroup = await getAllGroup(authTokens.access);
      const GroupData = responseGroup.data;
      const displayUsers = await userData.map((user) => {
        const matchingGroup = GroupData.find(
          (groups) => groups.id === user.groups[0]
        );
        if (matchingGroup) {
          return {
            ...user,
            groups: user.groups[0],
            groupName: matchingGroup.name,
            is_active: user.is_active ? "Activo" : "Inactivo",
          };
        } else {
          return {
            ...user,
            groups: user.groups[0],
            groupName: "Sin Rol",
            is_active: user.is_active ? "Activo" : "Inactivo",
          };
        }
      });
      setUsers(displayUsers);
      setFilteredUsers(displayUsers);
      toastUpdateSuccess("Usuarios cargados", customId);
    } catch (error) {
      console.log("Error fetching users", error);
      handlePermissions(error.response.status);
      toastUpdateError("Error al cargar los usuarios!", customId);
    }
  }

  function handleDeleteClick(rowId) {
    setSelectedUser(rowId);
    setModalDeleteShow(true);
    console.log("Edit clicked for row with id:", rowId);
  }

  function handleEditClick(rowId) {
    setSelectedUser(rowId);
    setModalEditShow(true);
    const selectedUserData = getUserDataById(rowId); // Replace this with your function to get User data
    setSelectedUserData(selectedUserData);
    console.log("Edit clicked for row with id:", rowId);
  }
  function getUserDataById(UserId) {
    // Replace this with your logic to get User data by ID from the 'Users' array
    return users.find((User) => User.id === UserId);
  }

  function handleCreateClick() {
    setModalCreateShow(true);
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
      <header style={{ marginTop: 100 }}>
        <Menu />
      </header>
      <body className="mt-5">
        <ToastContainer/>
        <div className="cribroom-dashboard ">

          <>
            {selectedUser && (
              <UserForm              
                data={selectedUserData}
                show={modalEditShow}
                tokens= {authTokens.access}
                onHide={() => {
                  setModalEditShow(false);
                  setSelectedUser("");
                  listUsers();
                }}
              />
            )}
            {selectedUser && (
              <DeleteUser
                id={selectedUser}
                show={modalDeleteShow}
                tokens= {authTokens.access}
                onHide={() => {
                  setModalDeleteShow(false);
                  setSelectedUser("");
                  listUsers();
                }}
              />
            )}
            {modalCreateShow && (
              <UserForm
                show={modalCreateShow}
                onHide={() => {
                  setModalCreateShow(false);
                  listUsers();
                }}
              />
            )}
            <>
              <h1 className="titulo-cb">Usuarios</h1>
              <div className="contenedor-linea-cb">
                <hr className="linea-cb"></hr>
              </div>
              <Row>
                <Col className="search-input">
                  <SearchBar
                    keyword={keyword}
                    onChange={updateKeyword}
                    placeholder={"Buscar Usuario"}
                  />
                </Col>
                <Col className="add-payout-button">
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => handleCreateClick()}
                  >
                    Agregar Usuario
                  </Button>
                </Col>
              </Row>
              <div className="DataGrid-Wrapper">
                <DataGrid
                  style={{ borderRadius: "15px", margin: "20px" }}
                  rows={filteredUsers}
                  columns={[
                    { field: "id", headerName: "ID", headerAlign: "center",width: 50, align: "center",},
                    { field: "first_name", headerName: "Nombre", headerAlign: "center",width: 150 , align: "center",},
                    { field: "last_name", headerName: "Apellido", headerAlign: "center",width: 150 , align: "center",},
                    { field: "email", headerName: "E-Mail", headerAlign: "center",width: 220 , align: "center",},
                    { field: "dni", headerName: "DNI", headerAlign: "center",width: 120 , align: "center",},
                    { field: "address", headerName: "Dirección", headerAlign: "center", width: 150 , align: "center",},
                    {
                      field: "phone_number",
                      headerName: "Número Tel.",
                      headerAlign: "center",
                      width: 150,
                      align: "center",
                    },
                    { field: "groupName", headerName: "Rol", headerAlign: "center",width: 100, align: "center", },
                    { field: "is_active", headerName: "Estado", headerAlign: "center",width: 100, align: "center", },
                    {
                      field: "actions",
                      type: "actions",
                      headerName: "Acciones",
                      headerAlign: "center",
                      width: 80,
                      align: "center",
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
