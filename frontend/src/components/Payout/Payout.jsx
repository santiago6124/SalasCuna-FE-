import React, { useEffect, useState, useContext } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./Payout.css";
import AuthContext from "../../context/AuthContext"; // Import your AuthContext

// UI imports
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Form } from "react-bootstrap";
import Menu from "../Menu/Menu";

import { PayoutForm } from "../PayoutForm/PayoutForm";

import DeletePayout from "./DeletePayoutModal";
import { handlePermissions, zone_request, payout_request } from "../../api/salasCuna.api";

export default function Payout() {
  const [zoneOptions, setZoneOptions] = useState([]);
  const [selectedZone, setSelectedZone] = useState("");
  const [payout, setPayout] = useState("");
  const [selectedPayout, setSelectedPayout] = useState("");
  const [modalAddShow, setModalAddShow] = useState(false);
  const [modalEditShow, setModalEditShow] = useState(false);
  const [modalDeleteShow, setModalDeleteShow] = useState(false);
  let { authTokens } = useContext(AuthContext); // Get the auth tokens from the context

  const [selectedPayoutData, setSelectedPayoutData] = useState(null);

  useEffect(() => {
    loadZones();
  }, []);

  useEffect(() => {
    if (selectedZone) {
      loadPayout(selectedZone);
    }
  }, [selectedZone]);

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


  async function loadZones() {
    try {
      const response = await zone_request(authTokens.access); // Include the JWT token in the request headers
      let data = await response.data;
      setZoneOptions(data);

      const responsePO = await payout_request(authTokens.access);
      let payouts = await responsePO.data;
      setPayout(payouts);
    } catch (error) {
      console.error("Error fetching zona options:", error);
    }
  }

  async function loadPayout(zoneId) {
    try {
      const response = await payout_request(authTokens.access, 'get', 0, {}, undefined, `&zone_id=${zoneId}`);
      const jsonData = response.data;
      setPayout(jsonData);
    } catch (error) {
      console.error("Error fetching payouts:", error);
      handlePermissions(error.response.status);
    }
  }

  async function handleZoneChange(event) {
    setSelectedZone(event.target.value);
  }

  async function handleAddClick() {
    setModalAddShow(true);
  }

  async function handleDeleteClick(payoutID) {
    setModalDeleteShow(true);
    setSelectedPayout(payoutID);
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
              <Row>
                <Col className="col-md-2">
                  <Form.Label className="mb-1">Seleccionar Zona</Form.Label>
                  <Form.Select
                    as="select"
                    name="zone"
                    onChange={handleZoneChange}
                    defaultValue="place"
                  >
                    <option value="place" disabled>
                      Seleccionar Zona
                    </option>
                    {zoneOptions.map((zone) => (
                      <option key={zone.id} value={zone.id}>
                        {zone.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col>
                  <div className="add-payout-button mb-3">
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
                </Col>
              </Row>
              <div className="DataGrid-Wrapper">
                <DataGrid
                  style={{ borderRadius: "15px", margin: "20px" }}
                  rows={payout}
                  columns={[
                    {
                      field: "id",
                      headerName: "Id de pago",
                      width: 250,
                    },
                    { field: "amount", headerName: "Monto", width: 250 },
                    { field: "date", headerName: "Fecha", width: 250 },
                    {
                      field: "actions",
                      type: "actions",
                      headerName: "Acciones",
                      width: 80,
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
