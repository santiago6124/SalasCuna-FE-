import { MenuItem } from '@mui/material';
import * as XLSX from 'xlsx';
import { config } from './config';
import * as React from 'react';
import {
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
  useGridApiContext,
} from '@mui/x-data-grid';
import axios from "axios";

function getExcelData(apiRef) {
  // Select rows and columns
  const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
  const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);

  // Format the data. Here we only keep the value
  const data = filteredSortedRowIds.map((id) => {
    const row = {};
    visibleColumnsField.forEach((field) => {
      row[field] = apiRef.current.getCellParams(id, field).value;
    });
    return row;
  });

  return data;
}

async function handleExport(apiRef, selectedCribroomId) {

  try {
    var cribroomURL = `/api/cribroom/${selectedCribroomId}/`;
    var cribroomResponse = await axios.get(cribroomURL);
    console.log(cribroomResponse);
    cribroomResponse = cribroomResponse['data'];

  } catch (error) {
    console.error("An error occurred (cribroom request):", error);
  }

  try {
    var childURL = `/api/child/?cribroom_id=${selectedCribroomId}`;
    var childResponse = await axios.get(childURL);
    console.log(childResponse);
    childResponse = childResponse['data'];

  } catch (error) {
    console.error("An error occurred (child request):", error);
  }

  var rowValuesDict = {
    '1': ['Sala Cuna:', cribroomResponse['code']],
    '2': [cribroomResponse['name']],
    '3': ['Mes', 'generate'],
    '4': ['Año', 'generate', '', '', '', '', '', '', '', '', '', '', '', '', '', 'CANTIDAD DE NIÑOS', 'amount'],
    '5': ['Provincia de Córdoba'],
    '6': [cribroomResponse['entity']],
    '7': [''],
    '8': [''],
    '9':[
      'N°',
      'SALA CUNA',
      'APELLIDO',
      'NOMBRE',
      'N° DNI',
      'FECHA DE NACIMIENTO',
      'EDAD',
      'SEXO',
      'CALLE',
      'NUMERO',
      'DEPARTAMENTO',
      'LOCALIDAD',
      'CARACTERISTICA TELEFONICA',
      'TELEFONO',
      'APELLIDO Y NOMBRE MADRE',
      'DNI',
      'TURNO',
      'ESTADO',
    ],
  }

  const data = getExcelData(apiRef);

  const rows = data.map((row) => {
    const mRow = {};
    for (const key of config.keys) {
      mRow[key] = row[key];
    }
    return mRow;
  });

  let count = 0;
  const childRows = childResponse.map((child) => {
    count+=1;

    rowValuesDict[Object.keys(rowValuesDict).length+1] = [
      count,
      cribroomResponse['code'],
      child['last_name'],
      child['first_name'],
      child['dni'],
      child['birthdate'],
      'child["age"]',
      child['gender']['gender'],
      child['street'],
      child['house_number'],
      child['neighborhood']['neighborhood'],
      child['locality']['locality'],
      child['guardian']['phone_Feature']['feature'],
      child['guardian']['phone_number'],
      child['guardian']['first_name'],
      child['guardian']['dni'],
      child['shift']['name'],
      child['is_active'] == true ? 'Activo' : 'Baja',
    ];
  });

  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Create a new worksheet
  const worksheet = XLSX.utils.aoa_to_sheet([]); // An empty worksheet

  // Populate the worksheet with values from rowValuesDict
  let startRow = 1; // Starting row to add values
  for (const rowNum in rowValuesDict) {
    if (rowValuesDict.hasOwnProperty(rowNum)) {
      const rowData = rowValuesDict[rowNum];
      XLSX.utils.sheet_add_aoa(worksheet, [rowData], { origin: `A${startRow}` });
      startRow++;
    }
  }

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Metadata');

  // Trigger the file download
  XLSX.writeFile(workbook, config.fileName, { compression: true });
}

export function ExportMenuItem(props) {
  const apiRef = useGridApiContext();
  const { hideMenu } = props;

  const { selectedCribroomId } = props;


  return (
    <MenuItem
      onClick={() => {
        handleExport(apiRef, selectedCribroomId);
        // Hide the export menu after the export
        hideMenu?.();
      }}
    >
      Download Excel
    </MenuItem>
  );
}
