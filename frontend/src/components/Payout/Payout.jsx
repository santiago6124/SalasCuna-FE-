import React, { useEffect, useState, useContext } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./Payout.css";
import AuthContext from "../../context/AuthContext"; // Import your AuthContext

// UI imports
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

//DataGrid Import
import {
  DataGrid,
  GridActionsCellItem,
  esES,
  GridToolbarContainer,
} from "@mui/x-data-grid"; //The esES is to translate the datagrid
import { ExportButton } from "./PayNoteExport/ExportButton";

import { Form } from "react-bootstrap";
import Menu from "../Menu/Menu";

import { PayoutForm } from "../PayoutForm/PayoutForm";

import DeletePayout from "./DeletePayoutModal";
import { handlePermissions, zone_request, payout_request } from "../../api/salasCuna.api";

import PayNoteModal from "./PayNoteModal/PayNoteModal.jsx"

function CustomToolbar(props) {
  const { selectedPayOut, authTokens } = props;

  return (
    <GridToolbarContainer {...props}>
      <ExportButton
        selectedPayOut={selectedPayOut}
        authTokens={authTokens}
      />
    </GridToolbarContainer>
  );
}

export default function Payout() {
  const [payout, setPayout] = useState("");

  const [modalCreateShow, setModalCreateShow] = useState(false);

  const [formData, setFormData] = useState({});  /// mas adelante get request para obtener cribroom basado en los props id


  const [selectedPayout, setSelectedPayout] = useState("");
  const [modalAddShow, setModalAddShow] = useState(false);
  const [modalEditShow, setModalEditShow] = useState(false);
  const [modalDeleteShow, setModalDeleteShow] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  let { authTokens } = useContext(AuthContext); // Get the auth tokens from the context

  const [selectedPayoutData, setSelectedPayoutData] = useState(null);

  useEffect(() => {
    loadPayouts();
  }, []);

  
  const [formFields, setFormFields] = useState({
    encabezados: [
      {
        name: "dirige_a_sr",
        label: "Dirige a",
        type: "text",
        placeholder: "Modificar ministro",
        required: true,
      },
    {
      name: "dirige_a_persona_cr",
      label: "Dirige a",
      type: "text",
      placeholder: "Modificar ministro",
      required: true,
    },
    {
      name: "ministerio",
      label: "Ministerio",
      type: "text",
      placeholder: "Modificar ministro",
      required: true,
    },
    {
      name: "resolucion",
      label: "Resolucion",
      type: "text",
      placeholder: "Modificar resolucion",
      required: true,
    },
  ]});

  function handleEditClick(rowId) {
    setSelectedPayout(rowId);
    setModalEditShow(true);
    const selectedPayoutData = getPayoutDataById(rowId); // Replace this with your function to get Payout data
    setSelectedPayoutData(selectedPayoutData);
    console.log("Edit clicked for row with id:", rowId);
  }
  function getPayoutDataById(PayoutId) {
    // Replace this with your logic to get Payout data by ID from the 'Payouts' array
    return payout.find((Payout) => Payout.id === PayoutId);
  }


  async function loadPayouts() {
    try {

      const responsePO = await payout_request(authTokens.access, 'get', 1);
      let payouts = await responsePO.data;
      setPayout(payouts);
    } catch (error) {
      console.error("Error fetching zona options:", error);
    }
  }


  async function handleAddClick() {
    setModalAddShow(true);
  }

  async function handleDeleteClick(payoutID) {
    setModalDeleteShow(true);
    setSelectedPayout(payoutID);
  }

  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  
  function handleCreateClick() {
    setModalCreateShow(true);
  }

  return (
    <> 
      <body>

        <div className="cribroom-dashboard">
          <>
            <PayoutForm
              show={modalAddShow}
              onHide={() => {
                setModalAddShow(false);
                window.location.reload();
              }}
            />
            <PayNoteModal
              formFields={formFields}
              handleInputChange={handleInputChange}
              formData={formData}
              show={modalCreateShow}
              onHide={() => {
                setModalCreateShow(false);
                /* window.location.reload(); */
              }}
            />
            <PayoutForm
              data={selectedPayoutData}
              show={modalEditShow}
              tokens= {authTokens.access}
              onHide={() => {
                setModalEditShow(false);
                window.location.reload();
                setSelectedPayout("");
              }}
            />
            <DeletePayout
              id={selectedPayout}
              show={modalDeleteShow}
              onHide={() => {
                setModalDeleteShow(false);
                window.location.reload();
                setSelectedPayout("");
              }}
            />
          </>
          <>
            <>
              <h1 className="titulo-cb">Maestro Montos</h1>
              <div className="contenedor-linea-cb">
                <hr className="linea-cb"></hr>
              </div>

              
              <div className="div-general">
                <div className="add-payout-button">
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    className="add-payout-button mb-3"
                    onClick={() => handleCreateClick()}
                  >
                    Modificar Encabezados
                  </Button>
                </div>
                <div className="add-payout-button">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AddIcon />}
                      className="add-payout-button mb-3"
                      onClick={() => handleAddClick()}
                    >
                      Add Payout
                    </Button>
                </div>
              </div>
                
              <div className="DataGrid-Wrapper-payout">
                <DataGrid
                  className="custom-data-grid-payout"
                  style={{ borderRadius: "15px", margin: "20px" }}

                  localeText={
                    esES.components.MuiDataGrid.defaultProps.localeText
                  }
                  checkboxSelection
                  disableRowSelectionOnClick
                  onRowSelectionModelChange={(newRowSelectionModel) => {
                    // Filter the entire row data based on the selected row IDs
                    const selectedRowsData = payout.filter((dataItem) => newRowSelectionModel.includes(dataItem.id));

                
                    console.log('selectedRowsData: ', selectedRowsData);
                    console.log('newRowSelectionModel: ', newRowSelectionModel);
                    // Update the selected rows state with the entire row data
                    setSelectedRows(selectedRowsData);
                  }}
                
                  components={{ Toolbar: CustomToolbar }}
                  componentsProps={{
                    toolbar: {
                      selectedPayOut: selectedRows, // Pass the selected cribroom ID
                      authTokens: authTokens,
                    },
                  }}

                  rows={payout}
                  columns={[
                    {
                      field: "id",
                      headerName: "ID",
                      width: 90,
                      headerAlign: "center",
                      align: "center",
                    },
                    {
                      field: "zone",
                      headerName: "Zona",
                      width: 130, headerAlign: "center",align: "center",
                      valueGetter: (params) => params.row.zone.name,
                    },
                    { field: "amount", headerName: "Monto", width: 160, headerAlign: "center",align: "center",},
                    { field: "date", headerName: "Fecha", width: 170, headerAlign: "center",align: "center", },
                    {
                      field: "actions",
                      type: "actions",
                      headerName: "Acciones",
                      width: 90,
                      getActions: (params) => [
                        <GridActionsCellItem
                          icon={<DeleteIcon />}
                          label="Delete"
                          onClick={() => handleDeleteClick(params.row.id)}
                        />,
                        <>
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
