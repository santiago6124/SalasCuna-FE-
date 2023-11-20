//CSS, other Components and Aesthetic
import Menu from "../Menu/Menu";
import SearchBar from "../SearchBar/SearchBar";
import "./UserList.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import UpdateUser from "../UserManagement/EditUserModal";
import DeleteUser from "../UserManagement/DeleteUserModal";
import SignUp from "../SignUp/SignUp";

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

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [modalEditShow, setModalEditShow] = useState(false);
  const [modalDeleteShow, setModalDeleteShow] = useState(false);
  const [modalCreateShow, setModalCreateShow] = useState(false);

  let {authTokens} = useContext(AuthContext);
  const customId = useRef(null);

  const [formFields, setFormFields] = useState({
    user: [
    {
      name: "email",
      label: "E-mail",
      type: "email",
      placeholder: "Ingresar E-mail",
      // defaultValue: user ? user.email : "",
      required: true,
    },
    {
      name: "first_name",
      label: "Nombre",
      type: "text",
      placeholder: "Ingresar nombre",
      // defaultValue: user ? user.first_name : "",
      required: true,
    },
    {
      name: "last_name",
      label: "Apellido",
      type: "text",
      placeholder: "Ingresar Apellido",
      // defaultValue: user ? user.last_name : "",
      required: true,
    },
    {
      name: "dni",
      label: "DNI",
      type: "number",
      placeholder: "Ingresar DNI",
      // defaultValue: user ? user.dni : "",
      required: true,
    },
    {
      name: "group",
      label: "Rol",
      type: "select",
      options: [
        { id: 1, name: "Admin" },
        { id: 2, name: "User" },
      ],
      // defaultValue: user ? user.group : "",
      required: true,
    },
    {
      name: "phone_number",
      label: "Número De Teléfono",
      type: "tel",
      placeholder: "Ingresar Número De Teléfono",
      // defaultValue: user ? user.phone_number : "",
      required: true,
    },
    {
      name: "city",
      label: "Ciudad",
      type: "text",
      placeholder: "Ingresar Ciudad",
      // defaultValue: user ? user.city : "",
      required: true,
    },
    {
      name: "department",
      label: "Departamento",
      type: "select",
      options: [
        { id: 1, department: "HR" },
        { id: 2, department: "IT" },
        // Add more departments as needed
      ],
      // defaultValue: user ? user.department : "",
      required: true,
    },
    {
      name: "address",
      label: "Dirección",
      type: "text",
      placeholder: "Ingresar Dirección",
      // defaultValue: user ? user.address : "",
      required: true,
    },
    {
      name: "birthdate",
      label: "Fecha de Nacimiento",
      type: "date",
      // defaultValue: user ? user.birthdate : "",
      required: true,
    },
  ]});

  const [formData, setFormData] = useState({});  /// mas adelante get request para obtener cribroom basado en los props id
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  

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
          (group) => group.id === user.groups[0]
        );
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
    console.log("Edit clicked for row with id:", rowId);
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
              <UpdateUser
              
                formFields={formFields}
                handleInputChange={handleInputChange}
                formData={formData}
                id={selectedUser}
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
              <SignUp
                formFields={formFields}
                handleInputChange={handleInputChange}
                formData={formData}
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
                    { field: "group", headerName: "Rol", headerAlign: "center",width: 100, align: "center", },
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
